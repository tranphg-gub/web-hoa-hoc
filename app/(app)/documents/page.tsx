import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/input";
import { CheckCircle2, Network } from "lucide-react";

const ALL_GRADES = [6, 7, 8, 9, 10, 11, 12];

export default async function DocumentsPage({
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

  const [documents, readIds] = await Promise.all([
    prisma.document.findMany({
      where: { grade },
      // Danh sách chỉ hiển thị tiêu đề — không lấy content (lý thuyết dài) để
      // giảm dữ liệu truyền qua lại với DB ở xa.
      select: {
        id: true,
        title: true,
        chapterId: true,
        order: true,
        chapter: { select: { id: true, title: true, order: true } },
      },
      orderBy: [{ chapter: { order: "asc" } }, { order: "asc" }],
    }),
    prisma.readDocument
      .findMany({ where: { userId: user.id }, select: { documentId: true } })
      .then((rows) => new Set(rows.map((r) => r.documentId))),
  ]);

  const chapters = Array.from(new Map(documents.map((d) => [d.chapterId, d.chapter])).values());

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tài liệu học tập
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Lớp {grade} — chọn bài để xem lý thuyết chi tiết.
        </p>
      </div>

      {isGradePicker && (
        <Card>
          <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="grade">Xem tài liệu lớp</Label>
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

      {chapters.length === 0 && (
        <Card>
          <p className="text-sm text-foreground-muted">
            Chưa có tài liệu nào cho lớp {grade}.
          </p>
        </Card>
      )}

      {chapters.map((chapter) => {
        const chapterDocs = documents.filter((d) => d.chapterId === chapter.id);
        const readCount = chapterDocs.filter((d) => readIds.has(d.id)).length;
        return (
          <div key={chapter.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide">
                  {chapter.title}
                </h2>
                <span className="text-xs text-foreground-muted">
                  Đã học {readCount}/{chapterDocs.length} bài
                </span>
              </div>
              <Link
                href={`/documents/mindmap?chapterId=${chapter.id}`}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground"
              >
                <Network className="h-4 w-4" /> Sơ đồ tư duy
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {chapterDocs.map((doc) => (
                <Link key={doc.id} href={`/documents/${doc.id}`}>
                  <Card className="flex h-full flex-col justify-between transition-colors hover:bg-background-subtle">
                    <CardTitle>{doc.title}</CardTitle>
                    <div className="mt-4 flex items-center gap-2">
                      {readIds.has(doc.id) ? (
                        <Badge tone="success">
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Đã học
                        </Badge>
                      ) : (
                        <Badge tone="neutral">Chưa học</Badge>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
