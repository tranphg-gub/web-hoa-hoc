"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  GitBranch,
  CircleDot,
  History,
  BookOpen,
  Leaf,
  FlaskConical,
  Factory,
  Lightbulb,
  PenLine,
  Calculator,
  Dot,
  type LucideIcon,
} from "lucide-react";
import { ChemProseText } from "@/components/chemistry/chemical-formula";

// Mỗi bài trong 1 chương được tô 1 màu pastel khác nhau (xoay vòng) để dễ phân biệt bằng
// mắt, đồng thời vẫn đúng tinh thần "pill nền nhạt + chữ đậm cùng tông" của design system.
const NODE_PALETTE = [
  { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", dot: "bg-rose-300", hex: "#fecdd3" },
  { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", dot: "bg-violet-300", hex: "#ddd6fe" },
  { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700", dot: "bg-sky-300", hex: "#bae6fd" },
  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-300", hex: "#a7f3d0" },
  { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-300", hex: "#fde68a" },
];

function nodeColor(index: number) {
  return NODE_PALETTE[index % NODE_PALETTE.length];
}

// Icon đơn sắc (outline style) chọn theo từ khóa trong tiêu đề mục — giúp sơ đồ tư duy dễ
// "quét mắt" hơn mà không cần vẽ ảnh minh họa riêng cho từng bài.
const HEADING_ICON_RULES: [RegExp, LucideIcon][] = [
  [/khái niệm|giới thiệu|định nghĩa/i, BookOpen],
  [/trạng thái tự nhiên/i, Leaf],
  [/tính chất/i, FlaskConical],
  [/điều chế|sản xuất/i, Factory],
  [/ứng dụng/i, Lightbulb],
  [/bài tập/i, PenLine],
  [/ví dụ/i, Calculator],
];

function headingIcon(text: string): LucideIcon {
  const rule = HEADING_ICON_RULES.find(([re]) => re.test(text));
  return rule ? rule[1] : Dot;
}

type MindMapDocument = {
  id: string;
  title: string;
  headings: string[];
};

type ViewMode = "tree" | "radial" | "timeline";

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: typeof GitBranch }[] = [
  { id: "tree", label: "Sơ đồ cây", icon: GitBranch },
  { id: "radial", label: "Sơ đồ vòng tròn", icon: CircleDot },
  { id: "timeline", label: "Dòng thời gian", icon: History },
];

export function MindMapView({
  chapterTitle,
  documents,
}: {
  chapterTitle: string;
  documents: MindMapDocument[];
}) {
  const [view, setView] = useState<ViewMode>("tree");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-2 rounded-full border border-border-subtle bg-background-subtle p-1">
        {VIEW_OPTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              view === id
                ? "bg-foreground text-background"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {view === "tree" && <TreeView chapterTitle={chapterTitle} documents={documents} />}
      {view === "radial" && <RadialView chapterTitle={chapterTitle} documents={documents} />}
      {view === "timeline" && <TimelineView documents={documents} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tree view — classic top-down org-chart style
// ---------------------------------------------------------------------------
function TreeView({
  chapterTitle,
  documents,
}: {
  chapterTitle: string;
  documents: MindMapDocument[];
}) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max flex-col items-center gap-0 px-8 py-4">
        <div className="rounded-2xl border border-border-subtle bg-foreground px-5 py-3 text-center text-sm font-semibold text-background">
          {chapterTitle}
        </div>
        {documents.length > 0 && <div className="h-8 w-px bg-border-subtle" />}

        <div className="flex gap-8 border-t border-border-subtle pt-8">
          {documents.map((doc, docIdx) => {
            const color = nodeColor(docIdx);
            return (
              <div key={doc.id} className="relative flex flex-col items-center gap-3">
                <span className="absolute -top-8 left-1/2 h-8 w-px -translate-x-1/2 bg-border-subtle" />
                <Link
                  href={`/documents/${doc.id}`}
                  className={`max-w-[180px] rounded-xl border px-4 py-2.5 text-center text-sm font-medium leading-snug shadow-sm hover:border-foreground/40 ${color.bg} ${color.border} ${color.text}`}
                >
                  {doc.title}
                </Link>

                {doc.headings.length > 0 && (
                  <>
                    <div className="h-5 w-px bg-border-subtle" />
                    <div className="flex flex-col gap-2">
                      {doc.headings.map((h, i) => {
                        const Icon = headingIcon(h);
                        return (
                          <div key={i} className="relative flex items-center gap-2">
                            <span className="h-px w-4 bg-border-subtle" />
                            <span className="flex max-w-[170px] items-center gap-1.5 rounded-full bg-background-subtle px-3 py-1 text-xs font-medium leading-snug text-foreground-muted">
                              <Icon className="h-3 w-3 shrink-0 opacity-70" />
                              <ChemProseText text={h} />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Radial view — chapter at center, bài orbiting around it, headings fanned
// out further from their parent bài
// ---------------------------------------------------------------------------
function RadialView({
  chapterTitle,
  documents,
}: {
  chapterTitle: string;
  documents: MindMapDocument[];
}) {
  // Bài nào có nhiều mục con (sau khi nội dung được viết chi tiết hơn, có thể lên tới
  // 7-10 mục) cần canvas lớn hơn và bán kính xa hơn để các pill mục con không đè lên nhau.
  const maxHeadings = Math.max(1, ...documents.map((d) => d.headings.length));
  const SIZE = 1000 + Math.max(0, maxHeadings - 5) * 130;
  const CENTER = SIZE / 2;
  const R1 = SIZE * 0.18;
  const R2 = SIZE * (maxHeadings > 6 ? 0.42 : 0.46);

  const layout = useMemo(() => {
    const n = documents.length || 1;
    const angleStep = 360 / n;
    return documents.map((doc, i) => {
      const angle = i * angleStep - 90;
      const rad = (angle * Math.PI) / 180;
      const x1 = CENTER + R1 * Math.cos(rad);
      const y1 = CENTER + R1 * Math.sin(rad);

      // Mỗi bài chỉ được xoay trong phạm vi góc dành riêng cho nó (angleStep) để không
      // lấn sang cụm mục con của bài bên cạnh, dù bài đó có nhiều mục con tới đâu.
      const spread = Math.min(angleStep * 0.85, 13 * doc.headings.length);
      const headings = doc.headings.map((h, j) => {
        const count = doc.headings.length;
        const hAngle =
          angle + (count > 1 ? -spread / 2 + (spread * j) / (count - 1) : 0);
        const hRad = (hAngle * Math.PI) / 180;
        return {
          text: h,
          x: CENTER + R2 * Math.cos(hRad),
          y: CENTER + R2 * Math.sin(hRad),
        };
      });

      return { doc, x: x1, y: y1, headings };
    });
  }, [documents, CENTER, R1, R2]);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto block h-auto w-full max-w-3xl"
      >
        {/* connector lines */}
        {layout.map(({ doc, x, y }) => (
          <line
            key={`center-${doc.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="var(--color-border-subtle)"
            strokeWidth={1.5}
          />
        ))}
        {layout.map(({ doc, x, y, headings }) =>
          headings.map((h, i) => (
            <line
              key={`${doc.id}-h-${i}`}
              x1={x}
              y1={y}
              x2={h.x}
              y2={h.y}
              stroke="var(--color-border-subtle)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          ))
        )}

        {/* center node */}
        <foreignObject x={CENTER - 90} y={CENTER - 30} width={180} height={60}>
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-foreground px-3 text-center text-xs font-semibold leading-snug text-background">
            {chapterTitle}
          </div>
        </foreignObject>

        {/* bài nodes */}
        {layout.map(({ doc, x, y }, docIdx) => {
          const color = nodeColor(docIdx);
          return (
            <foreignObject key={doc.id} x={x - 80} y={y - 24} width={160} height={48}>
              <Link
                href={`/documents/${doc.id}`}
                className={`flex h-full w-full items-center justify-center rounded-xl border px-2 text-center text-[11px] font-medium leading-snug shadow-sm hover:border-foreground/40 ${color.bg} ${color.border} ${color.text}`}
              >
                {doc.title}
              </Link>
            </foreignObject>
          );
        })}

        {/* heading leaves */}
        {layout.map(({ doc, headings }) =>
          headings.map((h, i) => {
            const Icon = headingIcon(h.text);
            return (
              <foreignObject
                key={`${doc.id}-leaf-${i}`}
                x={h.x - 65}
                y={h.y - 20}
                width={130}
                height={40}
              >
                <div className="flex h-full w-full items-center justify-center gap-1 rounded-full bg-background-subtle px-2 text-center text-[10px] font-medium leading-snug text-foreground-muted">
                  <Icon className="h-2.5 w-2.5 shrink-0 opacity-70" />
                  <ChemProseText text={h.text} />
                </div>
              </foreignObject>
            );
          })
        )}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Timeline view — original vertical timeline layout
// ---------------------------------------------------------------------------
function TimelineView({ documents }: { documents: MindMapDocument[] }) {
  return (
    <div className="relative mx-auto max-w-2xl border-l-2 border-border-subtle pl-8">
      {documents.map((doc, docIdx) => {
        const color = nodeColor(docIdx);
        return (
          <div key={doc.id} className="relative mb-8 last:mb-0">
            <span className="absolute -left-8 top-6 h-0.5 w-8 bg-border-subtle" />
            <span className={`absolute -left-[2.35rem] top-[1.15rem] h-3 w-3 rounded-full border-2 border-background ${color.dot}`} />

            <div className="card-surface p-5" style={{ borderLeft: `4px solid ${color.hex}` }}>
              <Link
                href={`/documents/${doc.id}`}
                className="text-base font-semibold tracking-tight hover:underline"
              >
                {doc.title}
              </Link>

              {doc.headings.length > 0 && (
                <div className="relative mt-4 border-l border-dashed border-border-subtle pl-6">
                  {doc.headings.map((heading, idx) => {
                    const Icon = headingIcon(heading);
                    return (
                      <div key={idx} className="relative mb-2.5 last:mb-0">
                        <span className="absolute -left-6 top-2 h-0.5 w-6 bg-border-subtle" />
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-foreground-muted">
                          <Icon className="h-3 w-3 shrink-0 opacity-70" />
                          <ChemProseText text={heading} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
