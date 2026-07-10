import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/require-auth";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";
import { addQuestion, deleteQuestion } from "../actions";

export default async function AdminQuizDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: "asc" } } },
  });
  if (!quiz) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/admin/quizzes"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đề
      </Link>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">{quiz.title}</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Lớp {quiz.grade} · {quiz.questions.length} câu hỏi
        </p>
      </div>

      <Card>
        <CardTitle>Thêm câu hỏi</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Gõ công thức hóa học dạng thường (H2O, Fe^3+...) — hệ thống tự hiển thị đúng.
        </CardDescription>
        <form
          action={async (formData: FormData) => {
            "use server";
            await addQuestion(id, formData);
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="correctIndex">Đáp án đúng</Label>
            <select
              id="correctIndex"
              name="correctIndex"
              required
              defaultValue=""
              className="w-full max-w-[160px] rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              <option value="" disabled>
                Chọn
              </option>
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
              className="w-full max-w-[220px] rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              {DIFFICULTY_ORDER.map((d) => (
                <option key={d} value={d}>
                  {DIFFICULTY_LABELS[d]}
                </option>
              ))}
            </select>
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
          <div>
            <Button type="submit">Thêm câu hỏi</Button>
          </div>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        {quiz.questions.map((q, idx) => {
          const choices = JSON.parse(q.choices) as string[];
          return (
            <Card key={q.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    Câu {idx + 1}. {q.content}
                  </p>
                  <div className="mt-2">
                    <DifficultyBadge difficulty={q.difficulty} />
                  </div>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await deleteQuestion(id, q.id);
                  }}
                >
                  <Button type="submit" size="sm" variant="ghost">
                    Xóa
                  </Button>
                </form>
              </div>
              <ul className="mt-3 flex flex-col gap-1 text-sm text-foreground-muted">
                {choices.map((c, cIdx) => (
                  <li
                    key={cIdx}
                    className={cIdx === q.correctIndex ? "font-medium text-success-fg" : ""}
                  >
                    {String.fromCharCode(65 + cIdx)}. {c}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
