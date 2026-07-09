import { test } from "node:test";
import assert from "node:assert/strict";
import { computeDeadline, isPastDeadline, scoreQuizAttempt } from "../lib/quiz-scoring";

test("computeDeadline cộng đúng thời gian làm bài + đệm mạng", () => {
  const startedAt = new Date("2026-01-01T00:00:00.000Z");
  const deadline = computeDeadline(startedAt, 900); // 15 phút
  // 900s + 5s đệm = 905000ms sau startedAt
  assert.equal(deadline, startedAt.getTime() + 905_000);
});

test("isPastDeadline trả về false khi còn trong giờ làm bài", () => {
  const startedAt = new Date("2026-01-01T00:00:00.000Z");
  const now = new Date(startedAt.getTime() + 10 * 60 * 1000); // mới qua 10 phút / 15 phút
  assert.equal(isPastDeadline(startedAt, 900, now), false);
});

test("isPastDeadline trả về true khi đã quá giờ + đệm mạng", () => {
  const startedAt = new Date("2026-01-01T00:00:00.000Z");
  const now = new Date(startedAt.getTime() + 900_000 + 6_000); // quá deadline (900s + 5s đệm) 1s
  assert.equal(isPastDeadline(startedAt, 900, now), true);
});

test("isPastDeadline trả về false ngay tại biên đệm mạng (chưa vượt quá)", () => {
  const startedAt = new Date("2026-01-01T00:00:00.000Z");
  const now = new Date(startedAt.getTime() + 900_000 + 5_000); // đúng bằng deadline, chưa vượt
  assert.equal(isPastDeadline(startedAt, 900, now), false);
});

test("scoreQuizAttempt chấm đúng số câu đúng trên tổng số câu, thang điểm 10", () => {
  const questions = [
    { id: "q1", correctIndex: 0 },
    { id: "q2", correctIndex: 1 },
    { id: "q3", correctIndex: 2 },
    { id: "q4", correctIndex: 3 },
  ];
  const answers = { q1: 0, q2: 1, q3: 0, q4: 3 }; // đúng 3/4
  assert.equal(scoreQuizAttempt(questions, answers), 7.5);
});

test("scoreQuizAttempt trả về 0 nếu không trả lời câu nào", () => {
  const questions = [
    { id: "q1", correctIndex: 0 },
    { id: "q2", correctIndex: 1 },
  ];
  assert.equal(scoreQuizAttempt(questions, {}), 0);
});

test("scoreQuizAttempt trả về 0 khi đề không có câu hỏi nào (tránh chia cho 0)", () => {
  assert.equal(scoreQuizAttempt([], {}), 0);
});

test("scoreQuizAttempt bỏ qua đáp án cho câu hỏi không tồn tại trong đề", () => {
  const questions = [{ id: "q1", correctIndex: 0 }];
  const answers = { q1: 0, q_khong_ton_tai: 5 };
  assert.equal(scoreQuizAttempt(questions, answers), 10);
});
