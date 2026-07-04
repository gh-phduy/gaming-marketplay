/**
 * Product Constants
 * Mock data cho development
 */

import type { Product, Seller } from "@/types";

/**
 * Mock products cho development
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Grand Theft Auto V",
    slug: "gta-v",
    platform: "steam",
    coverImage: "/product1.png",
    hoverImage: "/ps5-hover.webp",
    pricing: {
      currentPrice: 29.99,
      originalPrice: 59.99,
      discount: 50,
      currency: "USD",
    },
    rating: {
      score: 4.8,
      reviewCount: 12543,
    },
    badge: "sale",
    inStock: true,
    sellerName: "GameStore",
  },
  {
    id: "2",
    name: "Red Dead Redemption 2",
    slug: "rdr2",
    platform: "steam",
    coverImage: "/product2.jpg",
    pricing: {
      currentPrice: 39.99,
      originalPrice: 59.99,
      discount: 33,
      currency: "USD",
    },
    rating: {
      score: 4.9,
      reviewCount: 8932,
    },
    badge: "bestseller",
    inStock: true,
    sellerName: "GameStore",
  },
];

/**
 * Mock sellers
 */
export const MOCK_SELLERS: Seller[] = [
  {
    id: "1",
    name: "GameStore",
    avatar: "/avt1.png",
    rating: 4.9,
    totalSales: 15234,
    verified: true,
  },
  {
    id: "2",
    name: "KeyMaster",
    rating: 4.7,
    totalSales: 8921,
    verified: true,
  },
];

/**
 * Product badges
 */
export const PRODUCT_BADGES = {
  new: {
    label: "New",
    className: "bg-dm-accent-green text-white",
  },
  sale: {
    label: "Sale",
    className: "bg-dm-accent-red text-white",
  },
  hot: {
    label: "Hot",
    className: "bg-dm-accent-orange text-white",
  },
  bestseller: {
    label: "Bestseller",
    className: "bg-dm-accent-yellow text-black",
  },
  preorder: {
    label: "Pre-order",
    className: "bg-dm-accent-blue text-white",
  },
} as const;

/**
 * Top-up games
 */
export interface TopUpGame {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  category: "mobile" | "pc" | "services";
}

export const TOPUP_GAMES: TopUpGame[] = [
  {
    id: "pubg-mobile",
    name: "PUBG: Mobile",
    slug: "pubg-mobile",
    coverImage: "/topup-pubg.jpg",
    category: "mobile",
  },
  {
    id: "mobile-legends",
    name: "Mobile Legends: Bang Bang",
    slug: "mobile-legends",
    coverImage: "/topup-mobile-legends.jpg",
    category: "mobile",
  },
  {
    id: "genshin-impact",
    name: "Genshin Impact",
    slug: "genshin-impact",
    coverImage: "/topup-genshin.jpg",
    category: "pc",
  },
  {
    id: "arena-breakout",
    name: "Arena Breakout",
    slug: "arena-breakout",
    coverImage: "/topup-arena-breakout.jpg",
    category: "mobile",
  },
  {
    id: "honorable-three-kingdoms",
    name: "Honor of Kings",
    slug: "honor-of-kings",
    coverImage: "/topup-honor-of-kings.jpg",
    category: "mobile",
  },
  {
    id: "honkai-star-rail",
    name: "Honkai: Star Rail",
    slug: "honkai-star-rail",
    coverImage: "/topup-honkai.jpg",
    category: "pc",
  },
  {
    id: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    slug: "zenless-zone-zero",
    coverImage: "/topup-zenless-zone-zero.jpg",
    category: "pc",
  },
  {
    id: "free-fire",
    name: "Free Fire",
    slug: "free-fire",
    coverImage: "/topup-free-fire.jpg",
    category: "mobile",
  },
  {
    id: "afk-journey",
    name: "AFK Journey 2",
    slug: "afk-journey",
    coverImage: "/topup-afk-journey.jpg",
    category: "mobile",
  },
  {
    id: "valorant",
    name: "Valorant",
    slug: "valorant",
    coverImage: "/topup-valorant.jpg",
    category: "pc",
  },
  {
    id: "marvel-rivals",
    name: "Marvel Rivals",
    slug: "marvel-rivals",
    coverImage: "/topup-marvel-rivals.jpg",
    category: "pc",
  },
  {
    id: "delta-force",
    name: "Delta Force",
    slug: "delta-force",
    coverImage: "/topup-delta-force.jpg",
    category: "pc",
  },
  {
    id: "ea-sports-fc-mobile",
    name: "EA Sports FC Mobile",
    slug: "ea-sports-fc-mobile",
    coverImage: "/topup-ea-sports-fc-mobile.jpg",
    category: "mobile",
  },
  {
    id: "mobile-royale",
    name: "Mobile Royale",
    slug: "mobile-royale",
    coverImage: "/topup-mobile-royale.jpg",
    category: "mobile",
  },
  {
    id: "identity-v",
    name: "Identity V",
    slug: "identity-v",
    coverImage: "/topup-identity-v.jpg",
    category: "mobile",
  },
  {
    id: "life-after",
    name: "Life After",
    slug: "life-after",
    coverImage: "/topup-life-after.jpg",
    category: "mobile",
  },
  {
    id: "ragnarok-m-classic",
    name: "Ragnarok M Classic",
    slug: "ragnarok-m-classic",
    coverImage: "/topup-ragnarok-m-classic.jpg",
    category: "mobile",
  },
  {
    id: "ragnarok-origin",
    name: "Ragnarok Origin",
    slug: "ragnarok-origin",
    coverImage: "/topup-ragnarok-origin.jpg",
    category: "mobile",
  },
  {
    id: "new-state-mobile",
    name: "New State Mobile",
    slug: "new-state-mobile",
    coverImage: "/topup-new-state-mobile.jpg",
    category: "mobile",
  },
  {
    id: "magic-chess-go-go",
    name: "Magic Chess: Go Go",
    slug: "magic-chess-go-go",
    coverImage: "/topup-magic-chess-go-go.jpg",
    category: "mobile",
  },
  {
    id: "bigo-live",
    name: "BIGO LIVE",
    slug: "bigo-live",
    coverImage: "/topup-bigo-live.jpg",
    category: "services",
  },
  {
    id: "chamet",
    name: "Chamet",
    slug: "chamet",
    coverImage: "/topup-chamet.jpg",
    category: "services",
  },
  {
    id: "imo",
    name: "IMO",
    slug: "imo",
    coverImage: "/topup-imo.jpg",
    category: "services",
  },
  {
    id: "poppolive",
    name: "Poppo Live",
    slug: "poppolive",
    coverImage: "/topup-poppolive.jpg",
    category: "services",
  },
  {
    id: "mango-live",
    name: "Mango Live",
    slug: "mango-live",
    coverImage: "/topup-mango-live.jpg",
    category: "services",
  },
  {
    id: "migo-live",
    name: "Migo Live",
    slug: "migo-live",
    coverImage: "/topup-migo-live.jpg",
    category: "services",
  },
  {
    id: "sugo-voice-live",
    name: "Sugo Voice Live Chat",
    slug: "sugo-voice-live",
    coverImage: "/topup-sugo-voice-live-chat.jpg",
    category: "services",
  },
];

export const TOPUP_CATEGORIES_FILTER = [
  { id: "all", label: "All Categories" },
  { id: "mobile", label: "Mobile Games" },
  { id: "services", label: "Services" },
];

/**
 * Sort options
 */
export const SORT_OPTIONS = [
  { field: "price", direction: "asc", label: "Price: Low to High" },
  { field: "price", direction: "desc", label: "Price: High to Low" },
  { field: "rating", direction: "desc", label: "Highest Rated" },
  { field: "releaseDate", direction: "desc", label: "Newest First" },
  { field: "name", direction: "asc", label: "Name: A-Z" },
] as const;
