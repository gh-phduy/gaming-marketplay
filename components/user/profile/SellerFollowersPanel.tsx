"use client";

import SellerPeoplePanel from "./SellerPeoplePanel";
import type { SellerProfile } from "../seller-profile.data";

interface SellerFollowersPanelProps {
  profile: SellerProfile;
  onNotify: (message: string) => void;
}

export default function SellerFollowersPanel({
  profile,
  onNotify,
}: SellerFollowersPanelProps) {
  return (
    <SellerPeoplePanel
      title="Followers"
      emptyMessage="This seller has no public followers yet."
      people={profile.followersList}
      onNotify={onNotify}
    />
  );
}
