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
| MR-K | Public deploy | **Chờ người dùng có mặt** | ⏳ Tiếp tục sau MR-O — đã chuẩn bị xong Postgres + Vercel env vars, còn thiếu bước Deploy cuối |

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

## 4. Cách theo dõi tiến độ

- File `PROJECT_STATUS.md` đóng vai trò "bức tranh toàn cảnh" — cập nhật sau mỗi giai đoạn hoàn thành (thay vì tạo nhiều file rời rạc).
- File kế hoạch này (`KE_HOACH_MO_RONG.md`) không sửa lại nội dung gốc mục 0 — chỉ tick trạng thái ở bảng mục 2 khi xong.
