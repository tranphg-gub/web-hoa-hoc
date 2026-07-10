import { test } from "node:test";
import assert from "node:assert/strict";
import { buildReminders } from "../lib/reminders";

const now = new Date("2026-01-10T00:00:00.000Z");

test("buildReminders báo chưa học bài nào khi lastActivityAt là null", () => {
  const reminders = buildReminders({ lastActivityAt: null, now, unattemptedQuizTitles: [] });
  assert.equal(reminders.some((r) => r.id === "inactivity"), true);
});

test("buildReminders không nhắc nếu vừa học trong 3 ngày qua", () => {
  const lastActivityAt = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  const reminders = buildReminders({ lastActivityAt, now, unattemptedQuizTitles: [] });
  assert.equal(reminders.some((r) => r.id === "inactivity"), false);
});

test("buildReminders nhắc nếu đã quá 3 ngày không học", () => {
  const lastActivityAt = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
  const reminders = buildReminders({ lastActivityAt, now, unattemptedQuizTitles: [] });
  assert.equal(reminders.some((r) => r.id === "inactivity"), true);
});

test("buildReminders liệt kê đề kiểm tra chưa làm", () => {
  const reminders = buildReminders({
    lastActivityAt: now,
    now,
    unattemptedQuizTitles: ["Đề A", "Đề B"],
  });
  const quizReminder = reminders.find((r) => r.id === "new-quiz");
  assert.ok(quizReminder);
  assert.match(quizReminder.message, /Đề A/);
  assert.match(quizReminder.message, /Đề B/);
});

test("buildReminders nhắc bài đánh giá định kỳ chưa làm khi có tên đề", () => {
  const reminders = buildReminders({
    lastActivityAt: now,
    now,
    unattemptedQuizTitles: [],
    pendingMonthlyCheckTitle: "Đánh giá tháng 1",
  });
  const monthlyReminder = reminders.find((r) => r.id === "monthly-check");
  assert.ok(monthlyReminder);
  assert.match(monthlyReminder.message, /Đánh giá tháng 1/);
});

test("buildReminders không nhắc đánh giá định kỳ khi không truyền tên đề", () => {
  const reminders = buildReminders({ lastActivityAt: now, now, unattemptedQuizTitles: [] });
  assert.equal(reminders.some((r) => r.id === "monthly-check"), false);
});
