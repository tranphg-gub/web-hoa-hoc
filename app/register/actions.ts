"use server";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const PRICE_VND = 99_000;

export async function registerStudent(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const grade = Number(formData.get("grade"));
  const password = String(formData.get("password") ?? "");
  const paymentNote = String(formData.get("paymentNote") ?? "").trim();

  if (!username || !name || !password || !grade) {
    throw new Error("Vui lòng điền đầy đủ thông tin.");
  }
  if (password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
  }
  if (grade < 6 || grade > 12) {
    throw new Error("Lớp không hợp lệ.");
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    throw new Error("Tên đăng nhập đã tồn tại, hãy chọn tên khác.");
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      name,
      grade,
      password: hashed,
      role: "STUDENT",
      registrationSource: "SELF_REGISTERED",
      paymentStatus: "PENDING",
      payments: {
        create: {
          grade,
          amountVnd: PRICE_VND,
          note: paymentNote || null,
          status: "PENDING",
        },
      },
    },
  });

  await signIn("credentials", { username, password, redirectTo: "/dashboard" });
}
