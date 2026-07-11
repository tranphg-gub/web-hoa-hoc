import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-X: nâng cấp nội dung lý thuyết theo skill chem-theory + chem-images — tham khảo
// tài liệu SBT Hóa 12 KNTT thật (Tài liệu/Lớp 12/Hóa 12 theo chuyên đề/Chương 1 Ester-Lipid.zip,
// đọc bằng pdftoppm + thị giác) để bổ sung công thức chung, tính chất vật lí, danh pháp,
// ứng dụng thực tế còn thiếu trong bản cũ 997 ký tự. Thêm 1 ảnh thật (Wikimedia Commons,
// public domain, đã curl -I xác nhận) minh họa cấu trúc phân tử triglyceride (chất béo).
const DOC_ID = "cmrelkipg000xvhusg4sws98q"; // Lớp 12 - Bài 1. Ester - Lipid

const CONTENT = `## Khái niệm và công thức chung
- Ester là hợp chất hữu cơ được tạo ra khi thay nhóm -OH ở nhóm carboxyl (-COOH) của carboxylic acid bằng nhóm -OR' (gốc alcohol).
- Công thức chung của ester đơn chức (tạo bởi acid đơn chức và alcohol đơn chức): RCOOR' (R là gốc hydrocarbon hoặc H; R' là gốc hydrocarbon).
- Ví dụ: CH3COOC2H5 (ethyl acetate) tạo bởi acetic acid và ethanol; CH3COOCH3 (methyl acetate) tạo bởi acetic acid và methanol.

## Tính chất vật lí
- Ở điều kiện thường, nhiều ester là chất lỏng, dễ bay hơi, ít tan trong nước (do không tạo được liên kết hydrogen với nước), nhẹ hơn nước.
- Nhiều ester có mùi thơm đặc trưng giống mùi hoa quả nên được dùng làm hương liệu trong công nghiệp mĩ phẩm, thực phẩm — ví dụ isoamyl acetate có mùi chuối chín, ethyl butanoate có mùi dứa.

## Điều chế (phản ứng ester hóa)
Ester được điều chế bằng phản ứng ester hóa giữa carboxylic acid và alcohol, xúc tác H2SO4 đặc, đun nóng. Đây là phản ứng thuận nghịch:
CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O

## Phản ứng thủy phân ester
- Trong môi trường acid: ester bị thủy phân tạo lại acid và alcohol ban đầu (phản ứng thuận nghịch).
- Trong môi trường kiềm (phản ứng xà phòng hóa): ester bị thủy phân tạo alcohol và muối của acid (phản ứng một chiều, không thuận nghịch):
CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH

## Lipid và chất béo
- Lipid là nhóm hợp chất hữu cơ tự nhiên gồm chất béo, sáp, steroid, một số vitamin... không tan trong nước nhưng tan tốt trong dung môi hữu cơ (ether, chloroform...).
- Chất béo là trieste của glycerol với các acid béo (acid béo là carboxylic acid mạch dài, không phân nhánh, thường có số nguyên tử carbon chẵn).
- Acid béo no thường gặp: palmitic acid (C15H31COOH), stearic acid (C17H35COOH) — chất béo chứa nhiều gốc acid béo no thường ở thể rắn (mỡ động vật).
- Acid béo không no thường gặp: oleic acid (C17H33COOH), linoleic acid (C17H31COOH) — chất béo chứa nhiều gốc acid béo không no thường ở thể lỏng (dầu thực vật).

## Phản ứng xà phòng hóa chất béo
Trong môi trường kiềm, chất béo bị thủy phân tạo glycerol và muối của acid béo (xà phòng) — phản ứng một chiều:
(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3

## Ví dụ minh họa
Xà phòng hóa hoàn toàn 17,8 gam tristearin ((C17H35COO)3C3H5, M = 890 g/mol) bằng NaOH vừa đủ:
(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3
- Số mol chất béo: n = 17,8/890 = 0,02 mol -> n(glycerol) = 0,02 mol -> khối lượng glycerol: m = 0,02 x 92 = 1,84 gam.

## Ứng dụng thực tế
![Cấu trúc phân tử triglyceride: 1 phân tử glycerol liên kết với 3 gốc acid béo qua liên kết ester](https://upload.wikimedia.org/wikipedia/commons/6/6c/Triglyceride_Structural_Formula_V9.svg)

- Ester được dùng làm hương liệu (nước hoa, bánh kẹo, nước giải khát) và dung môi (pha sơn, keo dán).
- Chất béo là thành phần dinh dưỡng quan trọng (cung cấp năng lượng, hoà tan các vitamin A, D, E, K), đồng thời là nguyên liệu sản xuất xà phòng, mĩ phẩm.
- Dầu mỡ chiên rán nhiều lần thường bị oxi hoá, sinh mùi khó chịu và tạo ra chất có hại cho sức khoẻ — không nên tái sử dụng dầu ăn đã chiên đi chiên lại nhiều lần.

## Bài tập áp dụng nhanh
1. Viết công thức cấu tạo của ester tạo bởi acetic acid và methanol; gọi tên ester đó.
2. Vì sao phản ứng xà phòng hóa chất béo là phản ứng một chiều, còn phản ứng ester hóa là phản ứng thuận nghịch?
3. Xà phòng hóa hoàn toàn 8,8 gam ester CH3COOC2H5 bằng dung dịch NaOH vừa đủ. Tính khối lượng muối CH3COONa thu được.`;

async function main() {
  const doc = await prisma.document.findUnique({ where: { id: DOC_ID } });
  if (!doc) throw new Error("Không tìm thấy document " + DOC_ID);
  if (doc.content.trim() === CONTENT.trim()) {
    console.log("Bỏ qua: nội dung đã cập nhật từ trước.");
    return;
  }
  await prisma.document.update({ where: { id: DOC_ID }, data: { content: CONTENT } });
  console.log(`Đã cập nhật "${doc.title}" —`, CONTENT.length, "ký tự (trước:", doc.content.length, "ký tự).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
