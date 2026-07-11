import { SchemaType, type ResponseSchema } from "@google/generative-ai";
import type { Difficulty } from "@prisma/client";
import { askGeminiJson, getGenerationModelName } from "@/lib/ai/gemini";
import {
  buildExistingQuestionList,
  buildLessonContext,
  CHEM_NOTATION_RULES,
  DIFFICULTY_GUIDE,
  shuffleWithAnswer,
} from "@/lib/ai/generation-context";
import { DIFFICULTY_LABELS } from "@/lib/difficulty";
import { prisma } from "@/lib/prisma";

export interface GeneratedExercise {
  content: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  verified: boolean;
  verifierNote: string | null;
}

const GENERATOR_SYSTEM = `Bạn là giáo viên Hóa học giàu kinh nghiệm, chuyên soạn câu hỏi trắc nghiệm cho học sinh phổ thông Việt Nam theo chương trình GDPT 2018 (SGK Kết nối tri thức).

${CHEM_NOTATION_RULES}

Yêu cầu khi soạn:
- CHỈ soạn câu hỏi trong phạm vi NỘI DUNG BÀI HỌC được cung cấp — không lấn sang kiến thức lớp trên hoặc chương khác.
- Không trùng lặp hoặc gần giống các câu hỏi đã có được liệt kê.
- Mỗi câu có đúng 4 phương án, chỉ 1 đáp án đúng; các phương án nhiễu phải hợp lý (lỗi sai học sinh hay mắc), không đặt phương án vô nghĩa.
- Giải thích ngắn gọn vì sao đáp án đúng (và vì sao phương án nhiễu sai nếu cần).`;

const exerciseSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      choices: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      correctIndex: { type: SchemaType.INTEGER },
      explanation: { type: SchemaType.STRING },
    },
    required: ["content", "choices", "correctIndex", "explanation"],
  },
};

const VERIFIER_SYSTEM = `Bạn là giáo viên Hóa học đi chấm đề. Với mỗi câu trắc nghiệm dưới đây, hãy TỰ GIẢI ĐỘC LẬP rồi cho biết chỉ số (0-3) của phương án đúng. Không đoán theo vị trí, chỉ dựa vào kiến thức hóa học. Danh pháp theo SGK GDPT 2018 (tên tiếng Anh: sulfuric acid, sodium hydroxide...).`;

const verifySchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      i: { type: SchemaType.INTEGER },
      answerIndex: { type: SchemaType.INTEGER },
    },
    required: ["i", "answerIndex"],
  },
};

// Lượt AI thứ 2 giải "mù" (không biết đáp án đề xuất) rồi đối chiếu — bắt phần lớn câu sai đáp án.
async function verifyAnswers(
  items: { content: string; choices: string[] }[]
): Promise<(number | null)[]> {
  if (items.length === 0) return [];
  const prompt = items
    .map(
      (item, i) =>
        `Câu ${i + 1}: ${item.content}\n${item.choices
          .map((c, ci) => `(${ci}) ${c}`)
          .join("\n")}`
    )
    .join("\n\n");
  try {
    const result = await askGeminiJson<{ i: number; answerIndex: number }[]>(
      VERIFIER_SYSTEM,
      prompt,
      verifySchema,
      getGenerationModelName()
    );
    const byIndex = new Map(result.map((r) => [r.i - 1, r.answerIndex]));
    return items.map((_, i) => {
      const answer = byIndex.get(i);
      return typeof answer === "number" && answer >= 0 && answer <= 3 ? answer : null;
    });
  } catch {
    return items.map(() => null);
  }
}

export async function generateExercises(
  chapterId: string,
  difficulty: Difficulty,
  count: number
): Promise<GeneratedExercise[]> {
  const chapter = await prisma.chapter.findUnique({ where: { id: chapterId } });
  if (!chapter) throw new Error("Không tìm thấy chương.");

  const [lessonContext, existingList] = await Promise.all([
    buildLessonContext(chapterId),
    buildExistingQuestionList(chapterId),
  ]);

  const prompt = `Soạn ${count} câu hỏi trắc nghiệm môn Hóa học lớp ${chapter.grade}, chương "${chapter.title}", mức độ "${DIFFICULTY_LABELS[difficulty]}".

${DIFFICULTY_GUIDE}

Mọi câu phải đúng mức độ "${DIFFICULTY_LABELS[difficulty]}".

${
  lessonContext
    ? `NỘI DUNG BÀI HỌC TRONG CHƯƠNG (chỉ soạn trong phạm vi này):\n<<<\n${lessonContext}\n>>>`
    : `Chương này chưa có tài liệu trong hệ thống — soạn bám sát SGK Kết nối tri thức lớp ${chapter.grade}, chương "${chapter.title}".`
}
${existingList ? `\nCÁC CÂU HỎI ĐÃ CÓ (tuyệt đối không soạn câu trùng hoặc gần giống):\n${existingList}` : ""}`;

  const parsed = await askGeminiJson<
    { content: string; choices: string[]; correctIndex: number; explanation: string }[]
  >(GENERATOR_SYSTEM, prompt, exerciseSchema, getGenerationModelName());

  const valid = parsed
    .filter(
      (q) =>
        typeof q.content === "string" &&
        q.content.trim() !== "" &&
        Array.isArray(q.choices) &&
        q.choices.length === 4 &&
        q.choices.every((c) => typeof c === "string" && c.trim() !== "") &&
        typeof q.correctIndex === "number" &&
        q.correctIndex >= 0 &&
        q.correctIndex <= 3
    )
    .map((q) => {
      const shuffled = shuffleWithAnswer(q.choices, q.correctIndex);
      return {
        content: q.content.trim(),
        choices: shuffled.choices,
        correctIndex: shuffled.correctIndex,
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
      };
    });

  const verdicts = await verifyAnswers(valid);

  return valid.map((q, i) => {
    const verdict = verdicts[i];
    if (verdict === null) {
      return { ...q, verified: false, verifierNote: "Chưa kiểm chứng được (lỗi khi gọi AI lần 2) — hãy tự kiểm tra." };
    }
    if (verdict === q.correctIndex) {
      return { ...q, verified: true, verifierNote: null };
    }
    return {
      ...q,
      verified: false,
      verifierNote: `AI giải lại ra đáp án ${String.fromCharCode(65 + verdict)} (khác đáp án đề xuất ${String.fromCharCode(65 + q.correctIndex)}) — kiểm tra kỹ trước khi lưu.`,
    };
  });
}
