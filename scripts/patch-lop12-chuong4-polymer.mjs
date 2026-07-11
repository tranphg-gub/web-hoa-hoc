import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-Z: bổ sung PTHH trùng hợp/trùng ngưng cụ thể, Ứng dụng thực tế, Bài tập áp dụng nhanh
// cho Chương 4 Polymer (Lớp 12).

const PATCHES = [
  {
    id: "cmrelkjxx0015vhusrhsg9yds", // Bài 12. Đại cương về polymer
    insertions: [
      {
        marker: "## Cấu trúc mạch",
        text: `## Phản ứng trùng hợp và trùng ngưng
- Trùng hợp: monomer có liên kết đôi (hoặc vòng kém bền) tự cộng hợp với nhau tạo polymer, không giải phóng phân tử nhỏ:
nCH2=CH2 -> (-CH2-CH2-)n
- Trùng ngưng: các monomer có ít nhất 2 nhóm chức phản ứng với nhau tạo polymer, đồng thời giải phóng phân tử nhỏ (thường là nước):
nH2N-[CH2]6-NH2 + nHOOC-[CH2]4-COOH -> (-NH-[CH2]6-NH-CO-[CH2]4-CO-)n + 2nH2O (tổng hợp tơ nylon-6,6)

`,
      },
    ],
    append: `## Ứng dụng thực tế
Polyethylene (PE) dùng làm túi nilon, màng bọc thực phẩm, ống dẫn nước. Việc sử dụng quá nhiều đồ nhựa dùng một lần và xử lí rác thải nhựa không đúng cách đang gây ô nhiễm môi trường nghiêm trọng — nhiều polymer tổng hợp rất khó phân hủy sinh học, có thể tồn tại hàng trăm năm trong tự nhiên.

## Bài tập áp dụng nhanh
1. Phân biệt phản ứng trùng hợp và phản ứng trùng ngưng.
2. Một mẫu PVC (poly(vinyl chloride), -[CH2-CHCl]n-, M mắt xích = 62,5 g/mol) có phân tử khối trung bình 125.000 g/mol. Tính hệ số trùng hợp n.
3. Vì sao nên hạn chế sử dụng túi nilon và đồ nhựa dùng một lần?`,
  },
  {
    id: "cmrelkjxx0016vhusuhu7345j", // Bài 13. Vật liệu polymer
    insertions: [],
    append: `## Ứng dụng thực tế
- Chất dẻo: PE làm túi nilon, màng bọc; PVC làm ống nước, vỏ dây điện; thủy tinh hữu cơ (PMMA) làm kính chắn gió, biển quảng cáo.
- Tơ: tơ tằm, tơ nylon dùng dệt vải may mặc; tơ capron làm dây câu cá, lưới đánh cá.
- Cao su: cao su thiên nhiên và cao su buna dùng làm lốp xe, đệm, gioăng cao su chịu lực/chịu mài mòn.
- Keo dán: keo epoxy dùng trong xây dựng, sửa chữa; hồ dán tinh bột dùng dán giấy.

## Bài tập áp dụng nhanh
1. Kể tên 2 vật liệu polymer thiên nhiên và 2 vật liệu polymer tổng hợp thường gặp trong đời sống.
2. Vì sao lốp xe ô tô thường làm từ cao su lưu hóa (có thêm sulfur) thay vì cao su thường?
3. Nêu 1 ưu điểm và 1 nhược điểm khi thay thế đồ dùng bằng kim loại/gỗ bằng đồ dùng bằng chất dẻo.`,
  },
];

async function main() {
  for (const patch of PATCHES) {
    const doc = await prisma.document.findUnique({ where: { id: patch.id } });
    if (!doc) throw new Error("Không tìm thấy document " + patch.id);
    let content = doc.content;
    let changed = false;

    for (const ins of patch.insertions) {
      if (content.includes(ins.text.trim().split("\n")[0])) continue;
      const idx = content.indexOf(ins.marker);
      if (idx === -1) {
        console.log(`Cảnh báo: không tìm thấy marker "${ins.marker}" trong "${doc.title}"`);
        continue;
      }
      content = content.slice(0, idx) + ins.text + content.slice(idx);
      changed = true;
    }

    if (!content.includes("## Bài tập áp dụng nhanh")) {
      content = content.trimEnd() + "\n\n" + patch.append;
      changed = true;
    }

    if (!changed) {
      console.log(`Bỏ qua "${doc.title}": đã đủ.`);
      continue;
    }
    await prisma.document.update({ where: { id: patch.id }, data: { content } });
    console.log(`Đã cập nhật "${doc.title}" —`, content.length, "ký tự (trước:", doc.content.length, "ký tự).");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
