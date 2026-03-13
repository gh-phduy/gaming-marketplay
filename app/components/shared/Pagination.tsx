import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
}

/** Returns the page numbers (+ ellipsis markers) to show at a given viewport size bucket */
const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number,
): Array<number | "…"> => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor((maxVisible - 2) / 2); // pages around current (excl. first/last)
  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  // Clamp window so we always show maxVisible - 2 middle pages
  const windowSize = maxVisible - 2;
  if (end - start + 1 < windowSize) {
    if (start === 2) end = Math.min(totalPages - 1, start + windowSize - 1);
    else start = Math.max(2, end - windowSize + 1);
  }

  const pages: Array<number | "…"> = [1];
  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages - 1) pages.push("…");
  pages.push(totalPages);
  return pages;
};

const NavButton = ({
  onClick,
  disabled,
  children,
  className,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "bg-midnight-750 text-steel-300 hover:bg-midnight-600 hover:text-white",
      "disabled:pointer-events-none disabled:opacity-40",
      className,
    )}
  >
    {children}
  </button>
);

export default function SharedPagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  previousLabel = "Prev",
  nextLabel = "Next",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages && page !== currentPage)
      onPageChange(page);
  };

  // Compute page lists for each breakpoint
  const mobilePages = getVisiblePages(currentPage, totalPages, 3);
  const tabletPages = getVisiblePages(currentPage, totalPages, 5);
  const desktopPages = getVisiblePages(currentPage, totalPages, 7);

  const renderPages = (
    pages: Array<number | "…">,
    keyPrefix: string,
    extraClass: string,
  ) => (
    <div className={cn("flex items-center gap-1", extraClass)}>
      {pages.map((page, i) =>
        typeof page === "number" ? (
          <button
            key={`${keyPrefix}-${page}`}
            type="button"
            onClick={() => go(page)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-forest-600 text-white shadow-sm"
                : "bg-midnight-750 text-steel-300 hover:bg-midnight-600 hover:text-white",
            )}
          >
            {page}
          </button>
        ) : (
          <span
            key={`${keyPrefix}-ellipsis-${i}`}
            className="flex h-9 w-6 items-center justify-center text-steel-500"
          >
            <MoreHorizontal className="h-4 w-4" />
          </span>
        ),
      )}
    </div>
  );

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex w-full items-center justify-between gap-2 pt-2"
    >
      {/* Prev */}
      <NavButton
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{previousLabel}</span>
      </NavButton>

      {/* Page numbers — mobile: 3 slots, sm: 5 slots, lg: 7 slots */}
      {renderPages(mobilePages, "mob", "sm:hidden")}
      {renderPages(tabletPages, "tab", "hidden sm:flex lg:hidden")}
      {renderPages(desktopPages, "desk", "hidden lg:flex")}

      {/* Next */}
      <NavButton
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">{nextLabel}</span>
        <ChevronRight className="h-4 w-4" />
      </NavButton>
    </nav>
  );
}
