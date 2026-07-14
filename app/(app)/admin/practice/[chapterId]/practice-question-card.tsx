"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { Badge } from "@/components/ui/badge";
import { EditPracticeQuestionForm } from "./edit-practice-question-form";

type Difficulty = "NHAN_BIET" | "THONG_HIEU" | "VAN_DUNG" | "VAN_DUNG_CAO";

export function PracticeQuestionCard({
  index,
  content,
  choices,
  correctIndex,
  explanation,
  difficulty,
  source,
  published,
  onUpdate,
  onDelete,
  onTogglePublished,
}: {
  index: number;
  content: string;
  choices: string[];
  correctIndex: number;
  explanation: string | null;
  difficulty: Difficulty;
  source: string | null;
  published: boolean;
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: () => Promise<void>;
  onTogglePublished: () => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">
            Câu {index + 1}. {content}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={difficulty} />
            {source && <Badge tone="neutral">{source}</Badge>}
            {!published && <Badge tone="warning">Nháp — học sinh chưa thấy</Badge>}
          </div>
        </div>
        {!editing && (
          <div className="flex shrink-0 gap-1.5">
            <Button type="button" size="sm" variant="secondary" onClick={() => setEditing(true)}>
              Sửa
            </Button>
            <form action={onTogglePublished}>
              <Button type="submit" size="sm" variant="ghost">
                {published ? "Ẩn" : "Công khai"}
              </Button>
            </form>
            <form action={onDelete}>
              <Button type="submit" size="sm" variant="ghost">
                Xóa
              </Button>
            </form>
          </div>
        )}
      </div>

      {editing ? (
        <EditPracticeQuestionForm
          action={async (formData) => {
            await onUpdate(formData);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
          content={content}
          choices={choices}
          correctIndex={correctIndex}
          explanation={explanation}
          difficulty={difficulty}
          source={source}
        />
      ) : (
        <ul className="mt-3 flex flex-col gap-1 text-sm text-foreground-muted">
          {choices.map((c, cIdx) => (
            <li key={cIdx} className={cIdx === correctIndex ? "font-medium text-success-fg" : ""}>
              {String.fromCharCode(65 + cIdx)}. {c}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
