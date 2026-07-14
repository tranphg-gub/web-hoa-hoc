# Chạy mỗi ngày (qua Windows Task Scheduler) để tự bổ sung câu hỏi Lớp 12 bằng AI,
# trong giới hạn quota free-tier Gemini (~20 request/ngày/model, dùng chung cho cả 2 script).
# Ưu tiên /practice trước rồi mới đến câu hỏi đề kiểm tra, vì practice script đã test
# xong logic; nếu practice dùng hết quota, quiz script sẽ tự dừng an toàn (không ghi dở).
# Idempotent — chạy lại ngày nào cũng chỉ sinh thêm phần còn thiếu, không sinh trùng/dư.

$ErrorActionPreference = "Continue"
Set-Location "C:\web hóa học"

$logDir = "C:\web hóa học\logs"
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
}
$logFile = Join-Path $logDir "ai-topup-$(Get-Date -Format 'yyyy-MM-dd_HHmm').log"

"=== $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') — bắt đầu daily AI top-up Lớp 12 ===" | Tee-Object -FilePath $logFile -Append

"--- practice (grade=12) ---" | Tee-Object -FilePath $logFile -Append
node scripts/ai-batch-generate-practice.mjs --grade=12 2>&1 | Tee-Object -FilePath $logFile -Append

"--- quiz (grade=12) ---" | Tee-Object -FilePath $logFile -Append
node scripts/ai-batch-generate-quiz.mjs --grade=12 2>&1 | Tee-Object -FilePath $logFile -Append

"--- fix-quiz-durations ---" | Tee-Object -FilePath $logFile -Append
node scripts/fix-quiz-durations.mjs 2>&1 | Tee-Object -FilePath $logFile -Append

"=== $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') — kết thúc ===" | Tee-Object -FilePath $logFile -Append
