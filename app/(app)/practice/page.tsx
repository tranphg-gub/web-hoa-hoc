import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input";
import { PenLine } from "lucide-react";

const ALL_GRADES = [6, 7, 8, 9, 10, 11, 12];

export default async function PracticePage({
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

      {isGradePicker && (
        <Card>
          <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="grade">Xem bài tập lớp</Label>
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
