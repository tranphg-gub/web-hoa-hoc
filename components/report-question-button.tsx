"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportQuestion } from "@/lib/question-reports";

const REASON_PRESETS = [
  "Đáp án đúng có vẻ sai",
  "Nội dung câu hỏi không rõ ràng / thiếu dữ kiện",
  "Công thức hóa học hiển thị sai",
  "Giải thích không khớp với đáp án",
];

export function ReportQuestionButton({
  questionId,
  practiceQuestionId,
}: {
  questionId?: string;
  practiceQuestionId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return <p className="text-xs text-foreground-muted">Cảm ơn bạn đã báo lỗi — giáo viên sẽ xem lại.</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground"
      >
        <Flag className="h-3 w-3" /> Báo lỗi câu này
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border-subtle p-3">
      <p className="text-xs font-medium">Bạn thấy lỗi gì ở câu này?</p>
      <div className="flex flex-wrap gap-1.5">
        {REASON_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setReason(preset)}
            className="rounded-full border border-border-subtle px-2.5 py-1 text-xs hover:bg-background-subtle"
          >
            {preset}
          </button>
        ))}
      </div>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
        placeholder="Mô tả ngắn gọn (tùy chọn thêm chi tiết)..."
        className="w-full rounded-xl border border-border-subtle bg-background px-3 py-2 text-xs outline-none focus:border-foreground/40"
      />
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          disabled={submitting || reason.trim() === ""}
          onClick={async () => {
            setSubmitting(true);
            try {
              await reportQuestion({ questionId, practiceQuestionId }, reason);
              setDone(true);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          Gửi báo lỗi
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Hủy
        </Button>
      </div>
    </div>
  );
}
