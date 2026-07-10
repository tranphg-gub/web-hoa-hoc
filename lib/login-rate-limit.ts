const WINDOW_MS = 15 * 60_000;
const MAX_FAILED_ATTEMPTS = 5;

const failedAttempts = new Map<string, number[]>();

/** Giới hạn đơn giản trong bộ nhớ - đủ dùng khi chỉ có một instance server duy nhất. */
export function isLoginLocked(username: string): boolean {
  const now = Date.now();
  const timestamps = (failedAttempts.get(username) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  failedAttempts.set(username, timestamps);
  return timestamps.length >= MAX_FAILED_ATTEMPTS;
}

export function recordFailedLogin(username: string): void {
  const now = Date.now();
  const timestamps = (failedAttempts.get(username) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  timestamps.push(now);
  failedAttempts.set(username, timestamps);
}

export function clearFailedLogins(username: string): void {
  failedAttempts.delete(username);
}
