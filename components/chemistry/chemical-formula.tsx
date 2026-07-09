import { parseChemText, isChemToken, splitProseTokens } from "@/lib/chem";
import { cn } from "@/lib/utils";

export function ChemicalFormula({
  text,
  className,
  mono = true,
}: {
  text: string;
  className?: string;
  mono?: boolean;
}) {
  const segments = parseChemText(text);
  return (
    <span className={cn(mono && "font-mono", className)}>
      {segments.map((seg, idx) => {
        if (seg.type === "sub") return <sub key={idx}>{seg.value}</sub>;
        if (seg.type === "sup") return <sup key={idx}>{seg.value}</sup>;
        return <span key={idx}>{seg.value}</span>;
      })}
    </span>
  );
}

/** Hiển thị một đoạn văn bản thường có thể chứa công thức hóa học xen kẽ (không in đậm/monospace toàn bộ). */
export function ChemProseText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const tokens = splitProseTokens(text);
  return (
    <span className={className}>
      {tokens.map((token, idx) =>
        isChemToken(token) ? (
          <ChemicalFormula key={idx} text={token} mono={false} />
        ) : (
          <span key={idx}>{token}</span>
        )
      )}
    </span>
  );
}

export function ReactionEquation({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-background-subtle px-4 py-3 text-sm",
        className
      )}
    >
      <ChemicalFormula text={text} />
    </div>
  );
}
