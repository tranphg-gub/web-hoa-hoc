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
