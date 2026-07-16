import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import "dotenv/config";

const prisma = new PrismaClient();

// MR-AL: script chạy hàng loạt để sinh câu hỏi /practice bằng AI (Gemini), tái hiện đúng logic
// đã có ở lib/ai/exercise-generator.ts + lib/ai/generation-context.ts (không import trực tiếp được
// vì đó là code TypeScript dùng path alias "@/..." chỉ chạy được trong Next.js, còn script .mjs này
// chạy độc lập ngoài framework) — bao gồm: lấy nội dung Document trong chương làm ngữ cảnh, lấy danh
// sách câu đã có để chống trùng, sinh câu hỏi qua Gemini, rồi BẮT BUỘC 1 lượt AI thứ 2 giải "mù" độc
// lập để kiểm chứng đáp án trước khi lưu — CHỈ lưu câu verified=true, câu không khớp bị bỏ qua và ghi
// log riêng để xem lại (không đoán liều, đúng tinh thần "chất lượng hơn số lượng" của dự án).
// Theo yêu cầu người dùng (2026-07-13): "mỗi bài tầm 20-30 câu" — target mỗi chương = số Document
// (bài) trong chương × 25, tối thiểu 25.

const GENERATE_MODEL = process.env.GEMINI_GENERATE_MODEL || process.env.GEMINI_MODEL || "gemini-flash-latest";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const BATCH_SIZE = 8; // số câu mỗi lượt gọi sinh (giữ nhỏ để prompt gọn + dễ verify)
const DELAY_MS = 2500; // giãn cách giữa các lệnh gọi Gemini

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

const DIFFICULTY_LABELS = {
  NHAN_BIET: "Nhận biết",
  THONG_HIEU: "Thông hiểu",
  VAN_DUNG: "Vận dụng",
  VAN_DUNG_CAO: "Vận dụng cao",
};

const GENERATOR_SYSTEM = `Bạn là giáo viên Hóa học giàu kinh nghiệm, chuyên soạn câu hỏi trắc nghiệm cho học sinh phổ thông Việt Nam theo chương trình GDPT 2018 (SGK Kết nối tri thức).

${CHEM_NOTATION_RULES}

Yêu cầu khi soạn:
- CHỈ soạn câu hỏi trong phạm vi NỘI DUNG BÀI HỌC được cung cấp — không lấn sang kiến thức lớp trên hoặc chương khác.
- Không trùng lặp hoặc gần giống các câu hỏi đã có được liệt kê.
- Mỗi câu có đúng 4 phương án, chỉ 1 đáp án đúng; các phương án nhiễu phải hợp lý (lỗi sai học sinh hay mắc), không đặt phương án vô nghĩa.
- Giải thích ngắn gọn vì sao đáp án đúng (và vì sao phương án nhiễu sai nếu cần).`;

const VERIFIER_SYSTEM = `Bạn là giáo viên Hóa học đi chấm đề. Với mỗi câu trắc nghiệm dưới đây, hãy TỰ GIẢI ĐỘC LẬP rồi cho biết chỉ số (0-3) của phương án đúng. Không đoán theo vị trí, chỉ dựa vào kiến thức hóa học. Danh pháp theo SGK GDPT 2018 (tên tiếng Anh: sulfuric acid, sodium hydroxide...).`;

const exerciseSchema = {
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

const verifySchema = {
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function askGeminiJson(systemInstruction, message, schema) {
  const model = genAI.getGenerativeModel({ model: GENERATE_MODEL, systemInstruction });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: message }] }],
    generationConfig: { responseMimeType: "application/json", responseSchema: schema },
  });
  const text = result.response.text();
  return JSON.parse(text);
}

function shuffleWithAnswer(choices, correctIndex) {
  const indexed = choices.map((choice, index) => ({ choice, wasCorrect: index === correctIndex }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return {
    choices: indexed.map((item) => item.choice),
    correctIndex: indexed.findIndex((item) => item.wasCorrect),
  };
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
      const body =
        doc.content.length > perDoc ? `${doc.content.slice(0, perDoc)}\n[...đã cắt bớt phần sau...]` : doc.content;
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
  return contents
    .slice(0, 80)
    .map((content, i) => `${i + 1}. ${content}`)
    .join("\n");
}

async function verifyAnswers(items) {
  if (items.length === 0) return [];
  const prompt = items
    .map((item, i) => `Câu ${i + 1}: ${item.content}\n${item.choices.map((c, ci) => `(${ci}) ${c}`).join("\n")}`)
    .join("\n\n");
  try {
    const result = await askGeminiJson(VERIFIER_SYSTEM, prompt, verifySchema);
    const byIndex = new Map(result.map((r) => [r.i - 1, r.answerIndex]));
    return items.map((_, i) => {
      const answer = byIndex.get(i);
      return typeof answer === "number" && answer >= 0 && answer <= 3 ? answer : null;
    });
  } catch {
    return items.map(() => null);
  }
}

async function generateBatch(chapter, difficulty, count) {
  const [lessonContext, existingList] = await Promise.all([
    buildLessonContext(chapter.id),
    buildExistingQuestionList(chapter.id),
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

  const parsed = await askGeminiJson(GENERATOR_SYSTEM, prompt, exerciseSchema);

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
      return { ...q, verified: false, verifierNote: "Chưa kiểm chứng được (lỗi khi gọi AI lần 2)." };
    }
    if (verdict === q.correctIndex) {
      return { ...q, verified: true, verifierNote: null };
    }
    return {
      ...q,
      verified: false,
      verifierNote: `AI giải lại ra đáp án khác (index ${verdict} thay vì ${q.correctIndex}).`,
    };
  });
}

function normalizeContent(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

async function fillChapter(chapter, targetCount, difficulty, log, seenContents) {
  let current = await prisma.practiceQuestion.count({ where: { chapterId: chapter.id, difficulty } });
  const perDifficultyTarget = Math.ceil(targetCount / 4);
  while (current < perDifficultyTarget) {
    const need = Math.min(BATCH_SIZE, perDifficultyTarget - current);
    console.log(`  [${chapter.title}] ${difficulty}: đang có ${current}/${perDifficultyTarget}, sinh thêm ${need} câu...`);
    let results;
    try {
      results = await generateBatch(chapter, difficulty, need);
    } catch (e) {
      const msg = e?.message || String(e);
      console.error(`  LỖI gọi Gemini: ${msg}`);
      if (/quota|429|RESOURCE_EXHAUSTED/i.test(msg)) {
        throw new Error("QUOTA_EXCEEDED");
      }
      await sleep(DELAY_MS);
      continue;
    }
    const verified = results.filter((r) => r.verified);
    const rejected = results.filter((r) => !r.verified);
    // AI được nhắc tránh trùng qua buildExistingQuestionList, nhưng đó chỉ là gợi ý
    // trong prompt — vẫn cần chặn cứng ở đây phòng khi AI lỡ sinh lại câu gần giống.
    let duplicates = 0;
    for (const q of verified) {
      const key = normalizeContent(q.content);
      if (seenContents.has(key)) {
        duplicates++;
        continue;
      }
      seenContents.add(key);
      await prisma.practiceQuestion.create({
        data: {
          chapterId: chapter.id,
          content: q.content,
          choices: JSON.stringify(q.choices),
          correctIndex: q.correctIndex,
          explanation: q.explanation || null,
          difficulty,
          source: "AI (Gemini, đã tự kiểm chứng độc lập) — MR-AL",
          published: true,
        },
      });
      current++;
    }
    for (const q of rejected) {
      log.push({ chapter: chapter.title, difficulty, content: q.content, verifierNote: q.verifierNote });
    }
    console.log(
      `    -> lưu ${verified.length - duplicates} câu (verified), bỏ ${rejected.length} câu (không khớp/lỗi verify), bỏ ${duplicates} câu trùng.`
    );
    await sleep(DELAY_MS);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const gradeArg = args.find((a) => /^--grade=\d+$/.test(a));
  const targetChapterIds = args.filter((a) => !/^--grade=\d+$/.test(a));

  let where;
  if (gradeArg) {
    where = { grade: Number(gradeArg.split("=")[1]) };
  } else if (targetChapterIds.length > 0) {
    where = { id: { in: targetChapterIds } };
  }

  const chapters = await prisma.chapter.findMany({
    where,
    orderBy: [{ grade: "asc" }, { order: "asc" }],
  });

  const rejectedLog = [];

  for (const chapter of chapters) {
    const docCount = await prisma.document.count({ where: { chapterId: chapter.id } });
    if (docCount === 0) {
      console.log(`[SKIP-NODOC] ${chapter.title} (L${chapter.grade}) chưa có Document — không đủ ngữ cảnh bài học để sinh /practice.`);
      continue;
    }
    const targetCount = Math.max(25, docCount * 25);
    const currentCount = await prisma.practiceQuestion.count({ where: { chapterId: chapter.id } });
    if (currentCount >= targetCount) {
      console.log(`[SKIP] ${chapter.title} (L${chapter.grade}) đã có ${currentCount}/${targetCount} câu.`);
      continue;
    }
    console.log(`\n=== ${chapter.title} (L${chapter.grade}) — hiện có ${currentCount}, mục tiêu ${targetCount} ===`);
    const [existingPractice, existingQuiz] = await Promise.all([
      prisma.practiceQuestion.findMany({ where: { chapterId: chapter.id }, select: { content: true } }),
      prisma.question.findMany({ where: { quiz: { chapterId: chapter.id } }, select: { content: true } }),
    ]);
    const seenContents = new Set(
      [...existingPractice, ...existingQuiz].map((q) => normalizeContent(q.content))
    );
    try {
      for (const difficulty of ["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"]) {
        await fillChapter(chapter, targetCount, difficulty, rejectedLog, seenContents);
      }
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
      console.log(`- [${r.chapter}/${r.difficulty}] ${r.content.slice(0, 80)}... => ${r.verifierNote}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
