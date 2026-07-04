import { createClient } from "@supabase/supabase-js";
import {
  getSellerProfileByRouteKey as getSellerProfileByRouteKeyFromData,
  initialSellerEntries,
  listingProducts,
  mockProducts,
  normalizeSellerRouteKey,
  popularGames,
  upsertSellerProfile as upsertSellerProfileInData,
} from "./data.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isSupabaseConfigured = Boolean(
  supabaseUrl?.startsWith("http") && supabaseServiceRoleKey,
);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export const databasePath = isSupabaseConfigured
  ? `supabase:${new URL(supabaseUrl).host}`
  : "mock-data:data.js";

const authenticatedUsers = new Map();

for (const entry of initialSellerEntries) {
  const profile = entry.profile;
  authenticatedUsers.set(profile.id, {
    id: profile.id,
    email: "",
    name: profile.name,
    picture: profile.avatar,
    provider: "seed",
    role: "seller",
    createdAt: entry.updatedAt,
    updatedAt: entry.updatedAt,
  });
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function toCamelUser(row) {
  return {
    id: row.id,
    email: row.email ?? "",
    name: row.name,
    picture: row.picture ?? "",
    provider: row.provider,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
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
      images: [String(listing.imageUrl || "/cyberpunk_2077.jpg")],
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
    avatar: String(profile.avatar || "/avt1.png"),
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
      String(profile.banner || "") ||
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

function logSupabaseFallback(action, error) {
  console.warn(
    `[database] ${action} failed; using mock fallback: ${error.message}`,
  );
}

async function fromSupabase(action, fallback, query) {
  if (!supabase) return fallback();

  try {
    return await query();
  } catch (error) {
    logSupabaseFallback(action, error);
    return fallback();
  }
}

export async function getAllProducts() {
  return fromSupabase(
    "getAllProducts",
    () => clone(Object.values(mockProducts)),
    async () => {
      const { data, error } = await supabase
        .from("marketplace_products")
        .select("product")
        .order("id", { ascending: true });

      if (error) throw error;
      return data.map((row) => row.product);
    },
  );
}

export async function getListingProducts() {
  return fromSupabase(
    "getListingProducts",
    () => clone(listingProducts),
    async () => {
      const { data, error } = await supabase
        .from("marketplace_products")
        .select("listing_product")
        .order("id", { ascending: true });

      if (error) throw error;
      return data.map((row) => row.listing_product);
    },
  );
}

export async function getPopularGames() {
  return fromSupabase(
    "getPopularGames",
    () => clone(popularGames),
    async () => {
      const { data, error } = await supabase
        .from("marketplace_products")
        .select("popular_game")
        .eq("is_popular", true)
        .order("id", { ascending: true });

      if (error) throw error;
      return data.map((row) => row.popular_game).filter(Boolean);
    },
  );
}

export async function getProductById(productId) {
  return fromSupabase(
    "getProductById",
    () => {
      const product = mockProducts[String(productId)];
      return product ? clone(product) : null;
    },
    async () => {
      const { data, error } = await supabase
        .from("marketplace_products")
        .select("product")
        .eq("id", String(productId))
        .maybeSingle();

      if (error) throw error;
      return data?.product ?? null;
    },
  );
}

export async function getUsers() {
  return fromSupabase(
    "getUsers",
    () => clone(Array.from(authenticatedUsers.values())),
    async () => {
      const { data, error } = await supabase
        .from("marketplace_users")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data.map(toCamelUser);
    },
  );
}

export async function getUserById(id) {
  return fromSupabase(
    "getUserById",
    () => authenticatedUsers.get(String(id)) ?? null,
    async () => {
      const { data, error } = await supabase
        .from("marketplace_users")
        .select("*")
        .eq("id", String(id))
        .maybeSingle();

      if (error) throw error;
      return data ? toCamelUser(data) : null;
    },
  );
}

export async function upsertAuthenticatedUser(user) {
  const now = new Date().toISOString();
  const existingUser = authenticatedUsers.get(String(user.id));

  authenticatedUsers.set(String(user.id), {
    ...existingUser,
    ...user,
    id: String(user.id),
    createdAt: existingUser?.createdAt ?? now,
    updatedAt: now,
  });

  if (!supabase) return;

  const { error } = await supabase.from("marketplace_users").upsert({
    id: String(user.id),
    email: user.email ?? "",
    name: user.name ?? "User",
    picture: user.picture ?? "",
    provider: user.provider ?? "google",
    role: user.role ?? "user",
  });

  if (error) throw error;
}

export async function upsertSellerProfile(profile, listings) {
  upsertSellerProfileInData(profile, listings);

  const now = new Date().toISOString();
  const existingUser = authenticatedUsers.get(String(profile.id));

  authenticatedUsers.set(String(profile.id), {
    ...existingUser,
    id: String(profile.id),
    email: existingUser?.email ?? "",
    name: String(profile.name),
    picture: String(profile.avatar || ""),
    provider: existingUser?.provider ?? "seller-profile",
    role: "seller",
    createdAt: existingUser?.createdAt ?? now,
    updatedAt: now,
  });

  // Local fallback: Sync seller listings to mockProducts and listingProducts
  const publishedIds = [];
  
  for (const listing of listings) {
    const listingId = String(listing.id);
    if (listing.status === "published") {
      publishedIds.push(listingId);
      
      const mockProduct = {
        data: {
          id: listingId,
          name: String(listing.title),
          type: String(listing.productType || "Product key"),
          platform: String(listing.platform || "Steam"),
          edition: String(listing.edition || "Standard"),
          delivery: String(listing.delivery || "Instant"),
          activationRegion: String(listing.activationRegion || "Global"),
          price: Number(listing.price || 0),
          currency: String(listing.currency || "$"),
          images: [String(listing.imageUrl || "/cyberpunk_2077.jpg")],
          productType: String(listing.productType || "Game keys"),
          category: "Games",
          genre: "Action"
        },
        seller: {
          id: String(profile.id),
          name: String(profile.name),
          avatar: String(profile.avatar || "/avt1.png"),
          isOnline: true,
          badge: "Seller",
          tier: "Novice",
          rating: 5,
          successRate: 100,
          totalFeedbacks: 0,
          timezone: "GMT +07:00",
          totalSales: 0,
          positiveFeedbacks: 100,
          negativeFeedbacks: 0
        }
      };

      mockProducts[listingId] = mockProduct;

      const listingProduct = {
        id: listingId,
        title: String(listing.title),
        price: Number(listing.price || 0),
        image: String(listing.imageUrl || "/cyberpunk_2077.jpg"),
        platform: String(listing.platform || "Steam"),
        platformLabel: String(listing.platform || "Steam"),
        type: String(listing.productType || "Product key"),
        productType: String(listing.productType || "Game keys"),
        category: "Games",
        genre: "Action",
        filters: []
      };

      const existingIndex = listingProducts.findIndex(lp => String(lp.id) === listingId);
      if (existingIndex >= 0) {
        listingProducts[existingIndex] = listingProduct;
      } else {
        listingProducts.push(listingProduct);
      }
    } else {
      // Not published (draft or paused), remove if it exists
      delete mockProducts[listingId];
      const index = listingProducts.findIndex(lp => String(lp.id) === listingId);
      if (index >= 0) {
        listingProducts.splice(index, 1);
      }
    }
  }

  // Handle deleted listings (any product stored for this seller but not in this listings array)
  const listingIds = listings.map(l => String(l.id));
  for (const key of Object.keys(mockProducts)) {
    const prod = mockProducts[key];
    if (prod?.seller?.id === String(profile.id) && !listingIds.includes(key)) {
      delete mockProducts[key];
      const index = listingProducts.findIndex(lp => String(lp.id) === key);
      if (index >= 0) {
        listingProducts.splice(index, 1);
      }
    }
  }

  if (!supabase) return;

  const routeKey = normalizeSellerRouteKey(profile.name);
  const { error: profileError } = await supabase.from("seller_profiles").upsert({
    id: String(profile.id),
    route_key: routeKey,
    name: String(profile.name),
    profile,
    listings,
  });

  if (profileError) throw profileError;

  const { error: userError } = await supabase.from("marketplace_users").upsert({
    id: String(profile.id),
    email: existingUser?.email ?? "",
    name: String(profile.name),
    picture: String(profile.avatar || ""),
    provider: existingUser?.provider ?? "seller-profile",
    role: "seller",
  });

  if (userError) throw userError;

  // Supabase sync: Upsert published listings into marketplace_products
  for (const listing of listings) {
    const listingId = String(listing.id);
    if (listing.status === "published") {
      const mockProduct = mockProducts[listingId];
      const listingProduct = listingProducts.find(lp => String(lp.id) === listingId);

      if (mockProduct && listingProduct) {
        await supabase.from("marketplace_products").upsert({
          id: listingId,
          seller_id: String(profile.id),
          product: mockProduct,
          listing_product: listingProduct,
          is_popular: false
        });
      }
    } else {
      // Remove from marketplace_products if draft or paused
      await supabase.from("marketplace_products").delete().eq("id", listingId);
    }
  }

  // Delete any marketplace_products that belong to this seller but were deleted from listings
  const { data: dbProds, error: dbError } = await supabase
    .from("marketplace_products")
    .select("id,product");

  if (!dbError && dbProds) {
    const sellerDbProds = dbProds.filter(row => row.product?.seller?.id === String(profile.id));
    for (const row of sellerDbProds) {
      if (!publishedIds.includes(row.id)) {
        await supabase.from("marketplace_products").delete().eq("id", row.id);
      }
    }
  }
}

export async function getSellerProfileByRouteKey(sellerRouteKey) {
  return fromSupabase(
    "getSellerProfileByRouteKey",
    () => getSellerProfileByRouteKeyFromData(sellerRouteKey),
    async () => {
      const routeKey = normalizeSellerRouteKey(sellerRouteKey);
      const rawKey = String(sellerRouteKey || "").trim();
      const { data: routeMatch, error: routeError } = await supabase
        .from("seller_profiles")
        .select("profile,listings")
        .eq("route_key", routeKey)
        .maybeSingle();

      if (routeError) throw routeError;
      if (routeMatch) {
        return createSellerProfileFromListings(
          routeMatch.profile,
          routeMatch.listings ?? [],
        );
      }

      const { data: idMatch, error: idError } = await supabase
        .from("seller_profiles")
        .select("profile,listings")
        .eq("id", rawKey)
        .maybeSingle();

      if (idError) throw idError;
      if (!idMatch) return null;

      return createSellerProfileFromListings(
        idMatch.profile,
        idMatch.listings ?? [],
      );
    },
  );
}
