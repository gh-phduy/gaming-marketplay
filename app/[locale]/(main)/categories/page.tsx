import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

type CatalogCategory = {
  title: string;
  products: string;
  href: string;
  background: string;
  image: string;
  imageAlt: string;
};

const catalogCategories: CatalogCategory[] = [
  {
    title: "Game Keys",
    products: "28 434 products",
    href: "/buy-game-keys",
    background: "/category-catalog/category_bg-2.png",
    image: "/category-catalog/category-2.png",
    imageAlt: "Game store logos",
  },
  {
    title: "Game Cards",
    products: "1 567 products",
    href: "/buy-game-cards",
    background: "/category-catalog/category_bg-425.png",
    image: "/category-catalog/category-425.png",
    imageAlt: "Game card chest",
  },
  {
    title: "Console Games",
    products: "30 483 products",
    href: "/buy-console-games",
    background: "/category-catalog/category_bg-105.png",
    image: "/category-catalog/category-105.png",
    imageAlt: "Game consoles",
  },
  {
    title: "Gift Cards",
    products: "23 517 products",
    href: "/buy-gift-cards",
    background: "/category-catalog/category_bg-5.png",
    image: "/category-catalog/category-5.png",
    imageAlt: "Gift cards",
  },
  {
    title: "Software",
    products: "982 products",
    href: "/buy-software",
    background: "/category-catalog/category_bg-108.png",
    image: "/category-catalog/category-108.png",
    imageAlt: "Software packages",
  },
  {
    title: "PC Games",
    products: "11 450 products",
    href: "/buy-pc-games",
    background: "/category-catalog/category_bg-785.png",
    image: "/category-catalog/category-785.png",
    imageAlt: "PC game character",
  },
  {
    title: "Mobile",
    products: "56 products",
    href: "/buy-mobile",
    background: "/category-catalog/category_bg-858.png",
    image: "/category-catalog/category-858.png",
    imageAlt: "Mobile game character",
  },
  {
    title: "Game Currency",
    products: "117 products",
    href: "/buy-game-currency",
    background: "/category-catalog/category_bg-31.png",
    image: "/category-catalog/category-31.png",
    imageAlt: "Treasure chest with coins",
  },
  {
    title: "Game Accounts",
    products: "67 products",
    href: "/buy-game-accounts",
    background: "/category-catalog/category_bg-2427.png",
    image: "/category-catalog/category-2427.png",
    imageAlt: "Game account characters",
  },
  {
    title: "Game Items",
    products: "71 products",
    href: "/buy-game-items",
    background: "/category-catalog/category_bg-2428.png",
    image: "/category-catalog/category-2428.png",
    imageAlt: "Game item loot",
  },
  {
    title: "Power Leveling",
    products: "68 products",
    href: "/buy-power-leveling",
    background: "/category-catalog/category_bg-2429.png",
    image: "/category-catalog/category-2429.png",
    imageAlt: "Power leveling character",
  },
];

export const metadata: Metadata = {
  title: "Categories - Difmark",
  description:
    "Browse all Difmark marketplace categories, including game keys, console games, gift cards, software, game currency, accounts, items, and power leveling.",
};

function CatalogCard({ category }: { category: CatalogCategory }) {
  return (
    <Link
      href={category.href}
      className="group relative block aspect-square overflow-hidden rounded-sm bg-[#212937] text-left transition duration-500 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-dm-accent-green/70 focus-visible:outline-none"
      aria-label={`Browse ${category.title}`}
    >
      <Image
        src={category.background}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 990px) 33vw, (max-width: 1640px) 25vw, 374px"
        className="object-cover opacity-[0.85]"
        aria-hidden="true"
      />
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 990px) 33vw, (max-width: 1640px) 25vw, 374px"
        className="object-contain object-right-bottom brightness-50 transition duration-700 ease-out group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] group-hover:scale-110 group-hover:brightness-100 sm:group-hover:translate-x-[-8px] sm:group-hover:translate-y-[-8px]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[#0d131c]/35 transition duration-500 group-hover:bg-[#0d131c]/24"
      />
      <span className="relative z-10 block p-[15px]">
        <span className="block truncate text-[16px] leading-[1.4] font-semibold text-[#f6f6f6] sm:text-[18px] 1640:text-2xl">
          {category.title}
        </span>
        <span className="mt-1 block text-xs leading-[1.4] text-[#c0c3c9] sm:text-sm 1640:text-base">
          {category.products}
        </span>
      </span>
    </Link>
  );
}

export default async function CategoriesPage() {
  const t = await getTranslations("home");
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] w-full justify-center overflow-hidden bg-[#171f2a] px-4 pb-[50px] text-dm-text-primary sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/category-catalog/catalog-bg.png')] bg-[length:200%_auto] bg-[position:20px_-90px] bg-no-repeat opacity-90 md:bg-[length:100%_auto]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/category-catalog/bg.svg')] bg-[length:100%_auto] bg-left-top bg-no-repeat"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,31,42,0.35)_0%,rgba(23,31,42,0.72)_46%,rgba(23,31,42,0.96)_100%)]"
      />

      <section className="responsive relative z-10 w-full pt-[30px]">
        <div className="mx-auto max-w-[650px] text-center">
          <h1 className="text-[28px] leading-[1.4] font-semibold text-[#f6f6f6] sm:text-[32px]">
            {t("ourCategories")}
          </h1>
          <p className="mx-auto mt-2.5 text-sm leading-[1.4] text-[#9ba1ab]">
            {t("categoriesDescription")}
          </p>
        </div>

        <div className="mt-0 grid grid-cols-2 gap-x-5 gap-y-0 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-[30px]">
          {catalogCategories.map((category) => (
            <div key={category.title} className="mt-[30px]">
              <CatalogCard category={category} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
