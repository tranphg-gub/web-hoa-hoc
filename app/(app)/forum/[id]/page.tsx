import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-auth";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChemProseText } from "@/components/chemistry/chemical-formula";
import { ArrowLeft, Sparkles } from "lucide-react";
import { createForumComment, askAiInForum } from "../actions";

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;

  const post = await prisma.forumPost.findUnique({
    where: { id },
    include: {
      user: true,
      comments: { include: { user: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!post) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-16">
      <Link
        href="/forum"
        className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại diễn đàn
      </Link>

      <Card>
        <div className="flex items-center gap-2">
          {post.grade && <Badge tone="neutral">Lớp {post.grade}</Badge>}
          <span className="text-xs text-foreground-muted">{post.user.name}</span>
        </div>
        <CardTitle className="mt-2">{post.title}</CardTitle>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
          <ChemProseText text={post.content} />
        </p>
      </Card>

      <form action={async () => { "use server"; await askAiInForum(post.id); }}>
        <Button type="submit" variant="secondary" size="sm">
          <Sparkles className="h-4 w-4" /> Hỏi AI gia sư
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        {post.comments.map((c) => (
          <Card key={c.id} className={c.isAiReply ? "bg-background-subtle" : undefined}>
            <div className="mb-2 flex items-center gap-2">
              {c.isAiReply ? (
                <Badge tone="warning">AI gia sư</Badge>
              ) : (
                <span className="text-xs font-medium text-foreground-muted">{c.user.name}</span>
              )}
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed">
              <ChemProseText text={c.content} />
            </p>
          </Card>
        ))}
        {post.comments.length === 0 && (
          <p className="text-sm text-foreground-muted">Chưa có trả lời nào.</p>
        )}
      </div>

      <Card>
        <CardTitle className="text-sm">Trả lời</CardTitle>
        <form
          action={async (formData: FormData) => {
            "use server";
            await createForumComment(post.id, formData);
          }}
          className="mt-3 flex flex-col gap-3"
        >
          <textarea
            name="content"
            rows={3}
            required
            className="w-full rounded-xl border border-border-subtle bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground/40"
            placeholder="Chia sẻ cách bạn hiểu hoặc giải bài này..."
          />
          <div>
            <Button type="submit" size="sm">Gửi trả lời</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
