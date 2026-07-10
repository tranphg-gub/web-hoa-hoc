"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Không có quyền truy cập.");
  }
}

export async function createStudent(formData: FormData) {
  await requireAdmin();

  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const grade = Number(formData.get("grade"));
  const password = String(formData.get("password") ?? "");

  if (!username || !name || !password || !grade) {
    throw new Error("Vui lòng điền đầy đủ thông tin.");
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { username, name, grade, password: hashed, role: "STUDENT", mustChangePassword: true },
  });

  revalidatePath("/admin/students");
}

export async function resetStudentPassword(userId: string, newPassword: string) {
  await requireAdmin();
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed, mustChangePassword: true },
  });
  revalidatePath("/admin/students");
}

export async function deleteStudent(userId: string) {
  await requireAdmin();
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/students");
}
