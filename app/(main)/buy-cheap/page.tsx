import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import nextDynamic from "next/dynamic";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import ProductOverview from "@/components/product/ProductOverview";
import { ProductApiResponse } from "@/types/api-product";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { supabase } from "@/lib/supabase";

// Dynamic imports for below-the-fold components (lazy loading)
const ProductDescription = nextDynamic(
  () => import("@/components/product/ProductDescription"),
  {
    loading: () => <Skeleton className="h-[200px] w-full rounded-lg" />,
  },
);
const SellerList = nextDynamic(
  () => import("@/components/product/SellerList"),
  {
    loading: () => <Skeleton className="h-[300px] w-full rounded-lg" />,
  },
);
const LoadMoreButton = nextDynamic(
  () => import("@/components/shared/LoadMoreButton"),
);
const Pagination = nextDynamic(() => import("@/components/shared/Pagination"));
const AboutProductSection = nextDynamic(
  () => import("@/components/product/ProductContent"),
  {
    loading: () => <Skeleton className="h-[200px] w-full rounded-lg" />,
  },
);

// Helper for server-side fetching
async function getProduct(id: string): Promise<ProductApiResponse | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        seller:users (
          id,
          display_name,
          avatar_url,
          rating,
          is_verified_seller
        )
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Failed to fetch product from Supabase:", error);
      return null;
    }

    const mapped: ProductApiResponse = {
      data: {
        id: data.id,
        name: data.title,
        type: data.category,
        platform: data.platform || "PC",
        edition: "Standard",
        delivery: "Instant",
        activationRegion: data.region,
        price: Number(data.price),
        currency: data.currency,
        images: [data.image_url || "/cyberpunk_2077.jpg"],
      },
      seller: {
        id: data.seller?.id || "unknown",
        name: data.seller?.display_name || "Unknown Seller",
        avatar: data.seller?.avatar_url || "/avt1.png",
        isOnline: true,
        badge: data.seller?.is_verified_seller ? "Verified Seller" : "Seller",
        tier: "Pro",
        rating: Number(data.seller?.rating || 5),
        successRate: 100,
        totalFeedbacks: 12,
        timezone: "GMT+7",
        totalSales: 10,
        positiveFeedbacks: 12,
        negativeFeedbacks: 0,
      },
    };

    return mapped;
  } catch (e) {
    console.error("Failed to fetch product:", e);
    return null;
  }
}

export const dynamic = "force-dynamic";

export default async function BuyCheapPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const t = await getTranslations("product");
  const { id } = await searchParams;
  if (!id) {
    return (
      <main
        id="main-content"
        className="flex w-full max-w-[1590px] flex-col items-center gap-y-8"
      >
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
          {t("noProductIdProvided")}
        </div>
      </main>
    );
  }
  // Fetch product data on the server
  const productData = await getProduct(id);

  return (
    <main
      id="main-content"
      className="flex w-full max-w-[1590px] flex-col items-center gap-y-6 px-3 sm:gap-y-8 sm:px-5 md:px-6 lg:px-8"
    >
      <ScrollToTop />
      <Breadcrumbs />

      {/* Product Header Section */}
      {!productData ? (
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
          {t("productNotFoundOrFailedToLoad")}
        </div>
      ) : (
        <>
          <h1 className="text-center text-xl font-semibold uppercase sm:text-2xl md:text-[28px] lg:text-[32px]">
            {productData.data.name}
          </h1>
          <ProductOverview data={productData} />
        </>
      )}

      {/* Below-the-fold content with Suspense */}
      <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
        <ProductDescription />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
        <SellerList />
      </Suspense>

      <Pagination />

      <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
        <AboutProductSection />
      </Suspense>
    </main>
  );
}
