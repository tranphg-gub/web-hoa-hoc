import { Fragment } from "react";
import { isReactionLine } from "@/lib/chem";
import { ChemProseText, ReactionEquation } from "@/components/chemistry/chemical-formula";

/**
 * Cú pháp soạn nội dung (markdown tối giản):
 * - Dòng bắt đầu bằng "## " -> tiêu đề mục con.
 * - Dòng bắt đầu bằng "- " -> gộp các dòng liên tiếp thành danh sách gạch đầu dòng.
 * - Dòng chứa "->"/"=>"/"⇌" -> hiển thị dạng khối phương trình phản ứng (monospace).
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

        rawLines.forEach((line, lineIdx) => {
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
        });
        flushBullets(`bul-${blockIdx}-end`);

        return <Fragment key={blockIdx}>{elements}</Fragment>;
      })}
    </div>
  );
}
