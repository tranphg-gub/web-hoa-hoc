import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import { QuickQuizGame } from "./quick-quiz-game";
import { requireUser, canAccessGrade } from "@/lib/require-auth";

export default async function GameQuizPage({
  params,
}: {
  params: Promise<{ setId: string }>;
}) {
  const session = await requireUser();
  const { setId } = await params;
  const set = await prisma.flashcardSet.findUnique({
    where: { id: setId },
    include: { cards: { orderBy: { order: "asc" } } },
  });
  if (!set || set.cards.length < 2) notFound();
  if (!canAccessGrade(session.user, set.grade)) notFound();

  const cards = set.cards.map((c) => ({
    id: c.id,
    term: c.term,
    meaning: c.meaning,
  }));

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Link
        href="/games"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại trò chơi
      </Link>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{set.topic}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Đố nhanh: chọn đáp án đúng trước khi hết giờ.
        </p>
      </div>
      <QuickQuizGame cards={cards} />
    </div>
  );
}
