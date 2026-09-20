"use client";

import { useEffect } from "react";

import { defaultLocale } from "@/i18n/config";

export default function RootPage() {
  useEffect(() => {
    window.location.replace(`./${defaultLocale}`);
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Redirecting…</p>
        <a className="mt-3 inline-block font-semibold text-primary underline" href={`./${defaultLocale}`}>
          Continue
        </a>
      </div>
    </main>
  );
}
