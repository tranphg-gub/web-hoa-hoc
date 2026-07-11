import { Fragment } from "react";
import { isReactionLine } from "@/lib/chem";
import { ChemProseText, ReactionEquation } from "@/components/chemistry/chemical-formula";

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const TABLE_SEPARATOR_ROW = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/;

function parseTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

/**
 * Cú pháp soạn nội dung (markdown tối giản):
 * - Dòng bắt đầu bằng "## " -> tiêu đề mục con.
 * - Dòng bắt đầu bằng "- " -> gộp các dòng liên tiếp thành danh sách gạch đầu dòng.
 * - Dòng chứa "->"/"=>"/"⇌" -> hiển thị dạng khối phương trình phản ứng (monospace).
 * - Dòng dạng "![Mô tả ảnh](url)" -> hình ảnh minh họa, có chú thích bên dưới.
 * - Khối gồm toàn dòng bắt đầu bằng "|" (bảng markdown) -> hiển thị dạng bảng.
 * - Các dòng khác -> đoạn văn thường, công thức hóa học trong câu vẫn tự nhận diện.
 */
export function DocumentContent({ content }: { content: string }) {
  const blocks = content.split("\n\n");

  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, blockIdx) => {
        const rawLines = block.split("\n").filter((l) => l.trim() !== "");
        const elements: React.ReactNode[] = [];
        let bulletBuffer: string[] = [];

        const flushBullets = (key: string) => {
          if (bulletBuffer.length === 0) return;
          elements.push(
            <ul key={key} className="flex flex-col gap-1.5 pl-5 list-disc marker:text-foreground-muted">
              {bulletBuffer.map((item, i) => (
                <li key={i} className="leading-relaxed text-foreground">
                  <ChemProseText text={item} />
                </li>
              ))}
            </ul>
          );
          bulletBuffer = [];
        };

        let lineIdx = 0;
        while (lineIdx < rawLines.length) {
          const line = rawLines[lineIdx];
          const imageMatch = line.match(IMAGE_LINE);
          const nextLine = rawLines[lineIdx + 1];

          if (
            line.trim().startsWith("|") &&
            nextLine !== undefined &&
            TABLE_SEPARATOR_ROW.test(nextLine.trim())
          ) {
            flushBullets(`bul-${blockIdx}-${lineIdx}`);
            const header = parseTableRow(line);
            let end = lineIdx + 2;
            while (end < rawLines.length && rawLines[end].trim().startsWith("|")) end++;
            const bodyLines = rawLines.slice(lineIdx + 2, end);
            elements.push(
              <MarkdownTable
                key={`table-${blockIdx}-${lineIdx}`}
                header={header}
                rows={bodyLines.map(parseTableRow)}
              />
            );
            lineIdx = end;
            continue;
          }

          if (line.startsWith("## ")) {
            flushBullets(`bul-${blockIdx}-${lineIdx}`);
            elements.push(
              <h3
                key={`h-${blockIdx}-${lineIdx}`}
                className="text-sm font-semibold uppercase tracking-wide text-foreground-muted"
              >
                {line.slice(3)}
              </h3>
            );
          } else if (imageMatch) {
            flushBullets(`bul-${blockIdx}-${lineIdx}`);
            elements.push(
              <DocumentImage key={`img-${blockIdx}-${lineIdx}`} alt={imageMatch[1]} src={imageMatch[2]} />
            );
          } else if (line.startsWith("- ")) {
            bulletBuffer.push(line.slice(2));
          } else if (isReactionLine(line)) {
            flushBullets(`bul-${blockIdx}-${lineIdx}`);
            elements.push(<ReactionEquation key={`eq-${blockIdx}-${lineIdx}`} text={line} />);
          } else {
            flushBullets(`bul-${blockIdx}-${lineIdx}`);
            elements.push(
              <p key={`p-${blockIdx}-${lineIdx}`} className="leading-relaxed text-foreground">
                <ChemProseText text={line} />
              </p>
            );
          }
          lineIdx++;
        }
        flushBullets(`bul-${blockIdx}-end`);

        return <Fragment key={blockIdx}>{elements}</Fragment>;
      })}
    </div>
  );
}

function MarkdownTable({ header, rows }: { header: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border-subtle">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-background-subtle">
            {header.map((cell, i) => (
              <th key={i} className="border-b border-border-subtle px-4 py-2.5 font-semibold text-foreground">
                <ChemProseText text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="border-b border-border-subtle last:border-0">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-2.5 text-foreground">
                  <ChemProseText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocumentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="flex flex-col items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh lấy từ URL ngoài (Wikimedia...), không cần tối ưu qua next/image cho quy mô nhỏ của dự án */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="max-h-80 w-auto max-w-full rounded-2xl border border-border-subtle object-contain"
      />
      {alt && <figcaption className="text-center text-xs text-foreground-muted">{alt}</figcaption>}
    </figure>
  );
}
