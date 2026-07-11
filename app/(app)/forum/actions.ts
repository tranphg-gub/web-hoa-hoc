"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildSystemPrompt } from "@/lib/ai/system-prompt";
import { askGeminiOnce } from "@/lib/ai/gemini";
import { isRateLimited } from "@/lib/ai/rate-limit";

export async function createForumPost(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!title || !content) {
    throw new Error("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
  }

  const post = await prisma.forumPost.create({
    data: { userId: session.user.id, title, content, grade: session.user.grade },
  });

  revalidatePath("/forum");
  redirect(`/forum/${post.id}`);
}

export async function createForumComment(postId: string, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  const content = String(formData.get("content") ?? "").trim();
  if (!content) throw new Error("Vui lòng nhập nội dung trả lời.");

  await prisma.forumComment.create({
    data: { postId, userId: session.user.id, content },
  });

  revalidatePath(`/forum/${postId}`);
}

export async function askAiInForum(postId: string) {
  const session = await auth();
  if (!session) throw new Error("Chưa đăng nhập.");

  if (await isRateLimited(session.user.id)) {
    throw new Error("Bạn hỏi AI hơi nhanh, hãy đợi một chút rồi thử lại.");
  }

  const post = await prisma.forumPost.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Không tìm thấy bài đăng.");

  const reply = await askGeminiOnce(
    buildSystemPrompt(session.user.grade),
    `${post.title}\n\n${post.content}`
  );

  await prisma.forumComment.create({
    data: { postId, userId: session.user.id, content: reply, isAiReply: true },
  });

  revalidatePath(`/forum/${postId}`);
}
