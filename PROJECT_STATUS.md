# Trạng thái dự án — Hóa Học Cùng Em

_Cập nhật: 2026-07-10. File này ghi lại thực trạng dự án tại thời điểm hiện tại để tiện theo dõi/tiếp tục sau này._

## 1. Dự án là gì

Website học Hóa học lớp 8–12 cho nhóm nhỏ học sinh (<10 người), do giáo viên quản lý thủ công. Gồm 4 module: tài liệu học tập, bài kiểm tra tính giờ, trò chơi ghi nhớ, AI hỏi đáp — cộng thêm khu vực Admin cho giáo viên.

## 2. Công nghệ đang dùng

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- SQLite qua Prisma ORM (`prisma/dev.db`, schema tại `prisma/schema.prisma`)
- Auth.js (NextAuth v5) — đăng nhập bằng username/password (Credentials provider), mật khẩu hash bcrypt
- Anthropic API (`@anthropic-ai/sdk`) cho module AI hỏi đáp — **cần điền `ANTHROPIC_API_KEY` vào file `.env`** (hiện đang để trống, chưa test thật với API key)
- Chạy local qua `npm run dev` (http://localhost:3000)

## 3. Tính năng đã hoạt động

| Module | Trạng thái | Ghi chú |
|---|---|---|
| Đăng nhập/phân quyền | ✅ Hoạt động | 2 vai trò ADMIN/STUDENT, middleware chặn route theo vai trò |
| Tài liệu học tập | ✅ Hoạt động | Hiển thị theo Lớp → Chương → Bài, công thức hóa học tự render subscript/superscript, đánh dấu "đã học" |
| Bài kiểm tra tính giờ | ✅ Hoạt động | Đồng hồ đếm ngược tính từ server time (chống gian lận refresh), tự nộp khi hết giờ, chấm điểm + xem lại đáp án |
| Trò chơi ghi nhớ | ✅ Hoạt động | 3 dạng: lật thẻ, ghép cặp, đố nhanh — dùng chung data flashcard |
| AI hỏi đáp | ⚠️ Code xong, **chưa có API key thật** | Route trả lỗi rõ ràng "Chưa cấu hình ANTHROPIC_API_KEY" khi gọi thử |
| Admin — quản lý học sinh | ✅ Hoạt động | Tạo tài khoản, đặt lại mật khẩu, xóa. Đã có 1 tài khoản học sinh do người dùng tự tạo thử (`Phong 123`, lớp 9) |
| Admin — quản lý tài liệu/đề/flashcard | ✅ Hoạt động | CRUD đầy đủ, có **tìm kiếm + lọc theo lớp**, nhóm theo chương |
| Mind map (sơ đồ tư duy) | ✅ Hoạt động | Mỗi chương có nút "Sơ đồ tư duy" (cả trang học sinh và trang Admin), hiển thị cây: Bài học → các mục con trong bài |

## 4. Nội dung học tập hiện có trong database

Toàn bộ nội dung dựa theo đúng SGK Kết nối tri thức (đã tra cứu chính xác mục lục + đối chiếu số liệu dễ sai). Mỗi bài có cấu trúc: tiêu đề mục con (`##`), danh sách gạch đầu dòng, ví dụ minh họa có số liệu cụ thể, phần "Lưu ý" cho điểm hay nhầm.

| Lớp | Số bài | Đề kiểm tra | Câu hỏi | Bộ flashcard | Số thẻ |
|---|---|---|---|---|---|
| 8 | 11 | 2 | 12 | 2 | 15 |
| 9 | 15 | 4 | 20 | 3 | 17 |
| 10 | 16 | 7 | 23 | 4 | 18 |
| 11 | 19 | 6 | 27 | 3 | 18 |
| 12 | 22 | 8 | 34 | 4 | 20 |

Chương trình mỗi lớp:
- **Lớp 8**: Chương I (Phản ứng hóa học), Chương II (Một số hợp chất thông dụng)
- **Lớp 9**: Chương 6 (Kim loại), Chương 7 (Hydrocarbon), Chương 8 (Ethylic alcohol - Acetic acid), Chương 9 (Lipid-Carbohydrate-Protein-Polymer)
- **Lớp 10**: Chương 1–7 (Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Oxi hóa-khử, Năng lượng hóa học, Tốc độ phản ứng, Nhóm Halogen)
- **Lớp 11**: Chương 1–6 (Cân bằng hóa học, Nitrogen-Sulfur, Đại cương hữu cơ, Hydrocarbon, Alcohol-Phenol, Carbonyl-Carboxylic acid)
- **Lớp 12**: Chương 1–8 (Ester-Lipid, Carbohydrate, Hợp chất Nitrogen, Polymer, Pin điện-Điện phân, Đại cương kim loại, Nhóm IA-IIA, Kim loại chuyển tiếp-Phức chất)

Các bài "Ôn tập chương" trong SGK gốc được lược bỏ có chủ đích (chỉ tổng hợp lại, không có kiến thức mới).

## 5. Nguồn dữ liệu / seed script

Nội dung được viết trực tiếp trong 4 file seed, chạy độc lập theo từng khối lớp:

```
npm run db:seed         # dữ liệu demo gốc (không còn dùng nhiều, đã bị seed khác ghi đè phần lớn)
npm run db:seed:thcs    # Lớp 8-9  (prisma/seed-thcs.ts)
npm run db:seed:lop10   # Lớp 10   (prisma/seed-lop10.ts)
npm run db:seed:thpt    # Lớp 11-12 (prisma/seed-thpt-11-12.ts)
```

Chạy lại các lệnh trên sẽ xóa và ghi đè toàn bộ Document/Quiz/Flashcard của đúng khối lớp tương ứng (an toàn, không đụng khối lớp khác).

## 6. Tài khoản hiện có (dùng để test)

- Giáo viên: `giaovien` / `admin123`
- Học sinh mẫu: `hs_an` (lớp 8), `hs_binh` (lớp 10), `hs_chi` (lớp 12) — mật khẩu `hocsinh123`
- Học sinh do người dùng tự tạo thử qua Admin: `Phong 123` (lớp 9) — mật khẩu do người dùng đặt lúc tạo, không lưu lại ở đây

## 7. Thư mục tài liệu gốc (file thô giáo viên cung cấp)

Đã dọn dẹp từ hàng chục folder rời rạc, trùng lặp thành cấu trúc gọn trong `Tài liệu/` (~4GB), theo Lớp → Chủ đề:

```
Tài liệu/
  Lớp 8-9 (THCS)/       — Hóa cấp 2 (bài tập PTHH, tính toán), giáo án
  Lớp 10/               — theo 6 chủ đề: nguyên tử-bảng tuần hoàn, enthalpy, tốc độ pư, oxh-khử, halogen, đề kiểm tra
  Lớp 11/               — theo 7 chủ đề: cân bằng-pH, nitrogen-sulfur, đại cương hữu cơ, hydrocarbon, alcohol-phenol, carbonyl-acid, đề kiểm tra
  Lớp 12/                — Hóa 12 theo chuyên đề, ebook Nguyễn Anh Phong, đề kiểm tra
  Chương trình cũ (tham khảo)/
  Tổng hợp nhiều lớp - Ôn thi THPT/
```

File Toán/Lý/Python và các bản trùng lặp đã được xóa hẳn theo yêu cầu của bạn. Đây là kho tài liệu thô — **chưa được số hóa hết vào web**, chỉ mới dùng làm nguồn tham khảo/đối chiếu khi soạn nội dung ở mục 4.

## 8. Việc CHƯA làm / hạn chế còn tồn tại

- **AI hỏi đáp chưa có API key thật** — cần bạn điền `ANTHROPIC_API_KEY` vào `.env` để dùng được.
- Nội dung web hiện là **lý thuyết tóm tắt + trắc nghiệm** theo từng bài/chương — chưa khai thác hết kho bài tập tự luận chi tiết, đề thi thật trong `Tài liệu/` (kho này rất lớn, có thể tiếp tục số hóa dần nếu cần thêm câu hỏi).
- Mind map hiện là dạng cây phân nhánh đơn giản (CSS), chưa phải công cụ kéo-thả/chỉnh sửa được.
- Chưa test thật luồng AI chat với API key thật, và chưa test kỹ đa thiết bị/màn hình nhỏ ngoài kiểm tra bằng curl + build.
- Chưa có cơ chế backup/export dữ liệu tự động (SQLite file nằm ở `prisma/dev.db`, nên tự sao lưu định kỳ nếu triển khai thật).
- Thư mục `Tài liệu/` (~4GB) hiện nằm ngay trong thư mục dự án — nếu deploy lên hosting (Vercel...) cần loại trừ thư mục này ra khỏi git/deploy vì không phải mã nguồn.

## 9. Cách chạy thử

```bash
npm install          # nếu chưa cài
npm run dev           # chạy dev server tại http://localhost:3000
```

Nếu cần seed lại dữ liệu từ đầu (ví dụ sau khi sửa nội dung trong file seed):

```bash
npm run db:seed:thcs && npm run db:seed:lop10 && npm run db:seed:thpt
```
