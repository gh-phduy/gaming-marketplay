/**
 * Navigation Constants
 * Định nghĩa các menu items và routes
 */

import type { NavLink, Category } from "@/types";

/**
 * Main navigation links
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "Deals", href: "/deals", badge: "Hot" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Software", href: "/software" },
] as const;

/**
 * Footer navigation links
 */
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;

/**
 * Game categories
 */
export const GAME_CATEGORIES: Category[] = [
  { id: "action", name: "Action", slug: "action" },
  { id: "adventure", name: "Adventure", slug: "adventure" },
  { id: "rpg", name: "RPG", slug: "rpg" },
  { id: "strategy", name: "Strategy", slug: "strategy" },
  { id: "sports", name: "Sports", slug: "sports" },
  { id: "racing", name: "Racing", slug: "racing" },
  { id: "simulation", name: "Simulation", slug: "simulation" },
  { id: "puzzle", name: "Puzzle", slug: "puzzle" },
];

/**
 * Platform categories
 */
export const PLATFORMS = [
  { id: "steam", name: "Steam", icon: "steam" },
  { id: "xbox", name: "Xbox", icon: "xbox" },
  { id: "playstation", name: "PlayStation", icon: "playstation" },
  { id: "nintendo", name: "Nintendo", icon: "nintendo" },
  { id: "epic", name: "Epic Games", icon: "epic" },
  { id: "gog", name: "GOG", icon: "gog" },
] as const;

/**
 * Social media links
 */
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "Discord", href: "https://discord.com", icon: "discord" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
] as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  GAMES: "/games",
  GAME_DETAIL: (slug: string) => `/games/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
} as const;
