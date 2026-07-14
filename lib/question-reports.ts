"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function reportQuestion(
  target: { questionId?: string; practiceQuestionId?: string },
  reason: string
) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");
  if (!target.questionId && !target.practiceQuestionId) {
    throw new Error("Thiếu câu hỏi cần báo lỗi.");
  }
  const trimmedReason = reason.trim();
  if (trimmedReason === "") {
    throw new Error("Vui lòng mô tả lỗi bạn thấy.");
  }

  await prisma.questionReport.create({
    data: {
      userId: session.user.id,
      questionId: target.questionId ?? null,
      practiceQuestionId: target.practiceQuestionId ?? null,
      reason: trimmedReason,
    },
  });

  revalidatePath("/admin/reports");
}

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Không có quyền truy cập.");
  }
}

export async function setReportStatus(reportId: string, status: "RESOLVED" | "DISMISSED") {
  await requireAdmin();
  await prisma.questionReport.update({ where: { id: reportId }, data: { status } });
  revalidatePath("/admin/reports");
}
