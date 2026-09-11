# ShilpKart - Setup Guide

## 1. Supabase Project

The app does **not** connect to a shared Supabase project. You create your
own and point the app at it through environment variables.

1. Create a project at https://supabase.com/dashboard
2. Go to **Settings → API**
3. Copy the Project URL and the anon key — these become
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the **service role key** — this becomes `SUPABASE_SERVICE_ROLE_KEY`.
   It is server-side only and must not be exposed to the browser.

## 2. Clone and Install

```bash
git clone https://github.com/molkarinfotech/shilpkart.git
cd shilpkart
npm install
```

## 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`. At minimum:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- `NEXT_PUBLIC_DEMO_MODE=true` enables the demo shopping flow (cart,
  checkout, demo orders). Leave it `false` on production deploys.
- Stripe and Razorpay keys are **not required** to run locally — they are
  planned and not yet wired into checkout.

## 4. Supabase Schema

The app currently reads from and writes to:

- `demo_products`
- `demo_orders` + `demo_order_items`
- `seller_applications`

Apply the SQL that creates those tables to your project. The shared SQL file
is to be added under `supabase/migrations/`; until then, create the tables
using the definitions in `src/types/database.ts` as a reference and add the
demo tables.

## 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 6. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import `molkarinfotech/shilpkart`
3. Add the environment variables from `.env.local` (set `NEXT_PUBLIC_DEMO_MODE=false` for production unless you intend to expose the demo order path)
4. Deploy

## What's working

- Homepage
- Marketplace (demo_products, category filtering)
- Product detail page
- Cart (localStorage-backed)
- Checkout demo flow (creates demo_orders / demo_order_items)
- Seller application flow (`/seller/register` + admin review table)

## What's planned

- Supabase Auth (login page is a UI stub)
- Seller onboarding from approved application to product CRUD
- Stripe / Razorpay checkout with payment intents and webhooks
- Reviews and ratings
- Product management UI for sellers
- Shared SQL migrations under `supabase/migrations/`

## Key policy

- Shipping: free above ₹2,500, else ₹180.
- Commission: 30% marketplace commission on sales.

These live in `src/lib/policy.ts` and are shared between the cart, checkout,
and demo order API.

---

Built with ❤️ for Indian artisans
