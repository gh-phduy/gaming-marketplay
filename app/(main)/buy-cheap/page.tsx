import { Suspense } from "react";
import dynamic from "next/dynamic";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import ProductOverview from "../../components/product/ProductOverview";
import { ProductApiResponse } from "@/app/types/product";
import ScrollToTop from "../../components/shared/ScrollToTop";

// Dynamic imports for below-the-fold components (lazy loading)
const ProductDescription = dynamic(
  () => import("../../components/product/ProductDescription"),
  {
    loading: () => <Skeleton className="h-[200px] w-full rounded-lg" />,
  },
);
const SellerList = dynamic(
  () => import("../../components/product/SellerList"),
  {
    loading: () => <Skeleton className="h-[300px] w-full rounded-lg" />,
  },
);
const LoadMoreButton = dynamic(
  () => import("../../components/shared/LoadMoreButton"),
);
const Pagination = dynamic(() => import("../../components/shared/Pagination"));
const AboutProductSection = dynamic(
  () => import("../../components/product/ProductContent"),
  {
    loading: () => <Skeleton className="h-[200px] w-full rounded-lg" />,
  },
);

// Helper for server-side fetching
async function getProduct(id: string): Promise<ProductApiResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Failed to fetch product:", e);
    return null;
  }
}

export default async function BuyCheapPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) {
    return (
      <main
        id="main-content"
        className="flex w-full max-w-[1590px] flex-col items-center gap-y-8"
      >
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
          No product ID provided.
        </div>
      </main>
    );
  }
  // Fetch product data on the server
  const productData = await getProduct(id);

  return (
    <main
      id="main-content"
      className="flex w-full max-w-[1590px] flex-col items-center gap-y-8"
    >
      <ScrollToTop />
      <Breadcrumbs />

      {/* Product Header Section */}
      {!productData ? (
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
          Product not found or failed to load. Please try again later.
        </div>
      ) : (
        <>
          <h1 className="text-[32px] font-semibold uppercase">
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

      <LoadMoreButton />
      <Pagination />

      <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}>
        <AboutProductSection />
      </Suspense>
    </main>
  );
}
