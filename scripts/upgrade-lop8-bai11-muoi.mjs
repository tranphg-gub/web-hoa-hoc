import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-X: nâng cấp nội dung lý thuyết theo skill chem-theory + chem-images — tham khảo
// SGK KHTN 8 - KNTT (Tài liệu/Lớp 6-9 (THCS)/SGK KHTN 8 - KNTT.pdf, trang 48-52, đọc bằng
// pdftoppm + thị giác vì đây là bản scan) thay vì bản tóm tắt 535 ký tự cũ. Thêm bảng tính
// tan, bảng tên gốc acid, đầy đủ 4 loại tính chất hóa học kèm PTHH ví dụ thật từ SGK, mối
// quan hệ oxide-acid-base-muối, và 1 ảnh thật (Wikimedia Commons, CC-BY-SA 3.0, đã curl -I
// xác nhận HTTP 200 + content-type image/jpeg) minh họa ứng dụng thực tế sản xuất muối ăn.
const DOC_ID = "cmrel0o1p000fvhd8gapzh2tn"; // Lớp 8 - Bài 11. Muối

const CONTENT = `## Khái niệm
- Muối là hợp chất được tạo thành khi thay thế ion H+ của acid bằng ion kim loại hoặc ion ammonium (NH4^+).
- Công thức phân tử muối gồm 2 phần: cation kim loại (hoặc NH4^+) và anion gốc acid.
- Cách gọi tên: Tên kim loại (kèm hóa trị nếu kim loại có nhiều hóa trị) + tên gốc acid.
- Ví dụ: Na2SO4 (sodium sulfate), NH4Cl (ammonium chloride), FeCl2 (iron(II) chloride), FeCl3 (iron(III) chloride).

## Tên gọi các gốc acid thường gặp
| Gốc acid | Tên gọi | Gốc acid | Tên gọi |
|---|---|---|---|
| -Cl | chloride | =SO4 | sulfate |
| -Br | bromide | -HSO4 | hydrogensulfate |
| -NO3 | nitrate | =CO3 | carbonate |
| -CH3COO | acetate | -HCO3 | hydrogencarbonate |
| =SO3 | sulfite | =PO4 | phosphate |

## Tính tan của muối
Đa số muối là chất rắn. Có muối tan tốt trong nước, có muối ít tan, có muối gần như không tan — dựa vào bảng tính tan dưới đây để biết trước khi làm bài tập hoặc thí nghiệm (t: tan tốt, i: ít tan, k: không tan, —: không tồn tại hoặc bị nước phân hủy).

| Gốc acid | K | Na | Ag | Mg | Ca | Ba | Zn | Pb | Cu | Fe(II) | Fe(III) | Al |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| -Cl | t | t | k | t | t | t | t | i | t | t | t | t |
| -NO3 | t | t | t | t | t | t | t | t | t | t | t | t |
| =SO4 | t | t | i | t | i | k | t | k | t | t | t | t |
| =CO3 | t | t | k | k | k | k | k | k | — | k | — | — |
| =PO4 | t | t | k | k | k | k | k | k | k | k | k | k |

Nhận xét nhanh: muối gốc nitrate (-NO3) luôn tan tốt; muối gốc carbonate (=CO3) và phosphate (=PO4) hầu hết không tan (trừ muối của K, Na); AgCl không tan — đây là phản ứng thường dùng để nhận biết ion Cl^- trong dung dịch.

## Tính chất hóa học
- Dung dịch muối tác dụng với kim loại, tạo muối mới và kim loại mới:
Zn + FeSO4 -> ZnSO4 + Fe
- Muối tác dụng với dung dịch acid, tạo muối mới và acid mới (sản phẩm có ít nhất 1 chất khí/ít tan/không tan):
CaCO3 + 2HCl -> CaCl2 + CO2 + H2O
- Dung dịch muối tác dụng với dung dịch base, tạo muối mới và base mới:
FeSO4 + 2NaOH -> Fe(OH)2 + Na2SO4
- Hai dung dịch muối tác dụng với nhau, tạo thành 2 muối mới (ít nhất 1 muối không tan/ít tan):
2AgNO3 + BaCl2 -> 2AgCl + Ba(NO3)2
- Điều kiện chung để các phản ứng trên xảy ra được (gọi là phản ứng trao đổi): sản phẩm tạo thành phải có ít nhất 1 chất không tan hoặc chất khí.

## Ứng dụng nhận biết ion sulfate
Phản ứng dùng để nhận biết gốc sulfate trong dung dịch, tạo kết tủa trắng BaSO4 không tan trong acid:
BaCl2 + Na2SO4 -> BaSO4 + 2NaCl

## Điều chế muối
- Acid tác dụng với base: HCl + NaOH -> NaCl + H2O
- Acid tác dụng với oxide base: 2HNO3 + CuO -> Cu(NO3)2 + H2O
- Acid tác dụng với muối: H2SO4 + BaCl2 -> BaSO4 + 2HCl
- Oxide acid tác dụng với dung dịch base: CO2 + 2NaOH -> Na2CO3 + H2O
- Dung dịch muối tác dụng với dung dịch muối: NaCl + AgNO3 -> AgCl + NaNO3

## Mối quan hệ giữa oxide, acid, base, muối
Bốn loại hợp chất vô cơ oxide base, oxide acid, acid, base đều có thể chuyển hoá qua lại thành muối:
- Oxide base + acid -> muối + nước
- Oxide acid + base -> muối + nước
- Acid + base -> muối + nước
- Acid + oxide base -> muối + nước
- Base + acid/oxide acid/muối -> muối mới
- Acid + kim loại/base/oxide base/muối -> muối mới

## Ứng dụng thực tế
![Sản xuất muối ăn bằng cách phơi nước biển tại ruộng muối Ninh Hòa, Khánh Hòa, Việt Nam](https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ninh_H%C3%B2a_salt_production_-_alt.JPG/960px-Ninh_H%C3%B2a_salt_production_-_alt.JPG)

- Muối ăn (NaCl) được sản xuất chủ yếu bằng cách đưa nước biển vào ruộng muối (diêm điền), để nước bốc hơi nhờ ánh nắng mặt trời, còn lại trên ruộng là muối. Muối ăn cũng có thể được khai thác từ mỏ muối.
- Muối được dùng làm phân bón (NH4NO3, KCl, (NH4)2SO4...), bảo quản thực phẩm (ướp muối), làm bột nở cho bánh (NaHCO3), và trong nhiều ngành công nghiệp (NaCl là nguyên liệu sản xuất Cl2, NaOH, Na2CO3...).

## Bài tập áp dụng nhanh
1. Gọi tên các muối sau: AlCl3, KCl, Al2(SO4)3, MgSO4, NH4NO3, NaHCO3.
2. Muối nào sau đây tan tốt trong nước: CaCO3, AgCl, NaNO3, BaSO4? Giải thích dựa vào bảng tính tan.
3. Viết phương trình hoá học của phản ứng tạo thành muối KCl và MgSO4 từ acid và base tương ứng.`;

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
