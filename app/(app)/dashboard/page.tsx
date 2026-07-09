import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Timer, Brain, Sparkles, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await requireUser();
  const user = session.user;

  const [documentsCount, readCount, quizzesCount, attempts, recentDocs] =
    await Promise.all([
      prisma.document.count({ where: { grade: user.grade ?? undefined } }),
      prisma.readDocument.count({ where: { userId: user.id } }),
      prisma.quiz.count({ where: { grade: user.grade ?? undefined } }),
      prisma.quizAttempt.findMany({
        where: { userId: user.id, submittedAt: { not: null } },
        include: { quiz: true },
        orderBy: { submittedAt: "desc" },
        take: 3,
      }),
      prisma.document.findMany({
        where: { grade: user.grade ?? undefined },
        include: { chapter: true },
        orderBy: { order: "asc" },
        take: 3,
      }),
    ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Chào {(user.name ?? user.username).split(" ").pop()},{" "}
          <span className="accent-italic">tiếp tục học nhé</span>
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Tiến độ học tập môn Hóa học lớp {user.grade}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Tài liệu đã đọc"
          value={`${readCount}/${documentsCount}`}
        />
        <StatCard icon={Timer} label="Đề kiểm tra" value={`${quizzesCount}`} />
        <StatCard
          icon={Brain}
          label="Lượt làm bài"
          value={`${attempts.length}`}
        />
        <Link href="/ask-ai">
          <Card className="flex h-full flex-col justify-between transition-colors hover:bg-background-subtle">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-subtle">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium">Hỏi AI ngay</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </Card>
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardTitle>Tài liệu gợi ý</CardTitle>
          <CardDescription className="mt-1 mb-4">
            Bài học tiếp theo dành cho lớp {user.grade}
          </CardDescription>
          <div className="flex flex-col gap-2">
            {recentDocs.map((doc) => (
              <Link
                key={doc.id}
                href={`/documents/${doc.id}`}
                className="flex items-center justify-between rounded-xl border border-border-subtle px-4 py-3 text-sm transition-colors hover:bg-background-subtle"
              >
                <span>{doc.title}</span>
                <Badge tone="neutral">{doc.chapter.title}</Badge>
              </Link>
            ))}
            {recentDocs.length === 0 && (
              <p className="text-sm text-foreground-muted">
                Chưa có tài liệu cho lớp này.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <CardTitle>Kết quả gần đây</CardTitle>
          <CardDescription className="mt-1 mb-4">
            3 lần làm bài kiểm tra gần nhất
          </CardDescription>
          <div className="flex flex-col gap-2">
            {attempts.map((a) => (
              <Link
                key={a.id}
                href={`/quizzes/${a.quizId}/result/${a.id}`}
                className="flex items-center justify-between rounded-xl border border-border-subtle px-4 py-3 text-sm transition-colors hover:bg-background-subtle"
              >
                <span>{a.quiz.title}</span>
                <Badge tone={(a.score ?? 0) >= 5 ? "success" : "danger"}>
                  {a.score?.toFixed(1)} điểm
                </Badge>
              </Link>
            ))}
            {attempts.length === 0 && (
              <p className="text-sm text-foreground-muted">
                Bạn chưa làm bài kiểm tra nào.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-subtle">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">
        {value}
      </div>
      <div className="text-sm text-foreground-muted">{label}</div>
    </Card>
  );
}
