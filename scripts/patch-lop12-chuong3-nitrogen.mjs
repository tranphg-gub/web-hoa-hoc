import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-Z: bổ sung Trạng thái tự nhiên, Tính chất vật lí, Ứng dụng thực tế, Bài tập áp dụng
// nhanh cho 3 bài Chương 3 Hợp chất chứa nitrogen (Lớp 12). Lưu ý: KHÔNG dùng lại các chi
// tiết từ ảnh infographic tham khảo (do AI vẽ, có thể sai — VD ảnh ghi nhầm "Alanine có 2
// nhóm -NH2" trong khi thực tế Alanine chỉ có 1 nhóm -NH2) — mọi nội dung dưới đây tự kiểm
// chứng lại bằng kiến thức hóa học đã xác nhận, chỉ dùng ảnh tham khảo để biết cấu trúc mục.

const PATCHES = [
  {
    id: "cmrelkjj80012vhuskgrkgmzu", // Bài 8. Amine
    insertions: [
      {
        marker: "## Tính chất hóa học",
        text: `## Trạng thái tự nhiên và tính chất vật lí
- Nhiều amine có trong tự nhiên, ví dụ trimethylamine có trong cá biển (gây mùi tanh đặc trưng khi cá không còn tươi).
- Các amine mạch ngắn (methylamine, dimethylamine...) là chất khí hoặc dễ bay hơi ở điều kiện thường, có mùi khai giống ammonia, tan tốt trong nước.
- Aniline là chất lỏng, ít tan trong nước, độc.

`,
      },
    ],
    append: `## Ứng dụng thực tế
Amine được dùng làm nguyên liệu tổng hợp phẩm nhuộm, dược phẩm, thuốc bảo vệ thực vật; aniline là nguyên liệu quan trọng trong công nghiệp sản xuất phẩm nhuộm.

## Bài tập áp dụng nhanh
1. Vì sao amine có tính base tương tự ammonia?
2. Vì sao aniline có tính base yếu hơn methylamine?
3. Cho 3,1 gam methylamine (CH3NH2, M = 31 g/mol) phản ứng với dung dịch HCl vừa đủ. Tính khối lượng muối CH3NH3Cl thu được.`,
  },
  {
    id: "cmrelkjj80013vhus42ai77v2", // Bài 9. Amino acid và peptide
    insertions: [
      {
        marker: "## Peptide",
        text: `## Trạng thái tự nhiên và tính chất vật lí
- Amino acid là đơn vị cấu tạo nên protein trong cơ thể sinh vật; có 20 amino acid cơ bản tham gia cấu tạo protein ở người, trong đó một số amino acid cơ thể không tự tổng hợp được (amino acid thiết yếu) cần bổ sung qua thực phẩm.
- Amino acid là chất rắn kết tinh không màu, tan tốt trong nước, có nhiệt độ nóng chảy khá cao — do tồn tại chủ yếu ở dạng ion lưỡng cực nên lực hút giữa các phân tử mạnh hơn hợp chất hữu cơ thông thường cùng khối lượng phân tử.

`,
      },
    ],
    append: `## Ứng dụng thực tế
Amino acid được dùng làm gia vị (monosodium glutamate — bột ngọt/mì chính, là muối sodium của glutamic acid), có trong thực phẩm chức năng và dịch truyền y tế bổ sung dinh dưỡng.

## Bài tập áp dụng nhanh
1. Vì sao amino acid vừa phản ứng được với acid vừa phản ứng được với base?
2. Viết công thức cấu tạo của alanine (2-aminopropanoic acid).
3. Một peptide mạch hở tạo bởi 4 gốc amino acid thì có bao nhiêu liên kết peptide?`,
  },
  {
    id: "cmrelkjj80014vhusmkqmtcjr", // Bài 10. Protein và enzyme
    insertions: [
      {
        marker: "## Enzyme",
        text: `## Trạng thái tự nhiên
Protein có trong hầu hết các mô, cơ quan của sinh vật (thịt, cá, trứng, sữa, đậu...), là một trong ba nhóm chất dinh dưỡng chính của cơ thể người cùng với carbohydrate và lipid.

`,
      },
    ],
    append: `## Ứng dụng thực tế
Enzyme được ứng dụng rộng rãi trong đời sống và sản xuất: enzyme amylase trong nước bọt giúp tiêu hóa tinh bột ngay từ khoang miệng; enzyme trong bột giặt sinh học giúp phân giải vết bẩn protein (máu, mồ hôi); công nghiệp thực phẩm dùng enzyme để làm mềm thịt, sản xuất phô mai, lên men rượu bia.

## Bài tập áp dụng nhanh
1. Vì sao khi luộc trứng, lòng trắng trứng (chủ yếu là protein) chuyển từ lỏng trong suốt sang rắn đục màu trắng?
2. Nêu 1 ứng dụng thực tế của enzyme trong đời sống hàng ngày.
3. Phản ứng màu biuret dùng thuốc thử gì và cho hiện tượng ra sao khi nhận biết protein?`,
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
