"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function changePassword(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 6) {
    throw new Error("Mật khẩu mới phải có ít nhất 6 ký tự.");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp.");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) throw new Error("Không tìm thấy tài khoản.");

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) throw new Error("Mật khẩu hiện tại không đúng.");

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed, mustChangePassword: false },
  });

  redirect("/login?passwordChanged=1");
}
