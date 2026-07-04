/**
 * Product Types
 * Interfaces representing gaming and marketplace product catalog schemas.
 */

/** Essential details profile of a game */
export interface Game {
  id: string;
  name: string;
  slug: string;
  description?: string;
  platform: Platform;
  releaseDate?: string;
  developer?: string;
  publisher?: string;
  genres?: string[];
  coverImage: string;
  hoverImage?: string;
  videoUrl?: string;
}

/** Pricing metadata and active sale discount details */
export interface Pricing {
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
}

/** Rating score statistics and total customer feedback reviews count */
export interface Rating {
  score: number;
  reviewCount: number;
  maxScore?: number;
}

/** Consolidated Product catalog schema (extends base Game details, Pricing, and Ratings) */
export interface Product extends Game {
  pricing: Pricing;
  rating?: Rating;
  badge?: ProductBadge;
  inStock: boolean;
  sellerId?: string;
  sellerName?: string;
}

/** Platform types */
export type Platform =
  | "steam"
  | "xbox"
  | "playstation"
  | "nintendo"
  | "epic"
  | "origin"
  | "uplay"
  | "gog"
  | "other";

/** Product badge types */
export type ProductBadge = "new" | "sale" | "hot" | "bestseller" | "preorder";

/** Seller information */
export interface Seller {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  joinedDate?: string;
}

/** Cart item */
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

/** Category for navigation */
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  subcategories?: Category[];
}
