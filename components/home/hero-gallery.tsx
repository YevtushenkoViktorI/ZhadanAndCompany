"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const portraitPhotos = [
  "/images/hero/portrait-loaded-truck.webp",
  "/images/hero/portrait-moving-truck.webp",
  "/images/hero/portrait-team-member.webp",
] as const;

const slides = [
  { type: "single", src: "/images/hero/apartment-move.webp", position: "center" },
  { type: "collection" },
  { type: "single", src: "/images/hero/furniture-assembly.webp", position: "center" },
  { type: "single", src: "/images/hero/winter-move.webp", position: "center" },
  { type: "single", src: "/images/hero/crane-move.webp", position: "center" },
  { type: "single", src: "/images/hero/truck-profile.webp", position: "center" },
] as const;

function SoftEdgePhoto({ src, className, position = "center", eager = false }: {
  src: string;
  className: string;
  position?: string;
  eager?: boolean;
}) {
  return (
    <div className={cn("absolute overflow-hidden rounded-lg", className)} style={softEdgeMask}>
      <img
        src={`${publicBasePath}${src}`}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: position }}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
    </div>
  );
}

export function HeroGallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showSlide = (index: number) => setActiveSlide((index + slides.length) % slides.length);

  return (
    <div
      className="relative min-h-80 w-full sm:min-h-[24rem] lg:min-h-[30rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.type === "single" ? slide.src : "portrait-collection"}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            activeSlide === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
          )}
          aria-hidden={activeSlide !== index}
        >
          {slide.type === "single" ? (
            <SoftEdgePhoto
              src={slide.src}
              position={slide.position}
              className="inset-0"
              eager={index === 0}
            />
          ) : (
            <>
              <SoftEdgePhoto src={portraitPhotos[0]} className="inset-y-0 start-0 z-0 w-[68%]" />
              <SoftEdgePhoto src={portraitPhotos[1]} className="end-0 top-0 z-10 h-[56%] w-[48%]" />
              <SoftEdgePhoto src={portraitPhotos[2]} className="bottom-0 end-0 z-20 h-[54%] w-[48%]" />
            </>
          )}
        </div>
      ))}

      <div className="absolute bottom-3 start-3 z-30 flex items-center gap-1.5 rounded-full bg-white/85 p-2 shadow-sm backdrop-blur-sm">
        {slides.map((slide, index) => (
          <button
            key={slide.type === "single" ? slide.src : "collection-dot"}
            type="button"
            className={cn(
              "size-2 rounded-full transition-all duration-300",
              activeSlide === index ? "w-5 bg-[#d52b1e]" : "bg-black/25 hover:bg-black/45",
            )}
            aria-label={`Show photo ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>

      <div className="absolute bottom-3 end-3 z-30 flex gap-2">
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full bg-white/90 text-[#1d1d1f] shadow-sm backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d52b1e]"
          aria-label="Previous photo"
          onClick={() => showSlide(activeSlide - 1)}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full bg-white/90 text-[#1d1d1f] shadow-sm backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d52b1e]"
          aria-label="Next photo"
          onClick={() => showSlide(activeSlide + 1)}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
