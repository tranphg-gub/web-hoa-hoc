import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Shuffle, Zap } from "lucide-react";

export default async function GamesPage() {
  const session = await auth();
  const grade = session!.user.grade ?? 8;

  const sets = await prisma.flashcardSet.findMany({
    where: { grade },
    include: { _count: { select: { cards: true } } },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Trò chơi ghi nhớ
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Luyện tập nhẹ nhàng, không tính vào điểm số chính thức.
        </p>
      </div>

      {sets.length === 0 && (
        <Card>
          <p className="text-sm text-foreground-muted">
            Chưa có bộ flashcard nào cho lớp {grade}.
          </p>
        </Card>
      )}

      <div className="flex flex-col gap-5">
        {sets.map((set) => (
          <Card key={set.id}>
            <CardTitle>{set.topic}</CardTitle>
            <CardDescription className="mt-1 mb-4">
              <Badge tone="neutral">{set._count.cards} thẻ</Badge>
            </CardDescription>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link href={`/games/${set.id}/flashcards`}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-border-subtle px-4 py-3 transition-colors hover:bg-background-subtle">
                  <Layers className="h-5 w-5" strokeWidth={1.75} />
                  <span className="text-sm font-medium">Lật thẻ</span>
                </div>
              </Link>
              <Link href={`/games/${set.id}/matching`}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-border-subtle px-4 py-3 transition-colors hover:bg-background-subtle">
                  <Shuffle className="h-5 w-5" strokeWidth={1.75} />
                  <span className="text-sm font-medium">Ghép cặp</span>
                </div>
              </Link>
              <Link href={`/games/${set.id}/quiz`}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-border-subtle px-4 py-3 transition-colors hover:bg-background-subtle">
                  <Zap className="h-5 w-5" strokeWidth={1.75} />
                  <span className="text-sm font-medium">Đố nhanh</span>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
