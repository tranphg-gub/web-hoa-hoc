import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default async function AdminPracticePage() {
  await requireAdmin();

  const chapters = await prisma.chapter.findMany({
    orderBy: [{ grade: "asc" }, { order: "asc" }],
    include: { _count: { select: { practiceQuestions: true } } },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Quản lý bài tập luyện tập</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Ngân hàng câu hỏi luyện tập (không tính giờ, không tính điểm) theo từng chương.
          </p>
        </div>
        <Link href="/admin/practice/generate">
          <Button size="sm">
            <Sparkles className="h-4 w-4" /> Tạo bài tập bằng AI
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {chapters.map((chapter) => (
          <Link key={chapter.id} href={`/admin/practice/${chapter.id}`}>
            <Card className="flex items-center justify-between transition-colors hover:bg-background-subtle">
              <div className="flex items-center gap-2">
                <Badge tone="neutral">Lớp {chapter.grade}</Badge>
                <span className="font-medium">{chapter.title}</span>
              </div>
              <CardDescription>{chapter._count.practiceQuestions} câu</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
