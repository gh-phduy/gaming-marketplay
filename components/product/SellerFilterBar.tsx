"use client";

import FilterDropdown, { FilterOption } from "./FilterDropdown";
import ResetFilterButton from "./ResetFilterButton";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FaMedal } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";
import { MdSort } from "react-icons/md";

import { useTranslations } from "next-intl";

export default function SellerFilterBar() {
  const t = useTranslations("product");

  const REGION_OPTIONS: FilterOption[] = [
    { id: "all", label: t("allRegions") },
    { id: "au", label: t("australia"), count: 1, flagCode: "au" },
    { id: "ca", label: t("canada"), count: 1, flagCode: "ca" },
    { id: "eu", label: t("europe"), count: 4, flagCode: "eu" },
    { id: "global", label: t("global"), count: 5, flagCode: "un" },
    { id: "gb", label: t("unitedKingdom"), count: 1, flagCode: "gb" },
    { id: "us", label: t("unitedStates"), count: 1, flagCode: "us" },
  ];

  const PLATFORM_OPTIONS: FilterOption[] = [
    { id: "all", label: t("allPlatforms") },
    { id: "steam", label: "Steam" },
    { id: "xbox", label: "Xbox" },
    { id: "ps5", label: "PlayStation 5" },
    { id: "epic", label: "Epic Games" },
  ];

  const EDITION_OPTIONS: FilterOption[] = [
    { id: "all", label: t("allEditions") },
    { id: "standard", label: t("standardEdition") },
    { id: "deluxe", label: t("deluxeEdition") },
    { id: "ultimate", label: t("ultimateEdition") },
  ];

  const SORT_OPTIONS: FilterOption[] = [
    { id: "price_asc", label: t("priceLowToHigh") },
    { id: "price_desc", label: t("priceHighToLow") },
    { id: "rating", label: t("sellerRating") },
  ];
  return (
    <div className="mb-4 flex w-full flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 lg:flex-nowrap lg:justify-between lg:gap-x-4">
      <FilterDropdown
        options={REGION_OPTIONS}
        headerIcon={<HiOutlineMapPin size={18} />}
        width="w-full sm:w-[calc(50%-6px)] lg:w-[366px]"
      />
      <FilterDropdown
        options={PLATFORM_OPTIONS}
        headerIcon={<RiGlobalLine size={18} />}
        width="w-full sm:w-[calc(50%-6px)] lg:w-[366px]"
      />
      <FilterDropdown
        options={EDITION_OPTIONS}
        headerIcon={<FaMedal size={18} />}
        width="w-full sm:w-[calc(50%-6px)] lg:w-[366px]"
      />
      <FilterDropdown
        options={SORT_OPTIONS}
        headerIcon={<MdSort size={20} />}
        width="w-full sm:w-[calc(50%-6px)] lg:w-[280px]"
        defaultValue="price_asc"
      />
      <ResetFilterButton />
    </div>
  );
}
