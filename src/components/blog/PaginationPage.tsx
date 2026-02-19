import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationPageProps {
  currentPage: number;
  totalPages: number;
  searchParams?: string;
}

export function PaginationPage({ currentPage, totalPages, searchParams = "" }: PaginationPageProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `/blog?${params.toString()}`;
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Paginación">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold font-in-poppins transition-colors ${
            page === currentPage
              ? "bg-in-cyan text-black"
              : "text-white/60 hover:bg-white/10"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-5 h-5 text-white/60" />
        </Link>
      )}
    </nav>
  );
}
