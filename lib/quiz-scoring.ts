/** Đệm vài giây cho độ trễ mạng khi học sinh bấm nộp/lưu đáp án đúng lúc gần hết giờ. */
const BUFFER_MS = 5_000;

export function computeDeadline(startedAt: Date, durationSec: number): number {
  return startedAt.getTime() + durationSec * 1000 + BUFFER_MS;
}

export function isPastDeadline(
  startedAt: Date,
  durationSec: number,
  now: Date = new Date()
): boolean {
  return now.getTime() > computeDeadline(startedAt, durationSec);
}

export type Statement = { text: string; correct: boolean };

export type ScorableQuestion = {
  id: string;
  type: "SINGLE_CHOICE" | "TRUE_FALSE_GROUP" | "SHORT_ANSWER";
  correctIndex: number | null;
  statements: Statement[] | null;
  shortAnswer: string | null;
};

/** Đáp án học sinh chọn/nhập cho 1 câu, theo dạng câu hỏi. */
export type QuestionAnswer = number | boolean[] | string;

function normalizeShortAnswer(value: string): string {
  return value.trim().toLowerCase().replace(",", ".").replace(/\s+/g, " ");
}

/**
 * Tỉ lệ điểm đạt được (0 -> 1) cho 1 câu hỏi, theo cấu trúc đề mới CT GDPT 2018:
 * - SINGLE_CHOICE: đúng hết hoặc không (như trắc nghiệm 4 đáp án cũ).
 * - TRUE_FALSE_GROUP: chấm theo từng ý (a/b/c/d), thang điểm không tuyến tính
 *   giống cách Bộ GD&ĐT chấm phần Đúng/Sai trong đề thi thật — đúng 1 ý mới
 *   được rất ít điểm, đúng cả 4 ý mới được trọn điểm câu đó.
 * - SHORT_ANSWER: so khớp chuỗi đã chuẩn hoá (không phân biệt hoa/thường,
 *   khoảng trắng thừa, dấu phẩy/chấm thập phân).
 */
export function scoreQuestion(question: ScorableQuestion, answer: QuestionAnswer | undefined): number {
  if (answer === undefined || answer === null) return 0;

  if (question.type === "TRUE_FALSE_GROUP") {
    if (!question.statements || !Array.isArray(answer)) return 0;
    const correctCount = question.statements.reduce(
      (count, st, i) => count + (answer[i] === st.correct ? 1 : 0),
      0
    );
    switch (correctCount) {
      case 4:
        return 1;
      case 3:
        return 0.5;
      case 2:
        return 0.25;
      case 1:
        return 0.1;
      default:
        return 0;
    }
  }

  if (question.type === "SHORT_ANSWER") {
    if (question.shortAnswer == null || typeof answer !== "string") return 0;
    return normalizeShortAnswer(answer) === normalizeShortAnswer(question.shortAnswer) ? 1 : 0;
  }

  // SINGLE_CHOICE
  return typeof answer === "number" && answer === question.correctIndex ? 1 : 0;
}

export function scoreQuizAttempt(
  questions: ScorableQuestion[],
  answers: Record<string, QuestionAnswer>
): number {
  if (questions.length === 0) return 0;
  const totalFraction = questions.reduce((sum, q) => sum + scoreQuestion(q, answers[q.id]), 0);
  return (totalFraction / questions.length) * 10;
}
