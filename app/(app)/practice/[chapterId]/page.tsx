import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, canAccessGrade } from "@/lib/require-auth";
import { ArrowLeft } from "lucide-react";
import { PracticeRunner } from "./practice-runner";

export default async function PracticeChapterPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const session = await requireUser();
  const { chapterId } = await params;

  const [chapter, questions] = await Promise.all([
    prisma.chapter.findUnique({ where: { id: chapterId } }),
    prisma.practiceQuestion.findMany({
      where: { chapterId, published: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);
  if (!chapter) notFound();
  if (!canAccessGrade(session.user, chapter.grade)) notFound();
  if (questions.length === 0) notFound();

  const items = questions.map((q) => ({
    id: q.id,
    content: q.content,
    choices: JSON.parse(q.choices) as string[],
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    difficulty: q.difficulty,
  }));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-16">
      <Link
        href="/practice"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại bài tập
      </Link>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">{chapter.title}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {items.length} câu · Làm tự do, xem giải thích ngay sau mỗi câu.
        </p>
      </div>

      <PracticeRunner questions={items} />
    </div>
  );
}
