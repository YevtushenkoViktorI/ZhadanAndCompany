import type { CSSProperties } from "react";

import { publicBasePath } from "@/config/site";
import { cn } from "@/lib/utils";

const softEdgeMask: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 0.8%, black 99.2%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 0.8%, black 99.2%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to right, transparent 0%, black 0.8%, black 99.2%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 0.8%, black 99.2%, transparent 100%)",
  maskComposite: "intersect",
};

const photos = [
  { src: "/images/services/moving.png", className: "inset-y-0 start-0 w-[72%]", position: "center" },
  { src: "/images/services/delivery.png", className: "end-0 top-0 h-[56%] w-[50%]", position: "center" },
  { src: "/images/services/furniture-assembly.png", className: "bottom-0 end-0 h-[54%] w-[50%]", position: "center" },
] as const;

export function HeroGallery() {
  return (
    <div className="relative min-h-80 w-full sm:min-h-[24rem] lg:min-h-[30rem]" aria-hidden="true">
      {photos.map((photo, index) => (
        <div
          key={photo.src}
          className={cn("absolute overflow-hidden", photo.className)}
          style={softEdgeMask}
        >
          <img
            src={`${publicBasePath}${photo.src}`}
            alt=""
            className="size-full object-cover"
            style={{ objectPosition: photo.position }}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </div>
      ))}
    </div>
  );
}
