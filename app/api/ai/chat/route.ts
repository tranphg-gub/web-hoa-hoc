import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { isRateLimited } from "@/lib/ai/rate-limit";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { message } = (await request.json()) as { message?: string };
  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Thiếu nội dung câu hỏi." }, { status: 400 });
  }

  if (isRateLimited(session.user.id)) {
    return NextResponse.json(
      { error: "Bạn hỏi hơi nhanh, hãy đợi một chút rồi thử lại." },
      { status: 429 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Chưa cấu hình ANTHROPIC_API_KEY trên server." },
      { status: 500 }
    );
  }

  await prisma.chatMessage.create({
    data: { userId: session.user.id, role: "user", content: message },
  });

  const history = await prisma.chatMessage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: buildSystemPrompt(session.user.grade),
      messages: history.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply = textBlock && textBlock.type === "text" ? textBlock.text : "";

    await prisma.chatMessage.create({
      data: { userId: session.user.id, role: "assistant", content: reply },
    });

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "AI hiện chưa phản hồi được, thử lại sau nhé." },
      { status: 502 }
    );
  }
}
