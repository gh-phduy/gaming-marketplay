"use client";

import { Grid3X3, List, ListFilter, Search, Shapes } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const selectTriggerClassName =
  "h-11 w-full rounded-md border border-midnight-700 bg-midnight-800 px-4 text-base text-white shadow-none transition-colors hover:bg-midnight-750 focus-visible:border-forest-500 focus-visible:ring-2 focus-visible:ring-forest-500/20 data-[popup-open]:border-midnight-650 data-[popup-open]:bg-midnight-700 [&>svg:last-child]:ml-auto [&>svg:last-child]:text-white";

const selectContentClassName =
  "mt-1 overflow-hidden rounded-md border border-midnight-650 bg-midnight-700 p-0 text-base text-steel-300 shadow-2xl shadow-black/35 ring-0";

const selectItemClassName =
  "min-h-12 rounded-none border-l-2 border-transparent px-5 py-3 pr-10 text-base text-steel-300 transition-colors hover:bg-midnight-650 hover:text-white focus:bg-midnight-650 focus:text-white data-[highlighted]:bg-midnight-650 data-[highlighted]:text-white data-[selected]:border-forest-500 data-[selected]:bg-midnight-650 data-[selected]:text-white [&>span:last-child]:right-4 [&>span:last-child]:text-forest-500";

const sortLabels: Record<string, string> = {
  popular: "Sort by",
  "price-desc": "Price: higher to lower",
  "price-asc": "Price: lower to higher",
  title: "Product name A-Z",
};

interface SellerStoreFiltersProps {
  searchTerm: string;
  onChangeSearchTerm: (value: string) => void;
  category: string;
  onChangeCategory: (value: string) => void;
  categoryOptions: string[];
  sortBy: string;
  onChangeSortBy: (value: string) => void;
  viewMode: "list" | "grid";
  onToggleViewMode: () => void;
}

export default function SellerStoreFilters({
  searchTerm,
  onChangeSearchTerm,
  category,
  onChangeCategory,
  categoryOptions,
  sortBy,
  onChangeSortBy,
  viewMode,
  onToggleViewMode,
}: SellerStoreFiltersProps) {
  const categoryLabel =
    category === "all"
      ? "All categories"
      : categoryOptions.find((option) => option.toLowerCase() === category) ??
        "All categories";
  const sortLabel = sortLabels[sortBy] ?? "Sort by";

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_265px_265px_96px]">
      <div className="relative">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-steel-500"
        />
        <Input
          value={searchTerm}
          onChange={(event) => onChangeSearchTerm(event.target.value)}
          placeholder="Search by Product name"
          className="h-11 border border-midnight-700 bg-midnight-800 pl-12 text-white"
        />
      </div>

      <Select
        value={category}
        onValueChange={(value) => {
          if (!value) {
            return;
          }
          onChangeCategory(value);
        }}
      >
        <SelectTrigger className={selectTriggerClassName}>
          <Shapes size={18} className="mr-2 text-white" />
          <span className="min-w-0 flex-1 truncate text-left">
            {categoryLabel}
          </span>
        </SelectTrigger>
        <SelectContent className={selectContentClassName}>
          <SelectItem className={selectItemClassName} value="all">
            All categories
          </SelectItem>
          {categoryOptions.map((option) => (
            <SelectItem
              key={option}
              className={selectItemClassName}
              value={option.toLowerCase()}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortBy}
        onValueChange={(value) => {
          if (!value) {
            return;
          }
          onChangeSortBy(value);
        }}
      >
        <SelectTrigger className={selectTriggerClassName}>
          <ListFilter size={18} className="mr-2 text-white" />
          <span className="min-w-0 flex-1 truncate text-left">{sortLabel}</span>
        </SelectTrigger>
        <SelectContent className={selectContentClassName}>
          <SelectItem className={selectItemClassName} value="price-desc">
            Price: from higher to lower
          </SelectItem>
          <SelectItem className={selectItemClassName} value="price-asc">
            Price: from lower to higher
          </SelectItem>
          <SelectItem className={selectItemClassName} value="popular">
            Newest first
          </SelectItem>
          <SelectItem className={selectItemClassName} value="title">
            Product name A-Z
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        onClick={onToggleViewMode}
        className="h-11 border-midnight-700 bg-midnight-800 text-steel-300 hover:bg-midnight-700"
        aria-label={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
      >
        {viewMode === "grid" ? (
          <List size={16} className="mr-2" />
        ) : (
          <Grid3X3 size={16} className="mr-2" />
        )}
        {viewMode === "grid" ? "List" : "Grid"}
      </Button>
    </div>
  );
}
