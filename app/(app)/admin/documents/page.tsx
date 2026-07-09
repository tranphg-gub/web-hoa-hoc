import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Network } from "lucide-react";
import { requireAdmin } from "@/lib/require-auth";
import { createDocument, deleteDocument } from "./actions";

export default async function AdminDocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string; q?: string }>;
}) {
  await requireAdmin();

  const { grade, q } = await searchParams;
  const gradeNum = grade ? Number(grade) : undefined;

  const [documents, totalCount] = await Promise.all([
    prisma.document.findMany({
      where: {
        ...(gradeNum ? { grade: gradeNum } : {}),
        ...(q
          ? {
              OR: [
                { title: { contains: q } },
                { chapter: { contains: q } },
                { content: { contains: q } },
              ],
            }
          : {}),
      },
      orderBy: [{ grade: "asc" }, { chapter: "asc" }, { order: "asc" }],
    }),
    prisma.document.count(),
  ]);

  const hasFilter = Boolean(gradeNum || q);

  const groups: { chapter: string; grade: number; docs: typeof documents }[] = [];
  for (const doc of documents) {
    const last = groups[groups.length - 1];
    if (last && last.chapter === doc.chapter && last.grade === doc.grade) {
      last.docs.push(doc);
    } else {
      groups.push({ chapter: doc.chapter, grade: doc.grade, docs: [doc] });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Quản lý tài liệu
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {totalCount} tài liệu · Nội dung lý thuyết theo lớp và chương học.
        </p>
      </div>

      <Card>
        <CardTitle>Thêm tài liệu mới</CardTitle>
        <CardDescription className="mt-1 mb-4">
          Gõ công thức hóa học dạng thường (H2O, CaCO3 -&gt; CaO + CO2, Fe^3+) — hệ thống sẽ tự hiển thị đúng ký hiệu khoa học.
        </CardDescription>
        <form action={createDocument} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="grade">Lớp</Label>
              <select
                id="grade"
                name="grade"
                required
                defaultValue=""
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              >
                <option value="" disabled>
                  Chọn lớp
                </option>
                {[8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    Lớp {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="chapter">Chương</Label>
              <Input id="chapter" name="chapter" required />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Tiêu đề bài học</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order">Thứ tự hiển thị</Label>
            <Input id="order" name="order" type="number" defaultValue={0} className="w-32" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Nội dung</Label>
            <textarea
              id="content"
              name="content"
              rows={8}
              required
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <div>
            <Button type="submit">Thêm tài liệu</Button>
          </div>
        </form>
      </Card>

      <Card>
        <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="q">Tìm theo tên bài, chương, nội dung</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input id="q" name="q" defaultValue={q ?? ""} placeholder="Ví dụ: alkane, oxide, dãy hoạt động..." className="pl-9" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="grade-filter">Lớp</Label>
            <select
              id="grade-filter"
              name="grade"
              defaultValue={grade ?? ""}
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40 sm:w-40"
            >
              <option value="">Tất cả các lớp</option>
              {[8, 9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="secondary">
              Lọc
            </Button>
            {hasFilter && (
              <Link href="/admin/documents">
                <Button type="button" variant="ghost">
                  <X className="h-4 w-4" /> Xóa lọc
                </Button>
              </Link>
            )}
          </div>
        </form>
      </Card>

      {hasFilter && (
        <p className="text-sm text-foreground-muted">
          Tìm thấy {documents.length} tài liệu
          {q && <> khớp với &quot;{q}&quot;</>}
          {gradeNum && <> ở lớp {gradeNum}</>}.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={`${group.grade}-${group.chapter}`} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge tone="neutral">Lớp {group.grade}</Badge>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground-muted">
                  {group.chapter}
                </h2>
              </div>
              <Link
                href={`/documents/mindmap?grade=${group.grade}&chapter=${encodeURIComponent(group.chapter)}`}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground"
              >
                <Network className="h-4 w-4" /> Sơ đồ tư duy
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {group.docs.map((doc) => (
                <Card key={doc.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-medium">{doc.title}</span>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/documents/${doc.id}`}>
                      <Button size="sm" variant="secondary">
                        Sửa
                      </Button>
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteDocument(doc.id);
                      }}
                    >
                      <Button type="submit" size="sm" variant="ghost">
                        Xóa
                      </Button>
                    </form>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <Card>
            <p className="text-sm text-foreground-muted">Không tìm thấy tài liệu nào phù hợp.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
