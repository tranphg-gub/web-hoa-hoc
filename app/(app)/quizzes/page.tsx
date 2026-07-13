import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input";

const ALL_GRADES = [6, 7, 8, 9, 10, 11, 12];

export default async function QuizzesPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string }>;
}) {
  const session = await requireUser();
  const user = session.user;
  const { grade: gradeParam } = await searchParams;
  // Tài khoản giáo viên/admin không gắn với 1 lớp cố định (user.grade = null),
  // nên cần chọn lớp muốn xem thay vì mặc định cứng vào 1 lớp.
  const isGradePicker = user.grade == null;
  const grade = user.grade ?? (gradeParam ? Number(gradeParam) : ALL_GRADES[0]);

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

      {isGradePicker && (
        <Card>
          <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="grade">Xem đề kiểm tra lớp</Label>
              <select
                id="grade"
                name="grade"
                defaultValue={grade}
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40 sm:w-40"
              >
                {ALL_GRADES.map((g) => (
                  <option key={g} value={g}>
                    Lớp {g}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="secondary">
              Xem
            </Button>
          </form>
        </Card>
      )}

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
