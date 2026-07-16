import { test } from "node:test";
import assert from "node:assert/strict";
import { prisma } from "../lib/prisma";
import { isLoginLocked, recordFailedLogin, clearFailedLogins } from "../lib/login-rate-limit";
import { isRateLimited } from "../lib/ai/rate-limit";

// Các hàm rate-limit đọc/ghi thẳng bảng RateLimitHit trong Postgres thật (không có
// DB test riêng) — dùng key/username giả rõ ràng để không bao giờ trùng học sinh
// thật, và dọn sạch dữ liệu test trong finally dù test pass hay fail.

test("login rate-limit: khóa sau 5 lần sai, clearFailedLogins mở khóa lại", async () => {
  const username = "__test_login_ratelimit__";
  try {
    assert.equal(await isLoginLocked(username), false);

    for (let i = 0; i < 4; i++) await recordFailedLogin(username);
    assert.equal(await isLoginLocked(username), false);

    await recordFailedLogin(username);
    assert.equal(await isLoginLocked(username), true);

    await clearFailedLogins(username);
    assert.equal(await isLoginLocked(username), false);
  } finally {
    await prisma.rateLimitHit.deleteMany({ where: { key: `login:${username}` } });
  }
});

test("AI rate-limit: cho phép 15 request/phút, chặn request thứ 16", async () => {
  const userId = "__test_ai_ratelimit__";
  try {
    for (let i = 0; i < 15; i++) {
      assert.equal(await isRateLimited(userId), false, `request thứ ${i + 1} phải được cho phép`);
    }
    assert.equal(await isRateLimited(userId), true);
  } finally {
    await prisma.rateLimitHit.deleteMany({ where: { key: `ai:${userId}` } });
  }
});
