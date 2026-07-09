import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ChatPanel } from "./chat-panel";

export default async function AskAiPage() {
  const session = await auth();

  const history = await prisma.chatMessage.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Hỏi AI <span className="accent-italic">gia sư Hóa học</span>
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Giải thích từng bước, gợi ý cách làm — không chỉ đưa đáp số.
        </p>
      </div>

      <ChatPanel
        initialMessages={history.map((m) => ({
          id: m.id,
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        }))}
      />
    </div>
  );
}
