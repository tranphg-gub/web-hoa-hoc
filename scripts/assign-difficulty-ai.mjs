import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();

const BATCH_SIZE = 15;
const DELAY_MS = 4000; // giãn cách giữa các lượt gọi để tránh vượt rate limit free tier
const VALID = new Set(["NHAN_BIET", "THONG_HIEU", "VAN_DUNG", "VAN_DUNG_CAO"]);

const SYSTEM_INSTRUCTION = `Bạn là giáo viên Hóa học THCS/THPT có kinh nghiệm chấm và phân loại câu hỏi trắc nghiệm theo 4 mức độ nhận thức (thang Bloom rút gọn dùng trong đề kiểm tra Việt Nam):
- NHAN_BIET: chỉ cần nhớ lại kiến thức đã học, nhận ra khái niệm/công thức/tính chất trực tiếp, không cần suy luận hay tính toán.
- THONG_HIEU: cần hiểu bản chất, giải thích hiện tượng, so sánh, hoặc tính toán rất đơn giản 1 bước.
- VAN_DUNG: cần áp dụng kiến thức để giải quyết tình huống cụ thể, thường có tính toán nhiều bước hoặc kết hợp từ 2 kiến thức trở lên.
- VAN_DUNG_CAO: tình huống phức tạp, tổng hợp nhiều kiến thức, tính toán nhiều bước, hoặc đòi hỏi phân tích/suy luận sâu.

Với mỗi câu hỏi được đánh số, hãy đọc nội dung câu hỏi, các phương án và đáp án đúng, rồi xếp câu đó vào đúng 1 trong 4 mức trên dựa vào ĐỘ KHÓ THỰC SỰ của câu hỏi (không dựa vào số thứ tự).

Trả lời DUY NHẤT bằng một mảng JSON hợp lệ, không thêm giải thích, không dùng markdown code fence. Ví dụ định dạng: [{"i":1,"d":"NHAN_BIET"},{"i":2,"d":"VAN_DUNG_CAO"}]. Trường "i" là số thứ tự câu trong lượt này, trường "d" là một trong 4 giá trị: NHAN_BIET, THONG_HIEU, VAN_DUNG, VAN_DUNG_CAO.`;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function buildPrompt(batch) {
  const lines = batch.map((q, idx) => {
    const choices = JSON.parse(q.choices);
    const choicesText = choices.map((c, i) => `${String.fromCharCode(65 + i)}. ${c}`).join(" | ");
    const correct = choices[q.correctIndex];
    return `${idx + 1}. Câu hỏi: ${q.content}\nCác phương án: ${choicesText}\nĐáp án đúng: ${correct}`;
  });
  return lines.join("\n\n");
}

async function classifyBatch(model, batch, attempt = 1) {
  const prompt = buildPrompt(batch);
  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    text = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed) || parsed.length !== batch.length) {
      throw new Error(`Số lượng kết quả không khớp: nhận ${Array.isArray(parsed) ? parsed.length : "không phải mảng"}, cần ${batch.length}`);
    }
    return parsed.map((p) => {
      if (!VALID.has(p.d)) throw new Error(`Giá trị mức độ không hợp lệ: ${p.d}`);
      return p.d;
    });
  } catch (e) {
    if (attempt >= 4) throw e;
    const backoff = DELAY_MS * attempt * 2;
    console.log(`  Lỗi (lần ${attempt}): ${e.message}. Thử lại sau ${backoff}ms...`);
    await wait(backoff);
    return classifyBatch(model, batch, attempt + 1);
  }
}

async function main() {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.length < 10) {
    console.error("Chưa cấu hình GEMINI_API_KEY thật trong .env — dừng lại.");
    process.exit(1);
  }
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-pro",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const questions = await prisma.question.findMany({
    select: { id: true, content: true, choices: true, correctIndex: true },
    orderBy: [{ quizId: "asc" }, { order: "asc" }],
  });
  console.log(`Tổng số câu hỏi cần phân loại: ${questions.length}`);

  const batches = chunk(questions, BATCH_SIZE);
  let done = 0;
  const counts = { NHAN_BIET: 0, THONG_HIEU: 0, VAN_DUNG: 0, VAN_DUNG_CAO: 0 };

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    const difficulties = await classifyBatch(model, batch);
    for (let i = 0; i < batch.length; i++) {
      await prisma.question.update({
        where: { id: batch[i].id },
        data: { difficulty: difficulties[i] },
      });
      counts[difficulties[i]]++;
    }
    done += batch.length;
    console.log(`Lượt ${b + 1}/${batches.length} — đã xử lý ${done}/${questions.length} câu`);
    if (b < batches.length - 1) await wait(DELAY_MS);
  }

  console.log("Hoàn tất. Phân bố mức độ:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
