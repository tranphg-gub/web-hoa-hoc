"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Không có quyền truy cập.");
  }
}

export async function confirmPayment(paymentId: string) {
  await requireAdmin();

  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });

  await prisma.user.update({
    where: { id: payment.userId },
    data: { paymentStatus: "PAID" },
  });

  revalidatePath("/admin/payments");
}

export async function rejectPayment(paymentId: string) {
  await requireAdmin();
  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin/payments");
}
