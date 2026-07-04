/**
 * Product Types
 * Định nghĩa các interface cho sản phẩm game
 */

/** Thông tin cơ bản của một game */
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

/** Thông tin giá và sale */
export interface Pricing {
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
}

/** Thông tin đánh giá */
export interface Rating {
  score: number;
  reviewCount: number;
  maxScore?: number;
}

/** Sản phẩm đầy đủ (Game + Pricing + Rating) */
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
