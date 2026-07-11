import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * Bảo vệ ở từng trang (Server Component), phòng trường hợp proxy.ts bị bypass
 * hoặc cấu hình matcher sai — không nên là lớp bảo vệ duy nhất.
 */
export async function requireUser() {
  const session = await auth();
  if (!session) redirect("/login");
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (session.user.role !== "ADMIN") redirect("/dashboard");
  return session;
}

/**
 * Học sinh chỉ được xem tài liệu/đề/bài tập đúng lớp của mình — ADMIN xem được mọi lớp.
 * Gọi sau khi đã tải resource theo id, dùng notFound() (không phải redirect) ở nơi gọi
 * khi trả về false, để không lộ việc tài nguyên có tồn tại hay không cho lớp khác.
 */
export function canAccessGrade(
  user: { role: string; grade?: number | null },
  resourceGrade: number
): boolean {
  if (user.role === "ADMIN") return true;
  return user.grade === resourceGrade;
}
