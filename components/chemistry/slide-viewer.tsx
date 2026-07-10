"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocumentContent } from "@/components/chemistry/document-content";
import type { ContentSlide } from "@/lib/content-slides";
import { cn } from "@/lib/utils";

export function SlideViewer({ slides }: { slides: ContentSlide[] }) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, total - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  const slide = slides[index];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex min-h-[360px] w-full flex-col justify-center rounded-2xl border border-border-subtle bg-background px-8 py-10 sm:px-14">
        <p className="mb-1 text-center text-xs font-medium uppercase tracking-wide text-foreground-muted">
          Slide {index + 1}/{total}
        </p>
        <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-balance sm:text-2xl">
          {slide.title}
        </h2>
        <div className="mx-auto w-full max-w-xl text-[15px]">
          <DocumentContent content={slide.body} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle disabled:opacity-30 hover:bg-background-subtle"
          aria-label="Slide trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Đi tới slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-5 bg-foreground" : "w-2 bg-border-subtle hover:bg-foreground/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(i + 1, total - 1))}
          disabled={index === total - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle disabled:opacity-30 hover:bg-background-subtle"
          aria-label="Slide tiếp theo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
