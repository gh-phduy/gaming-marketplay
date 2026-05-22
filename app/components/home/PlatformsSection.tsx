import PlatformCard from "./PlatformCard";
import ProductCarousel from "../product/ProductCarousel";
import SectionHeader from "../shared/SectionHeader";

const PLATFORM_ITEMS = [
  {
    id: "playstation-5",
    name: "Playstation 5",
    href: "/product?platform=playstation",
  },
  {
    id: "playstation-4",
    name: "Playstation 4",
    href: "/product?platform=playstation",
  },
  {
    id: "pc",
    name: "PC",
    href: "/product?productType=pc-games",
  },
  {
    id: "xbox-series-x",
    name: "Xbox series X",
    href: "/product?platform=xbox-live",
  },
  {
    id: "xbox-one",
    name: "Xbox One",
    href: "/product?platform=xbox-live",
  },
  {
    id: "nintendo-switch",
    name: "Nintendo Switch",
    href: "/product?platform=nintendo",
  },
] as const;

export default function PlatformsSection() {
  return (
    <section
      className="w-full responsive overflow-visible px-8 800:px-0"
      aria-labelledby="platforms-heading"
    >
      <SectionHeader
        headingId="platforms-heading"
        headingText="Platforms"
        title="PLATFORMS"
        containerClassName="mb-10"
        titleClassName="-translate-x-[22px]"
        viewAllAriaLabel="View all platforms"
      />
      <div className="hidden grid-cols-2 gap-4 800:grid 990:grid-cols-3 990:gap-6">
        {PLATFORM_ITEMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            name={platform.name}
            href={platform.href}
          />
        ))}
      </div>
      <div className="block overflow-visible 800:hidden">
        <ProductCarousel>
          {PLATFORM_ITEMS.map((platform) => (
            <PlatformCard
              key={platform.id}
              name={platform.name}
              href={platform.href}
            />
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
}
