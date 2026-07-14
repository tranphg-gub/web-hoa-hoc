"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { Badge } from "@/components/ui/badge";
import { EditQuestionForm } from "./edit-question-form";

type QuestionType = "SINGLE_CHOICE" | "TRUE_FALSE_GROUP" | "SHORT_ANSWER";
type Difficulty = "NHAN_BIET" | "THONG_HIEU" | "VAN_DUNG" | "VAN_DUNG_CAO";

const TYPE_LABELS: Record<string, string> = {
  SINGLE_CHOICE: "Trắc nghiệm",
  TRUE_FALSE_GROUP: "Đúng/Sai",
  SHORT_ANSWER: "Trả lời ngắn",
};

export function QuestionCard({
  index,
  type,
  content,
  choices,
  correctIndex,
  statements,
  shortAnswer,
  explanation,
  difficulty,
  onUpdate,
  onDelete,
}: {
  index: number;
  type: QuestionType;
  content: string;
  choices: string[] | null;
  correctIndex: number | null;
  statements: { text: string; correct: boolean }[] | null;
  shortAnswer: string | null;
  explanation: string | null;
  difficulty: Difficulty;
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const needsAnswer =
    (type === "SINGLE_CHOICE" && (correctIndex === null || correctIndex === undefined)) ||
    (type === "SHORT_ANSWER" && !shortAnswer);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">
            Câu {index + 1}. {content}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={difficulty} />
            <Badge tone="neutral">{TYPE_LABELS[type] ?? type}</Badge>
            {needsAnswer && <Badge tone="warning">Chưa có đáp án</Badge>}
          </div>
        </div>
        {!editing && (
          <div className="flex shrink-0 gap-1.5">
            <Button type="button" size="sm" variant="secondary" onClick={() => setEditing(true)}>
              Sửa
            </Button>
            <form action={onDelete}>
              <Button type="submit" size="sm" variant="ghost">
                Xóa
              </Button>
            </form>
          </div>
        )}
      </div>

      {editing ? (
        <EditQuestionForm
          action={async (formData) => {
            await onUpdate(formData);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
          type={type}
          content={content}
          choices={choices}
          correctIndex={correctIndex}
          statements={statements}
          shortAnswer={shortAnswer}
          explanation={explanation}
          difficulty={difficulty}
        />
      ) : (
        <>
          {type === "SINGLE_CHOICE" && choices && (
            <ul className="mt-3 flex flex-col gap-1 text-sm text-foreground-muted">
              {choices.map((c, cIdx) => (
                <li key={cIdx} className={cIdx === correctIndex ? "font-medium text-success-fg" : ""}>
                  {String.fromCharCode(65 + cIdx)}. {c}
                </li>
              ))}
            </ul>
          )}

          {type === "TRUE_FALSE_GROUP" && statements && (
            <ul className="mt-3 flex flex-col gap-1 text-sm text-foreground-muted">
              {statements.map((s, sIdx) => (
                <li key={sIdx}>
                  <span className={s.correct ? "font-medium text-success-fg" : "font-medium text-danger-fg"}>
                    {s.correct ? "Đúng" : "Sai"}
                  </span>{" "}
                  — {String.fromCharCode(97 + sIdx)}) {s.text}
                </li>
              ))}
            </ul>
          )}

          {type === "SHORT_ANSWER" && (
            <p className="mt-3 text-sm text-foreground-muted">
              Đáp án đúng:{" "}
              <span className="font-medium text-success-fg">{shortAnswer || "(chưa xác định)"}</span>
            </p>
          )}

          {explanation && <p className="mt-3 text-xs text-foreground-muted">{explanation}</p>}
        </>
      )}
    </Card>
  );
}
