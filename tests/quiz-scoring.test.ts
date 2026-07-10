import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeDeadline,
  isPastDeadline,
  scoreQuizAttempt,
  scoreQuestion,
  type ScorableQuestion,
} from "../lib/quiz-scoring";

function singleChoice(id: string, correctIndex: number): ScorableQuestion {
  return { id, type: "SINGLE_CHOICE", correctIndex, statements: null, shortAnswer: null };
}

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
    singleChoice("q1", 0),
    singleChoice("q2", 1),
    singleChoice("q3", 2),
    singleChoice("q4", 3),
  ];
  const answers = { q1: 0, q2: 1, q3: 0, q4: 3 }; // đúng 3/4
  assert.equal(scoreQuizAttempt(questions, answers), 7.5);
});

test("scoreQuizAttempt trả về 0 nếu không trả lời câu nào", () => {
  const questions = [singleChoice("q1", 0), singleChoice("q2", 1)];
  assert.equal(scoreQuizAttempt(questions, {}), 0);
});

test("scoreQuizAttempt trả về 0 khi đề không có câu hỏi nào (tránh chia cho 0)", () => {
  assert.equal(scoreQuizAttempt([], {}), 0);
});

test("scoreQuizAttempt bỏ qua đáp án cho câu hỏi không tồn tại trong đề", () => {
  const questions = [singleChoice("q1", 0)];
  const answers = { q1: 0, q_khong_ton_tai: 5 };
  assert.equal(scoreQuizAttempt(questions, answers), 10);
});

test("scoreQuestion (TRUE_FALSE_GROUP) chấm theo thang không tuyến tính 0/0,1/0,25/0,5/1", () => {
  const q: ScorableQuestion = {
    id: "q1",
    type: "TRUE_FALSE_GROUP",
    correctIndex: null,
    shortAnswer: null,
    statements: [
      { text: "a", correct: true },
      { text: "b", correct: false },
      { text: "c", correct: true },
      { text: "d", correct: false },
    ],
  };
  assert.equal(scoreQuestion(q, [true, false, true, false]), 1); // đúng cả 4 ý
  assert.equal(scoreQuestion(q, [true, false, true, true]), 0.5); // đúng 3/4
  assert.equal(scoreQuestion(q, [true, false, false, true]), 0.25); // đúng 2/4
  assert.equal(scoreQuestion(q, [true, true, false, true]), 0.1); // đúng 1/4
  assert.equal(scoreQuestion(q, [false, true, false, true]), 0); // đúng 0/4
});

test("scoreQuestion (SHORT_ANSWER) so khớp không phân biệt hoa/thường, khoảng trắng, dấu thập phân", () => {
  const q: ScorableQuestion = {
    id: "q1",
    type: "SHORT_ANSWER",
    correctIndex: null,
    statements: null,
    shortAnswer: "3.5",
  };
  assert.equal(scoreQuestion(q, "3.5"), 1);
  assert.equal(scoreQuestion(q, "3,5"), 1);
  assert.equal(scoreQuestion(q, " 3.5 "), 1);
  assert.equal(scoreQuestion(q, "3.6"), 0);
});

test("scoreQuiz Attempt tính điểm trung bình khi đề trộn cả 3 dạng câu hỏi", () => {
  const questions: ScorableQuestion[] = [
    singleChoice("q1", 0), // đúng -> 1
    {
      id: "q2",
      type: "TRUE_FALSE_GROUP",
      correctIndex: null,
      shortAnswer: null,
      statements: [
        { text: "a", correct: true },
        { text: "b", correct: true },
        { text: "c", correct: false },
        { text: "d", correct: false },
      ],
    }, // đúng 2/4 ý -> 0,25
    { id: "q3", type: "SHORT_ANSWER", correctIndex: null, statements: null, shortAnswer: "12" }, // đúng -> 1
  ];
  const answers = { q1: 0, q2: [true, false, false, true], q3: "12" }; // q2 đúng 2/4 ý (a, c)
  // (1 + 0.25 + 1) / 3 * 10 = 7.5
  assert.equal(scoreQuizAttempt(questions, answers), 7.5);
});
