import { notFound } from "next/navigation";
import { DirectTopUpDetailClient } from "@/components/home/directtopup/detail/DirectTopUpDetailClient";
import {
  TOPUP_GAME_DETAILS,
  type TopUpGameDetail,
} from "@/components/home/directtopup/detail/topup-detail-data";
import { TOPUP_GAMES } from "@/lib/constants/products";

type DirectTopUpGamePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return TOPUP_GAMES.filter((g) => TOPUP_GAME_DETAILS[g.slug]).map((game) => {
    const category =
      game.category === "services" ? "services" : `${game.category}-games`;
    return { category, slug: game.slug };
  });
}

export default async function DirectTopUpGamePage({
  params,
}: DirectTopUpGamePageProps) {
  const { category, slug } = await params;
  const game = TOPUP_GAME_DETAILS[slug as TopUpGameDetail["slug"]];

  if (!game) {
    notFound();
  }

  // Verify the category in the URL matches the game's actual category path
  const expectedCategory =
    game.category === "services" ? "services" : `${game.category}-games`;
  if (category !== expectedCategory) {
    notFound();
  }

  return <DirectTopUpDetailClient game={game} />;
}
