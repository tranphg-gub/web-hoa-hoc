import fs from "node:fs";

// MR-AL: trích xuất câu hỏi trắc nghiệm (loại SINGLE_CHOICE) từ các trang "Trắc nghiệm Hóa 12 Kết
// nối tri thức" của VietJack — HTML có cấu trúc rõ ràng (mỗi câu là 1 <p> dẫn + 4 <p> A/B/C/D + 1
// <section class="toggle"> chứa "Đáp án đúng là: X" và lời giải) nên trích trực tiếp bằng regex,
// không cần đọc ảnh/PDF thủ công như các đề khác. Chỉ trích phần SINGLE_CHOICE (phần đầu mỗi
// trang) — mỗi trang còn có thêm câu Đúng/Sai và Trả lời ngắn ở cuối nhưng cấu trúc khác, CHƯA hỗ
// trợ ở bản này (còn để dành, có thể mở rộng sau nếu cần thêm câu hỏi Quiz dạng đó).
// CHỈ ghi ra JSON để review độc lập trước — KHÔNG tự động ghi DB (xem import-l12-vietjack-practice.mjs
// là bước sau, tách riêng có chủ đích để giữ bước kiểm chứng con người ở giữa).
// Script này KHÔNG chứa nội dung câu hỏi nguyên văn (chỉ có logic parse + danh sách URL công khai)
// nên an toàn để push — nội dung trích xuất thực tế chỉ tồn tại trong file JSON output (không commit)
// và trong DB cục bộ (prisma/dev.db, đã gitignore).

const LESSONS = [
  { chapterOrder: 1, chapterTitle: "Chương 1. Ester - Lipid", bai: 1, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-1-ester-lipid.jsp" },
  { chapterOrder: 1, chapterTitle: "Chương 1. Ester - Lipid", bai: 2, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-2-xa-phong-va-chat-giat-rua.jsp" },
  { chapterOrder: 2, chapterTitle: "Chương 2. Carbohydrate", bai: 4, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-4-gioi-thieu-ve-carbohydrate-glucose-va-fructose.jsp" },
  { chapterOrder: 2, chapterTitle: "Chương 2. Carbohydrate", bai: 5, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-5-saccharose-va-maltose.jsp" },
  { chapterOrder: 2, chapterTitle: "Chương 2. Carbohydrate", bai: 6, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-6-tinh-bot-va-cellulose.jsp" },
  { chapterOrder: 3, chapterTitle: "Chương 3. Hợp chất chứa nitrogen", bai: 8, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-8-amine.jsp" },
  { chapterOrder: 3, chapterTitle: "Chương 3. Hợp chất chứa nitrogen", bai: 9, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-9-amino-acid-va-peptide.jsp" },
  { chapterOrder: 3, chapterTitle: "Chương 3. Hợp chất chứa nitrogen", bai: 10, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-10-protein-va-enzyme.jsp" },
  { chapterOrder: 4, chapterTitle: "Chương 4. Polymer", bai: 12, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-12-dai-cuong-ve-polymer.jsp" },
  { chapterOrder: 4, chapterTitle: "Chương 4. Polymer", bai: 13, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-13-vat-lieu-polymer.jsp" },
  { chapterOrder: 5, chapterTitle: "Chương 5. Pin điện và điện phân", bai: 15, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-15-the-dien-cuc-va-nguon-dien-hoa-hoc.jsp" },
  { chapterOrder: 5, chapterTitle: "Chương 5. Pin điện và điện phân", bai: 16, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-16-dien-phan.jsp" },
  { chapterOrder: 6, chapterTitle: "Chương 6. Đại cương về kim loại", bai: 18, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-18-cau-tao-va-lien-ket-trong-tinh-the-kim-loai.jsp" },
  { chapterOrder: 6, chapterTitle: "Chương 6. Đại cương về kim loại", bai: 19, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-19-tinh-chat-vat-li-va-tinh-chat-hoa-hoc-cua-kl.jsp" },
  { chapterOrder: 6, chapterTitle: "Chương 6. Đại cương về kim loại", bai: 20, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-20-kim-loai-trong-tu-nhien-va-phuong-phap-tach-kl.jsp" },
  { chapterOrder: 6, chapterTitle: "Chương 6. Đại cương về kim loại", bai: 21, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-21-hop-kim.jsp" },
  { chapterOrder: 6, chapterTitle: "Chương 6. Đại cương về kim loại", bai: 22, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-22-su-an-mon-kim-loai.jsp" },
  { chapterOrder: 7, chapterTitle: "Chương 7. Nguyên tố nhóm IA và nhóm IIA", bai: 24, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-24-nguyen-to-nhom-ia.jsp" },
  { chapterOrder: 7, chapterTitle: "Chương 7. Nguyên tố nhóm IA và nhóm IIA", bai: 25, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-25-nguyen-to-nhom-iia.jsp" },
  { chapterOrder: 8, chapterTitle: "Chương 8. Kim loại chuyển tiếp và phức chất", bai: 27, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-27-dai-cuong-ve-kim-loai-chuyen-tiep-day-thu-nhat.jsp" },
  { chapterOrder: 8, chapterTitle: "Chương 8. Kim loại chuyển tiếp và phức chất", bai: 28, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-28-so-luoc-ve-phuc-chat.jsp" },
  { chapterOrder: 8, chapterTitle: "Chương 8. Kim loại chuyển tiếp và phức chất", bai: 29, url: "https://vietjack.com/hoa-hoc-12-kn/trac-nghiem-bai-29-mot-so-tinh-chat-va-ung-dung-cua-phuc-chat.jsp" },
];

function cleanFormula(fragment) {
  return fragment
    .replace(/<sub>/g, "")
    .replace(/<\/sub>/g, "")
    .replace(/<sup>/g, "^")
    .replace(/<\/sup>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8594;/g, "->")
    .replace(/&rarr;/g, "->")
    .replace(/&#8658;/g, "=>")
    .replace(/&#8722;/g, "-")
    .replace(/&#8211;/g, "-")
    .replace(/&#956;/g, "µ")
    .replace(/&#959;/g, "°")
    .replace(/&#8201;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/->to(?=[A-ZĐ])/g, "->(t°) ")
    .replace(/->t°/g, "->(t°) ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseLesson(html) {
  const questionMarker = /<span>Câu\s*(\d+)\.\s*<\/span><\/strong><span>/g;
  const markers = [];
  let m;
  while ((m = questionMarker.exec(html)) !== null) {
    markers.push({ num: Number(m[1]), start: m.index });
  }

  const questions = [];
  for (let i = 0; i < markers.length; i++) {
    const blockEnd = i + 1 < markers.length ? markers[i + 1].start : html.length;
    const block = html.slice(markers[i].start, blockEnd);

    const stemMatch = block.match(/<span>Câu\s*\d+\.\s*<\/span><\/strong><span>([\s\S]*?)<\/span><\/p>/);
    const stem = stemMatch ? cleanFormula(stemMatch[1]) : null;

    const choices = [];
    for (const letter of ["A", "B", "C", "D"]) {
      const re = new RegExp(`<span>${letter}\\.\\s*<\\/span><\\/strong>([\\s\\S]*?)<\\/p>`);
      const cm = block.match(re);
      choices.push(cm ? cleanFormula(cm[1]) : null);
    }

    const answerMatch = block.match(/Đáp án đúng là:\s*([A-D])/);
    const correctLetter = answerMatch ? answerMatch[1] : null;

    const toggleMatch = block.match(/class="toggle-content"[^>]*>([\s\S]*?)<\/div>\s*<\/section>/);
    let explanation = null;
    if (toggleMatch) {
      const expBlock = toggleMatch[1].replace(/<p><strong><span>Đáp án đúng là:[^<]*<\/span><\/strong><\/p>/, "");
      const lines = [...expBlock.matchAll(/<p><span>([\s\S]*?)<\/span><\/p>/g)].map((x) => cleanFormula(x[1]));
      explanation = lines.filter(Boolean).join(" ");
    }

    questions.push({
      num: markers[i].num,
      content: stem,
      choices,
      correctLetter,
      correctIndex: correctLetter ? correctLetter.charCodeAt(0) - 65 : null,
      explanation,
    });
  }
  return questions;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const results = [];
  for (const lesson of LESSONS) {
    process.stdout.write(`Bài ${lesson.bai} (${lesson.chapterTitle})... `);
    try {
      const res = await fetch(lesson.url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      });
      if (!res.ok) {
        console.log(`LỖI HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      const parsed = parseLesson(html);
      const complete = parsed.filter((q) => q.content && q.choices.every(Boolean) && q.correctIndex !== null);
      console.log(`${complete.length}/${parsed.length} câu SINGLE_CHOICE đầy đủ.`);
      results.push({ ...lesson, questions: complete });
    } catch (e) {
      console.log(`LỖI: ${e.message}`);
    }
    await sleep(1500);
  }

  const outPath = process.argv[2] || "vietjack-l12-batch.json";
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf-8");
  const total = results.reduce((s, r) => s + r.questions.length, 0);
  console.log(`\nTổng cộng: ${total} câu SINGLE_CHOICE từ ${results.length} bài. Ghi ra ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
