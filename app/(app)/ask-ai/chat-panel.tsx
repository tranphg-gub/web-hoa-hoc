"use client";

import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { cn } from "@/lib/utils";
import { Sparkles, Send } from "lucide-react";

type Message = { id: string; role: "user" | "assistant"; content: string };

export function ChatPanel({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleSend() {
    const content = input.trim();
    if (!content || isSending) return;

    setError(null);
    setInput("");
    const userMessage: Message = {
      id: `local-${Date.now()}`,
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Đã có lỗi xảy ra.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: `assistant-${Date.now()}`, role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("Không thể kết nối tới máy chủ.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Card className="flex h-[70vh] flex-col overflow-hidden p-0 md:p-0">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-foreground-muted">
            <Sparkles className="h-6 w-6" strokeWidth={1.5} />
            <p className="text-sm">
              Hỏi mình bất cứ điều gì về Hóa học nhé!
            </p>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
              m.role === "user"
                ? "self-end bg-foreground text-background"
                : "self-start bg-background-subtle text-foreground"
            )}
          >
            <ChemProseText text={m.content} />
          </div>
        ))}
        {isSending && (
          <div className="self-start rounded-2xl bg-background-subtle px-4 py-2.5 text-sm text-foreground-muted">
            Đang soạn câu trả lời...
          </div>
        )}
      </div>

      {error && (
        <p className="border-t border-border-subtle px-6 py-2 text-xs text-danger-fg">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 border-t border-border-subtle p-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          rows={1}
          placeholder="Nhập câu hỏi của bạn..."
          className="max-h-32 flex-1 resize-none rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
        />
        <Button size="md" onClick={handleSend} disabled={isSending || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
