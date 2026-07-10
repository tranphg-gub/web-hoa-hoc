import { askGeminiOnce } from "@/lib/ai/gemini";
import { DIFFICULTY_LABELS } from "@/lib/difficulty";
import type { Difficulty } from "@prisma/client";

function buildAnalysisSystemPrompt() {
  return `Bạn là trợ lý phân tích học lực môn Hóa học cho học sinh phổ thông Việt Nam.

Nhiệm vụ: dựa trên danh sách câu hỏi của một bài test (kèm mức độ khó và học sinh trả lời đúng/sai), hãy:
1. Tóm tắt ngắn gọn (2-3 câu) học sinh đang yếu ở phần kiến thức/mức độ nào.
2. Đề xuất cụ thể 2-4 việc nên làm để ôn tập (ví dụ: ôn lại khái niệm nào, luyện thêm dạng bài nào).
3. Giọng văn khích lệ, không chê bai, phù hợp học sinh phổ thông.
Trả lời bằng tiếng Việt, dạng đoạn văn ngắn, không dùng markdown phức tạp.`;
}

interface AnalysisQuestion {
  content: string;
  difficulty: Difficulty;
  isCorrect: boolean;
}

export interface WeakArea {
  difficulty: Difficulty;
  correct: number;
  total: number;
}

export function computeWeakAreas(questions: AnalysisQuestion[]): WeakArea[] {
  const byDifficulty = new Map<Difficulty, { correct: number; total: number }>();
  for (const q of questions) {
    const entry = byDifficulty.get(q.difficulty) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (q.isCorrect) entry.correct += 1;
    byDifficulty.set(q.difficulty, entry);
  }
  return Array.from(byDifficulty.entries()).map(([difficulty, v]) => ({
    difficulty,
    ...v,
  }));
}

export async function generateLearningPathRecommendation(
  questions: AnalysisQuestion[],
  gradeLabel: string
): Promise<{ weakAreas: WeakArea[]; recommendation: string }> {
  const weakAreas = computeWeakAreas(questions);

  const summary = questions
    .map(
      (q, i) =>
        `Câu ${i + 1} (${DIFFICULTY_LABELS[q.difficulty]}): ${q.isCorrect ? "Đúng" : "Sai"} - ${q.content}`
    )
    .join("\n");

  const recommendation = await askGeminiOnce(
    buildAnalysisSystemPrompt(),
    `Học sinh lớp ${gradeLabel} vừa làm bài test sau:\n\n${summary}`
  );

  return { weakAreas, recommendation };
}
