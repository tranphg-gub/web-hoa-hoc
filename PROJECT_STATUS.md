# Trạng thái dự án — Hóa Học Cùng Em

_Cập nhật: 2026-07-11 (sau khi hoàn thành GD1-GD3, MR-A→MR-M, trừ MR-K, MR-N mining nội dung thật cho Lớp 11, MR-O mở rộng xuống Lớp 6-7, và MR-P mining thêm câu hỏi Lớp 8-9 từ tài liệu vừa upload). File này là "bức tranh toàn cảnh" — đọc file này trước để nắm thực trạng, thay vì đọc lại toàn bộ code._

## 1. Dự án là gì

Website học Hóa học lớp 6–12 (mở rộng từ phạm vi ban đầu 8–12 kể từ MR-O). Ban đầu là công cụ nhỏ cho <10 học sinh do giáo viên quản lý thủ công; từ 2026-07-10 đã mở rộng thêm đăng ký tự do có thu phí, bảo mật nâng cao, và đang tiếp tục mở rộng cộng đồng/phân luồng học tập theo `KE_HOACH_MO_RONG.md`. Xem file đó để biết kế hoạch đầy đủ và lý do các non-goal cũ trong `CLAUDE.md` được ghi đè.

## 2. Công nghệ đang dùng

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **PostgreSQL (Supabase)** qua Prisma ORM (đã đổi từ SQLite để deploy công khai được — SQLite không phù hợp hosting serverless như Vercel). Schema tại `prisma/schema.prisma`, kết nối qua `DATABASE_URL` (pooled) + `DIRECT_URL` (trực tiếp, dùng cho migration)
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
| Nội dung chi tiết hơn (MR-I) | ✅ | ~40/83 bài được bổ sung ví dụ số liệu cụ thể/ứng dụng thực tế; đã đối chiếu web tham khảo (vietjack, loigiaihay,...) và kiểm tra lại toàn bộ phương trình mới cân bằng đúng |
| Ngân hàng câu hỏi + Bài tập luyện tập + AI tạo đề (MR-M) | ✅ | Mở rộng 27 đề kiểm tra (từ ~4-5 câu lên 7-9 câu/đề); thêm mục `/practice` cho học sinh (làm tự do theo chương, biết đúng/sai + giải thích ngay, không tính giờ/điểm) với ~2-3 câu/chương khởi điểm; trang admin `/admin/practice` quản lý ngân hàng + `/admin/practice/generate` dùng AI (Gemini, system prompt riêng) soạn nháp câu hỏi, giáo viên duyệt trước khi lưu |
| Mining đề thi thật cho Lớp 11 (MR-N) | ✅ | Trích xuất từ kho `Tài liệu/Lớp 11/...` (PDF ảnh scan, đọc bằng thị giác + tự render trang qua `pdftoppm` khi cần): 26 đề, 648 câu hỏi trắc nghiệm thật (đề thi thử của giáo viên TYHH, Phạm Văn Trọng, Dương Quốc Trọng, và đề thi thật Sở GD-ĐT Quảng Ninh 2023-2024), qua script `scripts/import-real-exams.mjs` (idempotent, chạy lại an toàn). Các câu tự luận và câu Đúng/Sai (cấu trúc đề mới) bị bỏ qua vì không tương thích schema hiện tại; các câu có độ chắc chắn thấp (đọc phổ/cấu trúc mơ hồ) cũng bị bỏ qua để ưu tiên chất lượng hơn số lượng |
| Mining thêm Lớp 8-9 từ tài liệu vừa upload (MR-P) | ✅ | Từ `Tài liệu/Lớp 6-9 (THCS)/Mới upload (Lớp 6,7,8,9)/`: (1) bộ "440 bài tập trắc nghiệm" (đọc `.doc` cũ bằng `antiword -m UTF-8.txt`) — thêm 44 câu Oxide/Acid/Base/Muối vào quiz Chương II Lớp 8 và 21 câu Kim loại vào quiz Chương 6 Lớp 9; (2) file "Đại trà" Bài 25 Phân bón hoá học — viết lại lý thuyết chi tiết hơn cho Document Bài 12 + tạo mới 1 quiz riêng 34 câu (trước đó Bài 12 chưa có quiz); (3) file "Đại trà" Bài 14 Biến đổi vật lí/hoá học — thêm 30 câu vào quiz Chương I Lớp 8 (chỉ lấy câu có đáp án A/B/C/D tường minh trong tài liệu gốc, bỏ qua câu bị lỗi định dạng danh sách khi trích xuất docx và 1 câu có phương án không khớp đáp án hoá học). Script: `scripts/add-lop8-9-questions.mjs`, `scripts/add-phanbon-quiz.mjs`, `scripts/add-chuong1-questions.mjs` (đều idempotent, tự bỏ qua nếu đã chạy) |

## 4. Việc đang làm dở / kế hoạch tiếp theo

Xem `KE_HOACH_MO_RONG.md` mục 2 để biết đầy đủ. Chỉ còn:

- MR-K: Public deploy — **tạm dừng giữa chừng theo yêu cầu người dùng để rà soát lại nội dung trước (dẫn tới MR-M)**, cần tiếp tục: import project trên Vercel, set 5 biến môi trường (DATABASE_URL, DIRECT_URL, AUTH_SECRET, GEMINI_API_KEY, GEMINI_MODEL), bấm Deploy

## 5. Việc CẦN người dùng làm

- Điền `GEMINI_API_KEY` thật vào `.env` (lấy tại https://aistudio.google.com/apikey) để bật AI hỏi đáp và AI phân tích lộ trình học (MR-H).
- Có mặt khi triển khai public (theo đúng yêu cầu của bạn) — chọn nền tảng hosting (Vercel là lựa chọn tự nhiên nhất cho Next.js).
- Cung cấp thông tin chuyển khoản thật (số tài khoản ngân hàng...) nếu muốn hiển thị trên trang `/payment-pending` — hiện trang này chỉ ghi "liên hệ giáo viên", chưa có số tài khoản cụ thể vì tôi không tự bịa thông tin thanh toán.
- Nếu muốn dùng test đầu vào (MR-H) thật: tạo 1 Chapter "Ôn tập đầu năm" cho từng lớp, rồi tạo Quiz với "Loại đề" = Test đầu vào/Đánh giá định kỳ gắn vào chương đó.

## 6. Nội dung học tập hiện có trong database

| Lớp | Số bài | Đề kiểm tra | Câu hỏi (đề KT) | Bộ flashcard | Số thẻ | Câu luyện tập (`/practice`) |
|---|---|---|---|---|---|---|
| 6 | 7 | 3 | 36 | 3 | 30 | 0 |
| 7 | 6 | 4 | 47 | 4 | 40 | 0 |
| 8 | 11 | 3 | 126 | 2 | 15 | 10 |
| 9 | 15 | 4 | 50 | 4 | 17 | 13 |
| 10 | 16 | 7 | 41 | 7 | 18 | 19 |
| 11 | 19 | 32 | 648 | 6 | 18 | 10 |
| 12 | 22 | 8 | 50 | 8 | 20 | 9 |

Mỗi lớp có model `Chapter` riêng (grade, title, order) — Document/Quiz/FlashcardSet/PracticeQuestion liên kết qua `chapterId`. Câu hỏi đã có mức độ khó (gán theo vị trí câu trong đề: câu 1-2 Nhận biết, câu 3 Thông hiểu, câu 4+ Vận dụng/Vận dụng cao — giáo viên nên rà lại qua trang quản trị nếu muốn chính xác hơn theo từng câu cụ thể). Ngân hàng `/practice` mới có khởi điểm ~2-3 câu/chương — giáo viên có thể tự mở rộng thêm qua `/admin/practice/generate` (AI soạn nháp, duyệt trước khi lưu) mà không cần sửa code.

Riêng Lớp 11: 26 trong 32 đề (648 câu) là đề thi thật/thi thử sưu tầm từ giáo viên, gộp vào 1 chương dùng chung "Ôn tập tổng hợp Học kì 1" (không map được vào 1 chương cụ thể vì mỗi đề thường trải nhiều chương). Đáp án các đề không có sẵn đáp án án gốc (trừ bộ TYHH có khoanh tay) nên được giải bằng kiến thức hóa học — nên rà soát lại nếu phát hiện đáp án sai.

**Lớp 6-7 (mới, MR-O 2026-07-10)**: nội dung soạn từ tài liệu giáo viên cộng tác biên soạn (dự án KHTN 6789, phần Hóa học, người dùng upload) — mỗi bài có 1 Document (lý thuyết gốc do Claude viết lại dựa trên tài liệu tham khảo, không copy nguyên văn), gộp theo chương thành 1 Quiz + 1 FlashcardSet mỗi chương (đúng quy ước seed-thcs.ts cho lớp 8-9). Lớp 6: Chương 1 Chất quanh ta (bài 1-3), Chương 2 Vật liệu-nhiên liệu-nguyên liệu-lương thực thực phẩm (bài 4-5), Chương 3 Hỗn hợp (bài 6-7). Lớp 7: Chương 1 Nguyên tử-nguyên tố hóa học (bài 8-9), Chương 2 Bảng tuần hoàn (bài 10), Chương 3 Phân tử-liên kết hóa học (bài 11-12), Chương 4 Hóa trị-CTHH (bài 13). Chưa có `/practice`. Script: `npm run db:seed:lop6-7` (`prisma/seed-thcs-6-7.ts`).

**Lớp 8-9 mở rộng thêm (MR-P 2026-07-11)**: xem mục 3 hàng "Mining thêm Lớp 8-9". Bài 12 Phân bón hoá học từ chỗ chưa có quiz riêng nay có 34 câu; Chương I (Phản ứng hoá học, trọng tâm biến đổi vật lí/hoá học) và Chương II (Oxide/Acid/Base/Muối) đều được bổ sung nhiều câu hỏi thực tế có đáp án đối chiếu được. Do các câu mới được nối tiếp vào cuối đề (order 10+), script gán độ khó theo vị trí câu (mục 6) sẽ tự động gán phần lớn các câu này là "Vận dụng cao" dù độ khó thật có thể thấp hơn — hạn chế đã biết, chấp nhận được vì đây là cách toàn bộ ứng dụng đang xử lý các đề dài.

## 7. Nguồn dữ liệu / seed script

```
npm run db:seed         # chỉ seed tài khoản (giaovien + 3 học sinh mẫu)
npm run db:seed:lop6-7  # Lớp 6-7 — tự chạy kèm gán độ khó
npm run db:seed:thcs    # Lớp 8-9  — tự chạy kèm gán độ khó
npm run db:seed:lop10   # Lớp 10
npm run db:seed:thpt    # Lớp 11-12
npm run db:assign-difficulty  # gán lại độ khó thủ công nếu cần (đã tự chạy sau mỗi seed ở trên)
node scripts/import-real-exams.mjs  # thêm đề thi thật lớp 11 (idempotent, không xóa dữ liệu cũ)
```

Chạy lại các lệnh seed theo khối lớp sẽ xóa và ghi đè Document/Quiz/Flashcard/Chapter của đúng khối đó.

## 8. Tài khoản hiện có (dùng để test)

- Giáo viên: `giaovien` / `admin123`
- Học sinh mẫu: `hs_an` (lớp 8), `hs_binh` (lớp 10), `hs_chi` (lớp 12) — mật khẩu `hocsinh123`
- Học sinh do người dùng tự tạo thử qua Admin: `Phong 123` (lớp 9)

## 9. Thư mục tài liệu gốc

`Tài liệu/` (~4GB+, gitignore, không push lên git) — kho tham khảo thô theo Lớp → Chủ đề, dùng để đối chiếu khi soạn nội dung, chưa số hóa hết vào web. Thư mục `Tài liệu/Lớp 6-9 (THCS)/Mới upload (Lớp 6,7,8,9)/` chứa tài liệu giáo viên cộng tác biên soạn (dự án KHTN 6789) người dùng upload 2026-07-10 — đã khai thác phần "Đại trà" (cả 2 file Lớp 8: Bài 25 Phân bón, Bài 14 Biến đổi vật lí/hoá học) và bộ "440 bài tập trắc nghiệm" Lớp 8-9 (MR-O, MR-P). Còn chưa khai thác: thư mục "HSG" (14 chuyên đề nâng cao đã nộp trong tổng 70 dự kiến — Mol/tỉ khối, Nồng độ dung dịch, Tính toán theo PT, Năng lượng hoá học, Tốc độ pư/cân bằng, Định luật bảo toàn nguyên tố, Độ tan/muối ngậm nước, Oxide, Acid — nội dung dạng luyện thi HSG, phức tạp hơn chương trình đại trà, nên xử lý riêng một phiên khác để đảm bảo chất lượng) và các file KHTN 6/8/9 "TÀI LIỆU HỌC TẬP/DẠY THÊM" cỡ lớn (28-73MB/file, chưa mở).

## 10. Cách chạy thử

```bash
npm install
npm run dev           # http://localhost:3000
npx tsc --noEmit      # kiểm tra kiểu
npm run build         # build production
npm run test          # unit test (quiz-scoring)
```
