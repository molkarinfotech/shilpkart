# ShilpKart - Setup Guide

## ✅ What's Been Completed

### 1. GitHub Repository
- **URL**: https://github.com/molkarinfotech/shilpkart
- **Status**: ✅ Created and populated with initial code
- **Branch**: main

### 2. Supabase Database
- **Project Name**: shilpkart
- **Project ID**: zqekrkuwxgzkqnuhwlyi
- **Database URL**: https://zqekrkuwxgzkqnuhwlyi.supabase.co
- **Status**: ✅ Database schema applied successfully
- **Tables Created**: profiles, seller_profiles, categories, products, product_images, orders, order_items, reviews
- **Features**: RLS policies, indexes, triggers, seed data for categories

## 📋 Quick Start

### Step 1: Get API Keys

#### Supabase
1. Go to https://supabase.com/dashboard/project/zqekrkuwxgzkqnuhwlyi
2. Settings → API
3. Copy: Project URL, anon key, service_role key

#### Stripe
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy: Publishable key, Secret key

### Step 2: Clone and Setup

```bash
git clone https://github.com/molkarinfotech/shilpkart.git
cd shilpkart
npm install
cp .env.example .env.local
```

### Step 3: Configure Environment

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://zqekrkuwxgzkqnuhwlyi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_SECRET_KEY=sk_test_your-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### Step 5: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import: molkarinfotech/shilpkart
3. Add environment variables
4. Deploy

## 📁 Project Structure

```
shilpkart/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   └── lib/              # Utilities (Supabase, Stripe, Razorpay)
├── types/
│   └── database.ts       # TypeScript types
├── package.json
└── SETUP_GUIDE.md
```

## 🎯 Next Features to Build

1. User authentication (Sign up/Login)
2. Seller registration with Aadhaar upload
3. Product CRUD for sellers
4. Shopping cart and checkout
5. Order management dashboard
6. Reviews and ratings

## 💡 Key Features

- **30% commission** on all sales (automatic calculation)
- **Multi-vendor** architecture
- **Payment escrow** - funds released after delivery
- **Guest checkout** supported
- **Indian payments** ready (Razorpay integration included)
- **Secure** - RLS enabled on all database tables

---

Built with ❤️ for Indian artisans
