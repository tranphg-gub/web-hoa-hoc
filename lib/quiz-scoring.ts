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

export function scoreQuizAttempt(
  questions: { id: string; correctIndex: number }[],
  answers: Record<string, number>
): number {
  if (questions.length === 0) return 0;
  const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  return (correct / questions.length) * 10;
}
