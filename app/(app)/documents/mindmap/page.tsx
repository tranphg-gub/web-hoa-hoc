import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { extractHeadings } from "@/lib/content-outline";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default async function MindmapPage({
  searchParams,
}: {
  searchParams: Promise<{ chapterId?: string }>;
}) {
  const { chapterId } = await searchParams;

  if (!chapterId) notFound();

  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } });
  if (!chapter) notFound();

  const documents = await prisma.document.findMany({
    where: { chapterId },
    orderBy: { order: "asc" },
  });

  if (documents.length === 0) notFound();

  const gradeNum = chapter.grade;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-16">
      <Link
        href="/documents"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại tài liệu
      </Link>

      <div className="flex flex-col items-center gap-2 text-center">
        <Badge tone="neutral">Lớp {gradeNum} · Sơ đồ tư duy</Badge>
        <h1 className="text-2xl font-semibold tracking-tight">{chapter.title}</h1>
        <p className="text-sm text-foreground-muted">
          Tổng quan các bài học và ý chính trong chương
        </p>
      </div>

      <div className="relative border-l-2 border-border-subtle pl-8">
        {documents.map((doc) => {
          const headings = extractHeadings(doc.content);
          return (
            <div key={doc.id} className="relative mb-8 last:mb-0">
              <span className="absolute -left-8 top-6 h-0.5 w-8 bg-border-subtle" />
              <span className="absolute -left-[2.35rem] top-[1.15rem] h-3 w-3 rounded-full border-2 border-foreground bg-background" />

              <div className="card-surface p-5">
                <Link
                  href={`/documents/${doc.id}`}
                  className="text-base font-semibold tracking-tight hover:underline"
                >
                  {doc.title}
                </Link>

                {headings.length > 0 && (
                  <div className="relative mt-4 border-l border-dashed border-border-subtle pl-6">
                    {headings.map((heading, idx) => (
                      <div key={idx} className="relative mb-2.5 last:mb-0">
                        <span className="absolute -left-6 top-2 h-0.5 w-6 bg-border-subtle" />
                        <span className="inline-flex rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-foreground-muted">
                          <ChemProseText text={heading} />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
