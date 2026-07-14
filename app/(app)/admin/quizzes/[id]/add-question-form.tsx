"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";

type QuestionType = "SINGLE_CHOICE" | "TRUE_FALSE_GROUP" | "SHORT_ANSWER";

const TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: "SINGLE_CHOICE", label: "Trắc nghiệm 4 đáp án (Phần I)" },
  { value: "TRUE_FALSE_GROUP", label: "Đúng / Sai — 4 ý (Phần II)" },
  { value: "SHORT_ANSWER", label: "Trả lời ngắn (Phần III)" },
];

const selectClass =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40";
const textareaClass = selectClass;

export function AddQuestionForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [type, setType] = useState<QuestionType>("SINGLE_CHOICE");

  return (
    <form action={action} className="grid gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="type">Dạng câu hỏi</Label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value as QuestionType)}
          className={`${selectClass} max-w-md`}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">Nội dung câu hỏi</Label>
        <textarea id="content" name="content" rows={2} required className={textareaClass} />
      </div>

      {type === "SINGLE_CHOICE" && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceA">Đáp án A</Label>
              <Input id="choiceA" name="choiceA" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceB">Đáp án B</Label>
              <Input id="choiceB" name="choiceB" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceC">Đáp án C</Label>
              <Input id="choiceC" name="choiceC" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="choiceD">Đáp án D</Label>
              <Input id="choiceD" name="choiceD" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="correctIndex">Đáp án đúng</Label>
            <select id="correctIndex" name="correctIndex" defaultValue="" className={`${selectClass} max-w-[220px]`}>
              <option value="">Chưa xác định (nháp, sửa sau)</option>
              <option value={0}>A</option>
              <option value={1}>B</option>
              <option value={2}>C</option>
              <option value={3}>D</option>
            </select>
          </div>
        </>
      )}

      {type === "TRUE_FALSE_GROUP" && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-foreground-muted">
            4 ý nhỏ (a, b, c, d) — mỗi ý học sinh sẽ tự đánh giá là Đúng hay Sai.
          </p>
          {(["a", "b", "c", "d"] as const).map((letter) => (
            <div key={letter} className="flex flex-col gap-1.5 rounded-xl border border-border-subtle p-3">
              <Label htmlFor={`statement${letter}`}>Ý {letter})</Label>
              <textarea
                id={`statement${letter}`}
                name={`statement${letter}`}
                rows={2}
                required
                className={textareaClass}
              />
              <div className="flex items-center gap-4 pt-1 text-sm">
                <label className="flex items-center gap-1.5">
                  <input type="radio" name={`correct${letter}`} value="true" required /> Đúng
                </label>
                <label className="flex items-center gap-1.5">
                  <input type="radio" name={`correct${letter}`} value="false" /> Sai
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === "SHORT_ANSWER" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="shortAnswer">Đáp án đúng (số hoặc chữ ngắn)</Label>
          <Input id="shortAnswer" name="shortAnswer" required placeholder="Ví dụ: 3.5 hoặc NaCl" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="difficulty">Mức độ</Label>
        <select id="difficulty" name="difficulty" required defaultValue="NHAN_BIET" className={`${selectClass} max-w-[220px]`}>
          {DIFFICULTY_ORDER.map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABELS[d]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="explanation">Giải thích (tùy chọn)</Label>
        <textarea id="explanation" name="explanation" rows={2} className={textareaClass} />
      </div>
      <div>
        <Button type="submit">Thêm câu hỏi</Button>
      </div>
    </form>
  );
}
