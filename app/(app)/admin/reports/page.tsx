import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setReportStatus } from "@/lib/question-reports";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Chờ xử lý",
  RESOLVED: "Đã sửa",
  DISMISSED: "Đã bỏ qua",
};

export default async function AdminReportsPage() {
  await requireAdmin();

  const reports = await prisma.questionReport.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      user: { select: { name: true, username: true } },
      question: { include: { quiz: { select: { id: true, title: true } } } },
      practiceQuestion: { include: { chapter: { select: { id: true, title: true } } } },
    },
  });

  const pendingCount = reports.filter((r) => r.status === "PENDING").length;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Báo lỗi từ học sinh</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {pendingCount} báo lỗi đang chờ xử lý / {reports.length} tổng cộng.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {reports.map((report) => {
          const content = report.question?.content ?? report.practiceQuestion?.content ?? "(câu hỏi đã bị xóa)";
          const editHref = report.question
            ? `/admin/quizzes/${report.question.quiz.id}`
            : report.practiceQuestion
              ? `/admin/practice/${report.practiceQuestion.chapter.id}`
              : null;
          const sourceLabel = report.question
            ? `Đề: ${report.question.quiz.title}`
            : report.practiceQuestion
              ? `Bài tập: ${report.practiceQuestion.chapter.title}`
              : null;

          return (
            <Card key={report.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      tone={
                        report.status === "PENDING"
                          ? "warning"
                          : report.status === "RESOLVED"
                            ? "success"
                            : "neutral"
                      }
                    >
                      {STATUS_LABEL[report.status]}
                    </Badge>
                    {sourceLabel && <Badge tone="neutral">{sourceLabel}</Badge>}
                  </div>
                  <p className="mt-2 text-sm font-medium">{content}</p>
                  <p className="mt-2 text-sm text-foreground-muted">
                    <span className="font-medium text-foreground">Học sinh báo: </span>
                    {report.reason}
                  </p>
                  <p className="mt-1 text-xs text-foreground-muted">
                    {report.user.name} ({report.user.username}) ·{" "}
                    {report.createdAt.toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {editHref && (
                  <Link href={editHref}>
                    <Button size="sm" variant="secondary">
                      Đi tới sửa câu hỏi
                    </Button>
                  </Link>
                )}
                {report.status === "PENDING" && (
                  <>
                    <form
                      action={async () => {
                        "use server";
                        await setReportStatus(report.id, "RESOLVED");
                      }}
                    >
                      <Button type="submit" size="sm">
                        Đánh dấu đã sửa
                      </Button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await setReportStatus(report.id, "DISMISSED");
                      }}
                    >
                      <Button type="submit" size="sm" variant="ghost">
                        Bỏ qua
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </Card>
          );
        })}
        {reports.length === 0 && (
          <Card>
            <CardTitle>Chưa có báo lỗi nào</CardTitle>
            <CardDescription className="mt-1">
              Khi học sinh bấm &quot;Báo lỗi câu này&quot; ở trang làm bài/luyện tập, báo lỗi sẽ hiện ở đây.
            </CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
