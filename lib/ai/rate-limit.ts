const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 15;

const requestLog = new Map<string, number[]>();

/** Giới hạn đơn giản trong bộ nhớ - đủ dùng cho nhóm học sinh nhỏ (<10 người), một instance server duy nhất. */
export function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(userId) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(userId, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(userId, timestamps);
  return false;
}
