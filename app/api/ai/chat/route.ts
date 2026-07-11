import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { isRateLimited } from "@/lib/ai/rate-limit";
import { getGeminiModel } from "@/lib/ai/gemini";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { message } = (await request.json()) as { message?: string };
  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Thiếu nội dung câu hỏi." }, { status: 400 });
  }

  if (await isRateLimited(session.user.id)) {
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

  // Lấy 20 tin nhắn GẦN NHẤT (desc + take), rồi đảo lại cho đúng thứ tự thời gian —
  // lấy "asc + take" sẽ luôn trả về 20 tin nhắn ĐẦU TIÊN trong lịch sử, khiến AI
  // "quên" mọi hội thoại sau khi vượt quá 20 tin.
  const recentHistory = await prisma.chatMessage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const history = recentHistory.reverse();

  const priorTurns = history.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: m.content }],
  }));

  const model = getGeminiModel(buildSystemPrompt(session.user.grade));

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
