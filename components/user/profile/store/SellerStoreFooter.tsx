"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/shared/Pagination";
import { useTranslations } from "@/hooks/useTranslations";

interface SellerStoreFooterProps {
  totalProducts: number;
  averagePrice: number;
  currency: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onChangePageSize: (value: number) => void;
}

export default function SellerStoreFooter({
  totalProducts,
  averagePrice,
  currency,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onChangePageSize,
}: SellerStoreFooterProps) {
  const t = useTranslations("user");
  const tProduct = useTranslations("product");

  return (
    <div className="grid grid-cols-1 items-center gap-4 pt-6 lg:grid-cols-[1fr_auto_1fr]">
      <p className="text-center text-sm text-steel-500 lg:text-left">
        {t("productsAvg", { count: totalProducts })} {currency} {averagePrice.toFixed(2)}
      </p>

      <Pagination
        currentPage={Math.min(currentPage, totalPages)}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel={tProduct("back")}
        nextLabel={tProduct("next")}
      />

      <div className="hidden justify-end lg:flex">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            if (!value) {
              return;
            }
            onChangePageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-11 w-[104px] border-midnight-700 bg-midnight-700 text-white">
            <SelectValue placeholder="12" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
