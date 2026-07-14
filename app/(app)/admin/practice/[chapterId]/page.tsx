import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";
import { ArrowLeft } from "lucide-react";
import { createPracticeQuestion, deletePracticeQuestion, updatePracticeQuestion, togglePracticeQuestionPublished } from "../actions";
import { PracticeQuestionCard } from "./practice-question-card";

const PAGE_SIZE = 20;

export default async function AdminPracticeChapterPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapterId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  await requireAdmin();
  const { chapterId } = await params;
  const { page: pageParam } = await searchParams;

  const [chapter, totalCount] = await Promise.all([
    prisma.chapter.findUnique({ where: { id: chapterId } }),
    prisma.practiceQuestion.count({ where: { chapterId } }),
  ]);
  if (!chapter) notFound();

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);

  const questions = await prisma.practiceQuestion.findMany({
    where: { chapterId },
    orderBy: { createdAt: "asc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/admin/practice"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách chương
      </Link>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">{chapter.title}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Lớp {chapter.grade} · {questions.length} câu bài tập
        </p>
      </div>

      <Card>
        <CardTitle>Thêm câu bài tập</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Gõ công thức hóa học dạng thường (H2O, Fe^3+...) — hệ thống tự hiển thị đúng.
        </CardDescription>
        <form
          action={async (formData: FormData) => {
            "use server";
            await createPracticeQuestion(chapterId, formData);
          }}
          className="grid gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Nội dung câu hỏi</Label>
            <textarea
              id="content"
              name="content"
              rows={2}
              required
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceA">Đáp án A</Label>
              <Input id="choiceA" name="choiceA" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceB">Đáp án B</Label>
              <Input id="choiceB" name="choiceB" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceC">Đáp án C</Label>
              <Input id="choiceC" name="choiceC" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceD">Đáp án D</Label>
              <Input id="choiceD" name="choiceD" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="correctIndex">Đáp án đúng</Label>
              <select
                id="correctIndex"
                name="correctIndex"
                defaultValue=""
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              >
                <option value="">Chưa xác định (lưu nháp, sửa sau)</option>
                <option value={0}>A</option>
                <option value={1}>B</option>
                <option value={2}>C</option>
                <option value={3}>D</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="difficulty">Mức độ</Label>
              <select
                id="difficulty"
                name="difficulty"
                required
                defaultValue="NHAN_BIET"
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              >
                {DIFFICULTY_ORDER.map((d) => (
                  <option key={d} value={d}>
                    {DIFFICULTY_LABELS[d]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="explanation">Giải thích (tùy chọn)</Label>
            <textarea
              id="explanation"
              name="explanation"
              rows={2}
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="source">Nguồn (tùy chọn)</Label>
            <Input id="source" name="source" placeholder="Vd: SBT Kết nối tri thức" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" value="true" defaultChecked />
            Công khai ngay cho học sinh (bỏ chọn nếu muốn để nháp, sửa sau)
          </label>
          <div>
            <Button type="submit">Thêm câu bài tập</Button>
          </div>
        </form>
      </Card>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        buildHref={(page) => `/admin/practice/${chapterId}?page=${page}`}
      />

      <div className="flex flex-col gap-3">
        {questions.map((q, idx) => {
          const choices = JSON.parse(q.choices) as string[];
          return (
            <PracticeQuestionCard
              key={q.id}
              index={(currentPage - 1) * PAGE_SIZE + idx}
              content={q.content}
              choices={choices}
              correctIndex={q.correctIndex}
              explanation={q.explanation}
              difficulty={q.difficulty}
              source={q.source}
              published={q.published}
              onUpdate={async (formData) => {
                "use server";
                await updatePracticeQuestion(chapterId, q.id, formData);
              }}
              onDelete={async () => {
                "use server";
                await deletePracticeQuestion(chapterId, q.id);
              }}
              onTogglePublished={async () => {
                "use server";
                await togglePracticeQuestionPublished(chapterId, q.id);
              }}
            />
          );
        })}
        {questions.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">Chưa có câu bài tập nào cho chương này.</p>
          </Card>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        buildHref={(page) => `/admin/practice/${chapterId}?page=${page}`}
      />
    </div>
  );
}
