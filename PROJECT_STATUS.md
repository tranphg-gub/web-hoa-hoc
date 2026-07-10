# Trạng thái dự án — Hóa Học Cùng Em

_Cập nhật: 2026-07-10 (sau khi hoàn thành GD1-GD3 và MR-A→MR-H, MR-J, MR-L). File này là "bức tranh toàn cảnh" — đọc file này trước để nắm thực trạng, thay vì đọc lại toàn bộ code._

## 1. Dự án là gì

Website học Hóa học lớp 8–12. Ban đầu là công cụ nhỏ cho <10 học sinh do giáo viên quản lý thủ công; từ 2026-07-10 đã mở rộng thêm đăng ký tự do có thu phí, bảo mật nâng cao, và đang tiếp tục mở rộng cộng đồng/phân luồng học tập theo `KE_HOACH_MO_RONG.md`. Xem file đó để biết kế hoạch đầy đủ và lý do các non-goal cũ trong `CLAUDE.md` được ghi đè.

## 2. Công nghệ đang dùng

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- SQLite qua Prisma ORM (`prisma/dev.db`, schema tại `prisma/schema.prisma`)
- Auth.js (NextAuth v5) — Credentials provider, mật khẩu hash bcrypt, JWT session
- **Google Gemini** (`@google/generative-ai`) cho module AI hỏi đáp — đã đổi từ Anthropic. **Cần điền `GEMINI_API_KEY` thật vào `.env`** (lấy miễn phí tại https://aistudio.google.com/apikey) — hiện đang để trống, chưa test thật.
- **PWA**: manifest + service worker tối giản (chỉ cache icon/manifest, không cache trang có xác thực) — cài được vào máy/điện thoại qua "Cài đặt ứng dụng" của trình duyệt
- Code đã đẩy lên `https://github.com/tranphg-gub/web-hoa-hoc` (nhánh `main`), local branch `master` tracking `origin/main`
- Chạy local qua `npm run dev` (http://localhost:3000)

## 3. Tính năng đã hoạt động

| Module | Trạng thái | Ghi chú |
|---|---|---|
| Đăng nhập/phân quyền | ✅ | 2 vai trò ADMIN/STUDENT, `proxy.ts` chặn route theo vai trò |
| Bảo mật tài khoản (MR-A) | ✅ | Khóa đăng nhập 15 phút sau 5 lần sai/username; bắt buộc đổi mật khẩu lần đầu (`mustChangePassword`); trang `/change-password` |
| Đăng ký tự do + học phí (MR-D) | ✅ (khung, chưa gateway thật) | `/register` công khai, 99.000đ/lớp, tài khoản tự đăng ký bị khóa ở `/payment-pending` cho tới khi admin xác nhận thủ công tại `/admin/payments`. Tài khoản admin tạo vẫn miễn phí như cũ |
| Tài liệu học tập | ✅ | Lớp → Chương (model `Chapter` riêng) → Bài; tiến độ "đã học x/y bài" theo chương; nút tải Markdown + in PDF (MR-B) |
| Bài kiểm tra tính giờ | ✅ | Deadline tính từ server (`lib/quiz-scoring.ts`, có unit test), tự nộp khi hết giờ, đánh dấu nộp trễ |
| Mức độ câu hỏi (Difficulty) | ✅ | 4 mức (Nhận biết/Thông hiểu/Vận dụng/Vận dụng cao), badge màu riêng, thống kê đúng/tổng theo mức độ ở trang kết quả |
| Trò chơi ghi nhớ | ✅ | 3 dạng: lật thẻ, ghép cặp, đố nhanh |
| AI hỏi đáp | ⚠️ Code xong (Gemini), **chưa có API key thật** | System prompt đã cải thiện: danh pháp KNTT, luôn cân bằng PTHH, thừa nhận khi không chắc |
| Admin — học sinh/thanh toán/chương/tài liệu/đề/flashcard | ✅ | CRUD đầy đủ, dropdown chọn Chapter (không gõ tay), trang riêng quản lý danh mục Chương |
| Mind map | ✅ | Theo `chapterId`, cả trang học sinh và admin |
| Điểm thưởng & xếp hạng (MR-E) | ✅ | Cộng điểm khi nộp bài kiểm tra (score×10, ×5 nếu nộp trễ), trang `/leaderboard` nội bộ |
| Diễn đàn (MR-F) | ✅ | `/forum` — đăng câu hỏi, học sinh trả lời lẫn nhau, nút "Hỏi AI gia sư" trả lời ngay trong luồng bình luận |
| Nhắc nhở học tập (MR-G) | ✅ | Banner trên dashboard: cảnh báo lâu chưa học (`lib/reminders.ts`, có unit test) + liệt kê đề kiểm tra chưa làm + đề đánh giá định kỳ chưa làm |
| Test đầu vào/đánh giá định kỳ + AI phân tích lộ trình (MR-H) | ✅ | `Quiz.kind` (REGULAR/PLACEMENT/MONTHLY_CHECK); nộp bài PLACEMENT/MONTHLY_CHECK tự động gọi "AI con" (`lib/ai/placement-analysis.ts`) phân tích điểm yếu + đề xuất ôn tập, hiển thị ở trang kết quả |
| GitHub (MR-J) | ✅ | Đã push lên `https://github.com/tranphg-gub/web-hoa-hoc` nhánh `main` |
| PWA (MR-L) | ✅ | Cài đặt được vào máy/điện thoại, xem mục 2 |

## 4. Việc đang làm dở / kế hoạch tiếp theo

Xem `KE_HOACH_MO_RONG.md` mục 2 để biết đầy đủ. Tóm tắt các phần **chưa làm**:

- MR-I: Rà soát nội dung chi tiết/chính xác hơn (đối chiếu thêm web khác) — khối lượng lớn (94 bài học), cần một phiên làm việc riêng
- MR-K: Public deploy — **chờ người dùng có mặt**, chưa tự làm theo đúng yêu cầu

## 5. Việc CẦN người dùng làm

- Điền `GEMINI_API_KEY` thật vào `.env` (lấy tại https://aistudio.google.com/apikey) để bật AI hỏi đáp và AI phân tích lộ trình học (MR-H).
- Có mặt khi triển khai public (theo đúng yêu cầu của bạn) — chọn nền tảng hosting (Vercel là lựa chọn tự nhiên nhất cho Next.js).
- Cung cấp thông tin chuyển khoản thật (số tài khoản ngân hàng...) nếu muốn hiển thị trên trang `/payment-pending` — hiện trang này chỉ ghi "liên hệ giáo viên", chưa có số tài khoản cụ thể vì tôi không tự bịa thông tin thanh toán.
- Nếu muốn dùng test đầu vào (MR-H) thật: tạo 1 Chapter "Ôn tập đầu năm" cho từng lớp, rồi tạo Quiz với "Loại đề" = Test đầu vào/Đánh giá định kỳ gắn vào chương đó.

## 6. Nội dung học tập hiện có trong database

| Lớp | Số bài | Đề kiểm tra | Câu hỏi | Bộ flashcard | Số thẻ |
|---|---|---|---|---|---|
| 8 | 11 | 2 | 12 | 2 | 15 |
| 9 | 15 | 4 | 20 | 3 | 17 |
| 10 | 16 | 7 | 23 | 4 | 18 |
| 11 | 19 | 6 | 27 | 6 | 18 |
| 12 | 22 | 8 | 34 | 8 | 20 |

Mỗi lớp có model `Chapter` riêng (grade, title, order) — Document/Quiz/FlashcardSet liên kết qua `chapterId`. Câu hỏi đã có mức độ khó (gán theo vị trí câu trong đề: câu 1-2 Nhận biết, câu 3 Thông hiểu, câu 4+ Vận dụng/Vận dụng cao — giáo viên nên rà lại qua trang quản trị nếu muốn chính xác hơn theo từng câu cụ thể).

## 7. Nguồn dữ liệu / seed script

```
npm run db:seed         # chỉ seed tài khoản (giaovien + 3 học sinh mẫu)
npm run db:seed:thcs    # Lớp 8-9  — tự chạy kèm gán độ khó
npm run db:seed:lop10   # Lớp 10
npm run db:seed:thpt    # Lớp 11-12
npm run db:assign-difficulty  # gán lại độ khó thủ công nếu cần (đã tự chạy sau mỗi seed ở trên)
```

Chạy lại các lệnh seed theo khối lớp sẽ xóa và ghi đè Document/Quiz/Flashcard/Chapter của đúng khối đó.

## 8. Tài khoản hiện có (dùng để test)

- Giáo viên: `giaovien` / `admin123`
- Học sinh mẫu: `hs_an` (lớp 8), `hs_binh` (lớp 10), `hs_chi` (lớp 12) — mật khẩu `hocsinh123`
- Học sinh do người dùng tự tạo thử qua Admin: `Phong 123` (lớp 9)

## 9. Thư mục tài liệu gốc

`Tài liệu/` (~4GB, gitignore, không push lên git) — kho tham khảo thô theo Lớp → Chủ đề, dùng để đối chiếu khi soạn nội dung, chưa số hóa hết vào web.

## 10. Cách chạy thử

```bash
npm install
npm run dev           # http://localhost:3000
npx tsc --noEmit      # kiểm tra kiểu
npm run build         # build production
npm run test          # unit test (quiz-scoring)
```
