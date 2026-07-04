const BASE_PRODUCTS = [
  // ============== POPULAR GAMES (id 9-16) ==============
  {
    id: 9,
    name: "Arc Raiders",
    title: "Arc Raiders",
    price: 59.99,
    image: "/popular-game/arc-raiders-pc.jpg",
    images: ["/popular-game/arc-raiders-pc.jpg"],
    video: "/video/popular-game/arc-raiders-pc.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S1",
      name: "CodesMarket",
      avatar: "/avt.jpg",
      isOnline: true,
      badge: "🛡️",
      tier: "Legendary",
      rating: 5,
      successRate: 97.51,
      totalFeedbacks: 1012,
      timezone: "UTC +00:00",
      totalSales: 115101,
      positiveFeedbacks: 99.58,
      negativeFeedbacks: 6.93,
    },
  },
  {
    id: 10,
    name: "Battlefield 6",
    title: "Battlefield 6",
    price: 69.99,
    image: "/popular-game/battlefield-6-xbox-series.jpg",
    images: ["/popular-game/battlefield-6-xbox-series.jpg"],
    video: "/video/popular-game/battle-field-6-xbox-series.webm",
    platform: "xbox",
    platformLabel: "Xbox Live",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S2",
      name: "GameKeys Pro",
      avatar: "/spacex.jpg",
      isOnline: true,
      badge: "⭐",
      tier: "Elite",
      rating: 4,
      successRate: 95.2,
      totalFeedbacks: 1542,
      timezone: "UTC +02:00",
      totalSales: 45230,
      positiveFeedbacks: 97.8,
      negativeFeedbacks: 2.2,
    },
  },
  {
    id: 11,
    name: "Call of Duty Black Ops 7",
    title: "Call of Duty Black Ops 7",
    price: 69.99,
    image: "/popular-game/call-of-duty-black-ops-7-pc.jpg",
    images: ["/popular-game/call-of-duty-black-ops-7-pc.jpg"],
    video: "/video/popular-game/call-of-duty-black-ops-7-pc.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S3",
      name: "DigitalGames",
      avatar: "/seller3.jpg",
      isOnline: true,
      badge: "🏆",
      tier: "Master",
      rating: 5,
      successRate: 98.75,
      totalFeedbacks: 8921,
      timezone: "UTC -05:00",
      totalSales: 234567,
      positiveFeedbacks: 99.12,
      negativeFeedbacks: 0.88,
    },
  },
  {
    id: 12,
    name: "Code Vein II",
    title: "Code Vein II",
    price: 49.99,
    image: "/popular-game/code-vein-ii-pc.png",
    images: ["/popular-game/code-vein-ii-pc.png"],
    video: "/video/popular-game/code-vein-2-pc.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S4",
      name: "VoidKeys",
      avatar: "/avt.jpg",
      isOnline: true,
      badge: "⚔️",
      tier: "Elite",
      rating: 4.8,
      successRate: 99.0,
      totalFeedbacks: 5420,
      timezone: "UTC +01:00",
      totalSales: 15400,
      positiveFeedbacks: 98.5,
      negativeFeedbacks: 1.5,
    },
  },
  {
    id: 13,
    name: "High on Life 2",
    title: "High on Life 2",
    price: 59.99,
    image: "/popular-game/high-on-life-2-pc.jpg",
    images: ["/popular-game/high-on-life-2-pc.jpg"],
    video: "/video/popular-game/high-on-life-2-pc.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S1",
      name: "CodesMarket",
      avatar: "/avt.jpg",
      isOnline: false,
      badge: "🛡️",
      tier: "Legendary",
      rating: 5,
      successRate: 97.51,
      totalFeedbacks: 1012,
      timezone: "UTC +00:00",
      totalSales: 115101,
      positiveFeedbacks: 99.58,
      negativeFeedbacks: 6.93,
    },
  },
  {
    id: 14,
    name: "Mafia: The Old Country",
    title: "Mafia: The Old Country",
    price: 69.99,
    image: "/popular-game/mafia-the-old-country-pc.jpg",
    images: ["/popular-game/mafia-the-old-country-pc.jpg"],
    video: "/video/popular-game/mafia-the-old-country-pc.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Deluxe",
    delivery: "Instant",
    activationRegion: "Worldwide",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S2",
      name: "GameKeys Pro",
      avatar: "/spacex.jpg",
      isOnline: true,
      badge: "⭐",
      tier: "Elite",
      rating: 4,
      successRate: 95.2,
      totalFeedbacks: 1542,
      timezone: "UTC +02:00",
      totalSales: 45230,
      positiveFeedbacks: 97.8,
      negativeFeedbacks: 2.2,
    },
  },
  {
    id: 15,
    name: "Nioh 3",
    title: "Nioh 3",
    price: 59.99,
    image: "/popular-game/nioh-3-pc.jpg",
    images: ["/popular-game/nioh-3-pc.jpg"],
    video: "/video/popular-game/nioh-3-pc.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S3",
      name: "DigitalGames",
      avatar: "/seller3.jpg",
      isOnline: false,
      badge: "🏆",
      tier: "Master",
      rating: 5,
      successRate: 98.75,
      totalFeedbacks: 8921,
      timezone: "UTC -05:00",
      totalSales: 234567,
      positiveFeedbacks: 99.12,
      negativeFeedbacks: 0.88,
    },
  },
  {
    id: 16,
    name: "Reanimal",
    title: "Reanimal",
    price: 39.99,
    image: "/popular-game/reanimal-pc.jpg",
    images: ["/popular-game/reanimal-pc.jpg"],
    video: "/video/popular-game/reanimal.webm",
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    isPopular: true,
    seller: {
      id: "S4",
      name: "VoidKeys",
      avatar: "/avt.jpg",
      isOnline: true,
      badge: "⚔️",
      tier: "Elite",
      rating: 4.8,
      successRate: 99.0,
      totalFeedbacks: 5420,
      timezone: "UTC +01:00",
      totalSales: 15400,
      positiveFeedbacks: 98.5,
      negativeFeedbacks: 1.5,
    },
  },
  // ============== REGULAR PRODUCTS ==============
  {
    id: 1,
    name: "Fallout 76",
    title: "Fallout 76",
    price: 0.59,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg", "/battlefield6-2.jpg"],
    platform: "xbox",
    platformLabel: "Xbox Live",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S1",
      name: "CodesMarket",
      avatar: "/avt.jpg",
      isOnline: true,
      badge: "🛡️",
      tier: "Legendary",
      rating: 5,
      successRate: 97.51,
      totalFeedbacks: 1012,
      timezone: "UTC +00:00",
      totalSales: 115101,
      positiveFeedbacks: 99.58,
      negativeFeedbacks: 6.93,
    },
  },
  {
    id: 2,
    name: "Cyberpunk 2077 Ultimate Edition",
    title: "Cyberpunk 2077 Ultimate Edition",
    price: 0.82,
    image: "/cyberpunk_2077.jpg",
    images: ["/cyberpunk_2077.jpg"],
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Ultimate",
    delivery: "Instant",
    activationRegion: "Worldwide",
    currency: "$",
    seller: {
      id: "S2",
      name: "GameKeys Pro",
      avatar: "/spacex.jpg",
      isOnline: false,
      badge: "⭐",
      tier: "Elite",
      rating: 4,
      successRate: 95.2,
      totalFeedbacks: 1542,
      timezone: "UTC +02:00",
      totalSales: 45230,
      positiveFeedbacks: 97.8,
      negativeFeedbacks: 2.2,
    },
  },
  {
    id: 3,
    name: "Settlement Survival",
    title: "Settlement Survival",
    price: 0.65,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg"],
    platform: "playstation",
    platformLabel: "PlayStation Store",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S3",
      name: "DigitalGames",
      avatar: "/seller3.jpg",
      isOnline: true,
      badge: "🏆",
      tier: "Master",
      rating: 5,
      successRate: 98.75,
      totalFeedbacks: 8921,
      timezone: "UTC -05:00",
      totalSales: 234567,
      positiveFeedbacks: 99.12,
      negativeFeedbacks: 0.88,
    },
  },
  {
    id: 4,
    name: "Beholder Conductor",
    title: "Beholder Conductor",
    price: 0.65,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg"],
    platform: ["pc", "playstation", "xbox"],
    platformLabel: "Multi-platform",
    type: "Product key",
    edition: "Complete",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S4",
      name: "VoidKeys",
      avatar: "/avt.jpg",
      isOnline: true,
      badge: "⚔️",
      tier: "Elite",
      rating: 4.8,
      successRate: 99.0,
      totalFeedbacks: 5420,
      timezone: "UTC +01:00",
      totalSales: 15400,
      positiveFeedbacks: 98.5,
      negativeFeedbacks: 1.5,
    },
  },
  {
    id: 5,
    name: "Nidhogg 2",
    title: "Nidhogg 2",
    price: 0.58,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg"],
    platform: ["nintendo", "xbox"],
    platformLabel: "Switch / Xbox",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S1",
      name: "CodesMarket",
      avatar: "/avt.jpg",
      isOnline: true,
    },
  },
  {
    id: 6,
    name: "Escape from Ever After",
    title: "Escape from Ever After",
    price: 500,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg"],
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Deluxe",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S2",
      name: "GameKeys Pro",
      avatar: "/spacex.jpg",
    },
  },
  {
    id: 7,
    name: "Caravan SandWitch",
    title: "Caravan SandWitch",
    price: 300,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg"],
    platform: "pc",
    platformLabel: "Epic Games",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S3",
      name: "DigitalGames",
      avatar: "/seller3.jpg",
    },
  },
  {
    id: 8,
    name: "Batman Arkham Origins",
    title: "Batman Arkham Origins",
    price: 1.66,
    image: "/battlefield_6.jpg",
    images: ["/battlefield_6.jpg"],
    platform: "pc",
    platformLabel: "Steam",
    type: "Product key",
    edition: "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: "S4",
      name: "VoidKeys",
      avatar: "/avt.jpg",
    },
  },
];

const EXTRA_PRODUCT_TITLES = [
  "The Last Campfire",
  "Risk of Rain 2",
  "Hades II",
  "Dead Cells Return",
  "Noita Ultimate",
  "Frostpunk Complete",
  "Cuphead Deluxe",
  "The Ascent",
  "Celeste Gold",
  "Stardew Valley Plus",
  "Hollow Knight Silksong",
  "Remnant II",
  "Sea of Stars",
  "Dave the Diver",
  "Valheim",
  "Astroneer",
  "Grounded",
  "A Plague Tale",
  "Sifu",
  "Tunic",
  "Eiyuden Chronicle",
  "Blasphemous II",
  "Atlas Fallen",
  "Dredge",
  "Atomic Heart",
  "Lords of the Fallen",
  "Lies of P",
  "Payday 3",
  "Forza Horizon 5",
  "Starfield",
];

const EXTRA_PLATFORMS = ["pc", "xbox", "playstation", "nintendo"];
const EXTRA_PLATFORM_LABELS = {
  pc: "Steam",
  xbox: "Xbox Live",
  playstation: "PlayStation Store",
  nintendo: "Nintendo eShop",
};

function normalizeFilterId(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const PRODUCT_TYPE_LABELS = {
  "game-keys": "Game Keys",
  "console-games": "Console Games",
  "pc-games": "PC Games",
  mobile: "Mobile",
  "game-currency": "Game Currency",
  "game-accounts": "Game Accounts",
  "game-items": "Game Items",
  "power-leveling": "Power Leveling",
  software: "Software",
  "gift-cards": "Gift Cards",
  "game-cards": "Game Cards",
};
const ROUTE_PRODUCT_TYPE_IDS = new Set(Object.keys(PRODUCT_TYPE_LABELS));

const PRODUCT_TYPE_SALE_KIND = {
  "game-keys": "Product key",
  "console-games": "Product key",
  "pc-games": "Product key",
  mobile: "Mobile product",
  "game-currency": "Game currency",
  "game-accounts": "Game account",
  "game-items": "Game item",
  "power-leveling": "Power leveling",
  software: "Software license",
  "gift-cards": "Gift card",
  "game-cards": "Game card",
};

const MOCK_IMAGES = [
  "/popular-game/arc-raiders-pc.jpg",
  "/popular-game/battlefield-6-xbox-series.jpg",
  "/popular-game/call-of-duty-black-ops-7-pc.jpg",
  "/popular-game/code-vein-ii-pc.png",
  "/popular-game/high-on-life-2-pc.jpg",
  "/popular-game/mafia-the-old-country-pc.jpg",
  "/popular-game/nioh-3-pc.jpg",
  "/popular-game/reanimal-pc.jpg",
  "/cyberpunk_2077.jpg",
  "/battlefield_6.jpg",
];

const MOCK_SELLERS = [
  { id: "S1", name: "CodesMarket", avatar: "/avt.jpg" },
  { id: "S2", name: "GameKeys Pro", avatar: "/spacex.jpg" },
  { id: "S3", name: "DigitalGames", avatar: "/seller3.jpg" },
  { id: "S4", name: "VoidKeys", avatar: "/avt.jpg" },
];

const GAME_KEY_ENTRIES = [
  ["steam", "Steam", "pc", "Steam"],
  ["rockstar", "Rockstar", "pc", "Rockstar"],
  ["dlc", "DLC", "pc", "Steam"],
  ["gog", "GOG", "pc", "GOG"],
  ["epic", "Epic Games", "pc", "Epic Games"],
  ["ea", "Electronic arts", "pc", "Electronic Arts"],
  ["bethesda", "Bethesda", "pc", "Bethesda"],
  ["ubisoft", "Ubisoft", "pc", "Ubisoft"],
  ["battle-net", "Battle.Net", "pc", "Battle.Net"],
  ["random-keys", "Random Keys", "pc", "Random Keys"],
  ["upcoming", "Upcoming", "pc", "Steam"],
  ["microsoft", "Microsoft", "pc", "Microsoft"],
].map(([id, label, platform, platformLabel]) => ({
  id,
  label,
  platform,
  platformLabel,
}));

const PC_GAME_ENTRIES = [
  ["steam", "Steam", "pc", "Steam"],
  ["epic", "Epic Games", "pc", "Epic Games"],
  ["windows-store", "Windows Store", "pc", "Windows Store"],
  ["ea", "Electronic Arts", "pc", "Electronic Arts"],
  ["ubisoft", "Ubisoft", "pc", "Ubisoft"],
  ["battle-net", "Battlenet", "pc", "Battle.Net"],
].map(([id, label, platform, platformLabel]) => ({
  id,
  label,
  platform,
  platformLabel,
}));

const CONSOLE_ENTRIES = [
  ["playstation", "Sony Playstation", "playstation", "PlayStation Store"],
  ["nintendo", "Nintendo Switch", "nintendo", "Nintendo eShop"],
  ["xbox", "Xbox Live", "xbox", "Xbox Live"],
].map(([id, label, platform, platformLabel]) => ({
  id,
  label,
  platform,
  platformLabel,
}));

const MOBILE_ENTRIES = [
  ["ios", "IOS", "ios", "iOS"],
  ["android", "Android", "android", "Android"],
].map(([id, label, platform, platformLabel]) => ({
  id,
  label,
  platform,
  platformLabel,
}));

const GAME_GENRE_ENTRIES = [
  ["shooter", "Shooter"],
  ["mmorpg", "MMORPG"],
  ["adventure", "Adventure"],
  ["simulator", "Simulator"],
  ["sport", "Sport"],
  ["action", "Action"],
  ["rpg", "RPG"],
  ["fighting", "Fighting"],
  ["survival-horror", "Survival horror"],
  ["mmo", "MMO"],
  ["hack-and-slash", "Hack and Slash"],
  ["racing", "Racing"],
  ["strategy", "Strategy"],
].map(([id, label]) => ({ id, label }));

const SOFTWARE_ENTRIES = [
  ["microsoft", "Microsoft"],
  ["performance", "Performance"],
  ["antivirus", "Antivirus"],
  ["vpn", "VPN"],
  ["security", "Security"],
  ["gaming-video", "Gaming/Video"],
  ["ashampoo", "Ashampoo"],
  ["nch-software", "NCH Software"],
  ["project-softwares", "Project Softwares"],
  ["website-builder", "Website builder"],
  ["movavi", "Movavi"],
  ["snagit", "SnagIt"],
  ["ai-tools", "AI Tools"],
  ["apple", "Apple"],
  ["franzis", "Franzis"],
  ["finance", "Finance"],
].map(([id, label]) => ({ id, label, platform: "pc", platformLabel: label }));

const GIFT_CARD_ENTRIES = [
  ["skinrave", "SkinRave gg"],
  ["plg-bet", "PLG BET"],
  ["gamblit", "Gamblit"],
  ["csgorun", "CSGORUN"],
  ["knifex", "KNIFEX"],
  ["youtube", "YouTube"],
  ["tastydrop", "TastyDrop"],
  ["discord", "Discord"],
  ["bets4", "Bets4"],
  ["tastystrike", "TastyStrike"],
  ["telegram", "Telegram"],
  ["steam", "Steam"],
  ["playstation", "Playstation"],
  ["xbox-live", "Xbox Live"],
  ["amazon", "Amazon"],
  ["daddyskins", "DaddySkins"],
  ["difmark", "Difmark"],
  ["spotify", "Spotify"],
  ["disney", "Disney"],
  ["paypal", "PayPal"],
].map(([id, label]) => ({ id, label }));

const GAME_CARD_ENTRIES = [
  ["roblox", "Roblox"],
  ["fifa-fut-points", "FIFA FUT Points"],
  ["pubg-mobile", "PUBG Mobile"],
  ["imvu", "IMVU"],
  ["lotro", "Lotro"],
  ["lol", "LOL"],
  ["free-fire", "Free Fire"],
  ["valorant", "Valorant"],
  ["diablo-iv", "Diablo IV"],
  ["minecraft", "Minecraft"],
  ["fc-mobile-points", "FC Mobile Points"],
  ["mobile-legends", "Mobile Legends"],
  ["csgo", "CSGO"],
  ["overwatch-2", "Overwatch 2"],
  ["ea-sports-college-football", "EA SPORTS College Football Points"],
  ["candy-crush", "Candy Crush"],
  ["netdragon-universal", "NetDragon Universal"],
  ["dead-by-daylight-golden-cells", "Dead by Daylight Golden Cells"],
  ["lawl-online", "Lawl Online"],
  ["halo-infinite-halo-credits", "Halo Infinite Halo Credits"],
].map(([id, label]) => ({ id, label }));

const MARKETPLACE_PRODUCT_GROUPS = [
  { productType: "game-keys", entries: GAME_KEY_ENTRIES },
  { productType: "pc-games", entries: PC_GAME_ENTRIES },
  { productType: "console-games", entries: CONSOLE_ENTRIES },
  { productType: "mobile", entries: MOBILE_ENTRIES },
  { productType: "game-currency", entries: GAME_GENRE_ENTRIES },
  { productType: "game-accounts", entries: GAME_GENRE_ENTRIES },
  { productType: "game-items", entries: GAME_GENRE_ENTRIES },
  { productType: "power-leveling", entries: GAME_GENRE_ENTRIES },
  { productType: "software", entries: SOFTWARE_ENTRIES },
  { productType: "gift-cards", entries: GIFT_CARD_ENTRIES },
  { productType: "game-cards", entries: GAME_CARD_ENTRIES },
];

function createMarketplaceProducts() {
  let nextId = 1000;

  return MARKETPLACE_PRODUCT_GROUPS.flatMap((group, groupIndex) =>
    group.entries.map((entry, entryIndex) => {
      const id = nextId++;
      const productTypeLabel = PRODUCT_TYPE_LABELS[group.productType];
      const isGameService = [
        "game-currency",
        "game-accounts",
        "game-items",
        "power-leveling",
      ].includes(group.productType);
      const title = isGameService
        ? `${entry.label} ${productTypeLabel}`
        : `${entry.label} ${productTypeLabel} Deal`;
      const platform = entry.platform ?? (group.productType === "mobile" ? "android" : "pc");
      const platformLabel =
        entry.platformLabel ??
        (group.productType === "console-games" ? entry.label : productTypeLabel);

      return {
        id,
        name: title,
        title,
        price: Number((2.49 + ((groupIndex * 7 + entryIndex) % 28) * 1.37).toFixed(2)),
        image: MOCK_IMAGES[(groupIndex + entryIndex) % MOCK_IMAGES.length],
        images: [MOCK_IMAGES[(groupIndex + entryIndex) % MOCK_IMAGES.length]],
        platform,
        platformLabel,
        type: PRODUCT_TYPE_SALE_KIND[group.productType],
        productType: group.productType,
        category: entry.id,
        genre: isGameService ? entry.id : undefined,
        edition: entryIndex % 4 === 0 ? "Deluxe" : "Standard",
        delivery: "Instant",
        activationRegion: entryIndex % 5 === 0 ? "Europe" : "Global",
        currency: "$",
        filters: [group.productType, entry.id],
        seller: {
          ...MOCK_SELLERS[(groupIndex + entryIndex) % MOCK_SELLERS.length],
          isOnline: entryIndex % 2 === 0,
        },
      };
    }),
  );
}

function addPlatformFilters(
  filters,
  platform,
  platformLabel,
  allowRouteTypeInference,
) {
  const platforms = Array.isArray(platform) ? platform : [platform];

  platforms.forEach((platformValue) => {
    const normalizedPlatform = normalizeFilterId(platformValue);
    if (!normalizedPlatform) return;

    filters.add(normalizedPlatform);

    if (allowRouteTypeInference && normalizedPlatform === "pc") {
      filters.add("pc-games");
    }
    if (
      allowRouteTypeInference &&
      ["xbox", "playstation", "nintendo"].includes(normalizedPlatform)
    ) {
      filters.add("console-games");
    }
    if (
      allowRouteTypeInference &&
      ["ios", "android", "mobile"].includes(normalizedPlatform)
    ) {
      filters.add("mobile");
    }
  });

  const labelId = normalizeFilterId(platformLabel);
  if (!labelId) return;

  filters.add(labelId);

  const aliases = {
    steam: ["pc-games"],
    "epic-games": ["epic", "pc-games"],
    "electronic-arts": ["ea", "pc-games"],
    "battle-net": ["battle-net", "battlenet", "pc-games"],
    "windows-store": ["windows-store", "microsoft", "pc-games"],
    "xbox-live": ["xbox", "console-games"],
    "playstation-store": ["playstation", "sony-playstation", "console-games"],
    "nintendo-eshop": ["nintendo", "nintendo-switch", "console-games"],
  };

  (aliases[labelId] ?? []).forEach((alias) => {
    if (allowRouteTypeInference || !ROUTE_PRODUCT_TYPE_IDS.has(alias)) {
      filters.add(alias);
    }
  });
}

function enrichProduct(product) {
  const productType = product.productType ?? "game-keys";
  const filters = new Set((product.filters ?? []).map(normalizeFilterId));

  [
    productType,
    product.category,
    product.genre,
    product.type,
    product.edition,
    product.activationRegion,
  ].forEach((value) => {
    const normalized = normalizeFilterId(value);
    if (normalized) filters.add(normalized);
  });

  addPlatformFilters(
    filters,
    product.platform,
    product.platformLabel,
    ["game-keys", "pc-games", "console-games", "mobile"].includes(productType),
  );

  return {
    ...product,
    productType,
    filters: Array.from(filters).filter(Boolean),
  };
}

const EXTRA_PRODUCTS = EXTRA_PRODUCT_TITLES.map((title, index) => {
  const id = BASE_PRODUCTS.length + index + 1;
  const platform = EXTRA_PLATFORMS[index % EXTRA_PLATFORMS.length];

  return {
    id,
    name: title,
    title,
    price: Number((0.99 + (index % 12) * 0.45).toFixed(2)),
    image: "/cyberpunk_2077.jpg",
    images: ["/cyberpunk_2077.jpg"],
    platform,
    platformLabel: EXTRA_PLATFORM_LABELS[platform],
    type: "Product key",
    edition: index % 3 === 0 ? "Deluxe" : "Standard",
    delivery: "Instant",
    activationRegion: "Global",
    currency: "$",
    seller: {
      id: `SX${(index % 4) + 1}`,
      name: ["CodesMarket", "GameKeys Pro", "DigitalGames", "VoidKeys"][
        index % 4
      ],
      avatar: "/avt.jpg",
      isOnline: index % 2 === 0,
    },
  };
});

const CATEGORY_PRODUCTS = createMarketplaceProducts();
const ALL_PRODUCTS = [
  ...BASE_PRODUCTS,
  ...EXTRA_PRODUCTS,
  ...CATEGORY_PRODUCTS,
].map(enrichProduct);

// Transform internal data into the exported formats
export const mockProducts = ALL_PRODUCTS.reduce((acc, product) => {
  acc[product.id] = {
    data: {
      id: product.id.toString(),
      name: product.name,
      type: product.type,
      platform: product.platformLabel,
      edition: product.edition,
      delivery: product.delivery,
      activationRegion: product.activationRegion,
      price: product.price,
      currency: product.currency,
      images: product.images,
      productType: product.productType,
      category: product.category,
      genre: product.genre,
      filters: product.filters,
    },
    seller: {
      ...product.seller,
      // Provide defaults for missing seller info
      isOnline: product.seller.isOnline ?? false,
      badge: product.seller.badge ?? "⭐",
      tier: product.seller.tier ?? "Pro",
      rating: product.seller.rating ?? 4.5,
      successRate: product.seller.successRate ?? 95,
      totalFeedbacks: product.seller.totalFeedbacks ?? 100,
      timezone: product.seller.timezone ?? "UTC +00:00",
      totalSales: product.seller.totalSales ?? 1000,
      positiveFeedbacks: product.seller.positiveFeedbacks ?? 95,
      negativeFeedbacks: product.seller.negativeFeedbacks ?? 5,
    },
  };
  return acc;
}, {});

export const listingProducts = ALL_PRODUCTS.map((product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  image: product.image,
  platform: product.platform,
  platformLabel: product.platformLabel,
  type: product.type,
  productType: product.productType,
  category: product.category,
  genre: product.genre,
  filters: product.filters,
}));

// Derived from main product list - single source of truth
export const popularGames = ALL_PRODUCTS.filter((p) => p.isPopular).map(
  (p) => ({
    id: p.id,
    title: p.title,
    image: p.image,
    video: p.video,
    platform: p.platform,
    price: p.price,
  }),
);

export function normalizeSellerRouteKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizeSellerImageUrl(value) {
  if (!value || value.startsWith("data:") || value.startsWith("blob:")) {
    return "/cyberpunk_2077.jpg";
  }

  return value;
}

function createSellerOffer(listing, seller) {
  return {
    data: {
      id: String(listing.id),
      name: String(listing.title),
      type: String(listing.productType || listing.type || "Product key"),
      platform: String(listing.platform || "Steam"),
      edition: String(listing.edition || "Standard"),
      delivery: String(listing.delivery || "Instant"),
      activationRegion: String(listing.activationRegion || "Global"),
      price: Number(listing.price || 0),
      currency: String(listing.currency || "$"),
      images: [sanitizeSellerImageUrl(String(listing.imageUrl || ""))],
    },
    seller,
  };
}

function createSellerProfileFromListings(profile, listings) {
  const publishedListings = listings.filter(
    (listing) => listing.status === "published",
  );

  if (publishedListings.length === 0) return null;

  const seller = {
    id: String(profile.id),
    name: String(profile.name),
    avatar: sanitizeSellerImageUrl(String(profile.avatar || "/avt1.png")),
    isOnline: true,
    badge: "Seller",
    tier: "Expert",
    rating: 5,
    successRate: 100,
    totalFeedbacks: 0,
    timezone: "GMT +07:00",
    totalSales: publishedListings.reduce(
      (total, listing) => total + Number(listing.sales || 0),
      0,
    ),
    positiveFeedbacks: 100,
    negativeFeedbacks: 0,
  };
  const offers = publishedListings.map((listing) =>
    createSellerOffer(listing, seller),
  );

  return {
    id: seller.id,
    name: seller.name,
    avatar: seller.avatar,
    banner:
      sanitizeSellerImageUrl(String(profile.banner || "")) ||
      offers[0]?.data.images[0] ||
      "/cyberpunk_2077.jpg",
    badge: seller.badge,
    tier: seller.tier,
    rating: seller.rating,
    successRate: seller.successRate,
    totalFeedbacks: seller.totalFeedbacks,
    totalSales: seller.totalSales,
    positiveFeedbacks: seller.positiveFeedbacks,
    negativeFeedbacks: seller.negativeFeedbacks,
    timezone: seller.timezone,
    currency: String(profile.currency || "$"),
    language: String(profile.language || "EN"),
    location: String(profile.location || "VN"),
    followers: 0,
    memberSince: String(profile.memberSince || "Jun 2025"),
    description:
      "Digital marketplace seller account with published marketplace offers.",
    averagePrice: Number(
      (
        offers.reduce((sum, offer) => sum + offer.data.price, 0) /
        offers.length
      ).toFixed(2),
    ),
    offerCount: offers.length,
    offers,
    reviews: [],
    followersList: [],
    followingList: [],
  };
}

function createSellerEntry(profile, listings) {
  return {
    profile,
    listings,
    updatedAt: new Date().toISOString(),
  };
}

function cloneProfile(profile) {
  return JSON.parse(JSON.stringify(profile));
}

const sellerProfiles = new Map();
export const initialSellerEntries = [];

function seedSellerProfile(profile, listings) {
  const entry = createSellerEntry(profile, listings);
  initialSellerEntries.push(cloneProfile(entry));
  sellerProfiles.set(normalizeSellerRouteKey(profile.name), entry);
  sellerProfiles.set(normalizeSellerRouteKey(profile.id), entry);
}

seedSellerProfile(
  {
    id: "usr_duy",
    name: "Duy",
    avatar: "/avt1.png",
    memberSince: "Jun 2025",
    location: "VN",
    language: "EN",
    currency: "$",
    banner: "/cyberpunk_2077.jpg",
  },
  [
    {
      id: "duy-steam-wallet",
      title: "Steam Wallet Code",
      productType: "Gift card",
      platform: "Steam",
      edition: "Global",
      activationRegion: "Global",
      delivery: "Instant",
      stock: 10,
      price: 9.99,
      currency: "$",
      imageUrl: "/cyberpunk_2077.jpg",
      description: "Fast digital delivery.",
      status: "published",
      views: 0,
      sales: 0,
      createdAt: "2026-05-24T00:00:00.000Z",
      updatedAt: "2026-05-24T00:00:00.000Z",
    },
  ],
);

seedSellerProfile(
  {
    id: "usr_001",
    name: "evnnpd",
    avatar: "/avt1.png",
    memberSince: "Jun 2025",
    location: "VN",
    language: "EN",
    currency: "$",
    banner: "/cyberpunk_2077.jpg",
  },
  [
    {
      id: "evnnpd-win11-pro",
      title: "Windows 11 Pro Key",
      productType: "Software license",
      platform: "Microsoft",
      edition: "Professional",
      activationRegion: "Global",
      delivery: "Instant",
      stock: 8,
      price: 19.99,
      currency: "$",
      imageUrl: "/product1.png",
      description: "Windows activation key with instant delivery.",
      status: "published",
      views: 0,
      sales: 0,
      createdAt: "2026-05-24T00:00:00.000Z",
      updatedAt: "2026-05-24T00:00:00.000Z",
    },
  ],
);

export function upsertSellerProfile(profile, listings) {
  const entry = createSellerEntry(profile, listings);
  sellerProfiles.set(normalizeSellerRouteKey(profile.name), entry);
  sellerProfiles.set(normalizeSellerRouteKey(profile.id), entry);
}

export function getSellerProfileByRouteKey(sellerRouteKey) {
  const entry = sellerProfiles.get(normalizeSellerRouteKey(sellerRouteKey));
  if (!entry) return null;

  const profile = createSellerProfileFromListings(
    entry.profile,
    entry.listings,
  );

  return profile ? cloneProfile(profile) : null;
}
