"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useProductFilter } from "@/app/contexts/ProductFilterContext";
import {
  OTHER_TYPE_FILTER_ITEMS,
  PLATFORM_FILTER_ITEMS,
  PRODUCT_TYPE_FILTER_ITEMS,
  REGION_FILTER_ITEMS,
  type FilterSubItem,
} from "./filter-data";

type SidebarFilterSection = {
  id: string;
  title: string;
  placeholder?: string;
  items: FilterSubItem[];
  isProductFilter?: boolean;
  showSelectedCount?: boolean;
};

const FILTER_SECTIONS: SidebarFilterSection[] = [
  {
    id: "product-type",
    title: "Product type",
    placeholder: "Search product type",
    items: PRODUCT_TYPE_FILTER_ITEMS,
    isProductFilter: true,
    showSelectedCount: true,
  },
  {
    id: "platform",
    title: "Platform",
    placeholder: "Search platform",
    items: PLATFORM_FILTER_ITEMS,
    isProductFilter: true,
  },
  {
    id: "region",
    title: "Region",
    placeholder: "Search region",
    items: REGION_FILTER_ITEMS,
  },
  {
    id: "other-types",
    title: "Other types",
    items: OTHER_TYPE_FILTER_ITEMS,
  },
];

function formatCount(count?: number) {
  if (count === undefined) return "";
  return new Intl.NumberFormat("en-US").format(count).replace(",", " ");
}

function Triangle({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`size-0 border-x-[10px] border-x-transparent ${
        isOpen
          ? "border-b-[10px] border-b-white"
          : "border-t-[10px] border-t-white"
      }`}
    />
  );
}

function FilterCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] transition ${
        checked ? "bg-forest-500 text-white" : "bg-[#465266]"
      }`}
    >
      {checked && <Check className="size-4 stroke-[3]" />}
    </span>
  );
}

function FilterSection({
  section,
  isOpen,
  checkedIds,
  onToggleOpen,
  onToggleItem,
}: {
  section: SidebarFilterSection;
  isOpen: boolean;
  checkedIds: string[];
  onToggleOpen: (sectionId: string) => void;
  onToggleItem: (item: FilterSubItem, isProductFilter: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const selectedCount = section.items.filter((item) =>
    checkedIds.includes(item.id),
  ).length;

  const visibleItems = useMemo(() => {
    const filteredItems = normalizedQuery
      ? section.items.filter((item) =>
          item.label.toLowerCase().includes(normalizedQuery),
        )
      : section.items;

    return [...filteredItems].sort((left, right) => {
      const leftChecked = checkedIds.includes(left.id);
      const rightChecked = checkedIds.includes(right.id);

      if (leftChecked && !rightChecked) return -1;
      if (!leftChecked && rightChecked) return 1;
      return 0;
    });
  }, [checkedIds, normalizedQuery, section.items]);

  return (
    <section className="w-full border-t border-[#3b4554]">
      <button
        type="button"
        onClick={() => onToggleOpen(section.id)}
        className="flex h-[66px] w-full items-center justify-between text-left text-white transition hover:text-steel-50"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="truncate text-lg font-bold">{section.title}</span>
          {section.showSelectedCount && selectedCount > 0 ? (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#465266] text-sm font-semibold text-[#cbd4e0]">
              {selectedCount}
            </span>
          ) : null}
        </span>
        <Triangle isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              {section.placeholder ? (
                <div className="relative mb-4">
                  <Search className="absolute top-1/2 left-3 size-6 -translate-y-1/2 text-[#a8b2c0]" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={section.placeholder}
                    className="h-10 w-full rounded bg-[#3a4555] pr-3 pl-11 text-sm text-white placeholder:text-[#a8b2c0] focus:ring-2 focus:ring-forest-500/60 focus:outline-none"
                  />
                </div>
              ) : null}

              <div className="max-h-[284px] overflow-y-auto pr-1 [scrollbar-color:#465266_transparent] [scrollbar-width:thin]">
                {visibleItems.map((item) => {
                  const checked = checkedIds.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={item.disabled}
                      onClick={() =>
                        onToggleItem(item, Boolean(section.isProductFilter))
                      }
                      className={`grid min-h-10 w-full grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-2 rounded px-2 text-left transition ${
                        item.disabled
                          ? "cursor-not-allowed opacity-45"
                          : "hover:bg-[#364152]"
                      }`}
                    >
                      <FilterCheckbox checked={checked} />
                      <span className="flex min-w-0 items-center gap-3">
                        {item.icon ? (
                          <span className="flex w-5 shrink-0 items-center justify-center text-base text-[#d8dee8]">
                            {item.icon}
                          </span>
                        ) : null}
                        <span className="truncate text-base text-[#eef3f8]">
                          {item.label}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-[#9aa4b3] tabular-nums">
                        {formatCount(item.count)}
                      </span>
                    </button>
                  );
                })}

                {visibleItems.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-[#9aa4b3]">
                    No filters found.
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function SidebarProductTypeFilter() {
  const { resetVersion, selectedPlatforms, setSelectedPlatforms } =
    useProductFilter();
  const [openSection, setOpenSection] = useState<string>(() =>
    selectedPlatforms.length > 0 ? "product-type" : "",
  );
  const [localCheckedIds, setLocalCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPlatforms.length > 0) {
      setOpenSection((currentSection) => currentSection || "product-type");
    }
  }, [selectedPlatforms]);

  useEffect(() => {
    setLocalCheckedIds([]);
    setOpenSection("");
  }, [resetVersion]);

  const checkedIds = useMemo(
    () => Array.from(new Set([...selectedPlatforms, ...localCheckedIds])),
    [localCheckedIds, selectedPlatforms],
  );

  const handleToggleOpen = (sectionId: string) => {
    setOpenSection((currentSection) =>
      currentSection === sectionId ? "" : sectionId,
    );
  };

  const handleToggleItem = (item: FilterSubItem, isProductFilter: boolean) => {
    if (item.disabled) return;

    if (isProductFilter) {
      setSelectedPlatforms(
        selectedPlatforms.includes(item.id)
          ? selectedPlatforms.filter((selectedId) => selectedId !== item.id)
          : [...selectedPlatforms, item.id],
      );
      return;
    }

    setLocalCheckedIds((currentIds) =>
      currentIds.includes(item.id)
        ? currentIds.filter((checkedId) => checkedId !== item.id)
        : [...currentIds, item.id],
    );
  };

  return (
    <div className="w-full">
      {FILTER_SECTIONS.map((section) => (
        <FilterSection
          key={section.id}
          section={section}
          isOpen={openSection === section.id}
          checkedIds={checkedIds}
          onToggleOpen={handleToggleOpen}
          onToggleItem={handleToggleItem}
        />
      ))}
    </div>
  );
}
