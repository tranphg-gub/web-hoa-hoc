"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markDocumentRead(documentId: string) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  await prisma.readDocument.upsert({
    where: {
      userId_documentId: { userId: session.user.id, documentId },
    },
    update: {},
    create: { userId: session.user.id, documentId },
  });

  revalidatePath(`/documents/${documentId}`);
  revalidatePath("/documents");
  revalidatePath("/dashboard");
}
