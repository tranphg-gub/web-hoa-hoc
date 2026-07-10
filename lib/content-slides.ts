export type ContentSlide = { title: string; body: string };

/** Chia nội dung bài học (theo tiêu đề "## ...") thành từng slide để hiển thị dạng trình chiếu. */
export function splitIntoSlides(content: string, introTitle: string): ContentSlide[] {
  const lines = content.split("\n");
  const slides: ContentSlide[] = [];
  let currentTitle = introTitle;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentLines.some((l) => l.trim() !== "")) {
      slides.push({ title: currentTitle, body: currentLines.join("\n").trim() });
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentTitle = line.slice(3).trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  flush();

  return slides.length > 0 ? slides : [{ title: introTitle, body: content }];
}
