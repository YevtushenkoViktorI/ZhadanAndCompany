import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={cn("py-16 sm:py-24 lg:py-32", className)} {...props} />;
}
