"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Không có quyền truy cập.");
  }
}

export async function createDocument(formData: FormData) {
  await requireAdmin();

  await prisma.document.create({
    data: {
      grade: Number(formData.get("grade")),
      chapterId: String(formData.get("chapterId") ?? ""),
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? ""),
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}

export async function updateDocument(documentId: string, formData: FormData) {
  await requireAdmin();

  await prisma.document.update({
    where: { id: documentId },
    data: {
      grade: Number(formData.get("grade")),
      chapterId: String(formData.get("chapterId") ?? ""),
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? ""),
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/admin/documents");
  revalidatePath(`/documents/${documentId}`);
  revalidatePath("/documents");
  redirect("/admin/documents");
}

export async function deleteDocument(documentId: string) {
  await requireAdmin();
  await prisma.document.delete({ where: { id: documentId } });
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}
