import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
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

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Chưa cấu hình GEMINI_API_KEY trên server." },
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

  const priorTurns = history.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));

  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-2.5-pro",
    systemInstruction: buildSystemPrompt(session.user.grade),
  });

  try {
    const chat = model.startChat({ history: priorTurns });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

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
