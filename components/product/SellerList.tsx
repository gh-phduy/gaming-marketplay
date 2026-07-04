import { supabase } from "@/lib/supabase";
import SellerFilterBar from "./SellerFilterBar";
import SellerRow, { SellerOffer } from "./SellerRow";

async function getSellers(): Promise<SellerOffer[] | null> {
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
      .eq("status", "published");

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

export default async function SellerList() {
  const products = await getSellers();

  if (products === null) {
    return (
      <div className="flex w-full flex-col gap-y-2">
        <SellerFilterBar />
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
          Failed to load sellers. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2">
      <SellerFilterBar />
      {products.map((offer: SellerOffer) => (
        <SellerRow key={offer.data.id} offer={offer} />
      ))}
      {products.length === 0 && (
        <div className="rounded-lg bg-[#2a3441] p-4 text-center text-gray-400">
          No sellers available at the moment.
        </div>
      )}
    </div>
  );
}
