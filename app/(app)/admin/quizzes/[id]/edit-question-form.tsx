"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";

type QuestionType = "SINGLE_CHOICE" | "TRUE_FALSE_GROUP" | "SHORT_ANSWER";
type Difficulty = "NHAN_BIET" | "THONG_HIEU" | "VAN_DUNG" | "VAN_DUNG_CAO";

const selectClass =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40";
const textareaClass = selectClass;

export function EditQuestionForm({
  action,
  onCancel,
  type,
  content,
  choices,
  correctIndex,
  statements,
  shortAnswer,
  explanation,
  difficulty,
}: {
  action: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  type: QuestionType;
  content: string;
  choices: string[] | null;
  correctIndex: number | null;
  statements: { text: string; correct: boolean }[] | null;
  shortAnswer: string | null;
  explanation: string | null;
  difficulty: Difficulty;
}) {
  return (
    <form action={action} className="mt-3 grid gap-4 rounded-xl border border-border-subtle p-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="content">Nội dung câu hỏi</Label>
        <textarea id="content" name="content" rows={2} required defaultValue={content} className={textareaClass} />
      </div>

      {type === "SINGLE_CHOICE" && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["A", "B", "C", "D"] as const).map((letter, i) => (
              <div key={letter} className="flex flex-col gap-1.5">
                <Label htmlFor={`choice${letter}`}>Đáp án {letter}</Label>
                <Input
                  id={`choice${letter}`}
                  name={`choice${letter}`}
                  required={i < 2}
                  defaultValue={choices?.[i] ?? ""}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="correctIndex">Đáp án đúng</Label>
            <select
              id="correctIndex"
              name="correctIndex"
              defaultValue={correctIndex === null || correctIndex === undefined ? "" : String(correctIndex)}
              className={`${selectClass} max-w-[220px]`}
            >
              <option value="">Chưa xác định (nháp)</option>
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
          {(["a", "b", "c", "d"] as const).map((letter, i) => (
            <div key={letter} className="flex flex-col gap-1.5 rounded-xl border border-border-subtle p-3">
              <Label htmlFor={`statement${letter}`}>Ý {letter})</Label>
              <textarea
                id={`statement${letter}`}
                name={`statement${letter}`}
                rows={2}
                required
                defaultValue={statements?.[i]?.text ?? ""}
                className={textareaClass}
              />
              <div className="flex items-center gap-4 pt-1 text-sm">
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name={`correct${letter}`}
                    value="true"
                    defaultChecked={statements?.[i]?.correct === true}
                  />{" "}
                  Đúng
                </label>
                <label className="flex items-center gap-1.5">
                  <input
                    type="radio"
                    name={`correct${letter}`}
                    value="false"
                    defaultChecked={statements?.[i]?.correct === false}
                  />{" "}
                  Sai
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {type === "SHORT_ANSWER" && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="shortAnswer">Đáp án đúng (để trống nếu chưa xác định)</Label>
          <Input id="shortAnswer" name="shortAnswer" defaultValue={shortAnswer ?? ""} placeholder="Ví dụ: 3.5 hoặc NaCl" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="difficulty">Mức độ</Label>
        <select id="difficulty" name="difficulty" required defaultValue={difficulty} className={`${selectClass} max-w-[220px]`}>
          {DIFFICULTY_ORDER.map((d) => (
            <option key={d} value={d}>
              {DIFFICULTY_LABELS[d]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="explanation">Giải thích (tùy chọn)</Label>
        <textarea id="explanation" name="explanation" rows={2} defaultValue={explanation ?? ""} className={textareaClass} />
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
