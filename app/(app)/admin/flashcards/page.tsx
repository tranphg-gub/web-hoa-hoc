import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { createFlashcardSet, deleteFlashcardSet } from "./actions";

export default async function AdminFlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string; q?: string }>;
}) {
  const { grade, q } = await searchParams;
  const gradeNum = grade ? Number(grade) : undefined;
  const hasFilter = Boolean(gradeNum || q);

  const [sets, totalCount] = await Promise.all([
    prisma.flashcardSet.findMany({
      where: {
        ...(gradeNum ? { grade: gradeNum } : {}),
        ...(q ? { topic: { contains: q } } : {}),
      },
      orderBy: [{ grade: "asc" }],
      include: { _count: { select: { cards: true } } },
    }),
    prisma.flashcardSet.count(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý bộ flashcard
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {totalCount} bộ · Dữ liệu dùng chung cho cả 3 trò chơi: lật thẻ, ghép cặp, đố nhanh.
        </p>
      </div>

      <Card>
        <CardTitle>Tạo bộ flashcard mới</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Thêm thẻ (term/meaning) ở trang chi tiết sau khi tạo bộ.
        </CardDescription>
        <form action={createFlashcardSet} className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="topic">Chủ đề</Label>
            <Input id="topic" name="topic" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="grade">Lớp</Label>
            <select
              id="grade"
              name="grade"
              required
              defaultValue=""
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              <option value="" disabled>
                Chọn lớp
              </option>
              {[8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <Button type="submit">Tạo bộ flashcard</Button>
          </div>
        </form>
      </Card>

      <Card>
        <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="q">Tìm theo chủ đề</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input id="q" name="q" defaultValue={q ?? ""} placeholder="Ví dụ: Kim loại, Polymer..." className="pl-9" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="grade-filter">Lớp</Label>
            <select
              id="grade-filter"
              name="grade"
              defaultValue={grade ?? ""}
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40 sm:w-40"
            >
              <option value="">Tất cả các lớp</option>
              {[8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="secondary">
              Lọc
            </Button>
            {hasFilter && (
              <Link href="/admin/flashcards">
                <Button type="button" variant="ghost">
                  <X className="h-4 w-4" /> Xóa lọc
                </Button>
              </Link>
            )}
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        {sets.map((set) => (
          <Card key={set.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="neutral">Lớp {set.grade}</Badge>
                <span className="font-medium">{set.topic}</span>
              </div>
              <p className="mt-1 text-sm text-foreground-muted">{set._count.cards} thẻ</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/flashcards/${set.id}`}>
                <Button size="sm" variant="secondary">
                  Quản lý thẻ
                </Button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteFlashcardSet(set.id);
                }}
              >
                <Button type="submit" size="sm" variant="ghost">
                  Xóa
                </Button>
              </form>
            </div>
          </Card>
        ))}
        {sets.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">Không tìm thấy bộ flashcard nào phù hợp.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
