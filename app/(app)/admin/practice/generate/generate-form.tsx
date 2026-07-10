"use client";

import { useState, useTransition } from "react";
import type { Difficulty } from "@prisma/client";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";
import type { GeneratedExercise } from "@/lib/ai/exercise-generator";
import { generateExercisesForChapter, saveGeneratedExercises } from "../actions";

type Chapter = { id: string; grade: number; title: string };

export function GenerateExercisesForm({ chapters }: { chapters: Chapter[] }) {
  const [chapterId, setChapterId] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("NHAN_BIET");
  const [count, setCount] = useState(5);
  const [drafts, setDrafts] = useState<GeneratedExercise[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isGenerating, startGenerating] = useTransition();
  const [isSaving, startSaving] = useTransition();

  function handleGenerate() {
    if (!chapterId) {
      setError("Vui lòng chọn chương.");
      return;
    }
    setError(null);
    setSaved(false);
    startGenerating(async () => {
      try {
        const result = await generateExercisesForChapter(chapterId, difficulty, count);
        if (result.length === 0) {
          setError("AI không tạo được câu hỏi hợp lệ, thử lại nhé.");
          return;
        }
        setDrafts(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi khi gọi AI.");
      }
    });
  }

  function updateDraft(idx: number, patch: Partial<GeneratedExercise>) {
    setDrafts((prev) => (prev ? prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)) : prev));
  }

  function updateChoice(idx: number, choiceIdx: number, value: string) {
    setDrafts((prev) =>
      prev
        ? prev.map((d, i) =>
            i === idx ? { ...d, choices: d.choices.map((c, ci) => (ci === choiceIdx ? value : c)) } : d
          )
        : prev
    );
  }

  function removeDraft(idx: number) {
    setDrafts((prev) => (prev ? prev.filter((_, i) => i !== idx) : prev));
  }

  function handleSave() {
    if (!drafts || drafts.length === 0) return;
    startSaving(async () => {
      await saveGeneratedExercises(chapterId, difficulty, drafts);
      setDrafts(null);
      setSaved(true);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardTitle className="text-sm">Cấu hình tạo bài tập</CardTitle>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5 sm:col-span-3">
            <Label htmlFor="chapterId">Chương</Label>
            <select
              id="chapterId"
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              <option value="" disabled>
                Chọn chương
              </option>
              {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                <optgroup key={g} label={`Lớp ${g}`}>
                  {chapters
                    .filter((c) => c.grade === g)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="difficulty">Mức độ</Label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            >
              {DIFFICULTY_ORDER.map((d) => (
                <option key={d} value={d}>
                  {DIFFICULTY_LABELS[d]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="count">Số câu</Label>
            <Input
              id="count"
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <div className="flex items-end">
            <Button type="button" onClick={handleGenerate} disabled={isGenerating} className="w-full">
              {isGenerating ? "Đang tạo..." : "Tạo bài tập"}
            </Button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-danger-fg">{error}</p>}
        {saved && <p className="mt-3 text-sm text-success-fg">Đã lưu vào ngân hàng bài tập.</p>}
      </Card>

      {drafts && drafts.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-foreground-muted">
            {drafts.length} câu nháp — xem/sửa rồi bấm &quot;Lưu vào ngân hàng&quot; ở cuối.
          </p>
          {drafts.map((draft, idx) => (
            <Card key={idx} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground-muted">Câu nháp {idx + 1}</span>
                <Button type="button" size="sm" variant="ghost" onClick={() => removeDraft(idx)}>
                  Bỏ câu này
                </Button>
              </div>
              <textarea
                value={draft.content}
                onChange={(e) => updateDraft(idx, { content: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {draft.choices.map((choice, cIdx) => (
                  <label key={cIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${idx}`}
                      checked={draft.correctIndex === cIdx}
                      onChange={() => updateDraft(idx, { correctIndex: cIdx })}
                    />
                    <Input
                      value={choice}
                      onChange={(e) => updateChoice(idx, cIdx, e.target.value)}
                      className="flex-1"
                    />
                  </label>
                ))}
              </div>
              <textarea
                value={draft.explanation}
                onChange={(e) => updateDraft(idx, { explanation: e.target.value })}
                rows={2}
                placeholder="Giải thích"
                className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
              />
            </Card>
          ))}
          <div>
            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Đang lưu..." : `Lưu ${drafts.length} câu vào ngân hàng`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
