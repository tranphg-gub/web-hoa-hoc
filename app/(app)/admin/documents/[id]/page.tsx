import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/require-auth";
import { updateDocument } from "../actions";

export default async function EditDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const [doc, chapters] = await Promise.all([
    prisma.document.findUnique({ where: { id } }),
    prisma.chapter.findMany({ orderBy: [{ grade: "asc" }, { order: "asc" }] }),
  ]);
  if (!doc) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/admin/documents"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách tài liệu
      </Link>

      <Card>
        <CardTitle>Sửa tài liệu</CardTitle>
        <form
          action={async (formData: FormData) => {
            "use server";
            await updateDocument(id, formData);
          }}
          className="mt-4 grid gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="grade">Lớp</Label>
              <select
                id="grade"
                name="grade"
                defaultValue={doc.grade}
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    Lớp {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="chapterId">Chương</Label>
              <select
                id="chapterId"
                name="chapterId"
                defaultValue={doc.chapterId}
                required
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <optgroup key={g} label={`Lớp ${g}`}>
                    {chapters
                      .filter((c) => c.grade === g)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Tiêu đề bài học</Label>
            <Input id="title" name="title" defaultValue={doc.title} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="order">Thứ tự hiển thị</Label>
            <Input id="order" name="order" type="number" defaultValue={doc.order} className="w-32" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Nội dung</Label>
            <textarea
              id="content"
              name="content"
              rows={12}
              defaultValue={doc.content}
              required
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            />
          </div>
          <div>
            <Button type="submit">Lưu thay đổi</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
