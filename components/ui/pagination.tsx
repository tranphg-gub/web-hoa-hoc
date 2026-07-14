import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)}>
          <Button type="button" size="sm" variant="secondary">
            <ChevronLeft className="h-4 w-4" /> Trước
          </Button>
        </Link>
      ) : (
        <Button type="button" size="sm" variant="secondary" disabled>
          <ChevronLeft className="h-4 w-4" /> Trước
        </Button>
      )}
      <p className="text-sm text-foreground-muted">
        Trang {currentPage}/{totalPages}
      </p>
      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)}>
          <Button type="button" size="sm" variant="secondary">
            Sau <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button type="button" size="sm" variant="secondary" disabled>
          Sau <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
