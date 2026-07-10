import { test } from "node:test";
import assert from "node:assert/strict";
import { computeWeakAreas } from "../lib/ai/placement-analysis";

test("computeWeakAreas gộp đúng số câu đúng/tổng theo từng mức độ", () => {
  const result = computeWeakAreas([
    { content: "a", difficulty: "NHAN_BIET", isCorrect: true },
    { content: "b", difficulty: "NHAN_BIET", isCorrect: false },
    { content: "c", difficulty: "VAN_DUNG", isCorrect: true },
  ]);

  const nb = result.find((r) => r.difficulty === "NHAN_BIET");
  const vd = result.find((r) => r.difficulty === "VAN_DUNG");
  assert.deepEqual(nb, { difficulty: "NHAN_BIET", correct: 1, total: 2 });
  assert.deepEqual(vd, { difficulty: "VAN_DUNG", correct: 1, total: 1 });
});

test("computeWeakAreas trả về mảng rỗng khi không có câu hỏi", () => {
  assert.deepEqual(computeWeakAreas([]), []);
});
