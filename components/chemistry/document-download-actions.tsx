"use client";

import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export function DocumentDownloadActions({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  function handleDownload() {
    const blob = new Blob([`# ${title}\n\n${content}`], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[\\/:*?"<>|]/g, "").trim()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button size="sm" variant="secondary" onClick={handleDownload} type="button">
        <Download className="h-4 w-4" /> Tải Markdown
      </Button>
      <Button size="sm" variant="secondary" onClick={() => window.print()} type="button">
        <Printer className="h-4 w-4" /> In / Lưu PDF
      </Button>
    </div>
  );
}
