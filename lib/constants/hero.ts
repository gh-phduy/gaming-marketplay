// Hero carousel slides configuration
export interface HeroSlide {
  id: string;
  image: string;
  alt?: string;
  link?: string;
}

export const HERO_SLIDES_DIGITAL: HeroSlide[] = [
  {
    id: "hero-slide-tab-1",
    image: "/hero-slide-tab-1.webp",
    alt: "Digital Products Hero 1",
  },
  {
    id: "hero-slide-tab-2",
    image: "/hero-slide-tab-2.webp",
    alt: "Digital Products Hero 2",
  },
];

export const HERO_SLIDES_TOPUP: HeroSlide[] = [
  {
    id: "hero-slide-tab-1",
    image: "/hero-slide-tab-1.webp",
    alt: "Direct Top Up Hero 1",
    link: "/direct-top-up/mobile-games/mobile-legends",
  },
  {
    id: "hero-slide-tab-2",
    image: "/hero-slide-tab-2.webp",
    alt: "Direct Top Up Hero 2",
    link: "/direct-top-up/mobile-games/pubg-mobile",
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-slide-1",
    image: "/hero-slide-1.webp",
    alt: "Hero 1",
  },
  {
    id: "hero-slide-2",
    image: "/hero-slide-2.webp",
    alt: "Hero 2",
  },
  {
    id: "hero-slide-3",
    image: "/hero-slide-3.webp",
    alt: "Hero 3",
  },
  {
    id: "hero-slide-4",
    image: "/hero-slide-4.webp",
    alt: "Hero 4",
  },
];

// Side banners configuration
export interface SideBanner {
  id: string;
  image: string;
  link: string;
  alt: string;
}

export const HERO_SIDE_BANNERS: SideBanner[] = [
  {
    id: "cashback",
    image: "/banner-item.webp",
    link: "/buy-cheap",
    alt: "Up to 10% Cashback",
  },
  {
    id: "topup-promo",
    image: "/banner-item-2.webp",
    link: "/buy-cheap",
    alt: "Top Up Promo",
  },
];

// Hero category cards
export interface HeroCategory {
  id: string;
  title: string;
  icon: string;
  image: string;
  heroImages: string[];
  link: string;
}

export const HERO_CATEGORIES: HeroCategory[] = [
  {
    id: "pc-games",
    title: "PC GAMES",
    icon: "monitor",
    image: "/bg-category-hero-pc.jpg",
    heroImages: ["/category-hero-pc.webp"],
    link: "/buy-pc-games",
  },
  {
    id: "console-games",
    title: "CONSOLE GAMES",
    icon: "gamepad-2",
    image: "/bg-category-hero-console.jpg",
    heroImages: ["/category-hero-console.webp"],
    link: "/buy-console-games",
  },
  {
    id: "gift-cards",
    title: "GIFT CARDS",
    icon: "credit-card",
    image: "/bg-category-hero-gift.jpg",
    heroImages: [
      "/category-hero-gift1.webp",
      "/category-hero-gift2.webp",
      "/category-hero-gift3.webp",
    ],
    link: "/buy-gift-cards",
  },
  {
    id: "software",
    title: "SOFTWARE",
    icon: "package",
    image: "/bg-category-hero-software.jpg",
    heroImages: [
      "/category-hero-software1.webp",
      "/category-hero-software2.webp",
    ],
    link: "/buy-software",
  },
];

export const TOPUP_CATEGORIES: HeroCategory[] = [
  {
    id: "all-category",
    title: "ALL CATEGORY",
    icon: "package",
    image: "/bg-category-all-categories.jpg",
    heroImages: ["/category-hero-all-categories.webp"],
    link: "/direct-top-up?category=all#top-up-products",
  },
  {
    id: "mobile-games",
    title: "MOBILE GAMES",
    icon: "gamepad-2",
    image: "/bg-category-mobile.jpg",
    heroImages: ["/category-hero-mobile.webp"],
    link: "/direct-top-up?category=mobile#top-up-products",
  },
  {
    id: "services",
    title: "SERVICES",
    icon: "credit-card",
    image: "/bg-category-services.jpg",
    heroImages: [
      "/category-hero-services1.webp",
      "/category-hero-services2.webp",
      "/category-hero-services3.webp",
      "/category-hero-services4.webp",
      "/category-hero-services5.webp",
    ],
    link: "/direct-top-up?category=services#top-up-products",
  },
];
