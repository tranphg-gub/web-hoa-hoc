import { prisma } from "@/lib/prisma";

// Ngân sách ký tự đưa vào prompt — flash context lớn nhưng giữ gọn để nhanh + rẻ.
const LESSON_BUDGET_CHARS = 18000;
const EXISTING_QUESTION_LIMIT = 80;

export const DIFFICULTY_GUIDE = `Định nghĩa 4 mức độ nhận thức (thang dùng trong đề kiểm tra Việt Nam):
- NHAN_BIET (Nhận biết): chỉ cần nhớ lại kiến thức đã học, nhận ra khái niệm/công thức/tính chất trực tiếp, không cần suy luận hay tính toán.
- THONG_HIEU (Thông hiểu): cần hiểu bản chất, giải thích hiện tượng, so sánh, hoặc tính toán rất đơn giản 1 bước.
- VAN_DUNG (Vận dụng): áp dụng kiến thức vào tình huống cụ thể, tính toán nhiều bước hoặc kết hợp từ 2 kiến thức trở lên.
- VAN_DUNG_CAO (Vận dụng cao): tình huống phức tạp, tổng hợp nhiều kiến thức, tính toán nhiều bước hoặc đòi hỏi phân tích/suy luận sâu.`;

export const CHEM_NOTATION_RULES = `Quy tắc trình bày bắt buộc:
- Nội dung chính xác về mặt hóa học: công thức đúng, phương trình PHẢI cân bằng, số liệu hợp lý.
- Danh pháp theo SGK chương trình GDPT 2018 (Kết nối tri thức): dùng tên tiếng Anh chuẩn IUPAC như sulfuric acid, sodium hydroxide, iron(III) oxide, ethanol... KHÔNG dùng danh pháp cũ (axit sunfuric, natri hiđroxit, sắt(III) oxit).
- Công thức hóa học viết dạng thường để hệ thống tự hiển thị ký hiệu khoa học: H2O, Fe^3+, CaCO3 -> CaO + CO2.
- Ngôn ngữ đơn giản, phù hợp lứa tuổi học sinh.`;

export async function buildLessonContext(chapterId: string): Promise<string> {
  const documents = await prisma.document.findMany({
    where: { chapterId },
    orderBy: { order: "asc" },
    select: { title: true, content: true },
  });
  if (documents.length === 0) return "";

  const perDoc = Math.max(1200, Math.floor(LESSON_BUDGET_CHARS / documents.length));
  return documents
    .map((doc) => {
      const body =
        doc.content.length > perDoc
          ? `${doc.content.slice(0, perDoc)}\n[...đã cắt bớt phần sau...]`
          : doc.content;
      return `### ${doc.title}\n${body}`;
    })
    .join("\n\n");
}

export async function buildExistingQuestionList(chapterId: string): Promise<string> {
  const [practiceQuestions, quizQuestions] = await Promise.all([
    prisma.practiceQuestion.findMany({ where: { chapterId }, select: { content: true } }),
    prisma.question.findMany({ where: { quiz: { chapterId } }, select: { content: true } }),
  ]);
  const contents = [...practiceQuestions, ...quizQuestions].map((q) =>
    q.content.replace(/\s+/g, " ").trim().slice(0, 140)
  );
  if (contents.length === 0) return "";
  return contents
    .slice(0, EXISTING_QUESTION_LIMIT)
    .map((content, i) => `${i + 1}. ${content}`)
    .join("\n");
}

// AI hay dồn đáp án đúng vào 1-2 vị trí — xáo lại phía server cho phân bố đều.
export function shuffleWithAnswer(choices: string[], correctIndex: number) {
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

export function normalizeShortAnswer(value: string): string {
  return value.trim().toLowerCase().replace(",", ".").replace(/\s+/g, " ");
}

export function shortAnswersMatch(a: string, b: string): boolean {
  const na = normalizeShortAnswer(a);
  const nb = normalizeShortAnswer(b);
  if (na === nb) return true;
  const numA = Number(na);
  const numB = Number(nb);
  if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
    return Math.abs(numA - numB) < 1e-6;
  }
  return false;
}
