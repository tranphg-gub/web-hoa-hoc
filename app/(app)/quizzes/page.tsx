import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function QuizzesPage() {
  const session = await auth();
  const user = session!.user;
  const grade = user.grade ?? 8;

  const quizzes = await prisma.quiz.findMany({
    where: { grade },
    include: {
      _count: { select: { questions: true } },
      attempts: {
        where: { userId: user.id, submittedAt: { not: null } },
        orderBy: { submittedAt: "desc" },
        take: 1,
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Bài kiểm tra tính giờ
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Lớp {grade} — hết giờ sẽ tự động nộp bài.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quizzes.map((quiz) => {
          const lastAttempt = quiz.attempts[0];
          return (
            <Link key={quiz.id} href={`/quizzes/${quiz.id}`}>
              <Card className="flex h-full flex-col justify-between transition-colors hover:bg-background-subtle">
                <div>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {quiz._count.questions} câu · {Math.round(quiz.durationSec / 60)} phút
                  </CardDescription>
                </div>
                <div className="mt-4">
                  {lastAttempt ? (
                    <Badge tone={(lastAttempt.score ?? 0) >= 5 ? "success" : "danger"}>
                      Điểm gần nhất: {lastAttempt.score?.toFixed(1)}
                    </Badge>
                  ) : (
                    <Badge tone="neutral">Chưa làm</Badge>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
        {quizzes.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">
              Chưa có đề kiểm tra nào cho lớp {grade}.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
