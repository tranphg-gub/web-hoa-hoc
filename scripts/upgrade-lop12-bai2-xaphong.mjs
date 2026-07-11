import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-Z: nâng cấp Bài 2 Xà phòng (Lớp 12) — bổ sung cấu tạo/cơ chế làm sạch, điều chế,
// nhược điểm/lưu ý sử dụng, ứng dụng thực tế, bài tập. Tham khảo SBT Hóa 12 KNTT (đã đọc
// ở MR-W, câu 3.10-3.15) + kiến thức hóa học phổ thông đã kiểm chứng.
const DOC_ID = "cmrelkipg000yvhusc3vssumm"; // Lớp 12 - Bài 2. Xà phòng và chất giặt rửa

const CONTENT = `## Khái niệm
- Xà phòng là hỗn hợp muối sodium hoặc potassium của các acid béo, có thêm một số phụ gia.
- Công thức chung của thành phần chính trong xà phòng: RCOONa hoặc RCOOK (R là gốc hydrocarbon dài của acid béo).

## Cấu tạo và cơ chế làm sạch
- Phân tử xà phòng gồm 2 phần: đầu ưa nước (nhóm -COO-, phân cực) và đuôi kị nước (gốc hydrocarbon dài, không phân cực).
- Khi giặt rửa, đuôi kị nước "hòa tan" vào các hạt dầu mỡ/chất bẩn, còn đầu ưa nước hướng ra ngoài hòa tan vào nước, tạo thành các hạt nhũ tương (micelle) phân tán chất bẩn trong nước, nhờ đó chất bẩn được rửa trôi cùng nước.

![Sơ đồ minh họa nguyên lí tạo micelle: phân tử có đầu ưa nước hướng ra ngoài, đuôi kị nước hướng vào trong bao lấy chất béo/dầu mỡ ở giữa — xà phòng làm sạch theo đúng nguyên lí này](https://upload.wikimedia.org/wikipedia/commons/4/4d/Micelle_scheme-en.svg)

## Điều chế
Xà phòng được điều chế bằng phản ứng xà phòng hóa chất béo (đun chất béo với dung dịch NaOH hoặc KOH):
(RCOO)3C3H5 + 3NaOH -> 3RCOONa + C3H5(OH)3

## Chất giặt rửa tổng hợp
- Có cấu tạo và cơ chế hoạt động tương tự xà phòng (cũng gồm đầu ưa nước và đuôi kị nước) nhưng được tổng hợp từ dầu mỏ, không phải từ chất béo.
- Ưu điểm so với xà phòng: vẫn hoạt động tốt trong nước cứng (nước chứa nhiều ion Ca^2+, Mg^2+), trong khi xà phòng bị giảm tác dụng trong nước cứng do tạo kết tủa với các ion này, làm giảm bọt và bám cặn lên vải/bề mặt.

## Nhược điểm và lưu ý sử dụng
- Xà phòng có tính base nhẹ, dùng thường xuyên có thể làm khô da đối với da nhạy cảm.
- Một số chất giặt rửa tổng hợp khó phân hủy sinh học, có thể gây ô nhiễm nguồn nước nếu sử dụng và thải bỏ không đúng cách — nên ưu tiên sản phẩm có ghi nhãn dễ phân hủy sinh học.

## Ứng dụng thực tế
- Xà phòng dùng để tắm rửa, giặt giũ trong đời sống hàng ngày.
- Chất giặt rửa tổng hợp được sản xuất dạng bột, dạng lỏng, dùng trong giặt máy, rửa chén, tẩy rửa công nghiệp — hiệu quả cả trong nước cứng nên được dùng phổ biến ở nhiều vùng có nguồn nước cứng.

## Bài tập áp dụng nhanh
1. Vì sao xà phòng lại có khả năng làm sạch vết dầu mỡ trên tay hoặc quần áo?
2. Vì sao nên dùng chất giặt rửa tổng hợp thay vì xà phòng khi giặt bằng nước cứng?
3. Viết phương trình hoá học điều chế xà phòng sodium stearate (C17H35COONa) từ tristearin ((C17H35COO)3C3H5) và NaOH.`;

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
