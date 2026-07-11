"use client";

import { useState, useTransition } from "react";
import type { Difficulty } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { DIFFICULTY_LABELS, DIFFICULTY_ORDER } from "@/lib/difficulty";
import type { QuizQuestionDraft } from "@/lib/ai/quiz-question-generator";
import { generateQuizDrafts, saveQuizDrafts } from "../actions";

const fieldClass =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40";

const TYPE_LABELS: Record<QuizQuestionDraft["type"], string> = {
  SINGLE_CHOICE: "Trắc nghiệm (Phần I)",
  TRUE_FALSE_GROUP: "Đúng/Sai (Phần II)",
  SHORT_ANSWER: "Trả lời ngắn (Phần III)",
};

export function AiDraftForm({ quizId }: { quizId: string }) {
  const [singleChoice, setSingleChoice] = useState(4);
  const [trueFalse, setTrueFalse] = useState(1);
  const [shortAnswer, setShortAnswer] = useState(2);
  const [drafts, setDrafts] = useState<QuizQuestionDraft[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [isGenerating, startGenerating] = useTransition();
  const [isSaving, startSaving] = useTransition();

  function handleGenerate() {
    setError(null);
    setSavedCount(null);
    startGenerating(async () => {
      try {
        const result = await generateQuizDrafts(quizId, { singleChoice, trueFalse, shortAnswer });
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

  function updateDraft(idx: number, patch: Partial<QuizQuestionDraft>) {
    setDrafts((prev) => (prev ? prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)) : prev));
  }

  function updateChoice(idx: number, choiceIdx: number, value: string) {
    setDrafts((prev) =>
      prev
        ? prev.map((d, i) =>
            i === idx && d.choices
              ? { ...d, choices: d.choices.map((c, ci) => (ci === choiceIdx ? value : c)) }
              : d
          )
        : prev
    );
  }

  function updateStatement(idx: number, stmtIdx: number, patch: { text?: string; correct?: boolean }) {
    setDrafts((prev) =>
      prev
        ? prev.map((d, i) =>
            i === idx && d.statements
              ? {
                  ...d,
                  statements: d.statements.map((s, si) => (si === stmtIdx ? { ...s, ...patch } : s)),
                }
              : d
          )
        : prev
    );
  }

  function removeDraft(idx: number) {
    setDrafts((prev) => (prev ? prev.filter((_, i) => i !== idx) : prev));
  }

  function handleSave() {
    if (!drafts || drafts.length === 0) return;
    setError(null);
    startSaving(async () => {
      try {
        const count = await saveQuizDrafts(quizId, drafts);
        setDrafts(null);
        setSavedCount(count);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi khi lưu.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ai-sc">Trắc nghiệm (Phần I)</Label>
          <Input
            id="ai-sc"
            type="number"
            min={0}
            max={20}
            value={singleChoice}
            onChange={(e) => setSingleChoice(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ai-tf">Đúng/Sai (Phần II)</Label>
          <Input
            id="ai-tf"
            type="number"
            min={0}
            max={8}
            value={trueFalse}
            onChange={(e) => setTrueFalse(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ai-sa">Trả lời ngắn (Phần III)</Label>
          <Input
            id="ai-sa"
            type="number"
            min={0}
            max={10}
            value={shortAnswer}
            onChange={(e) => setShortAnswer(Number(e.target.value))}
          />
        </div>
        <div className="flex items-end">
          <Button type="button" onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? "Đang tạo..." : "AI soạn nháp"}
          </Button>
        </div>
      </div>
      <p className="text-xs text-foreground-muted">
        AI soạn dựa trên nội dung bài học của chương gắn với đề này, có lượt AI thứ 2 giải lại để kiểm
        chứng đáp án. Câu nháp chỉ được thêm vào đề sau khi bạn xem và bấm lưu.
      </p>
      {error && <p className="text-sm text-danger-fg">{error}</p>}
      {savedCount !== null && (
        <p className="text-sm text-success-fg">Đã thêm {savedCount} câu vào đề.</p>
      )}

      {drafts && drafts.length > 0 && (
        <div className="flex flex-col gap-4">
          {drafts.map((draft, idx) => (
            <div key={idx} className="flex flex-col gap-3 rounded-2xl border border-border-subtle p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground-muted">
                    Câu nháp {idx + 1} · {TYPE_LABELS[draft.type]}
                  </span>
                  {draft.verified ? (
                    <span className="text-xs font-medium text-success-fg">✓ AI kiểm chứng khớp đáp án</span>
                  ) : (
                    <span className="text-xs font-medium text-danger-fg">⚠ {draft.verifierNote}</span>
                  )}
                </div>
                <Button type="button" size="sm" variant="ghost" onClick={() => removeDraft(idx)}>
                  Bỏ câu này
                </Button>
              </div>

              <textarea
                value={draft.content}
                onChange={(e) => updateDraft(idx, { content: e.target.value })}
                rows={2}
                className={fieldClass}
              />

              {draft.type === "SINGLE_CHOICE" && draft.choices && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {draft.choices.map((choice, cIdx) => (
                    <label key={cIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`draft-correct-${idx}`}
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
              )}

              {draft.type === "TRUE_FALSE_GROUP" && draft.statements && (
                <div className="flex flex-col gap-2">
                  {draft.statements.map((stmt, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-1.5 rounded-xl border border-border-subtle p-3">
                      <textarea
                        value={stmt.text}
                        onChange={(e) => updateStatement(idx, sIdx, { text: e.target.value })}
                        rows={2}
                        className={fieldClass}
                      />
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-foreground-muted">Ý {String.fromCharCode(97 + sIdx)}):</span>
                        <label className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            name={`draft-${idx}-stmt-${sIdx}`}
                            checked={stmt.correct}
                            onChange={() => updateStatement(idx, sIdx, { correct: true })}
                          />
                          Đúng
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            name={`draft-${idx}-stmt-${sIdx}`}
                            checked={!stmt.correct}
                            onChange={() => updateStatement(idx, sIdx, { correct: false })}
                          />
                          Sai
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {draft.type === "SHORT_ANSWER" && (
                <div className="flex flex-col gap-1.5">
                  <Label>Đáp án đúng</Label>
                  <Input
                    value={draft.shortAnswer ?? ""}
                    onChange={(e) => updateDraft(idx, { shortAnswer: e.target.value })}
                    className="max-w-[220px]"
                  />
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Mức độ</Label>
                  <select
                    value={draft.difficulty}
                    onChange={(e) => updateDraft(idx, { difficulty: e.target.value as Difficulty })}
                    className={`${fieldClass} max-w-[220px]`}
                  >
                    {DIFFICULTY_ORDER.map((d) => (
                      <option key={d} value={d}>
                        {DIFFICULTY_LABELS[d]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Giải thích</Label>
                  <textarea
                    value={draft.explanation}
                    onChange={(e) => updateDraft(idx, { explanation: e.target.value })}
                    rows={2}
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>
          ))}
          <div>
            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Đang lưu..." : `Thêm ${drafts.length} câu vào đề`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
