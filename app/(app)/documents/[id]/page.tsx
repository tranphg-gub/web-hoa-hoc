import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, canAccessGrade } from "@/lib/require-auth";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { DocumentViewSwitcher } from "@/components/chemistry/document-view-switcher";
import { DocumentDownloadActions } from "@/components/chemistry/document-download-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { markDocumentRead } from "../actions";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireUser();
  const doc = await prisma.document.findUnique({ where: { id }, include: { chapter: true } });
  if (!doc) notFound();
  if (!canAccessGrade(session.user, doc.grade)) notFound();

  const readRecord = await prisma.readDocument.findUnique({
    where: {
      userId_documentId: { userId: session.user.id, documentId: id },
    },
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/documents"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại tài liệu
      </Link>

      <div className="flex items-start justify-between gap-4 print:hidden">
        <div>
          <Badge tone="neutral">{doc.chapter.title}</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            {doc.title}
          </h1>
        </div>
        <DocumentDownloadActions title={doc.title} content={doc.content} />
      </div>

      <div id="printable-document">
        <h1 className="mb-4 hidden text-xl font-semibold print:block">{doc.title}</h1>
        <Card>
          <DocumentViewSwitcher title={doc.title} content={doc.content} />
        </Card>
      </div>

      <Card className="flex items-center justify-between bg-background-subtle print:hidden">
        <CardDescription>
          {readRecord
            ? "Bạn đã đánh dấu bài học này là đã học."
            : "Đánh dấu để theo dõi tiến độ học tập của bạn."}
        </CardDescription>
        {readRecord ? (
          <Badge tone="success">
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Đã học
          </Badge>
        ) : (
          <form
            action={async () => {
              "use server";
              await markDocumentRead(id);
            }}
          >
            <Button size="sm" type="submit">
              Đánh dấu đã học
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
