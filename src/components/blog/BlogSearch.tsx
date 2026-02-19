"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import type { BlogCategory, BlogTag } from "@/types/blog";

interface BlogSearchProps {
  categories: BlogCategory[];
  tags: BlogTag[];
}

export function BlogSearch({ categories, tags }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showFilter, setShowFilter] = useState(false);
  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  function navigate(params: Record<string, string>) {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    newParams.delete("page");
    const qs = newParams.toString();
    router.push(qs ? `/blog?${qs}` : "/blog");
  }

  function handleSearch(value: string) {
    setSearch(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      navigate({ search: value });
    }, 500);
  }

  return (
    <div className="flex flex-col gap-4 md:items-end">
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 w-full">
        {/* Search */}
        <div className="relative w-full md:w-56">
          <input
            type="text"
            placeholder="Buscar...."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-transparent border border-white/25 rounded-full pl-4 pr-10 py-2.5 text-white placeholder:text-white/40 text-sm font-in-poppins focus:outline-none focus:border-in-cyan w-full transition-colors"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        </div>

        {/* Filter */}
        <div className="relative w-full md:w-auto" ref={filterRef}>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border border-white/25 rounded-full px-4 py-2.5 text-white text-sm font-in-poppins flex items-center justify-between md:justify-start gap-2 hover:border-in-cyan transition-colors cursor-pointer w-full md:w-auto"
          >
            {activeCategory
              ? categories.find((c) => c.slug.current === activeCategory)?.title || "Filtrar por"
              : "Filtrar por"}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? "rotate-180" : ""}`} />
          </button>

          {showFilter && (
            <div className="absolute top-full mt-2 left-0 md:right-0 md:left-auto bg-in-blue-main border border-white/15 rounded-xl shadow-xl z-20 w-full md:min-w-[170px] py-1 overflow-hidden">
              <button
                onClick={() => { navigate({ category: "" }); setShowFilter(false); }}
                className={`block w-full text-left px-4 py-2.5 text-sm font-in-poppins hover:bg-white/5 transition-colors cursor-pointer ${
                  !activeCategory ? "text-in-cyan" : "text-white/70"
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug.current}
                  onClick={() => { navigate({ category: cat.slug.current }); setShowFilter(false); }}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-in-poppins hover:bg-white/5 transition-colors cursor-pointer ${
                    activeCategory === cat.slug.current ? "text-in-cyan" : "text-white/70"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {tags?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {tags.map((tag) => {
            const isActive = activeTag === tag.slug.current;
            return (
              <button
                key={tag.slug.current}
                onClick={() => navigate({ tag: isActive ? "" : tag.slug.current })}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] rounded-full transition-all border ${
                  isActive
                    ? "bg-in-cyan text-in-blue-main border-in-cyan shadow-[0_10px_30px_rgba(93,197,190,0.35)]"
                    : "bg-in-blue-dark/80 text-in-cyan border-in-cyan/25 hover:border-in-cyan/60 hover:text-in-cyan hover:shadow-[0_0_0_1px_rgba(93,197,190,0.35)]"
                }`}
              >
                {tag.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
