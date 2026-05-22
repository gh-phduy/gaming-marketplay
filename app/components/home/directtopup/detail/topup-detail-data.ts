import { TOPUP_GAMES } from "@/lib/constants/products";

export type TopUpInputField = {
  id: string;
  label: string;
  placeholder: string;
  icon: "user" | "globe";
};

export type TopUpPackage = {
  id: string;
  label: string;
  price: number;
};

export type TopUpPackageTheme = "uc" | "diamonds" | "crystals" | "coins";

export type TopUpGameDetail = {
  slug: string;
  title: string;
  shortTitle: string;
  iconImage: string;
  heroImage: string;
  description: string;
  productGroupTitle: string;
  packageTheme: TopUpPackageTheme;
  regionLabel: string;
  isRegionSelectable: boolean;
  inputs: TopUpInputField[];
  packages: TopUpPackage[];
};

export type TopUpSidebarGame = {
  name: string;
  slug: string;
  image: string;
  isEnabled: boolean;
};

type TopUpDetailConfig = {
  title?: string;
  shortTitle?: string;
  description?: string;
  productGroupTitle: string;
  packageTheme?: TopUpPackageTheme;
  regionLabel?: string;
  isRegionSelectable?: boolean;
  inputs?: TopUpInputField[];
  packages?: TopUpPackage[];
  packageValues?: number[];
  priceBase?: number;
};

export const TOPUP_DETAIL_PATH_PREFIX = "/direct-top-up/mobile-games";

const userIdInput: TopUpInputField = {
  id: "user-id",
  label: "User ID",
  placeholder: "Please enter your user ID",
  icon: "user",
};

const uidInput: TopUpInputField = {
  id: "uid",
  label: "Player UID",
  placeholder: "Please enter your UID",
  icon: "user",
};

const zoneIdInput: TopUpInputField = {
  id: "zone-id",
  label: "Zone ID",
  placeholder: "Please enter your zone ID",
  icon: "globe",
};

const serverInput: TopUpInputField = {
  id: "server",
  label: "Server",
  placeholder: "Please enter your server",
  icon: "globe",
};

const accountIdInput: TopUpInputField = {
  id: "account-id",
  label: "Account ID",
  placeholder: "Please enter your account ID",
  icon: "user",
};

const liveIdInput: TopUpInputField = {
  id: "live-id",
  label: "Live ID",
  placeholder: "Please enter your account ID",
  icon: "user",
};

function money(value: number) {
  return Number(value.toFixed(2));
}

function formatValue(value: number) {
  return value.toLocaleString("en-US").replace(/,/g, " ");
}

function buildPackages({
  slug,
  unit,
  values,
  basePrice,
}: {
  slug: string;
  unit: string;
  values: number[];
  basePrice: number;
}): TopUpPackage[] {
  return values.map((value, index) => ({
    id: `${slug}-${value}-${unit.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: `${formatValue(value)} ${unit}`,
    price: money(basePrice * (index + 1)),
  }));
}

function createDescription(title: string, productGroupTitle: string) {
  return `${title} direct top up delivers ${productGroupTitle} to your account quickly and securely. Enter the correct player details, choose a package, and complete checkout to receive the in-game balance.`;
}

const detailConfigs: Record<string, TopUpDetailConfig> = {
  "pubg-mobile": {
    title: "PUBG: Mobile",
    shortTitle: "PUBG: Mobile",
    description:
      "PUBG Mobile is a battle royale where 100 players parachute onto an island to fight for survival. Scavenge for guns and gear while a shrinking play zone forces intense combat. Eliminate every opponent to be the last one standing.",
    productGroupTitle: "Unknown Cash",
    packageTheme: "uc",
    regionLabel: "Global",
    inputs: [
      {
        ...uidInput,
        placeholder: "Please input UID?5XXXXXX?",
      },
    ],
    packages: [
      { id: "pubg-60-uc", label: "60 UC", price: 1.18 },
      { id: "pubg-325-uc", label: "300 + 25 UC", price: 5.88 },
      { id: "pubg-660-uc", label: "600 + 60 UC", price: 11.76 },
      { id: "pubg-1800-uc", label: "1 500 + 300 UC", price: 29.39 },
      { id: "pubg-3850-uc", label: "3 000 + 850 UC", price: 58.79 },
      { id: "pubg-8100-uc", label: "6 000 + 2 100 UC", price: 117.58 },
      { id: "pubg-16200-uc", label: "12 000 + 4 200 UC", price: 235.15 },
      { id: "pubg-24300-uc", label: "18 000 + 6 300 UC", price: 352.73 },
      { id: "pubg-32400-uc", label: "24 000 + 8 400 UC", price: 470.3 },
      { id: "pubg-40500-uc", label: "30 000 + 10 500 UC", price: 587.88 },
    ],
  },
  "mobile-legends": {
    title: "Mobile Legends",
    shortTitle: "Mobile Legends",
    description:
      "Mobile Legends is a 5v5 mobile MOBA where two teams battle on a three-lane map. Choose a unique hero with special skills and work with your team to level up, push towers, and destroy the enemy's base to achieve victory.",
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    regionLabel: "Global (without Indonesia)",
    isRegionSelectable: true,
    inputs: [userIdInput, zoneIdInput],
    packages: [
      { id: "mlbb-14-diamonds", label: "13 + 1 Diamonds", price: 0.35 },
      { id: "mlbb-42-diamonds", label: "38 + 4 Diamonds", price: 1.02 },
      { id: "mlbb-70-diamonds", label: "64 + 6 Diamonds", price: 1.69 },
      { id: "mlbb-140-diamonds", label: "127 + 13 Diamonds", price: 3.52 },
      { id: "mlbb-284-diamonds", label: "257 + 27 Diamonds", price: 7.04 },
      { id: "mlbb-355-diamonds", label: "322 + 33 Diamonds", price: 8.8 },
      { id: "mlbb-716-diamonds", label: "645 + 71 Diamonds", price: 17.6 },
      { id: "mlbb-1446-diamonds", label: "1 290 + 156 Diamonds", price: 35.19 },
    ],
  },
  "genshin-impact": {
    productGroupTitle: "Genesis Crystals",
    packageTheme: "crystals",
    inputs: [uidInput, serverInput],
    packageValues: [60, 300, 980, 1980, 3280, 6480],
    priceBase: 0.99,
  },
  "arena-breakout": {
    productGroupTitle: "Bonds",
    packageTheme: "coins",
    inputs: [userIdInput],
    packageValues: [60, 310, 630, 1580, 3200, 6500],
    priceBase: 0.99,
  },
  "honor-of-kings": {
    productGroupTitle: "Tokens",
    packageTheme: "coins",
    inputs: [userIdInput, serverInput],
    packageValues: [80, 400, 800, 1200, 2400, 4000],
    priceBase: 0.95,
  },
  "honkai-star-rail": {
    productGroupTitle: "Oneiric Shards",
    packageTheme: "crystals",
    inputs: [uidInput, serverInput],
    packageValues: [60, 300, 980, 1980, 3280, 6480],
    priceBase: 0.99,
  },
  "zenless-zone-zero": {
    productGroupTitle: "Monochrome",
    packageTheme: "crystals",
    inputs: [uidInput, serverInput],
    packageValues: [60, 300, 980, 1980, 3280, 6480],
    priceBase: 0.99,
  },
  "free-fire": {
    title: "Free Fire Global",
    shortTitle: "Free Fire Global",
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    inputs: [accountIdInput],
    packageValues: [100, 310, 520, 1060, 2180, 5600],
    priceBase: 0.89,
  },
  "afk-journey": {
    title: "AFK Journey",
    shortTitle: "AFK Journey",
    productGroupTitle: "Dragon Crystals",
    packageTheme: "crystals",
    inputs: [accountIdInput, serverInput],
    packageValues: [20, 60, 120, 300, 600, 1200],
    priceBase: 1.13,
  },
  valorant: {
    productGroupTitle: "VALORANT Points",
    packageTheme: "coins",
    inputs: [accountIdInput, serverInput],
    packageValues: [475, 1000, 2050, 3650, 5350, 11000],
    priceBase: 4.99,
  },
  "marvel-rivals": {
    productGroupTitle: "Lattice",
    packageTheme: "crystals",
    inputs: [accountIdInput],
    packageValues: [100, 500, 1000, 2180, 5680, 11680],
    priceBase: 0.99,
  },
  "delta-force": {
    title: "Garena Delta Force",
    shortTitle: "Garena Delta Force",
    productGroupTitle: "Delta Coins",
    packageTheme: "coins",
    inputs: [accountIdInput],
    packageValues: [60, 300, 680, 1280, 3280, 6480],
    priceBase: 0.99,
  },
  "ea-sports-fc-mobile": {
    productGroupTitle: "FC Points",
    packageTheme: "coins",
    inputs: [userIdInput],
    packageValues: [100, 520, 1070, 2200, 5750, 12000],
    priceBase: 0.99,
  },
  "mobile-royale": {
    productGroupTitle: "Gems",
    packageTheme: "diamonds",
    inputs: [accountIdInput],
    packageValues: [500, 1000, 2500, 5000, 10000, 25000],
    priceBase: 0.99,
  },
  "identity-v": {
    productGroupTitle: "Echoes",
    packageTheme: "crystals",
    inputs: [userIdInput, serverInput],
    packageValues: [60, 185, 305, 690, 2025, 3330],
    priceBase: 0.99,
  },
  "life-after": {
    productGroupTitle: "Credits",
    packageTheme: "coins",
    inputs: [accountIdInput, serverInput],
    packageValues: [60, 300, 980, 1980, 3280, 6480],
    priceBase: 0.99,
  },
  "ragnarok-m-classic": {
    productGroupTitle: "Big Cat Coins",
    packageTheme: "coins",
    inputs: [userIdInput, serverInput],
    packageValues: [6, 30, 68, 128, 328, 648],
    priceBase: 0.99,
  },
  "ragnarok-origin": {
    productGroupTitle: "Nyan Berries",
    packageTheme: "diamonds",
    inputs: [userIdInput, serverInput],
    packageValues: [60, 300, 980, 1980, 3280, 6480],
    priceBase: 0.99,
  },
  "new-state-mobile": {
    productGroupTitle: "NC",
    packageTheme: "coins",
    inputs: [accountIdInput],
    packageValues: [300, 1500, 3600, 9300, 15000, 30000],
    priceBase: 2.99,
  },
  "magic-chess-go-go": {
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    inputs: [userIdInput, zoneIdInput],
    packageValues: [50, 250, 500, 1000, 2500, 5000],
    priceBase: 0.99,
  },
  "bigo-live": {
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    inputs: [liveIdInput],
    packageValues: [50, 100, 500, 1000, 5000, 10000],
    priceBase: 0.99,
  },
  chamet: {
    productGroupTitle: "Coins",
    packageTheme: "coins",
    inputs: [liveIdInput],
    packageValues: [7000, 35000, 70000, 210000, 350000, 700000],
    priceBase: 0.99,
  },
  imo: {
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    inputs: [liveIdInput],
    packageValues: [100, 500, 1000, 5000, 10000, 50000],
    priceBase: 0.99,
  },
  poppolive: {
    productGroupTitle: "Coins",
    packageTheme: "coins",
    inputs: [liveIdInput],
    packageValues: [7000, 35000, 70000, 210000, 350000, 700000],
    priceBase: 0.99,
  },
  "mango-live": {
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    inputs: [liveIdInput],
    packageValues: [1000, 5000, 10000, 35000, 70000, 140000],
    priceBase: 0.99,
  },
  "migo-live": {
    productGroupTitle: "Coins",
    packageTheme: "coins",
    inputs: [liveIdInput],
    packageValues: [5500, 27500, 55000, 165000, 325000, 650000],
    priceBase: 0.99,
  },
  "sugo-voice-live": {
    productGroupTitle: "Diamonds",
    packageTheme: "diamonds",
    inputs: [liveIdInput],
    packageValues: [700, 3500, 7000, 21000, 35000, 70000],
    priceBase: 0.99,
  },
};

function getPackageUnit(productGroupTitle: string) {
  if (productGroupTitle === "Unknown Cash") return "UC";
  if (productGroupTitle === "VALORANT Points") return "VP";
  if (productGroupTitle === "Big Cat Coins") return "BCC";
  return productGroupTitle;
}

export const TOPUP_GAME_DETAILS = TOPUP_GAMES.reduce<
  Record<string, TopUpGameDetail>
>((details, game) => {
  const config = detailConfigs[game.slug];

  if (!config) {
    return details;
  }

  const title = config.title ?? game.name;
  const productGroupTitle = config.productGroupTitle;
  const packages =
    config.packages ??
    buildPackages({
      slug: game.slug,
      unit: getPackageUnit(productGroupTitle),
      values: config.packageValues ?? [100, 500, 1000, 2500, 5000, 10000],
      basePrice: config.priceBase ?? 0.99,
    });

  details[game.slug] = {
    slug: game.slug,
    title,
    shortTitle: config.shortTitle ?? title,
    iconImage: game.coverImage,
    heroImage: game.coverImage,
    description:
      config.description ?? createDescription(title, productGroupTitle),
    productGroupTitle,
    packageTheme: config.packageTheme ?? "coins",
    regionLabel: config.regionLabel ?? "Global",
    isRegionSelectable: config.isRegionSelectable ?? true,
    inputs: config.inputs ?? [accountIdInput],
    packages,
  };

  return details;
}, {});

export const TOPUP_FAQS = [
  "What is Direct Top Up?",
  "Can I receive cashback for Direct Top Up orders?",
  "What is a UID or Player ID?",
  "How can I find my Server or Region?",
  "How long does a Direct Top-Up take to complete?",
  "What should I do if the Top-Up fails or I entered the wrong UID / Server?",
  "Can I get a refund for a completed Direct Top Up?",
];

const sidebarNameOverrides: Record<string, string> = {
  "mobile-legends": "Mobile Legends",
  "afk-journey": "AFK Journey",
  "free-fire": "Free Fire Global",
  "zenless-zone-zero": "Zenless Zone Zero",
  "honkai-star-rail": "Honkai: Star Rail",
  "delta-force": "Garena Delta Force",
};

export const TOPUP_SIDEBAR_GAMES: TopUpSidebarGame[] = TOPUP_GAMES.map(
  (game) => ({
    name: sidebarNameOverrides[game.slug] ?? game.name,
    slug: game.slug,
    image: game.coverImage,
    isEnabled: Boolean(TOPUP_GAME_DETAILS[game.slug]),
  }),
);
