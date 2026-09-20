import { cn } from "@/lib/utils";

type SectionHeadingProps = { eyebrow?: string; title: string; className?: string };

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-semibold uppercase leading-tight sm:text-5xl">{title}</h2>
    </div>
  );
}
