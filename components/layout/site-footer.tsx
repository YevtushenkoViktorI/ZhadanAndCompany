import { Container } from "@/components/shared/container";

export function SiteFooter({ title, location }: { title: string; location: string }) {
  return <footer id="contacts" className="border-t py-8"><Container className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground"><p>© {new Date().getFullYear()} {title}</p><p>{location}</p></Container></footer>;
}
