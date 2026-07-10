"use client";

import { useMemo, useState } from "react";
import { AlignLeft, MonitorPlay } from "lucide-react";
import { DocumentContent } from "@/components/chemistry/document-content";
import { SlideViewer } from "@/components/chemistry/slide-viewer";
import { splitIntoSlides } from "@/lib/content-slides";

type View = "article" | "slide";

export function DocumentViewSwitcher({ title, content }: { title: string; content: string }) {
  const [view, setView] = useState<View>("article");
  const slides = useMemo(() => splitIntoSlides(content, title), [content, title]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center gap-2 rounded-full border border-border-subtle bg-background-subtle p-1 print:hidden">
        <button
          type="button"
          onClick={() => setView("article")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "article" ? "bg-foreground text-background" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          <AlignLeft className="h-3.5 w-3.5" /> Bài viết
        </button>
        <button
          type="button"
          onClick={() => setView("slide")}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "slide" ? "bg-foreground text-background" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          <MonitorPlay className="h-3.5 w-3.5" /> Trình chiếu
        </button>
      </div>

      {view === "article" ? <DocumentContent content={content} /> : <SlideViewer slides={slides} />}
    </div>
  );
}
