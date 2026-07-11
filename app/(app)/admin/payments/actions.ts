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

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) throw new Error("Không tìm thấy khoản thanh toán.");

  // Gộp 2 update vào 1 transaction — tránh trường hợp payment đã "CONFIRMED"
  // nhưng user vẫn "PENDING" nếu tiến trình bị ngắt giữa 2 câu lệnh.
  await prisma.$transaction([
    prisma.payment.update({
      where: { id: paymentId },
      data: { status: "CONFIRMED", confirmedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: payment.userId },
      data: { paymentStatus: "PAID" },
    }),
  ]);

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
