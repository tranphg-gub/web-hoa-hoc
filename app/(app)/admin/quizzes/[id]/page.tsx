import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/require-auth";
import { Badge } from "@/components/ui/badge";
import { addQuestion, deleteQuestion, updateQuestion, toggleQuizPublished } from "../actions";
import { AddQuestionForm } from "./add-question-form";
import { AiDraftForm } from "./ai-draft-form";
import { QuestionCard } from "./question-card";

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

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{quiz.title}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-foreground-muted">
            <span>
              Lớp {quiz.grade} · {quiz.questions.length} câu hỏi
            </span>
            <Badge tone={quiz.published ? "success" : "warning"}>
              {quiz.published ? "Đã công khai" : "Nháp — học sinh chưa thấy"}
            </Badge>
          </div>
        </div>
        <form
          action={async () => {
            "use server";
            await toggleQuizPublished(quiz.id);
          }}
        >
          <Button type="submit" size="sm" variant="secondary">
            {quiz.published ? "Chuyển về nháp" : "Công khai đề"}
          </Button>
        </form>
      </div>

      <Card>
        <CardTitle>AI soạn nháp câu hỏi (cấu trúc đề CT GDPT 2018)</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Chọn số câu từng phần — AI soạn dựa trên nội dung bài học, bạn duyệt rồi mới lưu.
        </CardDescription>
        <AiDraftForm quizId={quiz.id} />
      </Card>

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
            <QuestionCard
              key={q.id}
              index={idx}
              type={q.type}
              content={q.content}
              choices={choices}
              correctIndex={q.correctIndex}
              statements={statements}
              shortAnswer={q.shortAnswer}
              explanation={q.explanation}
              difficulty={q.difficulty}
              onUpdate={async (formData) => {
                "use server";
                await updateQuestion(id, q.id, formData);
              }}
              onDelete={async () => {
                "use server";
                await deleteQuestion(id, q.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
