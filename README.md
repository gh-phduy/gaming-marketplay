<div align="center">
  <h1>🎮 Difmark Digital Marketplace Clone</h1>
  <p>A modern, high-performance C2C/B2C E-commerce platform for digital gaming assets.</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![Stripe](https://img.shields.io/badge/Stripe-Payments-indigo?style=for-the-badge&logo=stripe)](https://stripe.com/)
  [![Vitest](https://img.shields.io/badge/Vitest-Testing-yellow?style=for-the-badge&logo=vitest)](https://vitest.dev/)
</div>

---

## 📝 Overview

**Difmark Digital Marketplace** is a robust and scalable e-commerce platform tailored specifically for the trading of digital gaming products (Game Keys, Accounts, In-game Items, and Top-up services). Built with the latest frontend ecosystem (Next.js 15 App Router, React 19), it delivers a seamless, highly interactive user experience while ensuring secure transactions and reliable data management.

🚀 **Live Demo:** [Insert Vercel Link Here]

## ✨ Key Features

This project includes a comprehensive suite of features designed to provide a complete C2C marketplace experience:

### 🛍️ For Buyers
- **Intuitive Discovery:** Advanced filtering, sorting, and search capabilities across multiple platforms (PC, PS5, Xbox, Mobile), genres, and regions.
- **Product Categories:** Support for Game Keys, Gift Cards, Direct Top-ups, Accounts, and Power Leveling services.
- **Seamless Checkout Flow:** Secure, blazing-fast, and multi-step payment processing seamlessly integrated with **Stripe**.
- **Real-time Order Tracking:** Instant updates on order statuses and delivery times.
- **Interactive UI/UX:** Engaging animations powered by **GSAP** and **Framer Motion**, ensuring a modern, premium gaming aesthetic.
- **Internationalization (i18n):** Multi-language and multi-currency support for a global user base.

### 💼 For Sellers
- **Dedicated Seller Workspace:** A comprehensive, responsive dashboard to manage stores, track sales analytics, and monitor performance.
- **Offer Management:** Flexible listing creation with customizable attributes (price, quantity, regional restrictions, delivery speed).
- **Direct Messaging:** Real-time inbox and chat system allowing sellers to communicate directly with buyers.
- **Financial Analytics:** Track gross sales, view next payout calculations, and monitor store health.
- **Reputation System:** Built-in review and rating mechanism, along with a Seller Level progression system (Novice, Expert, Master, Legend) complete with Cashback rewards.

### 🛡️ Admin & Security
- **Role-Based Access:** Distinct roles for Buyers, Sellers, and Administrators.
- **Secure Authentication:** Passwordless login, social logins, and secure session management via Supabase Auth.
- **KYC Verification System:** Banner prompts and flows for seller identity verification.

## 🏗️ Architecture & Tech Stack

This project leverages a modern, server-side rendered (SSR) architecture optimized for SEO and performance:

- **Framework:** Next.js 15 (App Router, Server Components, Server Actions)
- **UI/Styling:** Tailwind CSS, Radix UI (Headless primitives for accessibility), Lucide Icons
- **State Management:** Zustand (Global Client State), React Query (Async Server State)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Real-time Auth)
- **Payment Gateway:** Stripe
- **Code Quality:** ESLint, Prettier, TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- A Supabase project
- A Stripe account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/difmark-rft.git
   cd difmark-rft
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and configure your API keys:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role
   
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Quality Assurance & Testing

Reliability is paramount for an e-commerce platform. This project employs a comprehensive **Testing Trophy** strategy:

- **Robust Test Cases** covering Unit, Integration, UI Component, and End-to-End Page flows.
- **Tools:** Vitest, React Testing Library, User-Event.
- **Coverage:** Automated V8 coverage reporting ensures critical paths (Auth, Payments, State) are thoroughly tested.
- **CI/CD:** GitHub Actions workflows are configured to automatically run the test suite on every Push/Pull Request.

**Run the test suite locally:**
```bash
# Run all tests
npm run test

# Generate coverage report
npm run test:coverage
```

## 🌐 Deployment

This project is optimized for deployment on **Vercel**. 
1. Push your code to GitHub.
2. Import the repository into your Vercel dashboard.
3. Add the environment variables (`.env.local` contents) to Vercel's Environment settings.
4. Deploy!

## 📜 License & Disclaimer
Developed as a portfolio project for educational and demonstration purposes. UI/UX inspired by leading digital marketplaces like Difmark.
