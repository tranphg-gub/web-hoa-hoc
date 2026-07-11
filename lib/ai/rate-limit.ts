import { prisma } from "@/lib/prisma";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;

function aiKey(userId: string): string {
  return `ai:${userId}`;
}

/** Lưu trong Postgres (không phải bộ nhớ trong process) để đúng cả khi chạy serverless nhiều instance. */
export async function isRateLimited(userId: string): Promise<boolean> {
  const key = aiKey(userId);
  const since = new Date(Date.now() - WINDOW_MS);
  await prisma.rateLimitHit.deleteMany({ where: { key, createdAt: { lt: since } } });
  const count = await prisma.rateLimitHit.count({ where: { key } });
  if (count >= MAX_REQUESTS_PER_WINDOW) return true;

  await prisma.rateLimitHit.create({ data: { key } });
  return false;
}
