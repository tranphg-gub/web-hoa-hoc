/** Trích các tiêu đề mục con ("## ...") trong nội dung bài học, dùng để dựng sơ đồ tư duy. */
export function extractHeadings(content: string): string[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim());
}
