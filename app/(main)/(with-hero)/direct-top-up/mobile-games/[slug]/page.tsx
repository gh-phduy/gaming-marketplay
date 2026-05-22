import { notFound } from "next/navigation";
import { DirectTopUpDetailClient } from "@/app/components/home/directtopup/detail/DirectTopUpDetailClient";
import {
  TOPUP_GAME_DETAILS,
  type TopUpGameDetail,
} from "@/app/components/home/directtopup/detail/topup-detail-data";

type DirectTopUpGamePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(TOPUP_GAME_DETAILS).map((slug) => ({ slug }));
}

export default async function DirectTopUpGamePage({
  params,
}: DirectTopUpGamePageProps) {
  const { slug } = await params;
  const game = TOPUP_GAME_DETAILS[slug as TopUpGameDetail["slug"]];

  if (!game) {
    notFound();
  }

  return <DirectTopUpDetailClient game={game} />;
}
