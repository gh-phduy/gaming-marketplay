import { supabase } from "@/lib/supabase";
import SellerFilterBar from "./SellerFilterBar";
import { SellerOffer } from "./SellerRow";
import SellerListClient from "./SellerListClient";
import { getTranslations } from "next-intl/server";

async function getSellers(sellerId?: string): Promise<SellerOffer[] | null> {
  try {
    let query = supabase
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
      .eq("status", "published");

    if (sellerId) {
      query = query.eq("seller_id", sellerId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching sellers from Supabase:", error);
      return null;
    }

    return (data || []).map((row: any): SellerOffer => ({
      data: {
        id: row.id,
        type: row.category,
        platform: row.platform || "PC",
        edition: "Standard",
        activationRegion: row.region,
        price: Number(row.price),
        currency: row.currency,
        title: row.title || "Game Key",
        image_url: row.image_url || "/cyberpunk_2077.jpg",
      },
      seller: {
        id: row.seller?.id || "unknown",
        name: row.seller?.display_name || "Unknown Seller",
        avatar: row.seller?.avatar_url || "/avt1.png",
        isOnline: true,
        tier: "Pro",
        rating: Number(row.seller?.rating || 5),
      },
    }));
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return null;
  }
}

interface SellerListProps {
  sellerId?: string;
}

export default async function SellerList({ sellerId }: SellerListProps) {
  const products = await getSellers(sellerId);
  const t = await getTranslations("product");

  if (products === null) {
    return (
      <div className="flex w-full flex-col gap-y-2">
        <SellerFilterBar />
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
          {t("failedToLoad")}
        </div>
      </div>
    );
  }

  return <SellerListClient initialOffers={products} />;
}

