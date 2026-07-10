import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenLine } from "lucide-react";

export default async function PracticePage() {
  const session = await requireUser();
  const grade = session.user.grade ?? 8;

  const chapters = await prisma.chapter.findMany({
    where: { grade },
    orderBy: { order: "asc" },
    include: { _count: { select: { practiceQuestions: { where: { published: true } } } } },
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bài tập luyện tập</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Làm tự do theo từng chương, biết đúng/sai ngay, không tính giờ và không tính vào điểm số chính thức.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {chapters.map((chapter) => {
          const count = chapter._count.practiceQuestions;
          return (
            <Link key={chapter.id} href={count > 0 ? `/practice/${chapter.id}` : "#"}>
              <Card
                className={
                  count > 0
                    ? "flex items-center justify-between transition-colors hover:bg-background-subtle"
                    : "flex items-center justify-between opacity-50"
                }
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background-subtle">
                    <PenLine className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="font-medium">{chapter.title}</span>
                </div>
                <Badge tone="neutral">{count} câu</Badge>
              </Card>
            </Link>
          );
        })}
        {chapters.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">Chưa có chương nào cho lớp {grade}.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
