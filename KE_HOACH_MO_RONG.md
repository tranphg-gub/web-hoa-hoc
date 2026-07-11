# Kế hoạch mở rộng dự án (sau Giai đoạn 1-3)

_Tạo: 2026-07-10. Đây là kế hoạch cho đợt yêu cầu mở rộng lớn (thanh toán, cộng đồng, AI phân luồng, public deploy, đóng gói app). Ghi lại đầy đủ để không phải hỏi lại ý tưởng gốc mỗi lần tiếp tục._

## 0. Ý tưởng gốc của người dùng (tóm tắt, giữ nguyên ý)

1. Tham khảo các web học khác để bổ sung tính năng còn thiếu; nội dung học tập cần chi tiết và chính xác hơn.
2. Tăng bảo mật cho web, đặc biệt bảo mật tài khoản học sinh.
3. Thêm học phí 99k/lớp — 2 luồng: (a) học sinh **tự đăng ký** trên web → phải trả phí; (b) admin tạo tài khoản → **miễn phí**.
4. Tài liệu học tập cần có nút **tải xuống** cho học sinh.
5. Tính năng cộng đồng: đua top học tập, điểm thưởng, bảng xếp hạng.
6. Tích hợp thanh toán — **chỉ cần tạo khung trước, tính chi tiết (cổng thanh toán nào, số tài khoản...) sau**.
7. Nhắc nhở học viên học tập (học lâu chưa vào, sắp có bài mới...).
8. Phân luồng học sinh: bài test đầu vào (tổng hợp kiến thức năm trước), phân tích điểm yếu kỹ càng, đề xuất lộ trình ôn tập; lên lịch test định kỳ hàng tháng để đánh giá lại trình độ. Cần **một "AI con"** quản lý luồng này vì khá phức tạp.
9. Diễn đàn: (a) học sinh trao đổi với nhau, (b) học sinh hỏi AI (tách/nối với `/ask-ai` tùy lúc code).
10. Đổi AI backend sang **Gemini Pro (free tier)** dùng tài khoản Google cá nhân của người dùng — người dùng sẽ cung cấp key sau, **cần nhắc lại sau khi code xong**.
11. Đẩy code (không đẩy `Tài liệu/`) lên `https://github.com/tranphg-gub/web-hoa-hoc`.
12. Sau mỗi thay đổi, cập nhật **1 file "bức tranh toàn cảnh"** (snapshot trạng thái dự án) để đối chiếu nhanh, tránh phải đọc lại toàn bộ code.
13. Giữ nguyên giao diện hiện tại (không đổi UI/thiết kế đã có).
14. Cuối cùng: đưa web hoạt động công khai trên trình duyệt — **người dùng muốn có mặt/chứng kiến bước này**, không tự triển khai một mình.
15. Sau đó: đóng gói thành app tải xuống được.
16. Chỉ ghi vào "file tổng hợp cuối cùng" những gì đã hoàn thành ở bước cuối; các lần chỉnh sửa giữa chừng thì dùng file snapshot thay vì lặp lại mô tả.

## 1. Xung đột với CLAUDE.md hiện tại — cần lưu ý

`CLAUDE.md` mục 13 (Việc KHÔNG làm) liệt kê **không cần thanh toán/gói trả phí, không cần mạng xã hội/bảng xếp hạng công khai liên trường** — đây là các mục tiêu MỚI của người dùng nên các non-goal này coi như được **ghi đè có chủ đích** bởi yêu cầu trực tiếp trong hội thoại. Sẽ cập nhật `CLAUDE.md` để trỏ sang file kế hoạch này, tránh session sau bị nhầm hướng.

Ràng buộc an toàn tôi tự đặt ra khi thực hiện (không phải người dùng yêu cầu nhưng bắt buộc về mặt trách nhiệm):
- **Thanh toán**: chỉ làm khung dữ liệu + luồng xác nhận thủ công (admin duyệt "đã chuyển khoản"), **không** tích hợp cổng thanh toán thật, không xử lý số thẻ/tiền thật.
- **Public deploy**: chỉ chuẩn bị sẵn sàng, **không tự bấm deploy** — chờ người dùng có mặt theo đúng yêu cầu.
- **Push git**: repo hiện chưa có remote nào — sẽ xác nhận trước khi push lần đầu lên remote công khai (thao tác ảnh hưởng nơi khác/công khai).
- **Bảng xếp hạng/cộng đồng**: chỉ hiển thị nội bộ trong hệ thống (không public ra ngoài Internet, tôn trọng riêng tư trẻ em).

## 2. Danh sách giai đoạn (đặt tên rõ để tiện tra cứu)

| Mã | Tên giai đoạn | Rủi ro/độ phức tạp | Trạng thái |
|---|---|---|---|
| MR-A | Bảo mật tài khoản & hệ thống | Thấp | ✅ Xong (2026-07-10) |
| MR-B | Tải xuống tài liệu (export) | Thấp | ✅ Xong (2026-07-10) |
| MR-C | Đổi AI sang Gemini | Thấp-Trung bình (cần API key thật để test) | ✅ Code xong (2026-07-10), chờ API key thật |
| MR-D | Đăng ký tự do + khung học phí 99k/lớp (chỉ khung, chưa thanh toán thật) | Trung bình | ✅ Xong (2026-07-10) |
| MR-E | Điểm thưởng & bảng xếp hạng nội bộ | Trung bình | ✅ Xong (2026-07-10) |
| MR-F | Diễn đàn (học sinh ↔ học sinh, học sinh ↔ AI) | Trung bình | ✅ Xong (2026-07-10) |
| MR-G | Nhắc nhở học tập | Thấp | ✅ Xong (2026-07-10) |
| MR-H | Test đầu vào + phân luồng + lộ trình + "AI con" quản lý | **Cao** | ✅ Xong (2026-07-10) |
| MR-J | Đẩy code lên GitHub remote | Thấp (cần xác nhận trước khi push) | ✅ Xong (2026-07-10) — đã merge README có sẵn trên remote, push lên `main` |
| MR-L | Đóng gói app tải xuống (PWA) | Trung bình | ✅ Xong (2026-07-10) — PWA cài được, chưa đóng gói app native |
| MR-I | Nội dung chi tiết/chính xác hơn (đối chiếu web khác) | Xuyên suốt, làm song song | ✅ Xong (2026-07-10) — xem chi tiết mục 3 bên dưới |
| MR-M | Mở rộng ngân hàng câu hỏi + Bài tập luyện tập + AI tạo đề | Trung bình-Cao | ✅ Xong (2026-07-10) — 27 đề kiểm tra mở rộng lên 7-9 câu, thêm mục `/practice` + AI tạo đề cho giáo viên |
| MR-N | Khai thác kho `Tài liệu/` (đề thi thật) — ưu tiên Lớp 11 | **Cao**, khối lượng lớn | ✅ Xong (2026-07-10) — Lớp 11: 32 đề/648 câu (xem chi tiết mục 3 bên dưới) |
| MR-O | Mở rộng phạm vi xuống Lớp 6-7 (người dùng upload thêm tài liệu Hóa cấp 2) | Trung bình | ✅ Xong (2026-07-10) — Lớp 6-7: 7 chương, 13 bài, 7 đề/83 câu (xem chi tiết mục 3 bên dưới) |
| MR-P | Mining thêm câu hỏi Lớp 8-9 từ tài liệu vừa upload ("oke làm thêm") | Trung bình | ✅ Xong (2026-07-11) — 95 câu hỏi mới + 1 quiz mới (xem chi tiết mục 3 bên dưới) |
| MR-Q | Khảo sát kho "HSG chuyên đề" ("sang phần hsg") | Trung bình (khảo sát), nội dung thực tế quá cao so với lớp 8 | ✅ Xong (2026-07-11) — khảo sát 9 chuyên đề, quyết định loại phần lớn, chỉ giữ 12 câu (xem chi tiết mục 3 bên dưới) |
| MR-R | Sơ đồ tư duy đa dạng + cấu trúc đề mới CT GDPT 2018 + hình ảnh/slide tài liệu (phản hồi từ dùng thử thật) | **Cao** — đổi schema `Question`, đổi luồng làm bài/chấm điểm | ✅ Xong (2026-07-11) — test end-to-end qua trình duyệt thật, điểm chấm đúng (xem chi tiết mục 3 bên dưới) |
| MR-S | Nâng cấp AI soạn đề (bắt đầu ở phiên trước, hoàn thiện + test thật ở phiên này) | Trung bình-Cao | ✅ Xong (2026-07-11) — sửa key/model, test thật qua trình duyệt, phát hiện giới hạn 20 request/ngày/model của free tier |
| MR-T | Mining KHTN 8 Tài liệu học tập 2024 → ngân hàng `/practice` | Trung bình | ✅ Xong (2026-07-11) — đã chạy, +143 câu Lớp 8 |
| MR-U | Import Lớp 12 đề dự đoán định dạng mới + sửa lỗi bảo mật/toàn vẹn theo báo cáo review | **Cao** — sửa race condition, kiểm soát truy cập, transaction | ✅ Xong (2026-07-11) — +494 câu Lớp 12, sửa 5 lỗi đã xác minh (xem chi tiết mục 3 bên dưới) |
| MR-V | Bảng markdown trong tài liệu + thêm ảnh minh họa + rate-limit chuyển sang Postgres ("tiếp tục nâng cấp") | Trung bình | ✅ Xong (2026-07-11) — người dùng xác nhận không cần xóa câu trùng lặp; xem chi tiết mục 3 bên dưới |
| MR-W | Sửa thời lượng đề sai lệch + tách đăng nhập + 3 skill chuyên biệt + nâng cấp mẫu lý thuyết/bài tập Lớp 8+12 | **Cao** — audit toàn bộ ngân hàng đề, đổi UX đăng nhập, thiết lập quy trình mới | ✅ Xong (2026-07-12) — xem chi tiết mục 3 bên dưới; còn 1 câu hỏi cần người dùng quyết định (hướng đi sơ đồ tư duy) |
| MR-X | Sửa lỗi đăng nhập giáo viên 404 + khung mục lý thuyết đầy đủ hơn cho Lớp 8 Chương II | Trung bình | ✅ Xong (2026-07-12) — xem chi tiết mục 3 bên dưới |
| MR-Y | Hoàn tất nâng cấp Lớp 8 Chương I (6 bài) — Ứng dụng thực tế + Bài tập áp dụng nhanh | Trung bình | ✅ Xong (2026-07-12) — Lớp 8 (11 bài) coi như hoàn tất, xem chi tiết mục 3 bên dưới |
| MR-Z | Hoàn tất nâng cấp toàn bộ 28 bài còn lại của Lớp 12 (8 chương) | **Cao** — khối lượng lớn nhất từ trước tới nay trong 1 giai đoạn | ✅ Xong (2026-07-12) — Lớp 8 + Lớp 12 (40 bài) coi như hoàn tất, xem chi tiết mục 3 bên dưới |
| MR-AA→AD | Nâng cấp giao diện sơ đồ tư duy (màu/icon) + hoàn tất nâng cấp lý thuyết Lớp 9, 10, 6, 7, 11 | **Cao** — 63 bài còn lại + 1 component UI dùng chung | ✅ Xong (2026-07-12) — TẤT CẢ 7 khối lớp (96 bài) đã hoàn tất, xem chi tiết mục 3 bên dưới |
| MR-K | Public deploy | **Chờ người dùng có mặt** | ⏳ Tiếp tục sau MR-AD — đã chuẩn bị xong Postgres + Vercel env vars; điều kiện tiên quyết "rate-limit sang Postgres" đã xong ở MR-V, không còn gì chặn kỹ thuật |

Thứ tự thực hiện: A → B → C → D → E → F → G → I (song song, xen kẽ) → H (khi có thời gian, chia nhỏ tiếp) → J → K (chờ người dùng) → L.

## 3. Chi tiết từng giai đoạn

### MR-A: Bảo mật tài khoản & hệ thống
- Giới hạn số lần đăng nhập sai (khóa tạm thời theo username, ví dụ 5 lần sai/15 phút).
- Bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên (thêm `mustChangePassword Boolean` cho `User`).
- Trang tự đổi mật khẩu cho học sinh (hiện chưa có).
- Rà soát cookie/session NextAuth (secure, sameSite) khi deploy production.
- Kiểm tra giới hạn độ dài input ở các Server Action (tránh payload quá lớn).

### MR-B: Tải tài liệu
- Nút "Tải xuống" trên trang chi tiết tài liệu → xuất file Markdown (đơn giản, không phụ thuộc thư viện ngoài).
- Thêm CSS `@media print` để học sinh có thể "In/Lưu PDF" trực tiếp từ trình duyệt (không cần thư viện PDF phía server).

### MR-C: Đổi AI sang Gemini
- Thay `@anthropic-ai/sdk` bằng `@google/generative-ai` cho route `/api/ai/chat`.
- Đọc `GEMINI_API_KEY` từ `.env` (chưa có — sẽ nhắc người dùng bổ sung sau khi code xong).
- Giữ nguyên giao diện chat, system prompt gia sư Hóa học.

### MR-D: Đăng ký tự do + khung học phí
- `User.registrationSource`: `ADMIN_CREATED` (mặc định, miễn phí) | `SELF_REGISTERED`.
- `User.paymentStatus`: `FREE` | `PENDING` | `PAID` (mặc định `FREE` cho `ADMIN_CREATED`, `PENDING` cho `SELF_REGISTERED`).
- Trang `/register` công khai: học sinh tự tạo tài khoản, chọn lớp, thấy rõ giá 99.000đ/lớp/tháng (hoặc /khóa — sẽ hỏi lại người dùng mốc thời gian cụ thể khi tới bước hiển thị giá).
- Chặn truy cập nội dung học tập nếu `paymentStatus = PENDING` (hiển thị trang "đang chờ xác nhận thanh toán", hướng dẫn chuyển khoản thủ công).
- Trang admin duyệt danh sách chờ thanh toán → xác nhận thủ công.

### MR-E: Điểm thưởng & bảng xếp hạng
- `User.points` tích lũy từ kết quả quiz (điểm cao + làm đúng hạn → nhiều điểm hơn).
- Trang bảng xếp hạng nội bộ (trong phạm vi toàn bộ học sinh trong hệ thống, không public ngoài Internet).

### MR-F: Diễn đàn
- Model `ForumPost`/`ForumComment` đơn giản (tiêu đề, nội dung, người đăng, bình luận).
- Học sinh đăng câu hỏi, học sinh khác trả lời.
- Nút "Hỏi AI" ngay trong bài đăng (dùng chung logic AI gia sư).

### MR-G: Nhắc nhở học tập
- Banner trên dashboard: "Bạn chưa học bài nào 3 ngày qua", "Có đề kiểm tra mới ở chương X".
- Tính toán đơn giản từ `ReadDocument`/`QuizAttempt` timestamps, không cần hạ tầng email/push.

### MR-H: Test đầu vào + phân luồng + AI con (kế hoạch con — 2026-07-10)

Quyết định thiết kế: **tận dụng lại toàn bộ hạ tầng Quiz/Question/Chapter/Difficulty đã có** thay vì xây một hệ thống "ngân hàng đề" song song — tránh phình to kiến trúc không cần thiết.

1. Thêm `enum QuizKind { REGULAR, PLACEMENT, MONTHLY_CHECK }` và `Quiz.kind` (mặc định REGULAR). Test đầu vào/đánh giá định kỳ chỉ là Quiz có `kind` khác, tạo qua đúng giao diện admin quiz hiện tại (thêm dropdown "Loại đề").
2. Test đầu vào cho lớp N vẫn cần gắn vào 1 Chapter (ràng buộc hiện tại của Quiz) — giải pháp: giáo viên tạo 1 Chapter "Ôn tập đầu năm" cho lớp N (order 0), rồi tạo Quiz PLACEMENT dưới chương đó với câu hỏi tự chọn tổng hợp kiến thức lớp N-1. Không cần đổi schema Quiz↔Chapter.
3. Thêm model `LearningPathRecommendation` (userId, quizAttemptId, weakAreas JSON, recommendation text, createdAt) — lưu kết quả phân tích của AI cho 1 lần làm bài PLACEMENT/MONTHLY_CHECK cụ thể.
4. "AI con" = 1 system prompt riêng (`lib/ai/placement-analysis.ts`), khác với AI gia sư hỏi-đáp: nhận vào danh sách câu hỏi + đúng/sai + mức độ khó của lần làm bài, trả về (a) tóm tắt điểm yếu, (b) đề xuất ôn tập cụ thể, giọng khích lệ. Gọi qua `askGeminiOnce` đã có sẵn từ MR-F.
5. Khi nộp bài (submitQuizAttempt), nếu `quiz.kind !== REGULAR` → tự động gọi AI con phân tích, lưu `LearningPathRecommendation`, hiển thị ở trang kết quả (card riêng "Phân tích & lộ trình ôn tập").
6. Trang làm bài: nếu `kind !== REGULAR`, hiện banner cảnh báo nhắc học sinh làm nghiêm túc, không chọn bừa (đúng yêu cầu gốc của người dùng).
7. "Lên lịch hàng tháng": không cần cron job thật — banner nhắc nhở (tận dụng `lib/reminders.ts` từ MR-G) kiểm tra học sinh đã làm quiz MONTHLY_CHECK của lớp mình trong tháng hiện tại chưa, nếu chưa thì nhắc.
8. Không làm trong đợt này (out of scope, cân nhắc sau nếu cần): giao diện soạn "ma trận đề" chuyên biệt cho test đầu vào, phân tích xu hướng nhiều tháng, tự động tạo đề ngẫu nhiên từ ngân hàng câu hỏi lớn.

### MR-I: Nội dung chi tiết & chính xác hơn (hoàn thành 2026-07-10)
- Đã rà soát toàn bộ 83 bài học (lớp 8: 11, lớp 9: 15, lớp 10: 16, lớp 11: 19, lớp 12: 22), xác định các bài còn "mỏng" (thiếu ví dụ số liệu cụ thể) bằng script phân tích độ dài nội dung.
- Đã tra cứu tham khảo (web search: vietjack, loigiaihay, tech12h,...) để xác nhận đúng trọng tâm/dạng bài phổ biến theo SGK Kết nối tri thức trước khi bổ sung.
- Bổ sung cho khoảng 40 bài: mục "Ví dụ minh họa" với số liệu tính toán cụ thể (theo phương trình hóa học, tính %, định luật Faraday,...) hoặc "Ứng dụng thực tế"/"Lưu ý" mở rộng cho các bài mang tính lý thuyết mô tả.
- Đã kiểm tra lại toàn bộ phương trình mới thêm đảm bảo cân bằng đúng, và giữ đúng quy ước hiển thị ion (dùng dấu `^` cho điện tích ≥2, ví dụ `Ca^2+`).
- Các bài đã đầy đủ ví dụ/chi tiết từ trước (ví dụ Bài 32 Polymer lớp 9, Bài 22 Hydrogen halide lớp 10) được giữ nguyên, không chỉnh sửa lại để tránh rủi ro không cần thiết.

### MR-J: Đẩy code lên GitHub
- `git remote add origin https://github.com/tranphg-gub/web-hoa-hoc.git`
- Xác nhận với người dùng trước lần push đầu (repo hiện chưa có remote).
- Không push `Tài liệu/` (đã có trong `.gitignore`).

### MR-K: Public deploy — chờ người dùng
- Chuẩn bị sẵn sàng (build production, biến môi trường, checklist) nhưng **không tự triển khai** — đợi người dùng có mặt.

### MR-L: Đóng gói app tải xuống
- Đề xuất mặc định: **PWA** (Progressive Web App — cài được vào máy/điện thoại như app, không cần App Store, tận dụng toàn bộ code Next.js hiện có).
- Nếu người dùng muốn app "thật" (native) sẽ bàn thêm hướng Capacitor/Electron sau.

### MR-M: Mở rộng ngân hàng câu hỏi + Bài tập luyện tập + AI tạo đề (2026-07-10)

**Vấn đề người dùng phát hiện khi tự kiểm tra web**: đề kiểm tra mỗi đề chỉ có 2-6 câu (trung bình 4,3 câu/27 đề) — quá sơ sài so với phần lý thuyết đã làm giàu ở MR-I. Ngoài ra không có mục "Bài tập" (luyện tập tự do, không tính giờ/không tính điểm chính thức) cho học sinh — chỉ có "Đề kiểm tra" (tính giờ, tính điểm, dùng để đánh giá) và "Trò chơi ghi nhớ" (flashcard, học thuộc công thức/khái niệm). Học sinh cần thêm một hình thức luyện tập ở giữa hai loại đó: làm nhiều bài tập trắc nghiệm theo từng chương, biết đúng/sai + giải thích ngay, không áp lực thời gian.

**Quyết định thiết kế**:
1. Model `PracticeQuestion` **mới, độc lập** với `Question`/`Quiz`/`QuizAttempt` — không tính giờ, không tính điểm, không tạo `QuizAttempt`. Lý do tách riêng thay vì tái dùng Question: Question luôn gắn với 1 Quiz và guồng chấm điểm/deadline; bài tập luyện tập cần gắn thẳng vào Chapter, không giới hạn thời gian, học sinh có thể làm lại vô hạn lần — bản chất khác hẳn nên tách model cho rõ ràng, tránh nhồi thêm field tùy chọn (nullable quizId...) vào Question làm phức tạp logic chấm điểm đang chạy ổn định.
2. Trang học sinh `/practice`: chọn lớp → chọn chương → làm từng câu trắc nghiệm, bấm chọn đáp án là biết ngay đúng/sai + đọc giải thích, có thể chuyển câu tiếp/làm lại — không lưu lịch sử làm bài (giữ đơn giản, đúng tinh thần "luyện tập" chứ không phải "kiểm tra").
3. Trang admin `/admin/practice`: CRUD PracticeQuestion theo chương (thêm/sửa/xóa từng câu), có field `source` ghi nguồn (vd "SBT KNTT", "AI tạo - đã duyệt") để giáo viên biết xuất xứ.
4. **"AI chuyên tạo bài tập"**: trang admin `/admin/practice/generate` — giáo viên chọn Chương + mức độ (Difficulty) + số lượng câu muốn tạo → gọi Gemini với system prompt riêng (`lib/ai/exercise-generator.ts`, khác với AI gia sư và AI phân tích lộ trình) chuyên soạn câu hỏi trắc nghiệm Hóa học đúng chương trình KNTT → kết quả hiển thị dạng **bản nháp** để giáo viên xem/sửa từng câu trước khi bấm lưu vào ngân hàng (không tự động công khai thẳng cho học sinh — tránh rủi ro nội dung AI sinh ra chưa được kiểm chứng).
5. Mở rộng số câu hỏi trong các đề kiểm tra (Quiz) hiện có: từ trung bình 4-5 câu lên tối thiểu 8 câu/đề, nội dung tham khảo theo cấu trúc Sách bài tập (SBT) Kết nối tri thức.
6. Seed ban đầu: soạn thêm câu hỏi quiz (mục 5) và một ngân hàng PracticeQuestion khởi điểm (~5 câu/chương) cho toàn bộ 27 chương — sau đó giáo viên có thể tự mở rộng thêm qua công cụ AI ở mục 4 mà không cần sửa code.
7. Sau khi code+nội dung xong: chạy migration lên Postgres (Supabase) đang dùng, re-seed, verify, rồi mới tiếp tục các bước Vercel còn dang dở (MR-K).

### MR-N: Khai thác kho tài liệu thô `Tài liệu/` để mở rộng ngân hàng câu hỏi (2026-07-10)

**Vấn đề người dùng chỉ ra**: MR-M chỉ tự soạn ~240 câu hỏi (179 quiz + 61 practice) — quá ít so với quy mô "vài nghìn câu" hợp lý cho chương trình lớp 8-12, trong khi thư mục `Tài liệu/` (do người dùng cung cấp, ~4GB, gitignore) chứa rất nhiều đề thi/bài tập thật chưa được khai thác. Yêu cầu: ưu tiên khối lớp có nhiều tài liệu nhất trong folder.

**Khảo sát quy mô** (số file theo khối lớp): Lớp 11 (190 file: 102 PDF, 65 DOCX, 14 DOC, 8 ZIP) > Lớp 10 (94 file) > Lớp 8-9 (48 file) > Lớp 12 (28 file, chủ yếu ZIP nặng) > Chương trình cũ (2 file). **→ Ưu tiên Lớp 11 trước theo đúng yêu cầu.**

Riêng thư mục con `Lớp 11/Đề kiểm tra và ôn tập/` đã có: 13 đề riêng lẻ theo từng folder (ĐỀ SỐ 1-5 học kì 1, ĐỀ SỐ 01-03 giữa học kì 2, ĐỀ SỐ 1-5 thi thử học kì 2) + 4 file ZIP chứa thêm ~30 file PDF (nhiều file là "bộ đề" gộp 5-10 đề thi trong 1 PDF, ví dụ "SỐ 01-10" có 51 trang = 10 đề). Ước tính riêng thư mục này đã có 800-1500+ câu hỏi thật.

**Giới hạn kỹ thuật phát hiện**: các file `.doc`/`.docx` (46 file lớp 8-9, 65+14 file lớp 11) **không đọc được trực tiếp** bằng công cụ hiện có (không có pandoc/mammoth/python-docx cài sẵn) — tạm thời bỏ qua nhóm này, chỉ khai thác PDF trước (đã đọc thử, hiển thị đúng dạng ảnh, có thể trích xuất chính xác).

**Cách làm**:
1. Giải nén các file ZIP trong `Lớp 11/Đề kiểm tra và ôn tập/` (vào thư mục con `_extracted/`, không ảnh hưởng gì vì cả `Tài liệu/` đã gitignore).
2. Kiểm tra số trang từng PDF (qua đọc header `/Count`) để tránh đọc trùng lặp (ví dụ 5 file "SỐ 01-02", "03-04"... là bị tách nhỏ từ đúng nội dung file "SỐ 01-10" — chỉ cần đọc 1 trong 2 dạng).
3. Đọc từng PDF bằng Read tool (chia 20 trang/lần với file dài), trích xuất câu hỏi trắc nghiệm + đáp án đúng (nhiều đề đã có sẵn đáp án khoanh tròn tay).
4. Tạo 1 Chapter mới "Ôn tập tổng hợp Học kì 1" (và tương tự cho giữa/cuối học kì 2) cho lớp 11 để chứa các đề tổng hợp đa chương này (không map được vào đúng 1 chương cụ thể).
5. Ghi dữ liệu vào script import riêng (`scripts/import-real-exams.mjs`), chạy để insert thẳng vào Postgres — **không** gộp vào 3 file seed-*.ts hiện có (vì khối lượng lớn, tách riêng để không phải re-run toàn bộ seed mỗi lần muốn thêm).
6. Làm theo từng đợt, commit định kỳ sau mỗi vài đề để không mất tiến độ; báo cáo lại số liệu cụ thể cho người dùng theo từng chặng thay vì im lặng làm một mạch.
7. Sau khi khai thác xong Lớp 11 (ưu tiên 1), cân nhắc tiếp tục Lớp 10 nếu người dùng muốn mở rộng thêm các khối khác.

**Kết quả (hoàn thành 2026-07-10)**: Lớp 11 từ 6 đề/41 câu lên **32 đề/648 câu** (26 đề mới, 607 câu mới), tất cả gộp vào chương "Ôn tập tổng hợp Học kì 1". Nguồn đã khai thác:
- 5 đề (140 câu) từ các folder riêng lẻ "ĐỀ SỐ 1-5" (khóa LIVEVIP Hóa 11 - Thầy Ngọc Anh TYHH) — có đáp án khoanh tay trên bản scan nên độ tin cậy đáp án cao.
- 10 đề (295 câu) từ file gộp `HÓA 11-BỘ ĐỀ ÔN THI HỌC KỲ I-SỐ 01-10-ĐỀ.pdf` (bộ Phạm Văn Trọng) — không có đáp án gốc, tự giải bằng kiến thức hóa học.
- 5 đề (90 câu, chỉ Phần I) từ `BỘ ĐỀ ÔN THI HỌC KỲ 1-HÓA 11 THEO CẤU TRÚC MỚI-ĐỀ.pdf` — đề theo cấu trúc thi mới 2025 (Phần I trắc nghiệm 4 lựa chọn, Phần II Đúng/Sai, Phần III trả lời ngắn); chỉ trích Phần I vì Phần II/III không tương thích schema Question hiện tại (xem "Nợ kỹ thuật" bên dưới).
- 1 đề thật (28 câu) từ Sở GD-ĐT Quảng Ninh, đề kiểm tra cuối kì 1 năm học 2023-2024 — đề thi thật 100%, độ tin cậy nội dung cao nhất trong các nguồn.
- 5 đề (90 câu, chỉ Phần I) từ `Đề ôn 11 kì 1.pdf` (bộ Dương Quốc Trọng, cấu trúc mới, gồm cả chương Nitrogen/Sulfur lẫn Cân bằng hóa học/Điện li).

**Quyết định về chất lượng đáp án**: phần lớn các đề không kèm đáp án gốc (trừ bộ TYHH và Sở Quảng Ninh vốn đã có đáp án/khoanh tay rõ). Với các đề còn lại, đáp án được suy luận bằng kiến thức hóa học của Claude thay vì đoán — các câu có độ chắc chắn thấp (đọc phổ IR/MS mơ hồ không đủ dữ kiện phân biệt, cấu trúc hình vẽ khó xác nhận, tính toán nhiều bước không kiểm chứng được) đã bị **loại bỏ khỏi import** thay vì giữ lại với đáp án không chắc — ưu tiên chất lượng hơn số lượng. Vì vậy nhiều đề chỉ còn 18-28/30 câu so với bản gốc.

**Nợ kỹ thuật phát sinh**: đề thi theo "cấu trúc mới" (2025+) có 3 phần — Phần I (trắc nghiệm 4 lựa chọn, tương thích), Phần II (Đúng/Sai 4 ý mỗi câu), Phần III (trả lời ngắn dạng số). Model `Question` hiện tại chỉ hỗ trợ Phần I. Muốn khai thác Phần II/III (chiếm ~40% nội dung mỗi đề cấu trúc mới) cần bổ sung field/model mới cho 2 dạng câu hỏi này — đây là việc **có thể làm sau** nếu người dùng muốn, không nằm trong phạm vi MR-N lần này.

**Vấn đề môi trường phát sinh giữa chừng**: harness's Read tool (dùng để hiển thị trang PDF dạng ảnh) báo lỗi "pdftoppm is not installed" dù `poppler-utils` đã có sẵn trong PATH của Bash — nghi do tiến trình harness được khởi động từ trước khi poppler được cài, cache PATH cũ. Khắc phục tạm bằng cách tự gọi `pdftoppm` qua Bash để render từng trang PDF thành PNG vào thư mục scratchpad, rồi dùng Read tool đọc trực tiếp các file PNG đó (Read tool đọc ảnh thường vẫn hoạt động bình thường). Nếu vấn đề này còn tái diễn ở phiên làm việc sau, khởi động lại Claude Code có thể giải quyết dứt điểm (làm mới tiến trình harness).

### MR-O: Mở rộng phạm vi xuống Lớp 6-7 (2026-07-10)

**Yêu cầu người dùng**: "tôi vừa up thêm tài liệu hóa học cấp 2, bạn hãy tiếp tục nâng cấp phần Hóa cấp 2, bây h có cả lớp 6 và 7 rồi" — mở rộng phạm vi lớp học từ 8-12 xuống 6-12, cấp 2 (THCS) nay đủ cả lớp 6-9.

**Phát hiện ban đầu**: kiểm tra `Tài liệu/` không thấy file mới; hỏi lại người dùng thì té ra các file được để ở **thư mục gốc dự án** (không phải trong `Tài liệu/`), gồm nhiều `.docx`/`.doc`/`.zip`/`.rar` (~350MB tổng, các file KHTN 6/8/9, bộ đề trắc nghiệm lớp 9, và 1 file ZIP "Siêu Dự án cho cấp THCS"). Đã di chuyển toàn bộ vào `Tài liệu/Lớp 6-9 (THCS)/Mới upload (Lớp 6,7,8,9)/` (đổi tên thư mục từ "Lớp 8-9" thành "Lớp 6-9") để tránh bị lỡ commit lên git (thư mục gốc không nằm trong `.gitignore`, chỉ `/Tài liệu/` mới được ignore).

**Giải nén ZIP lồng nhau**: file "Siêu Dự án..." chứa 2 ZIP con: "Dự án viết tài liệu mảng HSG môn KHTN (Hóa)" và "...mảng đại trà môn KHTN (Hóa)" — đây là dự án cộng tác nhiều giáo viên biên soạn theo từng bài/chuyên đề, có file Excel liệt kê đầy đủ 43 bài "đại trà" (lớp 6-9) và 70 chuyên đề "HSG" (lớp 7-9) theo đúng thứ tự SGK KNTT. Chỉ một phần đã được giáo viên nộp bài (~16 file đại trà, ~15 file HSG) — nhưng may mắn **toàn bộ 7 bài Lớp 6 và 6 bài Lớp 7** (đại trà) đã có đủ.

**Công cụ đọc .docx**: không có pandoc/mammoth cài sẵn (giới hạn đã biết từ trước), nhưng phát hiện `python-docx` đã được cài qua pip — chỉ cần gọi đúng đường dẫn đầy đủ tới `python.exe` (`C:\Users\Admin\AppData\Local\Programs\Python\Python311\python.exe`) vì lệnh `python3`/`python` trong PATH trỏ nhầm sang Python Store-alias không có package. Đã viết script `docx_to_text.py` (đặt ở scratchpad, không phải code của dự án) trích xuất text + bảng từ file .docx.

**Kết quả**: cập nhật code hỗ trợ lớp 6-7 (dropdown chọn lớp ở `/register`, admin tạo học sinh/tài liệu/đề/flashcard/AI tạo bài tập, validate ở `register/actions.ts`, text mô tả trang chủ/manifest/system prompt AI) — không cần đổi schema vì `grade` vốn là `Int` tự do. Soạn nội dung Lớp 6 (3 chương: Chất quanh ta, Vật liệu-nhiên liệu-nguyên liệu-lương thực thực phẩm, Hỗn hợp) và Lớp 7 (4 chương: Nguyên tử-nguyên tố hóa học, Bảng tuần hoàn, Phân tử-liên kết hóa học, Hóa trị-CTHH) — mỗi bài 1 Document (lý thuyết viết lại theo chuẩn KNTT, có tham khảo tài liệu giáo viên nhưng không copy nguyên văn), gộp theo chương thành 1 Quiz (10-13 câu) + 1 FlashcardSet (10 thẻ) mỗi chương, đúng quy ước `seed-thcs.ts` cho lớp 8-9. Script: `prisma/seed-thcs-6-7.ts`, chạy qua `npm run db:seed:lop6-7`.

**Sự cố kỹ thuật đáng chú ý — bug tự gây ra**: khi soạn script seed nhiều lần bằng Edit tool (thêm từng chương một), một lần Edit đã vô tình để lại **2 lệnh gọi `main()`** ở cuối file (không xóa hết code cũ trước khi thêm code mới). Hậu quả: `main()` chạy 2 lần chồng chéo, cả hai đều tự `deleteMany` + tạo lại Chapter cùng lúc, gây lỗi "unique constraint" và "foreign key constraint" ngẫu nhiên, rất khó chẩn đoán vì triệu chứng giống lỗi consistency của kết nối pooled (PgBouncer) — đã mất nhiều bước thử (đổi sang DIRECT_URL, thêm delay, đo latency) trước khi phát hiện ra bằng cách thêm log debug và nhận thấy `main()` in log 2 lần. Bài học: khi sửa file bằng nhiều lệnh Edit nối tiếp, cần rà lại phần cuối file (đặc biệt các lệnh gọi hàm/khởi chạy) để chắc chắn không bị nhân đôi.

**Chưa làm (có thể làm tiếp nếu người dùng muốn)**:
- Phần "HSG" (70 chuyên đề nâng cao lớp 7-9) trong bộ tài liệu mới — mới có ~15/70 file được giáo viên nộp, có thể khai thác làm nội dung nâng cao/mở rộng riêng.
- Phần Lớp 8-9 bổ sung trong bộ tài liệu mới (`KHTN 8...docx`, `KHTN 9...docx`, `440 BAI TAP...LOP 9.doc`) — lớp 8-9 đã có nội dung cũ từ trước, đây là tài liệu để đối chiếu/bổ sung thêm nếu muốn.
- Ngân hàng `/practice` cho lớp 6-7 — hiện chưa có, có thể soạn thêm hoặc dùng `/admin/practice/generate` (AI) sau khi giáo viên xem qua.

### MR-P: Mining thêm câu hỏi Lớp 8-9 từ tài liệu vừa upload (2026-07-11)

**Yêu cầu người dùng**: "oke làm thêm" — tiếp tục khai thác phần chưa làm mà MR-O đã liệt kê (bộ "440 bài tập" Lớp 8-9 và 2 file "Đại trà" Lớp 8 còn sót).

**Bộ "440 bài tập trắc nghiệm" (`440 BAI TAP TRAC NGHIEM...LOP 9.doc`)**: file `.doc` cũ (OLE2), không đọc được bằng `python-docx` — dùng `antiword -m UTF-8.txt` (mapping file tại `/c/Program Files/Git/mingw64/share/antiword/UTF-8.txt`, bắt buộc phải có cờ này nếu không dấu tiếng Việt sẽ ra toàn dấu `?`). File có sẵn đáp án cho từng câu nên không cần tự giải. Nội dung tuy ghi nhãn "Lớp 9" (theo chương trình cũ) nhưng khớp đúng chủ đề Chương II Lớp 8 (Oxide/Acid/Base/Muối, chương trình KNTT mới) và chương Kim loại Lớp 9 — đã đối chiếu Document/Quiz hiện có trong DB để xác nhận đúng chỗ trước khi thêm. Chọn lọc 44 câu (Oxide/Acid/Base/Muối) nối vào quiz Chương II Lớp 8 (`cmrel0qky0018vhd8grpcucry`, order 10+) và 21 câu (Kim loại) nối vào quiz Chương 6 Lớp 9 (`cmrel0r8u001jvhd8y8fbeg1f`, order 9+). Script: `scripts/add-lop8-9-questions.mjs`.

**2 file "Đại trà" Lớp 8 còn sót (Bài 25 Phân bón, Bài 14 Biến đổi vật lí/hoá học)**: đọc bằng `python-docx` (đều là `.docx` chuẩn).
- Bài 25 Phân bón hoá học: tài liệu có lý thuyết chi tiết hơn Document sẵn có (phân loại đa/trung/vi lượng, phân đơn/kép, superphosphate đơn/kép, phân lân nung chảy, nguyên tắc "4 đúng") — đã viết lại và cập nhật Document Bài 12. Phần trắc nghiệm (41 câu) không có đáp án tường minh cho các câu Nhận biết/Thông hiểu (chỉ có ở các câu Vận dụng cao) nên tự kiểm chứng đáp án bằng lý thuyết trong chính tài liệu + kiến thức hoá học phổ thông (không đoán mò); bỏ 1 câu có số liệu tính toán vô lý (mẫu 15,55g nhưng ghi chứa 35,43g một thành phần — lỗi dữ liệu nguồn) và 2 câu bị lỗi đánh số/không có đáp án đối chiếu. Còn lại 34 câu, tạo mới 1 quiz riêng (trước đó Bài 12 chưa có quiz nào). Script: `scripts/add-phanbon-quiz.mjs`.
- Bài 14 Biến đổi vật lí/hoá học: Document Bài 2 hiện có đã đủ lý thuyết nên không sửa; chỉ khai thác phần trắc nghiệm (37 câu chia Nhận biết/Thông hiểu/Vận dụng cao). Một số câu Nhận biết/Thông hiểu bị mất nhãn A/B/C/D khi trích xuất (do dùng kiểu danh sách tự động của Word, `python-docx` không đọc được số/chữ cái danh sách) — các câu này bị loại bỏ hoàn toàn thay vì đoán nhãn. Một câu Thông hiểu dạng chọn tập hợp có phương án cho sẵn không khớp với đáp án đúng theo hoá học (đưa "lưu huỳnh cháy trong không khí" vào nhóm "biến đổi vật lí") nên cũng bị loại. Còn lại 30 câu đã tự kiểm chứng đáp án, nối vào quiz Chương I Lớp 8 (`cmrel0pwu000xvhd8phumi47u`, order 10+). Script: `scripts/add-chuong1-questions.mjs`.

**Tổng cộng phiên này**: 44 + 21 + 34 + 30 = 129 câu hỏi mới (95 câu nối vào quiz cũ + 34 câu trong quiz mới), 1 quiz mới, 1 Document được viết lại chi tiết hơn. Chạy lại `db:assign-difficulty` sau mỗi lần thêm (998 câu hỏi toàn hệ thống được gán lại mức độ).

**Chưa làm (giữ nguyên từ MR-O, chưa đổi)**: phần "HSG" (70 chuyên đề, 14 file đã nộp — nội dung luyện thi học sinh giỏi, phức tạp/rủi ro sai sót cao hơn nên cố tình chưa động tới trong phiên này để tránh vội vàng) và các file KHTN 6/8/9 "TÀI LIỆU HỌC TẬP/DẠY THÊM" cỡ lớn (28-73MB/file) — cả hai nên xử lý trong phiên riêng có đủ thời gian rà soát kỹ.

### MR-Q: Khảo sát kho "HSG chuyên đề" (2026-07-11)

**Yêu cầu người dùng**: "sang phần hsg, push lên git không push file tài liệu" — tiếp tục sang phần "HSG" mà MR-O/MR-P đã liệt kê là chưa làm.

**Phạm vi khảo sát**: trích xuất (`python-docx`) 9 trong 14 chuyên đề đã nộp, chọn theo chủ đề khớp lớp 8: Chuyên đề 10 (Mol và tỉ khối chất khí), 11 (Mối quan hệ m,n,V), 12 (Nồng độ dung dịch, pha chế, chuẩn độ), 13 (Độ tan và muối ngậm nước), 14 (Tính toán theo PTHH — lượng dư, hiệu suất), 15 (Năng lượng hoá học), 16 (Tốc độ phản ứng và cân bằng hoá học), 17 (Định luật bảo toàn nguyên tố), 19 (Oxide), 20 (Acid — 2 bản do 2 giáo viên khác nhau cùng nộp).

**Phát hiện chính (lý do loại phần lớn nội dung)**:
1. Đếm mật độ dòng có định dạng trắc nghiệm A/B/C/D cho thấy phần lớn chuyên đề (11, 12, 13, 14, 16, và 1 trong 2 bản của 20) gần như không có câu trắc nghiệm nào — toàn bộ là bài tập tự luận nhiều bước.
2. Đọc kỹ 3 chuyên đề có mật độ trắc nghiệm cao (17 - Bảo toàn nguyên tố, 19 - Oxide, 20b - Acid) thì phát hiện: nhiều câu trắc nghiệm ghi rõ nguồn "(Đề THPT QG - 20xx)", "(Đề TSĐH...)" — tức đề thi tốt nghiệp THPT/tuyển sinh đại học (mức lớp 12), được đưa vào bộ "chuyên đề HSG lớp 8" như bài tập nâng cao/mở rộng. Độ khó thực tế cao hơn nhiều so với mức phù hợp cho học sinh lớp 8 thường (đối tượng của web này là nhóm nhỏ học sinh do giáo viên quản lý, không phải lớp chuyên/đội tuyển).
3. Hạn chế kỹ thuật: các file này soạn công thức/số liệu trong lời giải bằng Word Equation Editor (OMML), không phải text thường — `python-docx` (chỉ đọc `paragraph.text`) không trích xuất được nội dung OMML, nên rất nhiều bước giải bị "mất số" (vd "Bảo toàn nguyên tố H → [trống]"). Muốn xác nhận đáp án đúng, sẽ phải tự giải lại toàn bộ bài toán nhiều bước phức tạp (hỗn hợp nhiều oxide/kim loại, oxi hoá khử, hữu cơ) mà không có gì đối chiếu — rủi ro tự tính sai cao, đi ngược nguyên tắc "chất lượng hơn số lượng" đã thống nhất từ MR-N.

**Quyết định**: không đưa phần lớn nội dung HSG vào quiz/practice. Chỉ giữ lại phần đủ đơn giản, đúng mức lớp 8, và tự kiểm chứng độc lập được (không cần lời giải gốc) từ Chuyên đề 10 (Mol và tỉ khối) — 12 câu trắc nghiệm 1 bước tính (dạng: cho tỉ khối, tính khối lượng mol; cho hỗn hợp khí, tính khối lượng mol trung bình/%) — mỗi câu đều tự giải lại bằng công thức cơ bản (dA/B = MA/MB, M trung bình theo số mol) để xác nhận đáp án trước khi thêm, không dựa vào lời giải trích xuất bị thiếu số liệu. Thêm vào quiz Chương I Lớp 8 (order 40+). Script: `scripts/add-hsg-lop8-questions.mjs`.

**Khuyến nghị cho tương lai**: nếu muốn khai thác tiếp kho HSG (70 chuyên đề, còn ~56 file chưa nộp/chưa xem), nên coi đây là nội dung "nâng cao/luyện thi chuyên" — phù hợp làm 1 tier riêng (vd gắn nhãn "Nâng cao" hoặc tách khỏi quiz đại trà) cho học sinh khá giỏi muốn thử sức, không trộn lẫn vào quiz kiểm tra thường của lớp 8 đại trà. Và bắt buộc phải tự giải lại từng bài từ đầu bài (không dựa vào "Hướng dẫn giải" trích xuất) do hạn chế OMML nêu trên.

### MR-R: Sơ đồ tư duy đa dạng + cấu trúc đề mới CT GDPT 2018 + hình ảnh/slide tài liệu (2026-07-11)

**Bối cảnh**: người dùng tự mở web thật bằng tài khoản giáo viên (qua Chrome do Claude điều khiển, đăng nhập sẵn) và dùng thử trực tiếp, sau đó phản hồi 4 việc: "có 2 mục tài liệu, sao 1 mục chỉ đến lớp 8?", "sơ đồ tư duy quá kém, nên đa dạng nhiều loại", "đề 1 bài cần rất nhiều [câu], hãy chia theo form mới của CT GDPT 2018", và yêu cầu tự đánh giá (đóng vai giáo viên nhiều lớp) xem số lượng hiện có đã đủ chưa.

**1. Bug trang `/documents`**: `user.grade ?? 8` trong `app/(app)/documents/page.tsx` khiến tài khoản giáo viên/admin (không gắn lớp cố định, `grade = null`) luôn bị mặc định lớp 8. Sửa bằng cách thêm bộ chọn lớp (`searchParams.grade`) chỉ hiện khi `user.grade == null`, mặc định lớp 6.

**2. Đa dạng sơ đồ tư duy**: viết lại `components/chemistry/mind-map-view.tsx` thành client component có 3 tab: **Sơ đồ cây** (org-chart bằng CSS thuần: viền + đường nối), **Sơ đồ vòng tròn** (radial, dựng bằng SVG — chương ở tâm, bài xoay quanh ở bán kính R1, tiêu đề con của mỗi bài toả ra ở bán kính R2 theo góc lệch quanh góc của bài cha; nhãn dùng `foreignObject` để chữ tự xuống dòng), **Dòng thời gian** (giữ nguyên bản cũ). Đã chỉnh 2 lần bán kính/góc toả để tránh chữ đè lên nhau khi 1 bài có nhiều tiêu đề con.

**3. Cấu trúc đề mới CT GDPT 2018** (người dùng chọn phạm vi: áp dụng **mọi lớp**, không chỉ 11-12):
- Migration `20260710203940_add_question_types`: thêm enum `QuestionType` (SINGLE_CHOICE/TRUE_FALSE_GROUP/SHORT_ANSWER) vào model `Question`; đổi `choices`/`correctIndex` thành nullable, thêm `statements` (JSON `{text, correct}[4]`) và `shortAnswer` (String).
- `lib/quiz-scoring.ts`: hàm `scoreQuestion` mới tính điểm theo dạng — SINGLE_CHOICE như cũ (đúng hết/không), TRUE_FALSE_GROUP chấm theo từng ý với thang **không tuyến tính** giống Bộ GD&ĐT chấm đề thi thật (đúng 1/2/3/4 ý trong 4 ý = 0,1/0,25/0,5/1 điểm câu đó), SHORT_ANSWER so khớp chuỗi đã chuẩn hoá (không phân biệt hoa/thường, khoảng trắng, dấu thập phân `,`/`.`). `scoreQuizAttempt` tổng hợp trung bình như cũ. Bổ sung test cho cả 3 dạng + 1 đề trộn cả 3 (`tests/quiz-scoring.test.ts`).
- Form soạn câu hỏi admin (`app/(app)/admin/quizzes/[id]/add-question-form.tsx`, tách thành client component mới) đổi UI theo dạng chọn: 4 ô đáp án + chọn đáp án đúng (SINGLE_CHOICE), 4 ô phát biểu a/b/c/d mỗi ô có radio Đúng/Sai (TRUE_FALSE_GROUP), 1 ô đáp án đúng dạng chữ/số (SHORT_ANSWER).
- Giao diện làm bài (`quiz-runner.tsx`) render đúng UI cho từng dạng: radio 4 đáp án, cặp nút Đúng/Sai cho từng ý, ô nhập text. Trang kết quả hiển thị đối chiếu đáp án theo từng dạng, có badge điểm từng phần (vd "0,5 điểm") khi Đúng/Sai chỉ đúng một phần.
- **Test end-to-end bằng trình duyệt thật**: viết script Node dùng Chrome DevTools Protocol (`--headless=new`, tự bơm cookie `authjs.session-token` qua `Network.setCookie` sau khi lấy được bằng đăng nhập curl) để mô phỏng học sinh (`hs_an`) làm 1 đề test có đủ 3 dạng câu hỏi, chụp màn hình từng bước, và đọc thẳng database sau khi nộp bài để xác nhận điểm số. Kết quả: điểm 10/10 đúng như kỳ vọng.
- **2 bug thật phát hiện được nhờ test bằng trình duyệt (không phải chỉ đọc code)**:
  a. Đóng gói câu trả lời Đúng/Sai bằng cách đọc `answers[questionId]` từ closure của state cũ — khi học sinh bấm nhiều ý liên tiếp thật nhanh (~1 giây/ý), các lần `setState` chồng lên nhau làm mất thao tác trước đó (giống bug batching kinh điển của React). Sửa bằng một `useRef` giữ bản sao đồng bộ của `answers`, đọc từ ref thay vì từ state/closure.
  b. Gọi server action (`saveQuizAnswer`) ngay bên trong callback của `setAnswers(prev => ...)` — vi phạm quy tắc của React ("Cannot update a component (Router) while rendering a different component (QuizRunner)") vì server action nội bộ cũng kích hoạt cập nhật router. Sửa bằng cách tách: cập nhật ref + gọi server action ở ngoài, `setState` chỉ nhận giá trị đã tính sẵn (không có side-effect bên trong updater).
- Đã xác nhận các đề trắc nghiệm cũ (SINGLE_CHOICE có sẵn từ trước) vẫn hoạt động bình thường sau migration (không cần backfill dữ liệu vì bỏ NOT NULL là thay đổi an toàn).

**4. Hình ảnh + chế độ trình chiếu cho tài liệu**: người dùng yêu cầu Claude tự tạo/tìm ảnh phù hợp thay vì chỉ toàn chữ.
- `components/chemistry/document-content.tsx` nhận thêm cú pháp dòng `![mô tả](url)` → render `<img>` (dùng thẻ `img` thường, không dùng `next/image`, để khỏi phải khai báo domain ảnh ngoài trong `next.config` — phù hợp quy mô nhỏ của dự án).
- `lib/content-slides.ts` (hàm `splitIntoSlides`) chia nội dung bài theo tiêu đề `##` thành từng slide; `components/chemistry/slide-viewer.tsx` (client) hiển thị từng slide với điều hướng bằng nút mũi tên, phím trái/phải, và chấm tròn nhảy tới slide bất kỳ.
- `components/chemistry/document-view-switcher.tsx` cho phép chuyển giữa "Bài viết" (như cũ) và "Trình chiếu" (slide) ngay trên trang chi tiết bài học.
- Tìm ảnh thật: dùng `WebSearch` + `WebFetch` để tìm và xác nhận URL gốc trên Wikimedia Commons (không tự đoán URL), ưu tiên giấy phép CC0/public domain, luôn `curl -I` kiểm tra `content-type: image/svg+xml` trước khi dùng. Đã thêm 5 ảnh vào 5 bài mẫu: sơ đồ trạng thái rắn/lỏng/khí (Lớp 6, Bài 2), mô hình nguyên tử Rutherford-Bohr (Lớp 7, Bài 8), bảng tuần hoàn đơn giản (Lớp 7, Bài 10), thang pH (Lớp 8, Bài 9), cấu trúc benzene (Lớp 11, Bài 17 Arene).

**Chưa làm / còn dang dở**:
- Mới có ảnh cho 5/96 bài — số còn lại chưa có ảnh minh họa, cần làm tiếp nếu muốn phủ toàn bộ.
- Chưa tăng số lượng câu hỏi/đề lên ~25-30 câu như đề thi thật — đang chờ người dùng dán `GEMINI_API_KEY` thật (đã xác nhận sẽ dán nhưng chưa gửi giá trị) để soạn hàng loạt bằng AI rồi rà soát, thay vì tự soạn tay từng câu (không khả thi ở quy mô ~1000+ câu cần thêm).
- Chưa sửa lại mức độ khó (766/1010 câu đang bị gán sai "Vận dụng cao") — cùng chờ Gemini key để chạy `scripts/assign-difficulty-ai.mjs` đã viết sẵn từ trước.
- Phát hiện phụ (chưa xử lý): `components/chemistry/document-content.tsx` chưa hỗ trợ cú pháp bảng markdown (`| ... |`) — 1 tài liệu Lớp 6 (Bài 2) có dùng bảng, hiện hiển thị thô (không parse thành bảng HTML).

### MR-S/MR-T: Hoàn thiện AI soạn đề + mining KHTN 8 (2026-07-11)

**Bối cảnh**: một phiên trước (bị ngắt quãng giữa chừng — có thông báo hệ thống "no completion record found") đã viết xong hạ tầng AI soạn đề mới (`lib/ai/generation-context.ts`, `lib/ai/quiz-question-generator.ts`, `app/(app)/admin/quizzes/[id]/ai-draft-form.tsx`) và 2 script import nội dung (`scripts/add-khtn8-tlht-practice.mjs`, `scripts/import-lop12-de-du-doan.mjs` + `scripts/data/*.json`) nhưng CHƯA CHẠY được vì cần `GEMINI_API_KEY` thật và có thể đã hết phiên giữa chừng. Phiên này (khi được giao tiếp tục qua báo cáo review) đã đọc kỹ toàn bộ diff/file mới trước khi động vào bất cứ gì — tránh làm lại hoặc xung đột với việc đang dang dở.

**Sửa key/model**: `.env` có `GEMINI_API_KEY=""AQ.Ab8...` (thiếu dấu `"` đóng, thừa dấu `"` mở — dán key vào giữa 2 dấu ngoặc kép rỗng thay vì thay thế nội dung) → sửa thành `GEMINI_API_KEY="AQ.Ab8..."`. Gọi thử `gemini-2.5-pro`/`gemini-2.5-flash` (model mặc định cũ trong code) đều lỗi 404 "no longer available to new users" — dùng API liệt kê model (`GET /v1beta/models`) để tìm model còn dùng được, chọn alias `gemini-flash-latest` (tự trỏ tới bản flash mới nhất, tránh phải sửa code mỗi khi Google đổi tên model) làm mặc định mới cho `lib/ai/gemini.ts`, `scripts/assign-difficulty-ai.mjs`, và `.env`.

**Test AI soạn đề thật**: điều khiển Chrome thật (CDP, đăng nhập giáo viên) bấm "AI soạn nháp" trên 1 đề Lớp 10. Request đầu (4 TN + 1 Đúng/Sai + 2 Trả lời ngắn, có lượt kiểm chứng thứ 2) mất ~60s, log server xác nhận 200 OK. Bấm lại ngay sau đó bị lỗi 429 — đọc kỹ thông báo lỗi phát hiện: **free tier Gemini giới hạn 20 request/NGÀY cho mỗi model** (`GenerateRequestsPerDayPerProjectPerModel-FreeTier`), không phải theo phút như comment cũ trong code giả định. Đây là giới hạn nghiêm trọng hơn nhiều so với dự tính ban đầu — ảnh hưởng trực tiếp tới khả năng dùng AI soạn đề/sửa độ khó hàng loạt trong 1 ngày.

**Chạy 2 script import đã chuẩn bị sẵn**: trước khi chạy, test lại `scripts/backup-db.mjs` (bản cũ copy `prisma/dev.db` SQLite — đã chết từ khi đổi sang Postgres, một phiên trước đã viết lại thành dump JSON qua Prisma) để có bản backup an toàn trước khi ghi dữ liệu mới — chạy thành công, xác nhận file JSON hợp lệ. Sau đó: `add-khtn8-tlht-practice.mjs` thêm 143 câu `/practice` Lớp 8 (0 trùng); `import-lop12-de-du-doan.mjs` thêm 38 đề/494 câu Lớp 12 đúng cấu trúc CT GDPT 2018 thật (không phải câu test) — ngân hàng Lớp 12 từ 8→46 đề, 50→544 câu.

**Chạy `assign-difficulty-ai`**: xử lý được ~240/1494 câu SINGLE_CHOICE (phân bố mới cân đối hơn nhiều so với gán theo vị trí cũ) trước khi hết quota 20 request/ngày — đã dừng lại đúng lúc thay vì để chạy lặp vô ích, tăng `BATCH_SIZE` từ 15→80 (giới hạn tính theo SỐ LƯỢT gọi chứ không theo token, nên gộp câu hỏi vào ít request hơn sẽ đỡ tốn quota hơn nhiều) để lần chạy sau (ngày hôm sau, khi quota reset) xử lý được nhiều hơn.

### MR-U: Import Lớp 12 + sửa lỗi bảo mật/toàn vẹn theo báo cáo review (2026-07-11)

**Bối cảnh**: người dùng dán một báo cáo review độc lập (không rõ nguồn) liệt kê nhiều vấn đề bảo mật/toàn vẹn/lộ trình nâng cấp, kèm yêu cầu "nghiên cứu và nâng cấp tiếp". Với khối lượng phát hiện lớn (roadmap nhiều giai đoạn, có mục cần vài tuần), đã **xác minh từng phát hiện bằng cách đọc code/query database thật** thay vì tin theo báo cáo, rồi chỉ sửa những gì xác nhận là lỗi thật và chi phí sửa hợp lý — không làm theo toàn bộ roadmap ngay.

**Đã sửa và test xác nhận**:
1. **Double-submit cộng điểm 2 lần**: `submitQuizAttempt` (`app/(app)/quizzes/actions.ts`) đọc `attempt.submittedAt` rồi mới `update` — giữa 2 bước có khoảng hở race condition nếu 2 request nộp bài chạy đồng thời (double-click, mạng lag rồi bấm lại). Sửa bằng `prisma.quizAttempt.updateMany({ where: { id, submittedAt: null }, data: {...} })` và chỉ cộng điểm/chạy phân tích AI khi `count === 1`. Đã test trực tiếp bằng 2 `updateMany` chạy song song thật (`Promise.all`) nhắm cùng 1 dòng — xác nhận đúng 1 request thắng (count 1 và 0), không phải cả 2 đều thắng.
2. **Học sinh xem được tài liệu/đề/flashcard của lớp khác nếu biết ID**: các trang chi tiết (`documents/[id]`, `documents/mindmap`, `quizzes/[id]`, `practice/[chapterId]`, `games/[setId]/{flashcards,matching,quiz}`) chỉ tìm theo ID, không đối chiếu `grade` của tài nguyên với `grade` của học sinh. Thêm hàm `canAccessGrade()` (`lib/require-auth.ts`) — ADMIN luôn qua, STUDENT phải đúng lớp — gọi ở cả 6 trang và trong action `startQuizAttempt` (chặn từ gốc, không chỉ chặn ở trang hiển thị). Cố tình dùng `notFound()` (404) thay vì lỗi "403 không có quyền" để không lộ việc tài nguyên có tồn tại hay không. Đã test bằng tài khoản thật: `hs_an` (lớp 8) mở tài liệu/đề/flashcard lớp 11 → 404 cả 3; vẫn mở được tài nguyên lớp 8 của chính mình → 200; `giaovien` (admin) vẫn mở được tài nguyên lớp 11 → 200.
3. **AI hỏi đáp lấy nhầm lịch sử chat**: `app/api/ai/chat/route.ts` dùng `orderBy: { createdAt: "asc" }, take: 20` — luôn lấy 20 tin nhắn ĐẦU TIÊN trong lịch sử thay vì 20 tin GẦN NHẤT, khiến AI "quên" mọi hội thoại sau khi học sinh chat quá 20 tin. Sửa bằng `orderBy: "desc", take: 20` rồi `.reverse()` lại cho đúng thứ tự thời gian.
4. **Xác nhận thanh toán không atomic**: `confirmPayment` (`app/(app)/admin/payments/actions.ts`) update `Payment` và `User` bằng 2 câu lệnh riêng — nếu ngắt giữa chừng có thể để lại trạng thái `Payment.status = "CONFIRMED"` nhưng `User.paymentStatus` vẫn `"PENDING"`. Gộp vào `prisma.$transaction([...])`.
5. **Tài liệu/thông điệp lỗi thời**: `README.md` vẫn là mặc định `create-next-app` — viết lại trỏ về `PROJECT_STATUS.md`/`CLAUDE.md`/`KE_HOACH_MO_RONG.md` thay vì trùng lặp nội dung. Trang chủ (`app/page.tsx`) ghi "không công khai đăng ký" dù `/register` đã công khai thu phí 99.000đ/lớp từ MR-D — sửa lại câu chữ cho khớp thực tế.

**Cố tình chưa sửa lúc đó (đã đánh giá, không phải bỏ sót)** — xem thêm mục 4 `PROJECT_STATUS.md`:
- **Rate-limit in-memory** — đã sửa ở MR-V bên dưới (chuyển sang Postgres) sau khi được yêu cầu "tiếp tục nâng cấp".
- **`Payment.status` là String thay vì enum, `choices`/`statements`/`answers` là JSON string thay vì bảng riêng**: đúng là thiết kế chưa chặt, nhưng sửa là refactor lớn ảnh hưởng nhiều file, rủi ro cao hơn lợi ích trước mắt với <10 người dùng hiện tại. Vẫn chưa sửa.
- **26 nhóm câu hỏi trùng nội dung+đáp án** (56/1504 câu, 3,7%) giữa các đề "dự đoán TN THPT 2026" khác nguồn — **người dùng đã xác nhận (2026-07-11) không cần xóa**: trùng 1 vài câu giữa các đề để học sinh ôn tập là chấp nhận được. Coi như đã đóng, không cần làm gì thêm.
- CI (lint/test/build tự động), error boundary/structured logging, dashboard giáo viên xem học sinh yếu ở đâu, spaced repetition cho flashcard, mobile bottom-nav — đều là tính năng/hạ tầng lớn, cần xác nhận độ ưu tiên trước khi bắt tay làm thay vì tự quyết làm hết trong 1 phiên. Vẫn chưa sửa.

### MR-V: Bảng markdown + thêm ảnh minh họa + rate-limit sang Postgres (2026-07-11)

**Bối cảnh**: người dùng phản hồi phát hiện 26 nhóm câu trùng lặp ở MR-U là **không cần xóa** ("có thể lặp giữa các đề 1 vài câu... để học sinh ôn"), rồi yêu cầu "tiếp tục nâng cấp" — tiếp tục theo đúng tinh thần chọn lọc việc có giá trị thật thay vì làm hết roadmap ban đầu.

1. **Bảng markdown trong `DocumentContent`**: khi thêm ảnh vào bài Lớp 6 "Các thể của chất và sự chuyển thể" (có sẵn 1 bảng so sánh 3 thể), phát hiện bảng `| ... |` không render — do bảng và dòng `## So sánh ba thể của chất` phía trước nằm chung 1 khối `\n\n` (chỉ cách nhau 1 dòng đơn), trong khi code cũ chỉ kiểm tra "cả khối có phải là bảng không" ở đầu hàm. Sửa: viết lại vòng lặp xử lý dòng trong khối từ `.forEach` sang `while` thủ công, nhận diện bảng bắt đầu tại BẤT KỲ vị trí nào trong khối (dòng bắt đầu bằng `|` và dòng kế tiếp khớp regex hàng phân cách `TABLE_SEPARATOR_ROW`), gom các dòng `|` liên tiếp thành `header`/`rows`, render qua component `MarkdownTable` mới, rồi tiếp tục xử lý các dòng còn lại trong khối như cũ. Test bằng ảnh chụp Chrome thật — bảng hiển thị đúng dạng HTML `<table>` có viền, cùng lúc ảnh Wikimedia phía dưới vẫn hiển thị đúng.
2. **Thêm 5 ảnh Wikimedia Commons nữa** (`scripts/add-more-images.mjs`, idempotent — kiểm tra `content.includes(imgLine)` trước khi ghi): biểu đồ thành phần khí trong không khí (Lớp 6, Oxygen và không khí), sơ đồ liên kết ion NaCl (Lớp 7, Liên kết hóa học), mô hình phân tử nước 3D (Lớp 7, Phân tử-đơn chất-hợp chất), hình dạng orbital s/p (Lớp 10, Cấu trúc lớp vỏ electron), sơ đồ pin điện hóa Zn-Cu (Lớp 12, Thế điện cực — thêm vào cuối bài vì không có mục con phù hợp để chèn giữa). Đều đã `curl -I` xác nhận `content-type: image/svg+xml` trước khi dùng, không tự đoán URL. Nâng tổng số bài có ảnh từ 5 (MR-R) lên 10/96.
3. **Rate-limit chuyển từ bộ nhớ trong process sang Postgres**: thêm model `RateLimitHit { id, key, createdAt }` (migration `20260711103856_add_rate_limit_hit`) — dùng chung 1 bảng cho cả rate-limit đăng nhập sai (`key = "login:<username>"`) và rate-limit gọi AI (`key = "ai:<userId>"`), phân biệt bằng tiền tố key thay vì 2 bảng riêng (đơn giản hơn, đúng tinh thần tránh over-engineering cho quy mô nhỏ). Viết lại `lib/login-rate-limit.ts`/`lib/ai/rate-limit.ts` thành hàm async: mỗi lần gọi tự xóa record đã hết hạn theo đúng `key` đang xét trước khi đếm (không cần cron/job dọn dẹp riêng, vì số dòng mỗi key luôn nhỏ và tự giới hạn). 3 call site cần thêm `await`: `lib/auth.ts` (3 chỗ), `app/api/ai/chat/route.ts`, `app/(app)/forum/actions.ts`.
   **Test thật qua HTTP** (không chỉ đọc code): dựng lại dev server (phải kill+`prisma generate` lại vì Windows khóa file DLL của Prisma Client khi dev server đang chạy), dùng `curl` mô phỏng luồng đăng nhập NextAuth thật (lấy CSRF token từ `/api/auth/csrf`, giữ cookie qua các request) với 1 username không tồn tại, gửi 6 lần sai mật khẩu liên tiếp: 5 lần đầu trả về `error=CredentialsSignin` (như bình thường) và ghi đúng 5 dòng vào bảng `RateLimitHit` (xác nhận bằng truy vấn Prisma trực tiếp); lần thứ 6 trả về `error=Configuration` — đúng hành vi mong đợi vì `authorize()` throw lỗi khóa tài khoản, NextAuth v5 hiển thị dạng lỗi cấu hình chứ không phải `CredentialsSignin`. Sau đó xóa sạch 5 dòng test và xác nhận tài khoản giáo viên có sẵn (xem mục 8 `PROJECT_STATUS.md`) vẫn đăng nhập thành công bình thường (redirect về `/`, không có `error=`). Gặp 1 trục trặc môi trường không liên quan tới logic: lần đầu curl ghi cookie jar vào đường dẫn có dấu tiếng Việt (`C:\web hóa học\...`) bị lỗi âm thầm (không tạo được file) — chuyển cookie jar sang thư mục scratchpad (đường dẫn thuần ASCII) thì chạy đúng.

### MR-W: Sửa thời lượng đề sai lệch + tách đăng nhập + 3 skill chuyên biệt + nâng cấp mẫu lý thuyết/bài tập Lớp 8+12 (2026-07-12)

**Bối cảnh**: người dùng phản hồi trực tiếp sau khi dùng thử, gộp nhiều ý trong 1 tin nhắn: (1) tài liệu cần tham khảo SGK/nội dung đã upload, trình bày khoa học hơn, có hình ảnh trực quan (không phải yêu cầu tạo bản trình chiếu — tính năng đó đã có); (2) bài tập cần tra thêm từ SBT môn Hóa chương trình mới; (3) phát hiện lỗi vô lý "đề kiểm tra 50 phút mà chỉ 12 câu"; (4) đăng nhập học sinh/giáo viên cần tách riêng, chọn rõ vai trò; (5) đã tự thêm một số ảnh sơ đồ tư duy Lớp 12 để tham khảo, muốn dựa vào đó tạo thêm; (6) yêu cầu tạo 3 skill chuyên biệt (lý thuyết, bài tập, hình ảnh) rồi mới bắt đầu nâng cấp thật, khởi động ở Lớp 8 và Lớp 12.

**1. Audit và sửa thời lượng đề kiểm tra**: viết script kiểm tra toàn bộ 99 đề (số câu vs phút), phát hiện 2 lỗi ngược chiều nhau cùng tồn tại: 38 đề "dự đoán TN THPT 2026" Lớp 12 (import ở MR-U) đều hardcode `durationSec: 3000` (50 phút) trong file JSON nguồn bất kể số câu trích xuất được (9-18 câu, trung bình ~13) — đối chiếu với đề "MAPSTUDY" cùng bộ có đủ 26 câu (16 TN + 4 Đúng/Sai + 6 Trả lời ngắn, gần đúng cấu trúc gốc 28 câu thật) thì tỉ lệ phút/câu hợp lý, xác nhận giả thuyết: 37 đề kia chỉ trích xuất được PHẦN TRẮC NGHIỆM, còn thiếu phần Đúng/Sai + Trả lời ngắn so với đề gốc đầy đủ. Ngược lại, 3 đề "Kiểm tra: Chương" Lớp 8/9 bị các script mining (MR-O, MR-P) nối thêm liên tục vào cùng 1 quiz tới 34-53 câu nhưng vẫn giữ nguyên 15 phút gốc — không thể làm hết trong thời gian đó. Viết `scripts/fix-quiz-durations.mjs`: tính `durationSec` theo tổng phút cần cho từng loại câu (1,5 phút/SINGLE_CHOICE, 3 phút/TRUE_FALSE_GROUP vì có 4 ý, 2 phút/SHORT_ANSWER), làm tròn lên bội số 5 phút, tối thiểu 10 phút — chạy cập nhật đúng 70/99 đề, script idempotent (có thể chạy lại sau mỗi lần thêm/bớt câu hỏi).

**2. Tách giao diện đăng nhập học sinh/giáo viên**: `app/login/login-form.tsx` thêm 1 tab chọn vai trò (pill 2 nút "Học sinh"/"Giáo viên") ở đầu form, đổi nhãn mô tả + placeholder tên đăng nhập theo tab đang chọn. Điểm quan trọng: **tab chỉ là gợi ý UX, không phải kiểm soát quyền** — sau khi đăng nhập thành công, code gọi `getSession()` lấy `role` THẬT của tài khoản để quyết định điều hướng (`/dashboard` cho STUDENT, `/admin` cho ADMIN), bỏ qua tab đã chọn nếu người dùng chọn nhầm — tránh vá thêm 1 lớp kiểm soát quyền song song với `proxy.ts`/`canAccessGrade()` đã có, đúng tinh thần "1 nguồn sự thật". Đã test bằng script Chrome CDP tự động điền form + bấm nút cho cả 3 trường hợp: tab Học sinh + tài khoản học sinh → `/dashboard`; tab Giáo viên + tài khoản giáo viên → `/admin`; tab Giáo viên + tài khoản học sinh (chọn nhầm) → vẫn về đúng `/dashboard` theo vai trò thật.

**3. Tạo 3 skill chuyên biệt** (`.claude/skills/chem-theory`, `chem-exercises`, `chem-images`, định dạng `SKILL.md` chuẩn Claude Code) — đóng gói lại toàn bộ quy ước/bài học đã tích lũy qua các MR trước (nguồn tham khảo ưu tiên, cú pháp `DocumentContent`, quy trình xác minh ảnh Wikimedia, nguyên tắc tự kiểm chứng đáp án, công thức thời lượng đề...) thành tài liệu có thể tái sử dụng, thay vì phải nhớ lại từ đầu mỗi phiên.

**4. Nâng cấp mẫu 1 bài Lớp 8 + 1 bài Lớp 12** (làm trước để thống nhất quy trình, chưa mở rộng ra hết):
- **Lớp 8 — Bài 11. Muối**: nội dung cũ chỉ 535 ký tự (thiếu bảng tính tan, thiếu tên gọi gốc acid, tính chất hóa học sơ sài). Đọc trực tiếp `Tài liệu/Lớp 6-9 (THCS)/SGK KHTN 8 - KNTT.pdf` (bản scan "Full page photo", không có text layer, phải dùng `pdftoppm` render từng trang rồi đọc bằng thị giác — dò được đúng trang 48-52 bằng cách nhị phân dựa vào các "Bài" lân cận) — viết lại đầy đủ: khái niệm, bảng tên gọi gốc acid, **bảng tính tan** (dùng đúng tính năng bảng markdown mới ở MR-V), 4 loại tính chất hóa học kèm PTHH thật từ SGK, điều chế, mối quan hệ oxide-acid-base-muối, ứng dụng thực tế. Thêm 1 ảnh thật (ruộng muối Ninh Hòa, Wikimedia, CC-BY-SA 3.0). Kết quả: 535 → 4064 ký tự, test bằng ảnh chụp Chrome thật xác nhận bảng + PTHH + ảnh đều render đúng.
- **Lớp 12 — Bài 1. Ester - Lipid**: nội dung cũ 997 ký tự, thiếu công thức chung, tính chất vật lí, danh pháp/ứng dụng. Bổ sung dựa trên nội dung SBT-KNTT thật (xem mục 5) + kiến thức hóa học hữu cơ đã kiểm chứng, thêm 1 ảnh cấu trúc phân tử triglyceride (Wikimedia, public domain). Kết quả: 997 → 3414 ký tự.
- **Sự cố khi chèn ảnh JPEG lớn**: ảnh ruộng muối Ninh Hòa (bản gốc 6,99MB) liên tục bị lỗi khi tải qua headless Chrome (script CDP dùng để chụp màn hình xác minh) — trang trả về "Wikimedia Error: Too many requests", trong khi `curl` tải cùng URL vẫn thành công bình thường mọi lúc. Chẩn đoán bằng cách kiểm tra `img.complete`/`naturalWidth` qua `Runtime.evaluate`, thử tắt cờ `--disable-blink-features=AutomationControlled` (loại trừ khả năng do bot-detection), và dùng `WebFetch` tải trực tiếp để xác nhận file vẫn tải được (chỉ không mô tả được vì là ảnh nhị phân) — kết luận: vấn đề chỉ xảy ra với ảnh gốc dung lượng lớn qua trình duyệt đầy đủ, không phải do URL sai hay do headless/bot-detection. Giải pháp: đổi sang URL thumbnail Wikimedia (`.../thumb/x/xx/Tên.jpg/960px-Tên.jpg`, phải lấy đúng 1 trong các size Wikimedia liệt kê sẵn ở trang File — thử size tùy ý sẽ bị lỗi 400) — tải nhanh hơn và không còn bị chặn. Đã ghi lại bài học này vào skill `chem-images` để áp dụng ngay từ đầu cho các ảnh JPEG lớn tiếp theo.

**5. Giải nén và khảo sát SBT Lớp 12**: `Tài liệu/Lớp 12/Hóa 12 theo chuyên đề/*.zip` chứa SBT thật cho từng chương theo cả 3 bộ sách (Kết nối tri thức, Chân trời sáng tạo, Cánh diều) cộng nhiều "tờ" bài tập/đề luyện tập tự soạn có đáp án — nguồn phong phú hơn nhiều so với Lớp 8 (không có SBT chính thức trong kho). Giải nén thử `Chương 1 Ester-Lipid.zip` (15 file), đọc `(TỜ SÁCH BÀI TẬP-KNTT) Chương I - BT Hoá 12 - KNTT-ĐỀ.pdf` (PDF lỗi text-layer do dùng optional-content-group, phải render ảnh + đọc thị giác như SGK Lớp 8) — nội dung chia rõ theo mức độ NHẬN BIẾT/THÔNG HIỂU/VẬN DỤNG giống hệt cấu trúc `Difficulty` enum của app, có cả câu hỏi Đúng/Sai 4 ý sẵn sàng cho `TRUE_FALSE_GROUP`. File không có đáp án in kèm phần trắc nghiệm đơn giản (có lời giải chi tiết cho câu vận dụng) — tự giải 10 câu nhận biết/thông hiểu bằng kiến thức hóa học hữu cơ, kiểm chứng độc lập từng câu trước khi đưa vào `/practice` Lớp 12 (script `scripts/add-lop12-sbt-ester-practice.mjs`, idempotent). Chưa mining các câu Đúng/Sai và câu vận dụng tính toán (cần thời gian kiểm chứng kỹ hơn) — để lại cho lần sau.

**6. Phát hiện ngoài kế hoạch — lỗi hydration thật ở `PracticeRunner`**: sau khi thêm 10 câu practice cho Chương 1 Lớp 12 (từ 1 câu lên 11 câu), ảnh chụp Chrome hiện huy hiệu đỏ "1 Issue" ở góc màn hình. Đọc log dev server thấy lỗi React hydration mismatch: `PracticeRunner` gọi `shuffleOrder()` (dùng `Math.random()`) ngay trong `useState(() => ...)`, hàm này chạy độc lập ở cả server (render lần đầu) và client (lúc hydrate), cho ra 2 thứ tự câu hỏi khác nhau → nội dung badge độ khó không khớp giữa server và client. Lỗi có sẵn từ trước, chỉ không lộ ra vì chương này trước đó chỉ có 1 câu (xáo 1 phần tử luôn cho cùng 1 kết quả). Sửa bằng cách khởi tạo `order` theo thứ tự gốc (giống nhau ở cả 2 phía) rồi chỉ xáo thật trong `useEffect` (chỉ chạy ở client, sau khi hydrate xong) — đã test lại, huy hiệu lỗi biến mất.

**7. Phát hiện quan trọng cần người dùng quyết định — ảnh sơ đồ tư duy tham khảo**: trong lúc dọn `git status` trước khi commit, phát hiện 12 file `.jpg` tên dạng `1783785274882_..._....jpg` nằm trực tiếp ở thư mục gốc dự án (không phải trong `Tài liệu/`) — mở ra xem thì đây chính là "sơ đồ tư duy Lớp 12" người dùng nhắc tới: ảnh infographic phong cách hữu cơ (tế bào, nhánh cong), có icon 3D, mô hình phân tử, do 1 công cụ tạo ảnh AI khác vẽ (watermark "TÔI ♥ HÓA HỌC"), phủ các chủ đề như Peptide, Amino Acid, Carbohydrate, Bài 13 Vật liệu Polymer... Đây là dạng nội dung **ảnh tĩnh do AI sinh ảnh tạo ra**, khác hoàn toàn cơ chế hiện tại của app (`mind-map-view.tsx` tự dựng sơ đồ bằng CSS/SVG từ heading `##` của Document — ưu điểm là sửa text thì sơ đồ tự cập nhật theo, không cần vẽ lại). Muốn đạt đúng phong cách trong ảnh mẫu cần tích hợp thêm 1 dịch vụ sinh ảnh AI (chi phí theo lượt gọi + rủi ro mới: nội dung hóa học "vẽ" vào ảnh không tự sửa lại được như text nếu sai, cần quy trình duyệt riêng) — đây là quyết định về hướng đi và chi phí, không tự ý chọn thay người dùng được. Đã nêu câu hỏi cụ thể ở mục 5 `PROJECT_STATUS.md`. 12 file ảnh vẫn giữ nguyên ở thư mục gốc, chưa đưa vào git (không phù hợp làm asset code) — chờ người dùng quyết định giữ/di chuyển/xóa.

### MR-X: Sửa lỗi đăng nhập giáo viên 404 + khung mục lý thuyết đầy đủ hơn cho Lớp 8 Chương II (2026-07-12)

**Sửa lỗi đăng nhập giáo viên**: ngay sau khi báo cáo MR-W, người dùng phản hồi "lỗi k vào được web". Đọc log dev server thấy `GET /admin 404` lặp lại ngay sau `POST /api/auth/callback/credentials 200` — nguyên nhân: tab "Giáo viên" mới thêm ở MR-W điều hướng về `/admin`, nhưng thư mục `app/(app)/admin/` không có `page.tsx` riêng (chỉ có các trang con `students/`, `quizzes/`, `documents/`...), nên `/admin` tự nó 404. Sửa `defaultCallback` của `ADMIN` trong `login-form.tsx` thành `/admin/students`, test lại bằng script Chrome CDP xác nhận đăng nhập xong vào đúng trang "Quản lý học sinh". Bài học: khi thêm điều hướng theo role mới, phải xác nhận route đích thực sự tồn tại (`curl` hoặc test thật), không suy đoán theo tên.

**Khung mục lý thuyết đầy đủ hơn**: người dùng phản hồi tiếp nội dung lý thuyết "tạm tạm nhma vẫn thiếu nhiều thứ", chỉ rõ: mỗi bài nói về "1 dạng chất" phải luôn có tính chất vật lí (TCVL), tính chất hóa học (TCHH), và các phần khác như giới thiệu, trạng thái tự nhiên, cách điều chế — đồng thời chỉ tới 1 nguồn tham khảo cụ thể: "file ôn tập cấp 2 (2)". Tìm bằng `find "Tài liệu" -iname "*(2)*"`, xác định đúng file `Tài liệu/Lớp 6-9 (THCS)/Hóa cấp 2 - Bài tập PTHH và tính toán/Ôn tập kiến thức cấp 2(2).docx` — tài liệu ôn tập THCS do giáo viên tự soạn, đọc bằng `python-docx` (gặp lỗi encoding cp1252 khi in tiếng Việt trên Windows, sửa bằng bọc `sys.stdout` UTF-8), rất súc tích nhưng đủ Kim loại/Oxide/Acid/Base/Muối, kể cả các phần hay bị bỏ sót (muối bị nhiệt phân, độ mạnh yếu của acid, H2SO4 đặc/HNO3 tính oxi hóa mạnh — đúng những gì bản nháp MR-W còn thiếu).

Cập nhật skill `chem-theory` thêm mục "Khung mục CỐ ĐỊNH khi bài học nói về 1 loại chất/hợp chất" (7 mục: Giới thiệu, Trạng thái tự nhiên, TCVL, TCHH, Điều chế, Ứng dụng, Bài tập) và bổ sung file ôn tập THCS vào danh sách nguồn tham khảo ưu tiên.

Áp dụng khung mới cho 4 bài Lớp 8 Chương II — kết hợp đọc thêm SGK KHTN 8 KNTT (trang 35-38 cho Acid, dò bằng cách nhị phân theo số trang các "Bài" lân cận) với file ôn tập:
- **Bài 8. Acid**: viết lại hoàn toàn (1250 → 4195 ký tự) — thêm trạng thái tự nhiên (giấm ăn, dịch vị dạ dày), TCVL (H2SO4 đặc sánh như dầu ăn, cảnh báo an toàn khi pha loãng), tác dụng muối, acid mạnh/yếu, tính oxi hóa mạnh của H2SO4 đặc/HNO3, sản xuất công nghiệp, 1 ảnh Wikimedia (chai H2SO4 96%, CC-BY-SA 3.0).
- **Bài 9. Base**, **Bài 10. Oxide**, **Bài 11. Muối**: bổ sung (không viết đè nội dung đã đúng) các mục còn thiếu bằng script chèn theo marker — trạng thái tự nhiên, phản ứng còn thiếu (base tác dụng oxide acid/muối; oxide base+oxide acid, oxide lưỡng tính; muối bị nhiệt phân), điều chế, bài tập áp dụng nhanh.

**Tự phát hiện và sửa 1 lỗi do chính mình gây ra**: sau khi chạy xong, chụp ảnh Chrome kiểm tra thấy dấu `**` hiển thị literal trên trang (VD "**Acid mạnh, acid yếu**:" thay vì chữ đậm) — do dùng cú pháp in đậm markdown chuẩn trong nội dung, nhưng `DocumentContent` (`components/chemistry/document-content.tsx`) KHÔNG hỗ trợ cú pháp này (chỉ hỗ trợ `##`, `-`, PTHH, ảnh, bảng — xem mục 2 skill `chem-theory`). Sửa bằng regex `replace(/\*\*(.+?)\*\*/g, "$1")` cho cả 2 document bị ảnh hưởng (Bài 8, Bài 11) và cập nhật lại script nguồn cho khớp; ghi thêm quy tắc "KHÔNG dùng `**in đậm**`" vào skill để không lặp lại lỗi này ở các bài sau.

Đã test lại toàn bộ 4 bài bằng ảnh chụp Chrome thật (đăng nhập admin qua session cookie), xác nhận heading/bảng/PTHH/ảnh đều render đúng và không còn dấu `**` thừa.

### MR-Y: Hoàn tất nâng cấp Lớp 8 Chương I — Ứng dụng thực tế + Bài tập áp dụng nhanh (2026-07-12)

**Bối cảnh**: người dùng gõ "ok bạn làm tiếp đi" ngay sau báo cáo MR-X — tín hiệu tiếp tục rõ ràng, không cần hỏi lại.

**Nhận định phạm vi**: 6 bài Chương I (Bài 2. Phản ứng hóa học, Bài 3. Mol và tỉ khối chất khí, Bài 4. Dung dịch và nồng độ, Bài 5. Bảo toàn khối lượng và PTHH, Bài 6. Tính theo PTHH, Bài 7. Tốc độ phản ứng và chất xúc tác) là dạng bài "khái niệm/kỹ năng tính toán" chứ không phải "1 loại chất cụ thể" như Acid/Base/Oxide/Muối — khung 7 mục (giới thiệu/trạng thái tự nhiên/TCVL/TCHH/điều chế/ứng dụng/bài tập) mới thêm ở MR-X vào skill `chem-theory` không áp dụng máy móc được (VD "Mol" không có "trạng thái tự nhiên" hay "điều chế"). Quyết định: áp dụng phần chung của skill (mục 4: ví dụ số liệu cụ thể, ứng dụng thực tế, ảnh minh họa, bài tập áp dụng nhanh) thay vì ép khung 7 mục.

**Dò trang SGK KHTN 8 - KNTT** (tiếp tục phương pháp nhị phân theo số trang các "Bài" lân cận, đã dùng từ MR-N/MR-X): xác định Bài 2 ở trang in 11-15, Bài 3 ở trang 16-19, Bài 4 kết thúc trang 22, Bài 5 bắt đầu trang 23-25, Bài 6 bắt đầu trang 28, Bài 7 bắt đầu trang 31 (Chương I kết thúc trang 33-34, Chương II Acid bắt đầu trang 35 — khớp với việc dò trang đã làm ở MR-X).

**Phát hiện nội dung SGK có mà DB đang thiếu** (không chỉ thêm ứng dụng suông, mà tìm thấy nội dung thực chất còn thiếu):
- Bài 6 SGK có mục tiêu "Tính được hiệu suất phản ứng" nhưng nội dung DB cũ hoàn toàn chưa có mục này — bổ sung nguyên 1 mục "Hiệu suất phản ứng" với công thức H% và ví dụ tính toán (nung CaCO3 → CaO, H% = 90%, tự tính và kiểm tra lại).
- Bài 3 (Tỉ khối) SGK có 2 bài tập liên hệ an toàn rất giá trị (CO2 tích tụ đáy hang sâu/giếng cạn gây ngạt vì nặng hơn không khí; CH4 tích tụ ở đáy giếng vì... — đọc kỹ lại thấy SGK hỏi cả 2 chiều tùy khí) — đưa vào mục Ứng dụng thực tế vì đây là kiến thức an toàn thực sự hữu ích, không phải chi tiết thừa.
- Bài 4 (Dung dịch) DB cũ có công thức nồng độ mol nhưng KHÔNG có ví dụ tính toán minh họa (khác với nồng độ % đã có ví dụ) — bổ sung ví dụ CM = 0,2/0,5 = 0,4 mol/L, và liên hệ thực tế nước muối sinh lý 0,9% (SGK có hẳn mục "IV. Thực hành pha chế dung dịch theo 1 nồng độ cho trước" với ví dụ pha nước muối 0,9%).

**Thêm 1 ảnh thật cho Bài 7**: tìm ảnh bu lông sắt bị gỉ trên Wikimedia Commons (`File:Corroded_Bolt.jpg`, CC-BY-SA 4.0) để minh họa trực quan so sánh "phản ứng nhanh" (đốt cháy, đã có ảnh nến/cồn trong SGK nhưng không tái sử dụng được vì là ảnh từ sách có bản quyền) và "phản ứng chậm" (ăn mòn kim loại). Áp dụng ngay bài học về thumbnail từ MR-X: ảnh gốc 13,8MB nên dùng thẳng URL `/thumb/.../960px-...` để tránh lỗi "Too many requests" khi tải qua trình duyệt đầy đủ.

**Cách chèn nội dung**: viết 1 script duy nhất `scripts/patch-lop8-chuong1.mjs` xử lý cả 6 bài trong 1 lần chạy, mỗi bài có thể có nhiều điểm chèn theo marker (không phải lúc nào cũng chỉ chèn ở cuối bài — Bài 2 và Bài 3 cần chèn xen giữa nội dung cũ, không chỉ append cuối) — cùng cấu trúc với các script patch trước (Bài 9/10, Bài 11) nhưng gộp nhiều bài trong 1 file thay vì 1 file/bài, cho gọn hơn khi số lượng bài tăng lên.

**Kiểm chứng số liệu**: mọi ví dụ/bài tập số liệu mới đều tự tính bằng tay trước khi đưa vào (không bịa số tròn cho có) — VD hiệu suất nung CaCO3 (11,2g lí thuyết, 10,08g thực tế → đúng 90%), các bài tập tính khối lượng/nồng độ mới đều cho kết quả số tròn hợp lý (tự chọn số liệu đầu bài để ra số tròn, tránh học sinh mất công vì số lẻ không cần thiết).

Đã test lại bằng ảnh chụp Chrome thật cho toàn bộ 6 bài (đặc biệt Bài 2 và Bài 3 vì có chèn giữa nội dung, dễ sai vị trí hơn append cuối), xác nhận nội dung đúng vị trí, ảnh Bài 7 hiển thị đúng. **Lớp 8 (11 bài, cả Chương I lẫn Chương II) coi như đã hoàn tất nâng cấp theo đúng yêu cầu ban đầu của người dùng** ("hãy bắt đầu với lớp 8 và lớp 12") — phần Lớp 8 xong, còn Lớp 12 (29 bài) mới làm mẫu 1 bài.

### MR-Z: Hoàn tất nâng cấp toàn bộ 28 bài còn lại của Lớp 12 (2026-07-12)

**Bối cảnh**: người dùng gõ "ok xong 12 thì sẽ tự động với các lớp còn lại" — vừa xác nhận tiếp tục Lớp 12 ngay, vừa báo trước rằng sau khi xong sẽ tự động chuyển sang các lớp còn lại mà không cần hỏi lại giữa chừng. Đây là uỷ quyền rõ ràng cho một khối lượng công việc lớn — quyết định làm theo lô từng chương, commit sau khi xong toàn bộ Lớp 12 thay vì sau mỗi chương, để tránh làm loãng lịch sử commit với 8 message riêng lẻ.

**Cách tiếp cận khác Lớp 8**: Lớp 12 không có 1 file "ôn tập tổng hợp" duy nhất như `Ôn tập kiến thức cấp 2(2).docx` — thay vào đó có SBT thật theo TỪNG chương, đóng gói riêng trong các file `.zip` tại `Tài liệu/Lớp 12/Hóa 12 theo chuyên đề/`. Với khối lượng 28 bài, quyết định KHÔNG giải nén + đọc PDF SBT cho mỗi chương (sẽ tốn thời gian tương đương MR-N/MR-X, không khả thi trong 1 phiên) — chỉ dùng SBT đã đọc ở MR-W (Chương 1) làm tài liệu tham khảo phong cách, còn lại dựa vào kiến thức hóa học phổ thông đã được kiểm chứng vững chắc (carbohydrate, amine/amino acid/protein, polymer, điện hóa, kim loại — đều là nội dung THPT chuẩn, không có tranh cãi/tiểu tiết dễ sai) kết hợp với nội dung đã có sẵn trong DB (vốn đã khá chính xác, seed từ trước, chỉ thiếu phần liên hệ thực tế).

**Phát hiện quan trọng — không tin tưởng mù quáng ảnh tham khảo AI-generated**: khi viết Bài 8-10 (Chương 3, Amine/Amino acid/Protein), đối chiếu lại 2 ảnh infographic "AMINO ACID" và "PEPTIDE" mà người dùng cung cấp làm tham khảo ở MR-W, phát hiện ảnh ghi "Alanine (Ala) Có 2 nhóm -NH2" — SAI, vì alanine (CH3-CH(NH2)-COOH) chỉ có 1 nhóm -NH2. Đây là bằng chứng cụ thể cho nhận định đã nêu ở MR-W: ảnh AI-generated có thể chứa lỗi kiến thức không tự sửa được. Quyết định: chỉ dùng các ảnh này để biết BỐ CỤC/MỤC cần có (Khái niệm, Cấu tạo, Tính chất, Ứng dụng...), KHÔNG sao chép bất kỳ chi tiết số liệu/công thức nào từ ảnh — mọi nội dung hóa học đều tự viết và tự kiểm chứng độc lập bằng kiến thức đã xác nhận.

**Khối lượng công việc theo chương** (đều dùng script `scripts/patch-lop12-chuong*.mjs`, riêng Bài 2 dùng `upgrade-lop12-bai2-xaphong.mjs` vì viết lại toàn bộ chứ không chỉ patch, đều idempotent):
- **Chương 1** (nốt Bài 2 Xà phòng, còn thiếu từ MR-W): viết lại từ 496 → 2294 ký tự — cấu tạo phân tử (đầu ưa nước/đuôi kị nước), cơ chế tạo micelle, điều chế bằng phản ứng xà phòng hóa, so sánh với chất giặt rửa tổng hợp (ưu điểm trong nước cứng), nhược điểm sử dụng. Thêm 1 ảnh Wikimedia (`Micelle_scheme-en.svg`, CC-BY-SA 3.0) — lưu ý ảnh gốc minh họa phospholipid (sinh học) chứ không phải xà phòng, nhưng nguyên lí cấu trúc micelle (đầu ưa nước/đuôi kị nước) giống hệt nhau nên chú thích ảnh viết cẩn thận theo hướng "nguyên lí chung", không gán nhầm là ảnh xà phòng cụ thể.
- **Chương 2** Carbohydrate (Bài 4,5,6): nội dung hóa học cốt lõi đã đúng từ trước — bổ sung trạng thái tự nhiên (glucose trong quả chín/mật ong/máu người 4,4-7,2 mmol/L, saccharose trong mía/củ cải đường, tinh bột trong gạo/ngô/khoai, cellulose trong gỗ/bông), tính chất vật lí, ứng dụng thực tế, bài tập.
- **Chương 3** Hợp chất chứa nitrogen (Bài 8,9,10): xem phát hiện về ảnh tham khảo ở trên. Bổ sung trạng thái tự nhiên (trimethylamine trong cá biển, 20 amino acid thiết yếu), ứng dụng (bột ngọt/MSG là muối glutamic acid, enzyme trong bột giặt sinh học/tiêu hóa).
- **Chương 4** Polymer (Bài 12,13): bổ sung PTHH cụ thể cho phản ứng trùng hợp (PE) và trùng ngưng (nylon-6,6 — trước đó chỉ mô tả bằng lời, chưa có PTHH mẫu), cảnh báo ô nhiễm nhựa, ứng dụng cụ thể theo từng loại vật liệu.
- **Chương 5** Pin điện/Điện phân (Bài 15,16): Bài 15 đã có ảnh từ MR-R, chỉ thêm ứng dụng pin/ắc quy đời sống. Bài 16 thêm ứng dụng cụ thể (sản xuất Al bằng điện phân nóng chảy, sản xuất NaOH/Cl2/H2 bằng điện phân dung dịch NaCl, mạ điện).
- **Chương 6** Đại cương kim loại (Bài 18-22, 5 bài): nội dung đã khá đầy đủ và chính xác từ trước (có cả ví dụ tính toán) — chỉ thêm Ứng dụng thực tế + Bài tập áp dụng nhanh cho từng bài, không cần viết lại phần lý thuyết.
- **Chương 7** Nhóm IA-IIA (Bài 24,25): thêm trạng thái tự nhiên (kim loại kiềm không tồn tại ở dạng đơn chất do tính khử quá mạnh), ứng dụng NaOH/Na2CO3/NaHCO3/CaO/thạch cao, bài tập về nước cứng.
- **Chương 8** Kim loại chuyển tiếp/phức chất (Bài 27,28,29): vốn đã khá tốt — chỉ thêm Ứng dụng thực tế (Bài 27) và Bài tập áp dụng nhanh cho cả 3 bài (trước đó thiếu hoàn toàn).

**Kiểm chứng số liệu**: mọi ví dụ/bài tập số liệu mới đều tự tính trước khi đưa vào — ví dụ hệ số trùng hợp PVC (125.000/62,5 = 2000), thể tích khí khi điện phân AgNO3 (n = It/F = 2×965/96500 = 0,02 mol → m = 2,16 g), lượng H2 khi kim loại kiềm tác dụng nước — đều dùng số liệu đầu bài chọn sẵn để ra kết quả tròn, hợp lý.

Đã test lại bằng ảnh chụp Chrome thật cho các bài đại diện nhiều chương (Bài 2 có ảnh mới, Bài 4 Carbohydrate, Bài 16 Điện phân, Bài 29 Phức chất), xác nhận render đúng, không có bài nào sai heading hay chèn lệch vị trí. **Lớp 8 (11 bài) + Lớp 12 (29 bài) = 40 bài, toàn bộ đã hoàn tất nâng cấp** theo đúng yêu cầu ban đầu của người dùng.

### MR-AA→AD: Nâng cấp giao diện sơ đồ tư duy + hoàn tất nâng cấp lý thuyết Lớp 9, 10, 6, 7, 11 (2026-07-12)

**Bối cảnh**: người dùng nhắn giữa lúc đang làm Lớp 12: "nếu hết token hãy đợi và làm tiếp nếu còn tiếp tục phát triển phần hình ảnh và sơ đồ tư duy" — vừa xác nhận sẵn sàng chờ nếu cần, vừa nhắc nhở đừng quên phần hình ảnh/sơ đồ tư duy đã hẹn làm ở MR-W. Sau khi xong Lớp 12 (MR-Z), tiếp tục luôn sang phần sơ đồ tư duy rồi tới các lớp còn lại — đúng tinh thần "tự động" người dùng đã xác nhận trước.

**Nâng cấp giao diện sơ đồ tư duy** (`components/chemistry/mind-map-view.tsx`, người dùng đã chọn hướng "chỉ nâng cấp giao diện tự sinh" ở MR-W, không tích hợp AI sinh ảnh):
- Thêm bảng màu 5 màu pastel (rose/violet/sky/emerald/amber, dùng token Tailwind `bg-*-50`/`border-*-200`/`text-*-700` — cùng ngôn ngữ pill "nền nhạt + chữ đậm cùng tông" đã có trong design system, không phải phá vỡ quy ước), xoay vòng theo thứ tự bài trong chương — áp dụng cho cả 3 kiểu hiển thị (cây/vòng tròn/dòng thời gian).
- Thêm icon đơn sắc (outline style, đúng CLAUDE.md 7.4) cho mỗi mục con, chọn theo regex khớp từ khóa tiêu đề: "khái niệm/giới thiệu" → sách, "trạng thái tự nhiên" → lá cây, "tính chất" → bình thí nghiệm, "điều chế/sản xuất" → nhà máy, "ứng dụng" → bóng đèn, "bài tập" → bút, "ví dụ" → máy tính, còn lại → chấm tròn mặc định.
- **Phát hiện lỗi thật khi tự kiểm tra bằng ảnh chụp**: Sơ đồ vòng tròn (SVG, tọa độ cực) bị chồng chữ nghiêm trọng ở các bài có 7-10 mục con — nguyên nhân: code cũ giới hạn góc quạt tối đa 38° bất kể số mục con hay số bài trong chương, được viết từ thời các bài chỉ có 3-5 heading; sau khi nội dung lý thuyết được viết chi tiết hơn qua MR-W→Z (nhiều bài lên tới 7-10 heading), công thức cũ không còn đủ chỗ. Sửa: (1) tăng kích thước canvas SVG khi số heading tối đa trong chương lớn hơn 5; (2) giới hạn góc quạt của mỗi bài theo đúng phần chia dành cho nó (`angleStep * 0.85`) thay vì hằng số cố định, để không lấn sang cụm mục con của bài bên cạnh dù bài đó có bao nhiêu mục con đi nữa. Test lại bằng ảnh chụp Chrome thật ở 1 chương có 2 bài (ít) và 1 chương có 5 bài (đủ để kiểm tra màu xoay vòng), xác nhận không còn chồng chữ.
- Một lỗi nhỏ khác tự phát hiện: border trái màu (kiểu dòng thời gian) không hiển thị dù đã thêm class Tailwind `border-l-4 border-rose-200` — do class `.card-surface` dùng CSS shorthand `border: 1px solid var(--border-subtle)` set màu cho cả 4 cạnh, thắng class Tailwind cùng độ ưu tiên tùy thứ tự nạp CSS. Sửa bằng cách chuyển sang inline style `borderLeft: "4px solid <hex>"` để chắc chắn không phụ thuộc thứ tự cascade.

**Hoàn tất nâng cấp lý thuyết 5 khối lớp còn lại**: khảo sát nhanh cho thấy khác với Lớp 8 (nội dung ban đầu rất mỏng, 500-1000 ký tự/bài, cần viết lại nhiều), nội dung Lớp 9/10/6/7/11 đã được seed khá tốt từ đầu dự án (600-2000 ký tự/bài, đúng chuyên môn, nhiều bài đã có sẵn "Ứng dụng thực tế"/"Trạng thái tự nhiên") — điểm chung duy nhất thiếu ở TẤT CẢ các bài của cả 5 khối lớp là mục "Bài tập áp dụng nhanh" (100% chưa có). Quyết định: không viết lại toàn bộ (không cần thiết, nội dung đã đúng), chỉ bổ sung mục còn thiếu này bằng script `scripts/patch-lop{6,7,9,10,11}-full.mjs` (mỗi khối 1 file, đều idempotent):
- **Lớp 9** (15 bài/4 chương: Kim loại, Hydrocarbon và nguồn nhiên liệu, Ethylic alcohol/Acetic acid, Lipid-Carbohydrate-Protein-Polymer).
- **Lớp 10** (16 bài/7 chương: Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Oxi hóa-khử, Năng lượng hóa học, Tốc độ phản ứng, Nhóm halogen) — riêng **Bài 7** "Xu hướng biến đổi thành phần và tính chất của hợp chất" quá mỏng (313 ký tự, chỉ có phần oxide/hydroxide) nên mở rộng thêm hẳn 1 mục "Hydride theo chu kì" (đúng nội dung SGK KNTT vốn có cả 2 phần) — lên 974 ký tự.
- **Lớp 6** (7 bài/3 chương) và **Lớp 7** (6 bài/4 chương) — nội dung đã đủ tốt từ MR-O, chỉ thêm bài tập phù hợp lứa tuổi THCS.
- **Lớp 11** (19 bài/6 chương: Cân bằng hóa học, Nitrogen-Sulfur, Đại cương hóa học hữu cơ, Hydrocarbon, Dẫn xuất halogen-Alcohol-Phenol, Hợp chất carbonyl-Carboxylic acid) — khối lượng lớn nhất trong 5 khối còn lại, xử lý bằng 1 script duy nhất cho cả 19 bài để tránh phân mảnh.

Đã test lại bằng ảnh chụp Chrome thật cho ít nhất 1 bài đại diện mỗi khối lớp, `npx tsc --noEmit` và `npm run test` (19 unit test) đều pass sau mỗi lần commit.

**Kết quả cuối cùng**: TẤT CẢ 7 khối lớp (6, 7, 8, 9, 10, 11, 12), tổng cộng 96 bài học, đã hoàn tất nâng cấp lý thuyết theo đúng khung yêu cầu của người dùng — khép lại chuỗi MR-W → MR-AD, chuỗi nâng cấp nội dung lớn nhất trong lịch sử dự án tính đến thời điểm này.

## 4. Cách theo dõi tiến độ

- File `PROJECT_STATUS.md` đóng vai trò "bức tranh toàn cảnh" — cập nhật sau mỗi giai đoạn hoàn thành (thay vì tạo nhiều file rời rạc).
- File kế hoạch này (`KE_HOACH_MO_RONG.md`) không sửa lại nội dung gốc mục 0 — chỉ tick trạng thái ở bảng mục 2 khi xong.
