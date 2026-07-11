import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// MR-AA: nâng cấp Lớp 9 (15 bài, 4 chương) — bổ sung Ứng dụng thực tế/Trạng thái tự nhiên
// còn thiếu + Bài tập áp dụng nhanh cho tất cả (không bài nào có sẵn mục này). Nội dung
// hóa học cốt lõi đã đúng và khá đầy đủ từ trước (seed ban đầu), chỉ thiếu phần liên hệ
// thực tế + luyện tập theo đúng khung skill chem-theory/chem-exercises.

const PATCHES = [
  {
    id: "cmrel0ofe000hvhd8jnz6n8xh", // Bài 18. Tính chất chung của kim loại
    append: `## Ứng dụng thực tế
Tính dẻo của kim loại được ứng dụng để dát mỏng làm giấy gói (nhôm), kéo sợi làm dây điện (đồng, nhôm); tính dẫn nhiệt tốt được ứng dụng làm dụng cụ nấu ăn (nồi, chảo bằng nhôm, inox).

## Bài tập áp dụng nhanh
1. Vì sao dây dẫn điện trong nhà thường làm bằng đồng hoặc nhôm mà không làm bằng sắt?
2. Kim loại nào sau đây phản ứng được với dung dịch HCl: Cu, Fe, Ag? Viết phương trình hoá học.
3. Cho 13 gam Zn (M = 65 g/mol) tác dụng hết với dung dịch HCl dư. Tính thể tích khí H2 thoát ra ở đkc.`,
  },
  {
    id: "cmrel0ofe000ivhd8rp62nwvx", // Bài 19. Dãy hoạt động hóa học
    append: `## Bài tập áp dụng nhanh
1. Sắp xếp các kim loại sau theo chiều giảm dần mức độ hoạt động hóa học: Cu, K, Fe, Ag.
2. Kim loại nào sau đây phản ứng được với nước ở điều kiện thường: Na, Fe, Cu?
3. Cho đinh sắt vào dung dịch AgNO3 dư. Viết phương trình hoá học xảy ra (nếu có) và giải thích.`,
  },
  {
    id: "cmrel0ofe000jvhd895nv14jf", // Bài 20. Tách kim loại và việc sử dụng hợp kim
    append: `## Ứng dụng thực tế
Thép không gỉ (hợp kim Fe với Cr, Ni) dùng làm dao kéo, bồn rửa, dụng cụ y tế nhờ khả năng chống ăn mòn; duralumin (nhẹ, bền) dùng chế tạo khung máy bay, vỏ tàu.

## Bài tập áp dụng nhanh
1. Vì sao gang giòn hơn thép còn thép lại dẻo dai hơn gang?
2. Nêu 1 lý do vì sao hợp kim thường được ứng dụng nhiều hơn kim loại nguyên chất.
3. Kể tên 2 phương pháp tách kim loại ra khỏi hợp chất của nó.`,
  },
  {
    id: "cmrel0ofe000kvhd8qi2zbyko", // Bài 21. Sự khác nhau cơ bản giữa phi kim và kim loại
    append: `## Ứng dụng thực tế
Than chì (1 dạng thù hình của carbon, phi kim) vẫn dẫn điện được nên được dùng làm điện cực trong pin, lò điện phân — đây là ngoại lệ đáng chú ý so với đặc điểm chung "phi kim dẫn điện kém".

## Bài tập áp dụng nhanh
1. Vì sao kim loại dẫn điện tốt còn phần lớn phi kim thì không?
2. Kể tên 1 phi kim tồn tại ở thể lỏng và 1 phi kim tồn tại ở thể khí tại điều kiện thường.
3. Nguyên tử kim loại và nguyên tử phi kim khác nhau cơ bản ở xu hướng nhường/nhận electron như thế nào?`,
  },
  {
    id: "cmrel0ost000lvhd83ks2zqke", // Bài 22. Giới thiệu về hợp chất hữu cơ
    append: `## Bài tập áp dụng nhanh
1. Chất nào sau đây là hợp chất hữu cơ: CO2, CH4, Na2CO3, C2H5OH? Giải thích.
2. Vì sao ethanol (CH3-CH2-OH) và dimethyl ether (CH3-O-CH3) có cùng công thức phân tử nhưng tính chất lại khác nhau hoàn toàn?
3. Hợp chất hữu cơ được chia thành mấy loại chính? Kể tên.`,
  },
  {
    id: "cmrel0ost000mvhd8g0knercu", // Bài 23. Alkane
    insertions: [
      {
        marker: "## Tính chất hóa học",
        text: `## Trạng thái tự nhiên
Methane có nhiều trong khí thiên nhiên, khí đồng hành trong mỏ dầu, và khí biogas sinh ra từ quá trình phân hủy chất hữu cơ (phân, rác thải) trong điều kiện yếm khí.

`,
      },
    ],
    append: `## Bài tập áp dụng nhanh
1. Viết công thức phân tử của alkane có 5 nguyên tử carbon (pentane).
2. Vì sao alkane được gọi là hydrocarbon no?
3. Đốt cháy hoàn toàn 4,4 gam propane (C3H8, M = 44 g/mol). Tính thể tích khí CO2 sinh ra ở đkc.`,
  },
  {
    id: "cmrel0ost000nvhd8qknt4dmu", // Bài 24. Alkene
    append: `## Bài tập áp dụng nhanh
1. Vì sao dung dịch bromine bị mất màu khi cho ethylene đi qua nhưng không bị mất màu khi cho ethane đi qua?
2. Viết phương trình hoá học của phản ứng trùng hợp ethylene tạo PE.
3. Nêu 1 ứng dụng thực tế của ethylene trong nông nghiệp.`,
  },
  {
    id: "cmrel0ost000ovhd827mj9e3f", // Bài 25. Nguồn nhiên liệu
    append: `## Bài tập áp dụng nhanh
1. Kể tên 3 loại nhiên liệu hóa thạch.
2. Vì sao nhiên liệu hóa thạch được gọi là nguồn năng lượng không tái tạo?
3. Nêu 2 nguồn năng lượng tái tạo có thể thay thế dần nhiên liệu hóa thạch.`,
  },
  {
    id: "cmrel0p6e000pvhd8mjyngdyq", // Bài 26. Ethylic alcohol
    append: `## Bài tập áp dụng nhanh
1. Vì sao không nên uống nhiều rượu, bia?
2. Viết phương trình hoá học của phản ứng giữa ethanol và sodium.
3. Cho 4,6 gam ethanol (C2H5OH, M = 46 g/mol) tác dụng hết với Na dư. Tính thể tích khí H2 thoát ra ở đkc.`,
  },
  {
    id: "cmrel0p6e000qvhd871zpix4i", // Bài 27. Acetic acid
    append: `## Bài tập áp dụng nhanh
1. Vì sao giấm ăn có vị chua?
2. Viết phương trình hoá học của phản ứng giữa acetic acid và Na2CO3.
3. Cho 12 gam acetic acid (CH3COOH, M = 60 g/mol) tác dụng hết với Zn dư. Tính thể tích khí H2 thoát ra ở đkc.`,
  },
  {
    id: "cmrel0pjg000rvhd8d90op9jo", // Bài 28. Lipid
    insertions: [
      {
        marker: "## Vai trò",
        text: `## Trạng thái tự nhiên
Chất béo có nhiều trong mỡ động vật (lợn, bò), dầu thực vật (dầu đậu nành, dầu lạc, dầu ô liu), trong sữa và một số loại hạt.

`,
      },
    ],
    append: `## Bài tập áp dụng nhanh
1. Vì sao lipid không tan trong nước nhưng tan được trong xăng, dầu hỏa?
2. Xà phòng hóa chất béo tạo ra 2 sản phẩm chính là gì?
3. Nêu 2 nguồn thực phẩm giàu chất béo thường gặp trong bữa ăn hàng ngày.`,
  },
  {
    id: "cmrel0pjg000svhd8geq1h1gk", // Bài 29. Carbohydrate, Glucose và saccharose
    append: `## Ứng dụng thực tế
Glucose được dùng làm dịch truyền tĩnh mạch trong y tế để bổ sung năng lượng nhanh cho người bệnh. Saccharose (đường mía) là chất tạo ngọt phổ biến nhất trong chế biến thực phẩm.

## Bài tập áp dụng nhanh
1. Nêu hiện tượng của phản ứng tráng bạc khi nhỏ dung dịch glucose vào ống nghiệm chứa thuốc thử.
2. Saccharose khi thủy phân trong môi trường acid tạo ra 2 sản phẩm nào?
3. Kể tên 2 loại quả có nhiều glucose.`,
  },
  {
    id: "cmrel0pjg000tvhd8ipdrw0dw", // Bài 30. Tinh bột và cellulose
    append: `## Bài tập áp dụng nhanh
1. Nêu cách đơn giản để phân biệt hồ tinh bột với nước đường bằng dung dịch iodine.
2. Vì sao cellulose bền hơn tinh bột dù có cùng công thức chung (C6H10O5)n?
3. Kể tên 2 nguồn cellulose thường gặp trong đời sống.`,
  },
  {
    id: "cmrel0pjg000uvhd8gdors3vg", // Bài 31. Protein
    append: `## Ứng dụng thực tế
Enzyme (bản chất là protein) trong nước bọt và dịch tiêu hóa giúp phân giải thức ăn; công nghiệp thực phẩm dùng enzyme để làm mềm thịt, sản xuất phô mai, lên men.

## Bài tập áp dụng nhanh
1. Vì sao khi luộc trứng, lòng trắng trứng chuyển từ lỏng trong suốt sang rắn đục màu trắng?
2. Protein bị thủy phân tạo thành chất gì?
3. Kể tên 3 loại thực phẩm giàu protein.`,
  },
  {
    id: "cmrel0pjg000vvhd8l6ve9tp9", // Bài 32. Polymer
    append: `## Bài tập áp dụng nhanh
1. Kể tên 2 polymer thiên nhiên và 2 polymer tổng hợp.
2. Vì sao nên hạn chế sử dụng túi nilon và đồ nhựa dùng một lần?
3. Cao su thiên nhiên được tạo thành chủ yếu từ đơn vị monomer nào?`,
  },
];

async function main() {
  let updated = 0;
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
    updated++;
  }
  console.log(`\nHoàn tất: cập nhật ${updated}/${PATCHES.length} bài.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
