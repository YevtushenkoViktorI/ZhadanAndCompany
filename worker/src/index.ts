interface Env {
  RESEND_API_KEY: string;
  ALLOWED_ORIGIN: string;
  EMAIL_TO: string;
  EMAIL_FROM: string;
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const corsHeaders = getCorsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      if (!corsHeaders) return json({ error: "Origin is not allowed." }, 403);
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
    if (!corsHeaders) return json({ error: "Origin is not allowed." }, 403);
    if (!env.RESEND_API_KEY) return json({ error: "Email service is not configured." }, 503, corsHeaders);

    try {
      const formData = await request.formData();

      // Quietly accept bot submissions so the endpoint cannot be used to probe the honeypot.
      if (String(formData.get("_honey") ?? "").trim()) {
        return json({ success: true }, 200, corsHeaders);
      }

      const files = Array.from(formData.values()).filter(
        (value): value is File => value instanceof File && value.size > 0,
      );
      const totalUploadBytes = files.reduce((total, file) => total + file.size, 0);

      if (totalUploadBytes > MAX_UPLOAD_BYTES) {
        return json({ error: "Attachments exceed the 10 MB limit." }, 413, corsHeaders);
      }
      if (files.some((file) => !file.type.startsWith("image/"))) {
        return json({ error: "Only image attachments are allowed." }, 415, corsHeaders);
      }

      const fields = Array.from(formData.entries()).filter(
        ([name, value]) => !name.startsWith("_") && typeof value === "string",
      ) as Array<[string, string]>;
      const customerEmail = String(formData.get("email") ?? "").trim();
      const subject = String(formData.get("_subject") ?? "Нова заявка — Umzughilfe").trim();
      const sourceUrl = String(formData.get("_url") ?? "").trim();

      const attachments = await Promise.all(
        files.map(async (file) => ({
          filename: safeFilename(file.name),
          content: arrayBufferToBase64(await file.arrayBuffer()),
          content_type: file.type || "application/octet-stream",
        })),
      );

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": crypto.randomUUID(),
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to: [env.EMAIL_TO],
          ...(customerEmail ? { reply_to: customerEmail } : {}),
          subject,
          html: createEmailHtml(fields, sourceUrl, files.length),
          text: createEmailText(fields, sourceUrl, files.length),
          attachments,
        }),
      });

      const resendBody = await resendResponse.text();
      if (!resendResponse.ok) {
        console.error("Resend rejected the email:", resendResponse.status, resendBody);
        return json({ error: "Email delivery failed." }, 502, corsHeaders);
      }

      const result = JSON.parse(resendBody) as { id?: string };
      return json({ success: true, id: result.id }, 200, corsHeaders);
    } catch (error) {
      console.error("Order email error:", error);
      return json({ error: "The request could not be processed." }, 500, corsHeaders);
    }
  },
};

export default worker;

function getCorsHeaders(origin: string, allowedOrigin: string): HeadersInit | null {
  const allowed = new Set([
    allowedOrigin,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);
  if (!allowed.has(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, extraHeaders: HeadersInit = {}): Response {
  const headers = new Headers(extraHeaders);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), { status, headers });
}

function createEmailHtml(fields: Array<[string, string]>, sourceUrl: string, photoCount: number): string {
  const rows = fields.map(([name, value]) => `
    <tr>
      <th style="padding:10px 12px;border:1px solid #ddd;text-align:left;vertical-align:top;background:#f5f4f1">${escapeHtml(name)}</th>
      <td style="padding:10px 12px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td>
    </tr>`).join("");

  return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1d1d1f">
    <h1 style="font-size:24px">Нова заявка з сайту</h1>
    <p><strong>Фото:</strong> ${photoCount} вкладення</p>
    <table style="border-collapse:collapse;width:100%;max-width:800px">${rows}</table>
    ${sourceUrl ? `<p style="margin-top:18px"><a href="${escapeAttribute(sourceUrl)}">Відкрити сторінку, з якої надіслано заявку</a></p>` : ""}
  </body></html>`;
}

function createEmailText(fields: Array<[string, string]>, sourceUrl: string, photoCount: number): string {
  const lines = fields.map(([name, value]) => `${name}: ${value}`);
  return ["Нова заявка з сайту", `Фото: ${photoCount} вкладення`, "", ...lines, sourceUrl ? `\nДжерело: ${sourceUrl}` : ""].join("\n");
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

function safeFilename(filename: string): string {
  return filename.replace(/[\\/\r\n]/g, "_").slice(0, 180) || "photo.jpg";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '\"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}
