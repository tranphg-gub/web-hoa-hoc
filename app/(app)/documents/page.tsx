import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Network } from "lucide-react";

export default async function DocumentsPage() {
  const session = await auth();
  const user = session!.user;
  const grade = user.grade ?? 8;

  const [documents, readIds] = await Promise.all([
    prisma.document.findMany({
      where: { grade },
      orderBy: [{ chapter: "asc" }, { order: "asc" }],
    }),
    prisma.readDocument
      .findMany({ where: { userId: user.id }, select: { documentId: true } })
      .then((rows) => new Set(rows.map((r) => r.documentId))),
  ]);

  const chapters = Array.from(new Set(documents.map((d) => d.chapter)));

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

      {chapters.length === 0 && (
        <Card>
          <p className="text-sm text-foreground-muted">
            Chưa có tài liệu nào cho lớp {grade}.
          </p>
        </Card>
      )}

      {chapters.map((chapter) => (
        <div key={chapter} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide">
              {chapter}
            </h2>
            <Link
              href={`/documents/mindmap?grade=${grade}&chapter=${encodeURIComponent(chapter)}`}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground"
            >
              <Network className="h-4 w-4" /> Sơ đồ tư duy
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {documents
              .filter((d) => d.chapter === chapter)
              .map((doc) => (
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
      ))}
    </div>
  );
}
