import SellerProfileClient from "@/components/user/SellerProfileClient";
import { getSellerProfile } from "@/components/user/seller-profile.data";

export default async function UserPage() {
  const profile = await getSellerProfile("Easy-key");

  if (!profile) {
    return null;
  }

  return <SellerProfileClient profile={profile} />;
}
