import { SchemaType, type ResponseSchema } from "@google/generative-ai";
import type { Difficulty, QuestionType } from "@prisma/client";
import { askGeminiJson, getGenerationModelName } from "@/lib/ai/gemini";
import {
  buildExistingQuestionList,
  buildLessonContext,
  CHEM_NOTATION_RULES,
  DIFFICULTY_GUIDE,
  shortAnswersMatch,
  shuffleWithAnswer,
} from "@/lib/ai/generation-context";
import { prisma } from "@/lib/prisma";

export interface QuizQuestionDraft {
  type: QuestionType;
  content: string;
  choices: string[] | null;
  correctIndex: number | null;
  statements: { text: string; correct: boolean }[] | null;
  shortAnswer: string | null;
  explanation: string;
  difficulty: Difficulty;
  verified: boolean;
  verifierNote: string | null;
}

export interface DraftCounts {
  singleChoice: number;
  trueFalse: number;
  shortAnswer: number;
}

const VALID_DIFFICULTIES = new Set(["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"]);
const DIFFICULTY_ENUM = ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"];

function baseSystem(partNote: string) {
  return `Bạn là giáo viên Hóa học giàu kinh nghiệm, soạn câu hỏi cho đề kiểm tra theo đúng cấu trúc đề thi mới của Bộ GD&ĐT (CT GDPT 2018, SGK Kết nối tri thức).

${CHEM_NOTATION_RULES}

${DIFFICULTY_GUIDE}

${partNote}

Yêu cầu chung:
- CHỈ soạn trong phạm vi NỘI DUNG BÀI HỌC được cung cấp.
- Không trùng lặp với các câu hỏi đã có được liệt kê.
- Gán mức độ ("difficulty") cho từng câu theo đúng định nghĩa 4 mức ở trên, phân bố hợp lý.
- Giải thích ("explanation") ngắn gọn cách giải/lý do đúng-sai.`;
}

const SC_NOTE = `Dạng cần soạn: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN (Phần I đề thi): mỗi câu 4 phương án, đúng 1 phương án; phương án nhiễu là lỗi sai học sinh hay mắc.`;
const TF_NOTE = `Dạng cần soạn: ĐÚNG/SAI (Phần II đề thi): mỗi câu gồm phần dẫn (content) mô tả 1 tình huống/thí nghiệm/chất cụ thể, kèm ĐÚNG 4 ý nhỏ (statements a-d) — mỗi ý là 1 phát biểu học sinh phải đánh giá Đúng hay Sai. Các ý nên khó dần (ý a dễ, ý d khó). Trộn lẫn ý đúng và ý sai, tránh cả 4 ý cùng đúng hoặc cùng sai.`;
const SA_NOTE = `Dạng cần soạn: TRẢ LỜI NGẮN (Phần III đề thi): câu hỏi tính toán hoặc đếm, đáp án là MỘT CON SỐ (viết dạng "3.5", dùng dấu chấm thập phân) hoặc cụm từ rất ngắn. Đề bài phải ghi rõ đơn vị và yêu cầu làm tròn nếu cần; đáp án không kèm đơn vị.`;

const scSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      choices: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      correctIndex: { type: SchemaType.INTEGER },
      explanation: { type: SchemaType.STRING },
      difficulty: { type: SchemaType.STRING, enum: DIFFICULTY_ENUM, format: "enum" },
    },
    required: ["content", "choices", "correctIndex", "explanation", "difficulty"],
  },
};

const tfSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      statements: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            text: { type: SchemaType.STRING },
            correct: { type: SchemaType.BOOLEAN },
          },
          required: ["text", "correct"],
        },
      },
      explanation: { type: SchemaType.STRING },
      difficulty: { type: SchemaType.STRING, enum: DIFFICULTY_ENUM, format: "enum" },
    },
    required: ["content", "statements", "explanation", "difficulty"],
  },
};

const saSchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      shortAnswer: { type: SchemaType.STRING },
      explanation: { type: SchemaType.STRING },
      difficulty: { type: SchemaType.STRING, enum: DIFFICULTY_ENUM, format: "enum" },
    },
    required: ["content", "shortAnswer", "explanation", "difficulty"],
  },
};

function toDifficulty(value: string): Difficulty {
  return (VALID_DIFFICULTIES.has(value) ? value : "THONG_HIEU") as Difficulty;
}

function buildUserPrompt(
  count: number,
  grade: number,
  chapterTitle: string,
  lessonContext: string,
  existingList: string
) {
  return `Soạn ${count} câu hỏi môn Hóa học lớp ${grade}, chương "${chapterTitle}".

${
  lessonContext
    ? `NỘI DUNG BÀI HỌC TRONG CHƯƠNG (chỉ soạn trong phạm vi này):\n<<<\n${lessonContext}\n>>>`
    : `Chương này chưa có tài liệu trong hệ thống — soạn bám sát SGK Kết nối tri thức lớp ${grade}, chương "${chapterTitle}".`
}
${existingList ? `\nCÁC CÂU HỎI ĐÃ CÓ (không soạn câu trùng hoặc gần giống):\n${existingList}` : ""}`;
}

const tfVerifySchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      i: { type: SchemaType.INTEGER },
      judgments: { type: SchemaType.ARRAY, items: { type: SchemaType.BOOLEAN } },
    },
    required: ["i", "judgments"],
  },
};

const saVerifySchema: ResponseSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      i: { type: SchemaType.INTEGER },
      answer: { type: SchemaType.STRING },
    },
    required: ["i", "answer"],
  },
};

const scVerifySchema: ResponseSchema = {
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

const VERIFIER_SYSTEM = `Bạn là giáo viên Hóa học đi chấm đề, giải độc lập từng câu chỉ dựa vào kiến thức hóa học (danh pháp tiếng Anh theo SGK GDPT 2018). Trả lời đúng theo schema JSON yêu cầu.`;

async function verifySingleChoice(drafts: QuizQuestionDraft[]) {
  const items = drafts.filter((d) => d.type === "SINGLE_CHOICE");
  if (items.length === 0) return;
  const prompt =
    "Với mỗi câu, cho biết chỉ số (0-3) của phương án đúng:\n\n" +
    items
      .map(
        (d, i) =>
          `Câu ${i + 1}: ${d.content}\n${(d.choices ?? [])
            .map((c, ci) => `(${ci}) ${c}`)
            .join("\n")}`
      )
      .join("\n\n");
  try {
    const result = await askGeminiJson<{ i: number; answerIndex: number }[]>(
      VERIFIER_SYSTEM,
      prompt,
      scVerifySchema,
      getGenerationModelName()
    );
    const byIndex = new Map(result.map((r) => [r.i - 1, r.answerIndex]));
    items.forEach((d, i) => {
      const verdict = byIndex.get(i);
      if (typeof verdict !== "number" || verdict < 0 || verdict > 3) return;
      if (verdict === d.correctIndex) {
        d.verified = true;
        d.verifierNote = null;
      } else {
        d.verified = false;
        d.verifierNote = `AI giải lại ra đáp án ${String.fromCharCode(65 + verdict)} (khác ${String.fromCharCode(
          65 + (d.correctIndex ?? 0)
        )}) — kiểm tra kỹ.`;
      }
    });
  } catch {
    // giữ verified=false mặc định
  }
}

async function verifyTrueFalse(drafts: QuizQuestionDraft[]) {
  const items = drafts.filter((d) => d.type === "TRUE_FALSE_GROUP");
  if (items.length === 0) return;
  const prompt =
    "Với mỗi câu, đánh giá lần lượt 4 ý a-d là Đúng (true) hay Sai (false):\n\n" +
    items
      .map(
        (d, i) =>
          `Câu ${i + 1}: ${d.content}\n${(d.statements ?? [])
            .map((s, si) => `${String.fromCharCode(97 + si)}) ${s.text}`)
            .join("\n")}`
      )
      .join("\n\n");
  try {
    const result = await askGeminiJson<{ i: number; judgments: boolean[] }[]>(
      VERIFIER_SYSTEM,
      prompt,
      tfVerifySchema,
      getGenerationModelName()
    );
    const byIndex = new Map(result.map((r) => [r.i - 1, r.judgments]));
    items.forEach((d, i) => {
      const judgments = byIndex.get(i);
      if (!Array.isArray(judgments) || judgments.length !== 4 || !d.statements) return;
      const mismatches = d.statements
        .map((s, si) => (s.correct !== judgments[si] ? String.fromCharCode(97 + si) : null))
        .filter((x): x is string => x !== null);
      if (mismatches.length === 0) {
        d.verified = true;
        d.verifierNote = null;
      } else {
        d.verified = false;
        d.verifierNote = `AI đánh giá lại khác ở ý ${mismatches.join(", ")} — kiểm tra kỹ.`;
      }
    });
  } catch {
    // giữ verified=false mặc định
  }
}

async function verifyShortAnswer(drafts: QuizQuestionDraft[]) {
  const items = drafts.filter((d) => d.type === "SHORT_ANSWER");
  if (items.length === 0) return;
  const prompt =
    "Giải từng câu và trả về đáp án ngắn (số viết dạng '3.5', không kèm đơn vị):\n\n" +
    items.map((d, i) => `Câu ${i + 1}: ${d.content}`).join("\n\n");
  try {
    const result = await askGeminiJson<{ i: number; answer: string }[]>(
      VERIFIER_SYSTEM,
      prompt,
      saVerifySchema,
      getGenerationModelName()
    );
    const byIndex = new Map(result.map((r) => [r.i - 1, r.answer]));
    items.forEach((d, i) => {
      const answer = byIndex.get(i);
      if (typeof answer !== "string" || !d.shortAnswer) return;
      if (shortAnswersMatch(answer, d.shortAnswer)) {
        d.verified = true;
        d.verifierNote = null;
      } else {
        d.verified = false;
        d.verifierNote = `AI giải lại ra "${answer}" (khác "${d.shortAnswer}") — kiểm tra kỹ.`;
      }
    });
  } catch {
    // giữ verified=false mặc định
  }
}

export async function generateQuizQuestionDrafts(
  quizId: string,
  counts: DraftCounts
): Promise<QuizQuestionDraft[]> {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { chapter: true },
  });
  if (!quiz) throw new Error("Không tìm thấy đề kiểm tra.");

  const [lessonContext, existingList] = await Promise.all([
    buildLessonContext(quiz.chapterId),
    buildExistingQuestionList(quiz.chapterId),
  ]);

  const drafts: QuizQuestionDraft[] = [];
  const defaultNote = "Chưa kiểm chứng được (lỗi khi gọi AI lần 2) — hãy tự kiểm tra.";

  if (counts.singleChoice > 0) {
    const parsed = await askGeminiJson<
      { content: string; choices: string[]; correctIndex: number; explanation: string; difficulty: string }[]
    >(
      baseSystem(SC_NOTE),
      buildUserPrompt(counts.singleChoice, quiz.grade, quiz.chapter.title, lessonContext, existingList),
      scSchema,
      getGenerationModelName()
    );
    for (const q of parsed) {
      if (
        typeof q.content !== "string" ||
        q.content.trim() === "" ||
        !Array.isArray(q.choices) ||
        q.choices.length !== 4 ||
        q.choices.some((c) => typeof c !== "string" || c.trim() === "") ||
        typeof q.correctIndex !== "number" ||
        q.correctIndex < 0 ||
        q.correctIndex > 3
      )
        continue;
      const shuffled = shuffleWithAnswer(q.choices, q.correctIndex);
      drafts.push({
        type: "SINGLE_CHOICE",
        content: q.content.trim(),
        choices: shuffled.choices,
        correctIndex: shuffled.correctIndex,
        statements: null,
        shortAnswer: null,
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
        difficulty: toDifficulty(q.difficulty),
        verified: false,
        verifierNote: defaultNote,
      });
    }
  }

  if (counts.trueFalse > 0) {
    const parsed = await askGeminiJson<
      { content: string; statements: { text: string; correct: boolean }[]; explanation: string; difficulty: string }[]
    >(
      baseSystem(TF_NOTE),
      buildUserPrompt(counts.trueFalse, quiz.grade, quiz.chapter.title, lessonContext, existingList),
      tfSchema,
      getGenerationModelName()
    );
    for (const q of parsed) {
      if (
        typeof q.content !== "string" ||
        q.content.trim() === "" ||
        !Array.isArray(q.statements) ||
        q.statements.length !== 4 ||
        q.statements.some((s) => typeof s.text !== "string" || s.text.trim() === "" || typeof s.correct !== "boolean")
      )
        continue;
      drafts.push({
        type: "TRUE_FALSE_GROUP",
        content: q.content.trim(),
        choices: null,
        correctIndex: null,
        statements: q.statements.map((s) => ({ text: s.text.trim(), correct: s.correct })),
        shortAnswer: null,
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
        difficulty: toDifficulty(q.difficulty),
        verified: false,
        verifierNote: defaultNote,
      });
    }
  }

  if (counts.shortAnswer > 0) {
    const parsed = await askGeminiJson<
      { content: string; shortAnswer: string; explanation: string; difficulty: string }[]
    >(
      baseSystem(SA_NOTE),
      buildUserPrompt(counts.shortAnswer, quiz.grade, quiz.chapter.title, lessonContext, existingList),
      saSchema,
      getGenerationModelName()
    );
    for (const q of parsed) {
      if (
        typeof q.content !== "string" ||
        q.content.trim() === "" ||
        typeof q.shortAnswer !== "string" ||
        q.shortAnswer.trim() === ""
      )
        continue;
      drafts.push({
        type: "SHORT_ANSWER",
        content: q.content.trim(),
        choices: null,
        correctIndex: null,
        statements: null,
        shortAnswer: q.shortAnswer.trim(),
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
        difficulty: toDifficulty(q.difficulty),
        verified: false,
        verifierNote: defaultNote,
      });
    }
  }

  await Promise.all([verifySingleChoice(drafts), verifyTrueFalse(drafts), verifyShortAnswer(drafts)]);

  return drafts;
}
