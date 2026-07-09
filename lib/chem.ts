export type ChemSegment =
  | { type: "text"; value: string }
  | { type: "sub"; value: string }
  | { type: "sup"; value: string };

/**
 * Cú pháp gõ tay -> hiển thị khoa học:
 * - "H2O" -> H + subscript(2) + O
 * - "CaCO3 -> CaO + CO2" -> mũi tên phản ứng "→"
 * - "Fe^3+" hoặc "SO4^2-" -> phần sau dấu "^" hiển thị superscript (điện tích ion)
 * - Số đứng đầu một hợp chất (vd "2H2O") là hệ số tỉ lượng, giữ nguyên cỡ chữ thường.
 */
function parseCompound(token: string): ChemSegment[] {
  const segments: ChemSegment[] = [];
  let rest = token;

  const coefficientMatch = rest.match(/^(\d+)/);
  if (coefficientMatch) {
    segments.push({ type: "text", value: coefficientMatch[1] });
    rest = rest.slice(coefficientMatch[1].length);
  }

  let i = 0;
  let textBuffer = "";
  const flushText = () => {
    if (textBuffer) {
      segments.push({ type: "text", value: textBuffer });
      textBuffer = "";
    }
  };

  while (i < rest.length) {
    const char = rest[i];

    if (char === "^") {
      flushText();
      i += 1;
      let sup = "";
      while (i < rest.length && /[0-9+\-]/.test(rest[i])) {
        sup += rest[i];
        i += 1;
      }
      segments.push({ type: "sup", value: sup });
      continue;
    }

    const prevChar = rest[i - 1];
    const isSubscriptDigit =
      /[0-9]/.test(char) && prevChar !== undefined && /[A-Za-z)\]]/.test(prevChar);

    if (isSubscriptDigit) {
      flushText();
      let sub = "";
      while (i < rest.length && /[0-9]/.test(rest[i])) {
        sub += rest[i];
        i += 1;
      }
      segments.push({ type: "sub", value: sub });
      continue;
    }

    textBuffer += char;
    i += 1;
  }
  flushText();

  return segments;
}

export function parseChemText(input: string): ChemSegment[] {
  const normalized = input.replace(/->|=>/g, "→");
  const parts = normalized.split(/(\s*→\s*|\s\+\s)/);

  const segments: ChemSegment[] = [];
  for (const part of parts) {
    if (part === "") continue;
    if (/^\s*→\s*$/.test(part)) {
      segments.push({ type: "text", value: " → " });
    } else if (/^\s\+\s$/.test(part)) {
      segments.push({ type: "text", value: " + " });
    } else {
      segments.push(...parseCompound(part));
    }
  }
  return segments;
}

export function isReactionLine(line: string): boolean {
  return /->|=>|→/.test(line);
}

/**
 * Chỉ những từ viết hoa có chứa số hoặc dấu "^" (điện tích ion) mới được coi
 * là công thức hóa học trong văn bản thường - tránh nhận nhầm từ tiếng Việt
 * viết hoa đầu câu (không có số/ký hiệu) thành công thức.
 */
const CHEM_TOKEN_REGEX =
  /(\[[A-Za-z0-9()]+\]\^[0-9]*[+-]|[A-Z][A-Za-z0-9()]*\d[A-Za-z0-9()]*(?:\^[0-9]*[+-])?|[A-Z][A-Za-z()]*\^[0-9]*[+-])/g;

export function splitProseTokens(text: string): string[] {
  return text.split(CHEM_TOKEN_REGEX).filter((part) => part !== "");
}

export function isChemToken(token: string): boolean {
  return new RegExp(`^${CHEM_TOKEN_REGEX.source}$`).test(token);
}
