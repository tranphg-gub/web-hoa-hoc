import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { requireAdmin } from "@/lib/require-auth";
import { createChapter, deleteChapter } from "./actions";

export default async function AdminChaptersPage() {
  await requireAdmin();

  const chapters = await prisma.chapter.findMany({
    orderBy: [{ grade: "asc" }, { order: "asc" }],
    include: {
      _count: { select: { documents: true, quizzes: true, flashcardSets: true } },
    },
  });

  const grades = [6, 7, 8, 9, 10, 11, 12];
  const nextOrderByGrade = Object.fromEntries(
    grades.map((g) => [g, (chapters.filter((c) => c.grade === g).at(-1)?.order ?? 0) + 1])
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quản lý danh mục chương</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {chapters.length} chương · Dùng làm khung phân loại cho tài liệu, đề kiểm tra, flashcard.
        </p>
      </div>

      <Card>
        <CardTitle>Thêm chương mới</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Thứ tự (order) quyết định vị trí hiển thị của chương trong danh sách theo lớp.
        </CardDescription>
        <form action={createChapter} className="grid gap-4 sm:grid-cols-4">
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
              {grades.map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="title">Tên chương</Label>
            <Input id="title" name="title" placeholder="Ví dụ: Chương 9. Kim loại chuyển tiếp" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order">Thứ tự</Label>
            <Input id="order" name="order" type="number" defaultValue={1} required />
          </div>
          <div className="sm:col-span-4">
            <Button type="submit">Thêm chương</Button>
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-6">
        {grades.map((g) => {
          const gradeChapters = chapters.filter((c) => c.grade === g);
          if (gradeChapters.length === 0) return null;
          return (
            <div key={g} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
                Lớp {g}
              </h2>
              <div className="flex flex-col gap-3">
                {gradeChapters.map((c) => {
                  const total = c._count.documents + c._count.quizzes + c._count.flashcardSets;
                  return (
                    <Card key={c.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge tone="neutral">Thứ tự {c.order}</Badge>
                          <span className="font-medium">{c.title}</span>
                        </div>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {c._count.documents} tài liệu · {c._count.quizzes} đề kiểm tra · {c._count.flashcardSets} bộ flashcard
                        </p>
                      </div>
                      <form
                        action={async () => {
                          "use server";
                          await deleteChapter(c.id);
                        }}
                      >
                        <Button type="submit" size="sm" variant="ghost" disabled={total > 0}>
                          Xóa
                        </Button>
                      </form>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-foreground-muted">
        Gợi ý: Lớp tiếp theo cho mỗi khối nên dùng thứ tự{" "}
        {grades.map((g) => `Lớp ${g}: ${nextOrderByGrade[g]}`).join(", ")}.
      </p>
    </div>
  );
}
