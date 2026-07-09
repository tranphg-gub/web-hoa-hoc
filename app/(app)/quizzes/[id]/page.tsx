import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { startQuizAttempt } from "../actions";

export default async function QuizOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: { _count: { select: { questions: true } } },
  });
  if (!quiz) notFound();

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Link
        href="/quizzes"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đề
      </Link>

      <Card>
        <CardTitle className="text-xl">{quiz.title}</CardTitle>
        <CardDescription className="mt-2">
          {quiz._count.questions} câu trắc nghiệm · thời gian làm bài{" "}
          {Math.round(quiz.durationSec / 60)} phút.
        </CardDescription>
        <ul className="mt-4 list-disc pl-5 text-sm text-foreground-muted">
          <li>Đồng hồ bắt đầu chạy ngay khi bạn bấm &quot;Bắt đầu làm bài&quot;.</li>
          <li>Hết giờ hệ thống sẽ tự động nộp bài.</li>
          <li>Bạn có thể xem lại đáp án và giải thích sau khi nộp.</li>
        </ul>

        <form
          action={async () => {
            "use server";
            await startQuizAttempt(id);
          }}
          className="mt-6"
        >
          <Button type="submit" size="lg" className="w-full">
            Bắt đầu làm bài
          </Button>
        </form>
      </Card>
    </div>
  );
}
