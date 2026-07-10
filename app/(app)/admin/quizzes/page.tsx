import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { requireAdmin } from "@/lib/require-auth";
import { QUIZ_KIND_LABELS, QUIZ_KIND_ORDER } from "@/lib/quiz-kind";
import { createQuiz, deleteQuiz } from "./actions";

export default async function AdminQuizzesPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string; q?: string }>;
}) {
  await requireAdmin();

  const { grade, q } = await searchParams;
  const gradeNum = grade ? Number(grade) : undefined;
  const hasFilter = Boolean(gradeNum || q);

  const [quizzes, totalCount, chapters] = await Promise.all([
    prisma.quiz.findMany({
      where: {
        ...(gradeNum ? { grade: gradeNum } : {}),
        ...(q ? { title: { contains: q } } : {}),
      },
      orderBy: [{ grade: "asc" }, { createdAt: "desc" }],
      include: { _count: { select: { questions: true } }, chapter: true },
    }),
    prisma.quiz.count(),
    prisma.chapter.findMany({ orderBy: [{ grade: "asc" }, { order: "asc" }] }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý đề kiểm tra
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {totalCount} đề · Tạo đề mới, sau đó thêm câu hỏi cho từng đề.
        </p>
      </div>

      <Card>
        <CardTitle>Tạo đề mới</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Sau khi tạo, bạn sẽ thêm câu hỏi ở trang chi tiết đề.
        </CardDescription>
        <form action={createQuiz} className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="title">Tiêu đề đề kiểm tra</Label>
            <Input id="title" name="title" required />
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
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="chapterId">Chương</Label>
            <select
              id="chapterId"
              name="chapterId"
              required
              defaultValue=""
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              <option value="" disabled>
                Chọn chương
              </option>
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                <optgroup key={g} label={`Lớp ${g}`}>
                  {chapters
                    .filter((c) => c.grade === g)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="durationMin">Thời gian (phút)</Label>
            <Input id="durationMin" name="durationMin" type="number" defaultValue={15} required />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label htmlFor="kind">Loại đề</Label>
            <select
              id="kind"
              name="kind"
              defaultValue="REGULAR"
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              {QUIZ_KIND_ORDER.map((k) => (
                <option key={k} value={k}>
                  {QUIZ_KIND_LABELS[k]}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <Button type="submit">Tạo đề</Button>
          </div>
        </form>
      </Card>

      <Card>
        <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="q">Tìm theo tên đề</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input id="q" name="q" defaultValue={q ?? ""} placeholder="Ví dụ: Kim loại, Hydrocarbon..." className="pl-9" />
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
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
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
              <Link href="/admin/quizzes">
                <Button type="button" variant="ghost">
                  <X className="h-4 w-4" /> Xóa lọc
                </Button>
              </Link>
            )}
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone="neutral">Lớp {quiz.grade}</Badge>
                {quiz.kind !== "REGULAR" && (
                  <Badge tone="warning">{QUIZ_KIND_LABELS[quiz.kind]}</Badge>
                )}
                <span className="font-medium">{quiz.title}</span>
              </div>
              <p className="mt-1 text-sm text-foreground-muted">
                {quiz.chapter.title} · {quiz._count.questions} câu · {Math.round(quiz.durationSec / 60)} phút
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/quizzes/${quiz.id}`}>
                <Button size="sm" variant="secondary">
                  Quản lý câu hỏi
                </Button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteQuiz(quiz.id);
                }}
              >
                <Button type="submit" size="sm" variant="ghost">
                  Xóa
                </Button>
              </form>
            </div>
          </Card>
        ))}
        {quizzes.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">Không tìm thấy đề nào phù hợp.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
