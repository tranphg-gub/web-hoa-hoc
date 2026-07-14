import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { extractHeadings } from "@/lib/content-outline";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { MindMapView } from "@/components/chemistry/mind-map-view";
import { requireUser, canAccessGrade } from "@/lib/require-auth";

export default async function MindmapPage({
  searchParams,
}: {
  searchParams: Promise<{ chapterId?: string }>;
}) {
  const session = await requireUser();
  const { chapterId } = await searchParams;

  if (!chapterId) notFound();

  const [chapter, documents] = await Promise.all([
    prisma.chapter.findUnique({ where: { id: chapterId } }),
    prisma.document.findMany({
      where: { chapterId },
      orderBy: { order: "asc" },
    }),
  ]);
  if (!chapter) notFound();
  if (!canAccessGrade(session.user, chapter.grade)) notFound();
  if (documents.length === 0) notFound();

  const gradeNum = chapter.grade;
  const docsWithHeadings = documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    headings: extractHeadings(doc.content),
  }));

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 pb-16">
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
          Tổng quan các bài học và ý chính trong chương — chọn kiểu sơ đồ bên dưới
        </p>
      </div>

      <MindMapView chapterTitle={chapter.title} documents={docsWithHeadings} />
    </div>
  );
}
