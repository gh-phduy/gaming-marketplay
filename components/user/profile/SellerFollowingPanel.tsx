"use client";

import SellerPeoplePanel from "./SellerPeoplePanel";
import type { SellerProfile } from "../seller-profile.data";

interface SellerFollowingPanelProps {
  profile: SellerProfile;
  onNotify: (message: string) => void;
}

export default function SellerFollowingPanel({
  profile,
  onNotify,
}: SellerFollowingPanelProps) {
  return (
    <SellerPeoplePanel
      title="Following"
      emptyMessage="This seller is not following public profiles yet."
      people={profile.followingList}
      onNotify={onNotify}
    />
  );
}
