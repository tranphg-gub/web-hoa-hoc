import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-auth";
import { ArrowLeft } from "lucide-react";
import { GenerateExercisesForm } from "./generate-form";

export default async function AdminGenerateExercisesPage() {
  await requireAdmin();

  const chapters = await prisma.chapter.findMany({
    orderBy: [{ grade: "asc" }, { order: "asc" }],
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link
        href="/admin/practice"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại quản lý bài tập
      </Link>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">Tạo bài tập bằng AI</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Chọn chương, mức độ và số lượng câu muốn AI soạn nháp. Bạn xem/sửa từng câu trước khi lưu vào ngân hàng — chưa lưu thì học sinh chưa thấy được.
        </p>
      </div>

      <GenerateExercisesForm chapters={chapters.map((c) => ({ id: c.id, grade: c.grade, title: c.title }))} />
    </div>
  );
}
