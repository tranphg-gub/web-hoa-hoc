"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";

type Difficulty = "NHAN_BIET" | "THONG_HIEU" | "VAN_DUNG" | "VAN_DUNG_CAO";

const inputClass =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40";

export function EditPracticeQuestionForm({
  action,
  onCancel,
  content,
  choices,
  correctIndex,
  explanation,
  difficulty,
  source,
}: {
  action: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  content: string;
  choices: string[];
  correctIndex: number;
  explanation: string | null;
  difficulty: Difficulty;
  source: string | null;
}) {
  return (
    <form action={action} className="mt-3 grid gap-4 rounded-xl border border-border-subtle p-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">Nội dung câu hỏi</Label>
        <textarea id="content" name="content" rows={2} required defaultValue={content} className={inputClass} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {(["A", "B", "C", "D"] as const).map((letter, i) => (
          <div key={letter} className="flex flex-col gap-1.5">
            <Label htmlFor={`choice${letter}`}>Đáp án {letter}</Label>
            <Input id={`choice${letter}`} name={`choice${letter}`} required={i < 2} defaultValue={choices[i] ?? ""} />
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="correctIndex">Đáp án đúng</Label>
          <select id="correctIndex" name="correctIndex" required defaultValue={String(correctIndex)} className={`${inputClass} max-w-[160px]`}>
            <option value={0}>A</option>
            <option value={1}>B</option>
            <option value={2}>C</option>
            <option value={3}>D</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="difficulty">Mức độ</Label>
          <select id="difficulty" name="difficulty" required defaultValue={difficulty} className={inputClass}>
            {DIFFICULTY_ORDER.map((d) => (
              <option key={d} value={d}>
                {DIFFICULTY_LABELS[d]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="explanation">Giải thích (tùy chọn)</Label>
        <textarea id="explanation" name="explanation" rows={2} defaultValue={explanation ?? ""} className={inputClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="source">Nguồn (tùy chọn)</Label>
        <Input id="source" name="source" defaultValue={source ?? ""} placeholder="Vd: SBT Kết nối tri thức" />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Lưu</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
      </div>
    </form>
  );
}
