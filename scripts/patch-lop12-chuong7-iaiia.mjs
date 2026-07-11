import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PATCHES = [
  {
    id: "cmrelkl7w001evhusew5dbap9", // Bài 24. Nguyên tố nhóm IA
    insertions: [
      {
        marker: "## Tính chất",
        text: `## Trạng thái tự nhiên
Do tính khử rất mạnh, kim loại kiềm không tồn tại ở dạng đơn chất trong tự nhiên mà chỉ tồn tại ở dạng hợp chất: sodium có nhiều trong nước biển (NaCl) và mỏ muối; potassium có trong tro thực vật, một số loại quặng.

`,
      },
    ],
    append: `## Ứng dụng thực tế
NaOH dùng sản xuất xà phòng, giấy, tơ sợi, xử lí nước; Na2CO3 (soda) dùng sản xuất thủy tinh, chất tẩy rửa; NaHCO3 dùng làm bột nở trong thực phẩm và thuốc giảm acid dạ dày.

## Bài tập áp dụng nhanh
1. Vì sao kim loại kiềm phải được bảo quản trong dầu hỏa (không để tiếp xúc với không khí, nước)?
2. Vì sao tính khử của kim loại kiềm tăng dần từ Li đến Cs?
3. Cho 7,8 gam K (M = 39 g/mol) tác dụng hết với nước. Tính thể tích khí H2 thoát ra ở đkc.`,
  },
  {
    id: "cmrelkl7w001fvhusou3tkbnn", // Bài 25. Nguyên tố nhóm IIA
    insertions: [],
    append: `## Trạng thái tự nhiên
Magnesium có trong khoáng vật dolomite, nước biển; calcium có nhiều trong đá vôi, đá phấn, thạch cao, xương và vỏ của nhiều loài sinh vật.

## Ứng dụng thực tế
CaO (vôi sống) dùng khử chua đất trồng, sản xuất vôi vữa xây dựng; CaCO3 (đá vôi) là nguyên liệu sản xuất xi măng, vôi; thạch cao dùng làm khuôn đúc, bó bột trong y tế; nhận biết và làm mềm nước cứng giúp tránh đóng cặn đường ống, tăng hiệu quả sử dụng xà phòng/chất tẩy rửa.

## Bài tập áp dụng nhanh
1. Vì sao nước cứng làm giảm tác dụng tẩy rửa của xà phòng?
2. Nêu 1 cách làm mềm nước cứng tạm thời và 1 cách làm mềm nước cứng vĩnh viễn.
3. Cho 10 gam CaCO3 tác dụng hết với dung dịch HCl dư. Tính thể tích khí CO2 thoát ra ở đkc.`,
  },
];

async function main() {
  for (const patch of PATCHES) {
    const doc = await prisma.document.findUnique({ where: { id: patch.id } });
    if (!doc) throw new Error("Không tìm thấy document " + patch.id);
    let content = doc.content;
    let changed = false;

    for (const ins of patch.insertions || []) {
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
