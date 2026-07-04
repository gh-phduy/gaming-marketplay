import ProductCarousel from "../product/ProductCarousel";
import { CanvasTextImage } from "../shared/TextImageCanvas";
import UpcomingGameCard from "./UpcomingGameCard";

export default function UpcomingGamesSection() {
  return (
    <section className="w-full 800:px-0 px-8 responsive" aria-labelledby="upcoming-games-heading">
      <h2 id="upcoming-games-heading" className="sr-only">
        Upcoming Games
      </h2>
      <CanvasTextImage
        className="-translate-x-[22px]"
        text="UPCOMING GAMES"
        imageUrl="/text-img.svg"
        size="24px"
        aria-hidden="true"
      />
      <div className="mt-10 hidden 800:grid grid-cols-1 990:grid-cols-3 1920:grid-cols-4 gap-4" role="list" aria-label="Upcoming games">
        <div>
          <UpcomingGameCard />
          <UpcomingGameCard />
        </div>
        <div className="hidden 990:block">
          <UpcomingGameCard />
          <UpcomingGameCard />
        </div>
        <div className="hidden 990:block">
          <UpcomingGameCard />
          <UpcomingGameCard />
        </div>
        <div className="hidden 1920:block">
          <UpcomingGameCard />
          <UpcomingGameCard />
        </div>

      </div>
      <div className="block 800:hidden" >
        <ProductCarousel>
          <UpcomingGameCard />
          <UpcomingGameCard />
          <UpcomingGameCard />
          <UpcomingGameCard />
          <UpcomingGameCard />
          <UpcomingGameCard />
        </ProductCarousel>
      </div>
    </section>
  );
}
