import SellerProfileClient from "@/components/user/SellerProfileClient";
import SellerProfileRouteFallbackClient from "@/components/user/SellerProfileRouteFallbackClient";
import { getSellerProfile } from "@/components/user/seller-profile.data";

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ sellerId: string }>;
}) {
  const { sellerId: sellerNameKey } = await params;
  const profile = await getSellerProfile(sellerNameKey);

  if (!profile) {
    return <SellerProfileRouteFallbackClient sellerRouteKey={sellerNameKey} />;
  }

  return <SellerProfileClient profile={profile} />;
}
