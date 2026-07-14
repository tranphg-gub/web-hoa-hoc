import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import "dotenv/config";

const prisma = new PrismaClient();

// MR-AL: bản song sinh của ai-batch-generate-practice.mjs nhưng nhắm vào câu hỏi ĐỀ KIỂM TRA
// (model Question trong Quiz), tái hiện đúng logic lib/ai/quiz-question-generator.ts (3 dạng câu
// theo cấu trúc đề thi mới GDPT 2018: SINGLE_CHOICE / TRUE_FALSE_GROUP / SHORT_ANSWER), không import
// trực tiếp được vì đó là TS dùng path alias chỉ chạy trong Next.js.
//
// Mục tiêu số câu mỗi đề (theo yêu cầu người dùng 2026-07-14 "40-50 câu"), CHIA THEO LOẠI ĐỀ:
// - Đề "Kiểm tra: <Chương>" (đề ôn theo chương, không theo cấu trúc thi thật): mục tiêu 45 câu,
//   toàn SINGLE_CHOICE (giữ đúng phong cách đã có sẵn của các đề này).
// - Đề "Đề dự đoán/minh họa TN THPT" (mô phỏng đề thi thật): GIỮ NGUYÊN cấu trúc thật của Bộ GD&ĐT
//   (18 SINGLE_CHOICE + 4 TRUE_FALSE_GROUP + 6 SHORT_ANSWER = 28 câu) — KHÔNG kéo lên 40-50 vì sẽ làm
//   sai lệch cấu trúc đề thi thật, phản tác dụng luyện thi. Xem giải trình trong PROJECT_STATUS.md.
//
// Cũng như bản practice: BẮT BUỘC verify độc lập (giải mù) trước khi lưu, chỉ lưu câu verified=true.

const GENERATE_MODEL = process.env.GEMINI_GENERATE_MODEL || process.env.GEMINI_MODEL || "gemini-flash-latest";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const DELAY_MS = 2500;
const MOCK_EXAM_TITLE_RE = /^Đề (dự đoán|minh họa)/i;

const DIFFICULTY_GUIDE = `Định nghĩa 4 mức độ nhận thức (thang dùng trong đề kiểm tra Việt Nam):
- NHAN_BIET (Nhận biết): chỉ cần nhớ lại kiến thức đã học, nhận ra khái niệm/công thức/tính chất trực tiếp, không cần suy luận hay tính toán.
- THONG_HIEU (Thông hiểu): cần hiểu bản chất, giải thích hiện tượng, so sánh, hoặc tính toán rất đơn giản 1 bước.
- VAN_DUNG (Vận dụng): áp dụng kiến thức vào tình huống cụ thể, tính toán nhiều bước hoặc kết hợp từ 2 kiến thức trở lên.
- VAN_DUNG_CAO (Vận dụng cao): tình huống phức tạp, tổng hợp nhiều kiến thức, tính toán nhiều bước hoặc đòi hỏi phân tích/suy luận sâu.`;

const CHEM_NOTATION_RULES = `Quy tắc trình bày bắt buộc:
- Nội dung chính xác về mặt hóa học: công thức đúng, phương trình PHẢI cân bằng, số liệu hợp lý.
- Danh pháp theo SGK chương trình GDPT 2018 (Kết nối tri thức): dùng tên tiếng Anh chuẩn IUPAC như sulfuric acid, sodium hydroxide, iron(III) oxide, ethanol... KHÔNG dùng danh pháp cũ (axit sunfuric, natri hiđroxit, sắt(III) oxit).
- Công thức hóa học viết dạng thường để hệ thống tự hiển thị ký hiệu khoa học: H2O, Fe^3+, CaCO3 -> CaO + CO2. Điện tích ion độ lớn từ 2 trở lên PHẢI có dấu ^ (Fe^3+, không viết Fe3+ trần).
- Ngôn ngữ đơn giản, phù hợp lứa tuổi học sinh.`;

function baseSystem(partNote) {
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

const SC_NOTE = `Dạng cần soạn: TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN: mỗi câu 4 phương án, đúng 1 phương án; phương án nhiễu là lỗi sai học sinh hay mắc.`;
const TF_NOTE = `Dạng cần soạn: ĐÚNG/SAI: mỗi câu gồm phần dẫn (content) mô tả 1 tình huống/thí nghiệm/chất cụ thể, kèm ĐÚNG 4 ý nhỏ (statements a-d) — mỗi ý là 1 phát biểu học sinh phải đánh giá Đúng hay Sai. Các ý nên khó dần (ý a dễ, ý d khó). Trộn lẫn ý đúng và ý sai, tránh cả 4 ý cùng đúng hoặc cùng sai.`;
const SA_NOTE = `Dạng cần soạn: TRẢ LỜI NGẮN: câu hỏi tính toán hoặc đếm, đáp án là MỘT CON SỐ (viết dạng "3.5", dùng dấu chấm thập phân) hoặc cụm từ rất ngắn. Đề bài phải ghi rõ đơn vị và yêu cầu làm tròn nếu cần; đáp án không kèm đơn vị.`;

const scSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      choices: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
      correctIndex: { type: SchemaType.INTEGER },
      explanation: { type: SchemaType.STRING },
      difficulty: { type: SchemaType.STRING, enum: ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"], format: "enum" },
    },
    required: ["content", "choices", "correctIndex", "explanation", "difficulty"],
  },
};

const tfSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      statements: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: { text: { type: SchemaType.STRING }, correct: { type: SchemaType.BOOLEAN } },
          required: ["text", "correct"],
        },
      },
      explanation: { type: SchemaType.STRING },
      difficulty: { type: SchemaType.STRING, enum: ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"], format: "enum" },
    },
    required: ["content", "statements", "explanation", "difficulty"],
  },
};

const saSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      content: { type: SchemaType.STRING },
      shortAnswer: { type: SchemaType.STRING },
      explanation: { type: SchemaType.STRING },
      difficulty: { type: SchemaType.STRING, enum: ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"], format: "enum" },
    },
    required: ["content", "shortAnswer", "explanation", "difficulty"],
  },
};

const scVerifySchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: { i: { type: SchemaType.INTEGER }, answerIndex: { type: SchemaType.INTEGER } },
    required: ["i", "answerIndex"],
  },
};
const tfVerifySchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: { i: { type: SchemaType.INTEGER }, judgments: { type: SchemaType.ARRAY, items: { type: SchemaType.BOOLEAN } } },
    required: ["i", "judgments"],
  },
};
const saVerifySchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: { i: { type: SchemaType.INTEGER }, answer: { type: SchemaType.STRING } },
    required: ["i", "answer"],
  },
};

const VERIFIER_SYSTEM = `Bạn là giáo viên Hóa học đi chấm đề, giải độc lập từng câu chỉ dựa vào kiến thức hóa học (danh pháp tiếng Anh theo SGK GDPT 2018). Trả lời đúng theo schema JSON yêu cầu.`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function askGeminiJson(systemInstruction, message, schema) {
  const model = genAI.getGenerativeModel({ model: GENERATE_MODEL, systemInstruction });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: message }] }],
    generationConfig: { responseMimeType: "application/json", responseSchema: schema },
  });
  return JSON.parse(result.response.text());
}

function shuffleWithAnswer(choices, correctIndex) {
  const indexed = choices.map((choice, index) => ({ choice, wasCorrect: index === correctIndex }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return { choices: indexed.map((item) => item.choice), correctIndex: indexed.findIndex((item) => item.wasCorrect) };
}

function normalizeShortAnswer(value) {
  return value.trim().toLowerCase().replace(",", ".").replace(/\s+/g, " ");
}
function shortAnswersMatch(a, b) {
  const na = normalizeShortAnswer(a);
  const nb = normalizeShortAnswer(b);
  if (na === nb) return true;
  const numA = Number(na);
  const numB = Number(nb);
  if (!Number.isNaN(numA) && !Number.isNaN(numB)) return Math.abs(numA - numB) < 1e-6;
  return false;
}

async function buildLessonContext(chapterId) {
  const documents = await prisma.document.findMany({
    where: { chapterId },
    orderBy: { order: "asc" },
    select: { title: true, content: true },
  });
  if (documents.length === 0) return "";
  const LESSON_BUDGET_CHARS = 18000;
  const perDoc = Math.max(1200, Math.floor(LESSON_BUDGET_CHARS / documents.length));
  return documents
    .map((doc) => {
      const body = doc.content.length > perDoc ? `${doc.content.slice(0, perDoc)}\n[...đã cắt bớt phần sau...]` : doc.content;
      return `### ${doc.title}\n${body}`;
    })
    .join("\n\n");
}

async function buildExistingQuestionList(chapterId) {
  const [practiceQuestions, quizQuestions] = await Promise.all([
    prisma.practiceQuestion.findMany({ where: { chapterId }, select: { content: true } }),
    prisma.question.findMany({ where: { quiz: { chapterId } }, select: { content: true } }),
  ]);
  const contents = [...practiceQuestions, ...quizQuestions].map((q) => q.content.replace(/\s+/g, " ").trim().slice(0, 140));
  if (contents.length === 0) return "";
  return contents.slice(0, 80).map((content, i) => `${i + 1}. ${content}`).join("\n");
}

function buildUserPrompt(count, grade, chapterTitle, lessonContext, existingList) {
  return `Soạn ${count} câu hỏi môn Hóa học lớp ${grade}, chương "${chapterTitle}".

${
  lessonContext
    ? `NỘI DUNG BÀI HỌC TRONG CHƯƠNG (chỉ soạn trong phạm vi này):\n<<<\n${lessonContext}\n>>>`
    : `Chương này chưa có tài liệu trong hệ thống — soạn bám sát SGK Kết nối tri thức lớp ${grade}, chương "${chapterTitle}".`
}
${existingList ? `\nCÁC CÂU HỎI ĐÃ CÓ (không soạn câu trùng hoặc gần giống):\n${existingList}` : ""}`;
}

async function verifySingleChoice(drafts) {
  const items = drafts.filter((d) => d.type === "SINGLE_CHOICE");
  if (items.length === 0) return;
  const prompt =
    "Với mỗi câu, cho biết chỉ số (0-3) của phương án đúng:\n\n" +
    items.map((d, i) => `Câu ${i + 1}: ${d.content}\n${d.choices.map((c, ci) => `(${ci}) ${c}`).join("\n")}`).join("\n\n");
  try {
    const result = await askGeminiJson(VERIFIER_SYSTEM, prompt, scVerifySchema);
    const byIndex = new Map(result.map((r) => [r.i - 1, r.answerIndex]));
    items.forEach((d, i) => {
      const verdict = byIndex.get(i);
      if (typeof verdict !== "number" || verdict < 0 || verdict > 3) return;
      if (verdict === d.correctIndex) {
        d.verified = true;
      } else {
        d.verified = false;
        d.verifierNote = `AI giải lại ra đáp án khác (index ${verdict} thay vì ${d.correctIndex}).`;
      }
    });
  } catch {
    // giữ verified=false mặc định
  }
}

async function verifyTrueFalse(drafts) {
  const items = drafts.filter((d) => d.type === "TRUE_FALSE_GROUP");
  if (items.length === 0) return;
  const prompt =
    "Với mỗi câu, đánh giá lần lượt 4 ý a-d là Đúng (true) hay Sai (false):\n\n" +
    items
      .map((d, i) => `Câu ${i + 1}: ${d.content}\n${d.statements.map((s, si) => `${String.fromCharCode(97 + si)}) ${s.text}`).join("\n")}`)
      .join("\n\n");
  try {
    const result = await askGeminiJson(VERIFIER_SYSTEM, prompt, tfVerifySchema);
    const byIndex = new Map(result.map((r) => [r.i - 1, r.judgments]));
    items.forEach((d, i) => {
      const judgments = byIndex.get(i);
      if (!Array.isArray(judgments) || judgments.length !== 4) return;
      const mismatches = d.statements
        .map((s, si) => (s.correct !== judgments[si] ? String.fromCharCode(97 + si) : null))
        .filter((x) => x !== null);
      if (mismatches.length === 0) {
        d.verified = true;
      } else {
        d.verified = false;
        d.verifierNote = `AI đánh giá lại khác ở ý ${mismatches.join(", ")}.`;
      }
    });
  } catch {
    // giữ verified=false mặc định
  }
}

async function verifyShortAnswer(drafts) {
  const items = drafts.filter((d) => d.type === "SHORT_ANSWER");
  if (items.length === 0) return;
  const prompt = "Giải từng câu và trả về đáp án ngắn (số viết dạng '3.5', không kèm đơn vị):\n\n" + items.map((d, i) => `Câu ${i + 1}: ${d.content}`).join("\n\n");
  try {
    const result = await askGeminiJson(VERIFIER_SYSTEM, prompt, saVerifySchema);
    const byIndex = new Map(result.map((r) => [r.i - 1, r.answer]));
    items.forEach((d, i) => {
      const answer = byIndex.get(i);
      if (typeof answer !== "string") return;
      if (shortAnswersMatch(answer, d.shortAnswer)) {
        d.verified = true;
      } else {
        d.verified = false;
        d.verifierNote = `AI giải lại ra "${answer}" (khác "${d.shortAnswer}").`;
      }
    });
  } catch {
    // giữ verified=false mặc định
  }
}

// Sinh + verify 1 lô câu hỏi cùng LOẠI (SC/TF/SA) cho 1 đề — mirror generateQuizQuestionDrafts
// nhưng tách riêng từng loại để có thể top-up từng phần thiếu mà không sinh dư loại đã đủ.
async function generateTypeBatch(quiz, type, count) {
  const [lessonContext, existingList] = await Promise.all([
    buildLessonContext(quiz.chapterId),
    buildExistingQuestionList(quiz.chapterId),
  ]);
  const prompt = buildUserPrompt(count, quiz.grade, quiz.chapterTitle, lessonContext, existingList);

  const drafts = [];
  if (type === "SINGLE_CHOICE") {
    const parsed = await askGeminiJson(baseSystem(SC_NOTE), prompt, scSchema);
    for (const q of parsed) {
      if (
        typeof q.content !== "string" || q.content.trim() === "" ||
        !Array.isArray(q.choices) || q.choices.length !== 4 ||
        q.choices.some((c) => typeof c !== "string" || c.trim() === "") ||
        typeof q.correctIndex !== "number" || q.correctIndex < 0 || q.correctIndex > 3
      ) continue;
      const shuffled = shuffleWithAnswer(q.choices, q.correctIndex);
      drafts.push({
        type: "SINGLE_CHOICE",
        content: q.content.trim(),
        choices: shuffled.choices,
        correctIndex: shuffled.correctIndex,
        statements: null,
        shortAnswer: null,
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
        difficulty: ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"].includes(q.difficulty) ? q.difficulty : "THONG_HIEU",
        verified: false,
        verifierNote: "Chưa kiểm chứng được (lỗi khi gọi AI lần 2).",
      });
    }
  } else if (type === "TRUE_FALSE_GROUP") {
    const parsed = await askGeminiJson(baseSystem(TF_NOTE), prompt, tfSchema);
    for (const q of parsed) {
      if (
        typeof q.content !== "string" || q.content.trim() === "" ||
        !Array.isArray(q.statements) || q.statements.length !== 4 ||
        q.statements.some((s) => typeof s.text !== "string" || s.text.trim() === "" || typeof s.correct !== "boolean")
      ) continue;
      drafts.push({
        type: "TRUE_FALSE_GROUP",
        content: q.content.trim(),
        choices: null,
        correctIndex: null,
        statements: q.statements.map((s) => ({ text: s.text.trim(), correct: s.correct })),
        shortAnswer: null,
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
        difficulty: ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"].includes(q.difficulty) ? q.difficulty : "THONG_HIEU",
        verified: false,
        verifierNote: "Chưa kiểm chứng được (lỗi khi gọi AI lần 2).",
      });
    }
  } else {
    const parsed = await askGeminiJson(baseSystem(SA_NOTE), prompt, saSchema);
    for (const q of parsed) {
      if (typeof q.content !== "string" || q.content.trim() === "" || typeof q.shortAnswer !== "string" || q.shortAnswer.trim() === "") continue;
      drafts.push({
        type: "SHORT_ANSWER",
        content: q.content.trim(),
        choices: null,
        correctIndex: null,
        statements: null,
        shortAnswer: q.shortAnswer.trim(),
        explanation: typeof q.explanation === "string" ? q.explanation.trim() : "",
        difficulty: ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"].includes(q.difficulty) ? q.difficulty : "THONG_HIEU",
        verified: false,
        verifierNote: "Chưa kiểm chứng được (lỗi khi gọi AI lần 2).",
      });
    }
  }

  if (type === "SINGLE_CHOICE") await verifySingleChoice(drafts);
  else if (type === "TRUE_FALSE_GROUP") await verifyTrueFalse(drafts);
  else await verifyShortAnswer(drafts);

  return drafts;
}

function targetCountsFor(title) {
  if (MOCK_EXAM_TITLE_RE.test(title)) {
    return { SINGLE_CHOICE: 18, TRUE_FALSE_GROUP: 4, SHORT_ANSWER: 6 };
  }
  return { SINGLE_CHOICE: 45, TRUE_FALSE_GROUP: 0, SHORT_ANSWER: 0 };
}

async function fillQuiz(quiz, log) {
  const targets = targetCountsFor(quiz.title);
  const existing = await prisma.question.findMany({ where: { quizId: quiz.id }, select: { type: true, order: true } });
  let nextOrder = existing.reduce((max, q) => Math.max(max, q.order), 0) + 1;
  const currentByType = { SINGLE_CHOICE: 0, TRUE_FALSE_GROUP: 0, SHORT_ANSWER: 0 };
  for (const q of existing) currentByType[q.type] = (currentByType[q.type] ?? 0) + 1;

  for (const type of ["SINGLE_CHOICE", "TRUE_FALSE_GROUP", "SHORT_ANSWER"]) {
    const target = targets[type];
    if (target === 0) continue;
    const batchSize = type === "SINGLE_CHOICE" ? 6 : type === "TRUE_FALSE_GROUP" ? 3 : 4;
    while (currentByType[type] < target) {
      const need = Math.min(batchSize, target - currentByType[type]);
      console.log(`  [${quiz.title}] ${type}: đang có ${currentByType[type]}/${target}, sinh thêm ${need} câu...`);
      let results;
      try {
        results = await generateTypeBatch(quiz, type, need);
      } catch (e) {
        const msg = e?.message || String(e);
        console.error(`  LỖI gọi Gemini: ${msg}`);
        if (/quota|429|RESOURCE_EXHAUSTED/i.test(msg)) throw new Error("QUOTA_EXCEEDED");
        await sleep(DELAY_MS);
        continue;
      }
      const verified = results.filter((r) => r.verified);
      const rejected = results.filter((r) => !r.verified);
      for (const q of verified) {
        await prisma.question.create({
          data: {
            quizId: quiz.id,
            type: q.type,
            content: q.content,
            choices: q.choices ? JSON.stringify(q.choices) : null,
            correctIndex: q.correctIndex,
            statements: q.statements ? JSON.stringify(q.statements) : null,
            shortAnswer: q.shortAnswer,
            explanation: q.explanation || null,
            order: nextOrder++,
            difficulty: q.difficulty,
          },
        });
      }
      for (const q of rejected) {
        log.push({ quiz: quiz.title, type, content: q.content, verifierNote: q.verifierNote });
      }
      currentByType[type] += verified.length;
      console.log(`    -> lưu ${verified.length} câu (verified), bỏ ${rejected.length} câu (không khớp/lỗi verify).`);
      await sleep(DELAY_MS);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const gradeArg = args.find((a) => /^--grade=\d+$/.test(a));
  const quizIds = args.filter((a) => !/^--grade=\d+$/.test(a));

  let where;
  if (gradeArg) {
    where = { grade: Number(gradeArg.split("=")[1]) };
  } else if (quizIds.length > 0) {
    where = { id: { in: quizIds } };
  }

  const quizzes = await prisma.quiz.findMany({
    where,
    include: { chapter: { select: { title: true } } },
    orderBy: [{ grade: "asc" }, { createdAt: "asc" }],
  });

  const rejectedLog = [];

  for (const quiz of quizzes) {
    const targets = targetCountsFor(quiz.title);
    const targetTotal = targets.SINGLE_CHOICE + targets.TRUE_FALSE_GROUP + targets.SHORT_ANSWER;
    const currentTotal = await prisma.question.count({ where: { quizId: quiz.id } });
    if (currentTotal >= targetTotal) {
      console.log(`[SKIP] ${quiz.title} (L${quiz.grade}) đã có ${currentTotal}/${targetTotal} câu.`);
      continue;
    }
    console.log(`\n=== ${quiz.title} (L${quiz.grade}) — hiện có ${currentTotal}, mục tiêu ${targetTotal} ===`);
    const quizWithChapterTitle = { ...quiz, chapterTitle: quiz.chapter.title };
    try {
      await fillQuiz(quizWithChapterTitle, rejectedLog);
    } catch (e) {
      if (e.message === "QUOTA_EXCEEDED") {
        console.error("\n*** HẾT QUOTA GEMINI — dừng script, có thể chạy lại sau (idempotent, sẽ tiếp tục từ chỗ dở). ***");
        break;
      }
      console.error("Lỗi không mong đợi:", e);
      break;
    }
  }

  if (rejectedLog.length > 0) {
    console.log(`\n=== ${rejectedLog.length} câu bị AI verify từ chối (không lưu), xem lại nếu cần: ===`);
    for (const r of rejectedLog.slice(0, 20)) {
      console.log(`- [${r.quiz}/${r.type}] ${r.content.slice(0, 80)}... => ${r.verifierNote}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
