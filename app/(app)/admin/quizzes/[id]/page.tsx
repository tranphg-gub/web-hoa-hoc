import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/require-auth";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { Badge } from "@/components/ui/badge";
import { addQuestion, deleteQuestion } from "../actions";
import { AddQuestionForm } from "./add-question-form";

const TYPE_LABELS: Record<string, string> = {
  SINGLE_CHOICE: "Trắc nghiệm",
  TRUE_FALSE_GROUP: "Đúng/Sai",
  SHORT_ANSWER: "Trả lời ngắn",
};

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
        <AddQuestionForm
          action={async (formData: FormData) => {
            "use server";
            await addQuestion(id, formData);
          }}
        />
      </Card>

      <div className="flex flex-col gap-3">
        {quiz.questions.map((q, idx) => {
          const statements = q.statements
            ? (JSON.parse(q.statements) as { text: string; correct: boolean }[])
            : null;
          const choices = q.choices ? (JSON.parse(q.choices) as string[]) : null;

          return (
            <Card key={q.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    Câu {idx + 1}. {q.content}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <DifficultyBadge difficulty={q.difficulty} />
                    <Badge tone="neutral">{TYPE_LABELS[q.type] ?? q.type}</Badge>
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

              {q.type === "SINGLE_CHOICE" && choices && (
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
              )}

              {q.type === "TRUE_FALSE_GROUP" && statements && (
                <ul className="mt-3 flex flex-col gap-1 text-sm text-foreground-muted">
                  {statements.map((s, sIdx) => (
                    <li key={sIdx}>
                      <span className={s.correct ? "font-medium text-success-fg" : "font-medium text-danger-fg"}>
                        {s.correct ? "Đúng" : "Sai"}
                      </span>{" "}
                      — {String.fromCharCode(97 + sIdx)}) {s.text}
                    </li>
                  ))}
                </ul>
              )}

              {q.type === "SHORT_ANSWER" && (
                <p className="mt-3 text-sm text-foreground-muted">
                  Đáp án đúng: <span className="font-medium text-success-fg">{q.shortAnswer}</span>
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
