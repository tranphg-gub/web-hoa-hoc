import { prisma } from "@/lib/prisma";

const WINDOW_MS = 15 * 60_000;
const MAX_FAILED_ATTEMPTS = 5;

function loginKey(username: string): string {
  return `login:${username}`;
}

/** Lưu trong Postgres (không phải bộ nhớ trong process) để đúng cả khi chạy serverless nhiều instance. */
export async function isLoginLocked(username: string): Promise<boolean> {
  const key = loginKey(username);
  const since = new Date(Date.now() - WINDOW_MS);
  await prisma.rateLimitHit.deleteMany({ where: { key, createdAt: { lt: since } } });
  const count = await prisma.rateLimitHit.count({ where: { key } });
  return count >= MAX_FAILED_ATTEMPTS;
}

export async function recordFailedLogin(username: string): Promise<void> {
  await prisma.rateLimitHit.create({ data: { key: loginKey(username) } });
}

export async function clearFailedLogins(username: string): Promise<void> {
  await prisma.rateLimitHit.deleteMany({ where: { key: loginKey(username) } });
}
