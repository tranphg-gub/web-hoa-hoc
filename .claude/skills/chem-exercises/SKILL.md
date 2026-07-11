---
name: chem-exercises
description: Mining/soạn bài tập Hóa học (ngân hàng /practice và câu hỏi đề kiểm tra Quiz) cho lớp 6-12 — ưu tiên trích xuất từ SBT/tài liệu bài tập thật, đa dạng mức độ và dạng câu, luôn tự kiểm chứng đáp án trước khi lưu. Dùng khi được giao thêm/mở rộng bài tập cho 1 chương/chủ đề cụ thể.
---

# Soạn bài tập Hóa học (PracticeQuestion / Question)

Mục tiêu: bài tập phải **đa dạng** (kho tài liệu rất rộng, không giới hạn ở vài chục câu lặp đi lặp lại) và **đúng đắn** (đáp án đã kiểm chứng, không đoán).

## 1. Nguồn ưu tiên (theo thứ tự)

1. **SBT (Sách bài tập) chính thức** đúng bộ sách — nguồn tốt nhất vì đã qua biên tập, đáp án chuẩn. Đã biết có SBT Lớp 12 (3 bộ KNTT/CTST/CD) nén trong `Tài liệu/Lớp 12/Hóa 12 theo chuyên đề/*.zip` — giải nén bằng `unzip` trước khi đọc PDF. Lớp 8 (chương trình 2018) hiện KHÔNG tìm thấy SBT chính thức trong kho tài liệu — dùng nguồn 2 thay thế.
2. Tài liệu bài tập tự soạn/dạy thêm đã upload (VD `KHTN 8 - HÓA HỌC - TÀI LIỆU HỌC TẬP 2024.docx`, các file "440 bài tập trắc nghiệm", "Bài tập PTHH và tính toán") — đã mining một phần ở MR-O/MR-P/MR-T, kiểm tra DB trước để tránh trùng (`buildExistingQuestionList()` trong `lib/ai/generation-context.ts` liệt kê câu đã có theo `chapterId`).
3. Đề thi thật/thi thử sưu tầm (đã dùng cho Lớp 11 ở MR-N, Lớp 12 "đề dự đoán" ở MR-U) — chỉ lấy nếu đúng mức lớp, không lấy đề lớp trên gắn nhầm nhãn (xem bài học từ MR-Q: kho "HSG" phần lớn là đề lớp 12/đại học gắn nhãn lớp 8, đã loại bỏ).
4. AI sinh (Gemini, `lib/ai/exercise-generator.ts` cho `/practice`, `lib/ai/quiz-question-generator.ts` cho đề kiểm tra) — CHỈ dùng khi 1-3 không đủ, luôn có bước kiểm chứng độc lập (xem mục 3), giáo viên duyệt qua UI trước khi lưu (`/admin/practice/generate`, `/admin/quizzes/[id]` → "AI soạn nháp"). **Free tier Gemini giới hạn 20 request/ngày/model** — không spam gọi liên tục.

## 2. Đa dạng hoá — không chỉ trắc nghiệm 4 đáp án

Với Lớp 10-12 (cấu trúc đề thi THPT 2025 mới), ưu tiên trộn cả 3 dạng (`QuestionType` enum trong `prisma/schema.prisma`):
- `SINGLE_CHOICE`: trắc nghiệm 4 đáp án (`choices` JSON string[4], `correctIndex`).
- `TRUE_FALSE_GROUP`: 4 ý đúng/sai độc lập trong 1 câu (`statements` JSON `{text, correct}[4]`) — chấm theo thang KHÔNG tuyến tính (đúng 1/2/3/4 ý = 0,1/0,25/0,5/1 điểm câu đó, xem `lib/quiz-scoring.ts`).
- `SHORT_ANSWER`: trả lời ngắn dạng số/text (`shortAnswer` string, so khớp qua `shortAnswersMatch()` — chấp nhận sai khác định dạng thập phân/khoảng trắng).

Với Lớp 6-9 (chương trình cũ, các đề "Kiểm tra: <Chương>" hiện tại), giữ nguyên trắc nghiệm 4 đáp án 1 dạng — KHÔNG tự ý đổi cấu trúc đề đã ổn định trừ khi được yêu cầu.

Đa dạng cả về **mức độ** (`Difficulty` enum: NHAN_BIET/THONG_HIEU/VAN_DUNG/VAN_DUNG_CAO — định nghĩa đầy đủ trong `DIFFICULTY_GUIDE`), không dồn hết câu dễ hoặc hết câu khó vào 1 đề.

## 3. Luôn tự kiểm chứng đáp án trước khi lưu

- Câu tự trích xuất từ tài liệu có đáp án gốc (bảng đáp án, khoanh tay...): đối chiếu đúng số thứ tự câu, không suy luận ngược từ lời giải nếu lời giải bị mất số liệu (VD file dùng Word Equation Editor/OMML — `python-docx` không đọc được, đã gặp ở MR-Q).
- Câu không có đáp án gốc rõ ràng, hoặc câu tự giải lại để đối chiếu: PHẢI tự giải bằng kiến thức hóa học (cân bằng PTHH, tính toán số liệu) trước khi ghi vào DB — không đoán, không "có vẻ đúng".
- Câu do AI sinh: dùng pattern lượt AI thứ 2 giải "mù" độc lập để đối chiếu (đã có sẵn trong `verifySingleChoice`/`verifyTrueFalse`/`verifyShortAnswer` ở `lib/ai/quiz-question-generator.ts` và `verifyAnswers` ở `lib/ai/exercise-generator.ts`) — không tắt bước này để tiết kiệm quota.
- Nếu KHÔNG thể kiểm chứng chắc chắn (lời giải mất số liệu, đề mơ hồ, vượt quá mức lớp) → **bỏ qua câu đó**, không đưa vào DB. Chất lượng hơn số lượng (nguyên tắc xuyên suốt dự án).

## 4. Đưa vào đâu: `/practice` hay Quiz?

- `PracticeQuestion` (`/practice`, theo `chapterId`): học sinh tự luyện, biết đúng/sai + giải thích ngay, KHÔNG tính giờ/điểm. Đây là nơi phù hợp để chứa SỐ LƯỢNG LỚN câu đa dạng (kho bài tập rộng) vì không có ràng buộc thời gian.
- `Question` gắn với `Quiz` (đề kiểm tra tính giờ): chỉ nên chứa số câu hợp lý cho 1 lần làm bài có tính giờ thực tế (xem mục 5) — không nối thêm hàng chục câu vào 1 quiz đã tồn tại chỉ vì tiện, trừ khi đó đúng là mục đích (đề ôn tập tổng hợp nhiều câu).

## 5. Thời lượng đề kiểm tra phải khớp số câu

Bài học rút ra từ MR-W (người dùng phát hiện lỗi "50 phút được 12 câu"): **mọi lần thêm/bớt câu hỏi vào 1 Quiz đã tồn tại phải chạy lại `node scripts/fix-quiz-durations.mjs`** để tính lại `durationSec` theo công thức chuẩn (1,5 phút/câu SINGLE_CHOICE, 3 phút/câu TRUE_FALSE_GROUP, 2 phút/câu SHORT_ANSWER, làm tròn lên bội số 5 phút, tối thiểu 10 phút). Script idempotent, chạy lại bao nhiêu lần cũng an toàn.

## 6. Idempotent + backup

Trước khi chạy script ghi dữ liệu hàng loạt: `npm run db:backup` (dump JSON vào `prisma/backups/`, gitignored). Script import/thêm câu hỏi phải kiểm tra trùng lặp trước khi insert (so khớp `content` đã chuẩn hoá, hoặc theo id tài liệu nguồn đã xử lý) để chạy lại an toàn không nhân đôi dữ liệu.
