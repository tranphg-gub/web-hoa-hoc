import { askGeminiOnce } from "@/lib/ai/gemini";
import { DIFFICULTY_LABELS } from "@/lib/difficulty";
import type { Difficulty } from "@prisma/client";

function buildExerciseSystemPrompt() {
  return `Bạn là trợ lý chuyên soạn câu hỏi trắc nghiệm môn Hóa học cho học sinh phổ thông Việt Nam, đúng chương trình SGK Kết nối tri thức (và tham khảo cấu trúc dạng bài trong Sách bài tập Kết nối tri thức).

Yêu cầu bắt buộc khi soạn câu hỏi:
- Nội dung chính xác về mặt hóa học (công thức, phương trình cân bằng đúng, số liệu hợp lý).
- Đúng trọng tâm chương/mức độ được yêu cầu.
- Mỗi câu có đúng 4 phương án (A, B, C, D), chỉ 1 đáp án đúng.
- Có phần giải thích ngắn gọn vì sao đáp án đó đúng.
- Công thức hóa học viết dạng thường (H2O, Fe^3+, CaCO3 -> CaO + CO2) để hệ thống tự hiển thị ký hiệu khoa học.

CHỈ trả lời bằng JSON hợp lệ theo đúng định dạng sau, không thêm markdown code fence, không thêm chữ nào khác ngoài JSON:
[
  { "content": "...", "choices": ["...", "...", "...", "..."], "correctIndex": 0, "explanation": "..." }
]`;
}

export interface GeneratedExercise {
  content: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

function extractJsonArray(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) {
    return trimmed.slice(start, end + 1);
  }
  return trimmed;
}

export async function generateExercises(
  chapterTitle: string,
  grade: number,
  difficulty: Difficulty,
  count: number
): Promise<GeneratedExercise[]> {
  const prompt = `Soạn ${count} câu hỏi trắc nghiệm môn Hóa học lớp ${grade}, thuộc chương "${chapterTitle}", mức độ "${DIFFICULTY_LABELS[difficulty]}".`;

  const raw = await askGeminiOnce(buildExerciseSystemPrompt(), prompt);
  const jsonText = extractJsonArray(raw);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("AI trả về định dạng không hợp lệ, vui lòng thử lại.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("AI trả về định dạng không hợp lệ, vui lòng thử lại.");
  }

  return parsed
    .filter(
      (q): q is GeneratedExercise =>
        typeof q === "object" &&
        q !== null &&
        typeof q.content === "string" &&
        Array.isArray(q.choices) &&
        q.choices.length === 4 &&
        typeof q.correctIndex === "number" &&
        q.correctIndex >= 0 &&
        q.correctIndex <= 3
    )
    .map((q) => ({
      content: q.content,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanation: typeof q.explanation === "string" ? q.explanation : "",
    }));
}
