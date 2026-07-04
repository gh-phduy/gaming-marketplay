import "dotenv/config";
import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import {
  databasePath,
  getAllProducts,
  getListingProducts,
  getPopularGames,
  getProductById,
  getSellerProfileByRouteKey,
  getUsers,
  getUserById,
  upsertAuthenticatedUser,
  upsertSellerProfile,
} from "./database.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Google OAuth Client
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

const allowedOrigins = new Set([
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3004",
]);

function isSellerProfileRecord(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.avatar === "string" &&
    typeof value.memberSince === "string" &&
    typeof value.location === "string" &&
    typeof value.language === "string" &&
    typeof value.currency === "string" &&
    (value.banner === undefined || typeof value.banner === "string")
  );
}

function isSellerListing(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.productType === "string" &&
    typeof value.platform === "string" &&
    typeof value.edition === "string" &&
    typeof value.activationRegion === "string" &&
    typeof value.delivery === "string" &&
    typeof value.stock === "number" &&
    typeof value.price === "number" &&
    typeof value.currency === "string" &&
    typeof value.imageUrl === "string" &&
    typeof value.description === "string" &&
    ["draft", "published", "paused"].includes(value.status) &&
    typeof value.views === "number" &&
    typeof value.sales === "number" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json());

// ============================================
// AUTH ROUTES
// ============================================

// 1. Redirect to Google
app.get(["/api/auth/google", "/auth/google"], (req, res) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(authorizeUrl);
});

// 2. Google Callback
app.get(
  ["/api/auth/google/callback", "/auth/google/callback"],
  async (req, res) => {
    const { code } = req.query;

    try {
      // Exchange code for tokens
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);

      // Get User Info
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // Check if user already exists in database
      const existingUser = await getUserById(payload.sub);
      if (existingUser) {
        console.log("User already exists, signing in directly:", existingUser);
        const token = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            picture: existingUser.picture,
          },
          process.env.JWT_SECRET || "default_secret",
          { expiresIn: "1d" }
        );
        return res.redirect(
          `${process.env.FRONTEND_URL || "http://localhost:3000"}?token=${token}`
        );
      }

      // User is new. Generate a temporary token with payload.
      const tempUser = {
        id: payload.sub,
        email: payload.email,
        picture: payload.picture,
        name: payload.name || payload.email.split("@")[0],
        provider: "google",
        role: "user",
        temp: true,
      };
      const tempToken = jwt.sign(
        tempUser,
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "10m" }
      );

      console.log("New user signing in, redirecting to choose username:", tempUser);
      return res.redirect(
        `${process.env.FRONTEND_URL || "http://localhost:3000"}/signup/username?tempToken=${tempToken}`
      );
    } catch (error) {
      console.error("Google Auth Error:", error);
      res.redirect(
        `${process.env.FRONTEND_URL || "http://localhost:3000"}?error=auth_failed`
      );
    }
  },
);

// 3. Register Username for New Google Users
app.post("/api/auth/register-username", async (req, res) => {
  const { tempToken, username } = req.body || {};

  if (!tempToken || !username || typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET || "default_secret");
    if (!decoded.temp) {
      return res.status(400).json({ error: "Invalid temporary token" });
    }

    const trimmedUsername = username.trim();

    // Check if the username is already taken by another user
    const allUsers = await getUsers();
    const isTaken = allUsers.some(
      (u) => u.name.toLowerCase() === trimmedUsername.toLowerCase()
    );
    if (isTaken) {
      return res.status(409).json({ error: "Username is already taken" });
    }

    const userRecord = {
      id: decoded.id,
      email: decoded.email,
      name: trimmedUsername,
      picture: decoded.picture,
      provider: "google",
      role: "user",
    };

    // officially write to database
    await upsertAuthenticatedUser(userRecord);

    console.log("New user registered successfully:", userRecord);

    // Generate finalized login token
    const token = jwt.sign(
      {
        id: userRecord.id,
        email: userRecord.email,
        name: userRecord.name,
        picture: userRecord.picture,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    res.json({
      ok: true,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Register username error:", error);
    res.status(401).json({ error: "Authentication expired or invalid" });
  }
});

// ============================================
// EXISTING ROUTES
// ============================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: databasePath,
    timestamp: new Date().toISOString(),
  });
});

// Get all products
app.get("/api/products", async (req, res) => {
  const products = await getAllProducts();
  res.json({
    products,
    total: products.length,
  });
});

// Get listing products (for the search/category page)
app.get("/api/listing-products", async (req, res) => {
  const products = await getListingProducts();

  res.json({
    products,
    total: products.length,
  });
});

// Get popular games
app.get("/api/popular-games", async (req, res) => {
  const games = await getPopularGames();

  res.json({
    games,
    total: games.length,
  });
});

// Get users persisted from mock seed data and Google sign-in
app.get("/api/users", async (req, res) => {
  const users = await getUsers();

  res.json({
    users,
    total: users.length,
  });
});

// Get public seller profile by username or id
app.get("/api/sellers/:sellerRouteKey", async (req, res) => {
  const profile = await getSellerProfileByRouteKey(req.params.sellerRouteKey);

  if (!profile) {
    return res.status(404).json({ error: "Seller not found" });
  }

  res.json(profile);
});

// Upsert public seller profile and listings from the account dashboard
app.post("/api/sellers", async (req, res) => {
  const { profile, listings } = req.body || {};

  if (!isSellerProfileRecord(profile) || !Array.isArray(listings)) {
    return res.status(400).json({ error: "Invalid seller profile payload" });
  }

  const validListings = listings.filter(isSellerListing);
  await upsertSellerProfile(profile, validListings);

  res.json({
    ok: true,
    listingCount: validListings.length,
  });
});

// Get single product by ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// Create Payment Intent for Stripe
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`
  🚀 Backend server is running!
  
  📍 Local:    http://localhost:${PORT}
  
  📚 API Endpoints:
     GET /api/health                - Health check
     GET /api/products              - Get all products
     GET /api/products/:id          - Get product by ID
     GET /api/users                 - Get users
     GET /api/sellers/:sellerRouteKey - Get public seller profile
     POST /api/sellers              - Upsert seller profile
     GET /api/auth/google           - Google Login
     POST /api/create-payment-intent - Create Stripe Payment Intent
  `);
});
