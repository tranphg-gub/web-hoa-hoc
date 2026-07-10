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
| MR-K | Public deploy | **Chờ người dùng có mặt** | ⏳ Chưa làm — theo đúng yêu cầu, đợi bạn có mặt |

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

## 4. Cách theo dõi tiến độ

- File `PROJECT_STATUS.md` đóng vai trò "bức tranh toàn cảnh" — cập nhật sau mỗi giai đoạn hoàn thành (thay vì tạo nhiều file rời rạc).
- File kế hoạch này (`KE_HOACH_MO_RONG.md`) không sửa lại nội dung gốc mục 0 — chỉ tick trạng thái ở bảng mục 2 khi xong.
