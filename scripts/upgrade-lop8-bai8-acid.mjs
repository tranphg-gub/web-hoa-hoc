import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-X: nâng cấp theo khung mục cố định mới trong skill chem-theory (Giới thiệu, Trạng thái
// tự nhiên, TCVL, TCHH, Sản xuất, Ứng dụng, Bài tập) — tham khảo SGK KHTN 8 - KNTT (trang
// 35-38 in, đọc bằng pdftoppm + thị giác) VÀ file "Ôn tập kiến thức cấp 2(2).docx" (mục
// III. Acid — đầy đủ tác dụng oxide base/base/muối, độ mạnh yếu, H2SO4 đặc/HNO3 tính oxi
// hóa mạnh mà bản cũ chưa có).
const DOC_ID = "cmrel0o1p000cvhd8jz3gd3ji"; // Lớp 8 - Bài 8. Acid

const CONTENT = `## Khái niệm
- Acid là những hợp chất trong phân tử có nguyên tử hydrogen liên kết với gốc acid; khi tan trong nước, acid phân li ra ion H+ (cation hydrogen).
- Từ "acid" xuất phát từ tiếng Latin "acidus" nghĩa là "chua" — acid ban đầu được biết đến qua các chất có vị chua như acetic acid (giấm ăn), citric acid (quả chanh), maleic acid (quả táo).
- Một số acid thường gặp: HCl (hydrochloric acid), H2SO4 (sulfuric acid), HNO3 (nitric acid) — acid vô cơ mạnh; CH3COOH (acetic acid) — acid hữu cơ yếu.

## Trạng thái tự nhiên
- Acetic acid có trong giấm ăn; citric acid có trong quả chanh, cam, bưởi.
- Hydrochloric acid có trong dịch vị dạ dày người (nồng độ khoảng 0,001-0,01 mol/L, tương ứng pH 1,5-3,5), giúp tiêu hóa thức ăn, kích thích ruột non và tụy sản xuất enzyme tiêu hóa, và diệt khuẩn có hại. Nồng độ acid trong dạ dày quá cao hoặc quá thấp so với mức cần thiết đều ảnh hưởng tới chức năng tiêu hóa và sức khỏe.

## Tính chất vật lí
- Sulfuric acid (H2SO4) đặc là chất lỏng không màu, không bay hơi, sánh như dầu ăn, nặng gần gấp 2 lần nước, tan vô hạn trong nước và tỏa rất nhiều nhiệt khi tan.
- Lưu ý an toàn: tuyệt đối không tự ý pha loãng H2SO4 đặc bằng cách đổ nước vào acid — phải làm ngược lại (đổ từ từ acid vào nước), nếu không acid có thể bắn tung tóe gây bỏng do tỏa nhiệt đột ngột.
- Hydrochloric acid (HCl) là chất lỏng không màu, có mùi xốc.

## Tính chất hóa học
- Dung dịch acid làm quỳ tím chuyển sang màu đỏ (hồng); không làm đổi màu dung dịch phenolphtalein.
- Tác dụng với kim loại đứng trước hydrogen trong dãy hoạt động hóa học, giải phóng khí H2 (kim loại đứng SAU hydrogen như Cu, Ag, Au... KHÔNG phản ứng với HCl, H2SO4 loãng để giải phóng khí H2 — lỗi học sinh hay nhầm):
Mg + H2SO4 -> MgSO4 + H2
- Tác dụng với oxide base tạo thành muối và nước:
CaO + H2SO4 -> CaSO4 + H2O
- Tác dụng với base tạo thành muối và nước (phản ứng trung hòa):
Cu(OH)2 + 2HCl -> CuCl2 + 2H2O
- Tác dụng với muối tạo muối mới và acid mới (điều kiện: chất tham gia phải tan, sản phẩm có chất khí hoặc chất không tan):
CaCO3 + 2HCl -> CaCl2 + CO2 + H2O
- Acid mạnh, acid yếu: dựa vào khả năng phân li ra ion H+, acid mạnh phân li hoàn toàn (HCl, H2SO4, HNO3), acid yếu phân li không hoàn toàn (CH3COOH, H2CO3, H2S). Thứ tự độ mạnh giảm dần của một số acid thường gặp: H2SO4 đặc, HNO3, HCl > H3PO4 > H2CO3 > H2S.
- Tính chất riêng của H2SO4 đặc và HNO3: có tính oxi hóa mạnh, oxi hóa được hầu hết kim loại (kể cả kim loại đứng sau hydrogen như Cu, Ag — trừ Au, Pt) và một số phi kim, sản phẩm khí KHÔNG phải H2:
Cu + 2H2SO4 -> CuSO4 + SO2 + 2H2O
Fe + 4HNO3 -> Fe(NO3)3 + NO + 2H2O
  H2SO4 đặc còn có tính háo nước mạnh (hút nước từ không khí và hợp chất hữu cơ, gây than hóa, ví dụ làm đen đường saccharose). Chú ý: Al, Fe, Cr không phản ứng với H2SO4, HNO3 đặc NGUỘI (bị thụ động hóa bề mặt).

## Sản xuất trong công nghiệp
- Sulfuric acid được sản xuất bằng phương pháp tiếp xúc: đốt lưu huỳnh (hoặc quặng chứa lưu huỳnh) tạo khí SO2, oxi hóa SO2 thành SO3 (xúc tác V2O5), rồi cho SO3 hấp thụ vào nước tạo H2SO4.
- Hydrochloric acid được sản xuất bằng cách cho khí hydrogen chloride tan vào nước.

## Ví dụ minh họa
Hòa tan hoàn toàn 5,6 gam iron (Fe, M = 56 g/mol) vào dung dịch HCl dư:
Fe + 2HCl -> FeCl2 + H2
- Số mol Fe: n = 5,6/56 = 0,1 mol.
- Theo phương trình, n(H2) = n(Fe) = 0,1 mol -> thể tích khí H2 thoát ra ở đkc: V = 0,1 x 24,79 = 2,479 lít.

## Ứng dụng thực tế
![Chai đựng dung dịch sulfuric acid tinh khiết 96%](https://upload.wikimedia.org/wikipedia/commons/b/b6/Sulphuric_acid_96_percent_extra_pure.jpg)

- Sulfuric acid là hóa chất được sử dụng nhiều nhất thế giới: sản xuất phẩm nhuộm, giấy/tơ sợi, sơn, chất dẻo, chất tẩy rửa, phân bón.
- Hydrochloric acid dùng để tẩy gỉ thép, tổng hợp chất hữu cơ, xử lí pH nước bể bơi; ngoài ra còn có vai trò tự nhiên quan trọng trong tiêu hóa (xem mục Trạng thái tự nhiên).

## Bài tập áp dụng nhanh
1. Kim loại nào sau đây KHÔNG phản ứng với dung dịch HCl loãng: Zn, Fe, Cu, Mg? Giải thích.
2. Vì sao khi pha loãng H2SO4 đặc phải đổ từ từ acid vào nước, không được làm ngược lại?
3. Viết phương trình hoá học của phản ứng giữa dung dịch HCl với CaCO3 (đá vôi) và cho biết dấu hiệu nhận biết phản ứng đã xảy ra.`;

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
