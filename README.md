# UNFOLD — Graphic Printed T-Shirt Brand

> **Wear Your Perspective.**

UNFOLD is a premium graphic printed streetwear e-commerce platform built with Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL, and Prisma ORM.

---

## Brand Architecture & The 4 Worlds

1. **Street / Urban** (`/category/street-urban`)
   - *Vibe:* Oversized, bold, edgy, contemporary.
   - *Direction:* Graffiti, raw typography, urban illustrations, skate & hip-hop culture.
2. **Art / Creative** (`/category/art-creative`)
   - *Vibe:* Artistic, experimental, aesthetic.
   - *Direction:* Surrealism, abstract compositions, hand-drawn art, digital collage.
3. **Statement / Attitude** (`/category/statement-attitude`)
   - *Vibe:* Gen-Z, relatable, bold, expressive.
   - *Direction:* Quotations, sarcasm, minimal typography, humor, social commentary.
4. **Vintage / Culture** (`/category/vintage-culture`)
   - *Vibe:* Retro, nostalgic, timeless.
   - *Direction:* 70s/80s/90s graphics, retro type, vintage cars, vinyl & cassette tapes.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Components, Route Handlers)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom editorial streetwear design system)
- **Icons:** Lucide React
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Prepared modular email/password auth with bcryptjs
- **State Management:** React Context (`CartContext` with LocalStorage persistence)

---

## Project Structure

```text
Graphity tshirt brand/
├── app/
│   ├── layout.tsx                # Root layout with CartProvider, Navbar, Footer
│   ├── globals.css               # Editorial dark theme & custom scrollbar
│   ├── page.tsx                  # High-impact streetwear Homepage
│   ├── shop/
│   │   └── page.tsx              # Full catalog with search, pills & sorting
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic category page for the 4 worlds
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic product detail page (PDP)
│   ├── cart/
│   │   └── page.tsx              # Shopping bag with live quantity & subtotal
│   ├── checkout/
│   │   └── page.tsx              # Shipping address form & order summary
│   ├── login/
│   │   └── page.tsx              # Customer/Admin sign in
│   ├── signup/
│   │   └── page.tsx              # Customer account creation
│   ├── forgot-password/
│   │   └── page.tsx              # Password reset request
│   ├── account/
│   │   └── page.tsx              # Customer portal (Orders, Wishlist, Addresses)
│   ├── admin/
│   │   ├── layout.tsx            # Admin navigation suite
│   │   ├── page.tsx              # Admin KPI overview & metrics
│   │   ├── products/
│   │   │   ├── page.tsx          # Product inventory table
│   │   │   └── new/page.tsx      # Dynamic product creator (no code editing)
│   │   ├── categories/page.tsx   # Category manager
│   │   ├── orders/page.tsx       # Order fulfillment list
│   │   └── customers/page.tsx    # Customer directory
│   └── api/
│       ├── products/             # GET, POST products
│       ├── categories/           # GET categories
│       ├── cart/                 # GET, POST, PATCH, DELETE cart
│       └── orders/               # GET, POST orders
├── components/
│   ├── AnnouncementBar.tsx       # Top drop announcement ticker
│   ├── Navbar.tsx                # Responsive sticky navbar with badges
│   ├── Hero.tsx                  # Editorial streetwear campaign hero
│   ├── CategoryCard.tsx          # Perspective world card with zoom
│   ├── ProductCard.tsx           # Reusable product card with wishlist & quick-add
│   ├── ProductGrid.tsx           # Responsive multi-column grid
│   ├── ProductDetailClient.tsx   # Interactive PDP (gallery, sizes, colors, bag)
│   ├── CartDrawer.tsx            # Slide-over quick bag drawer
│   ├── Button.tsx                # Streetwear button variants
│   ├── Container.tsx             # Centered container layout wrapper
│   └── Footer.tsx                # Manifesto, newsletter, links & copyright
├── context/
│   └── CartContext.tsx           # Cart, wishlist, and drawer state provider
├── lib/
│   ├── db.ts                     # Prisma client singleton
│   ├── data.ts                   # Resilient database & fallback data service
│   ├── auth.ts                   # Auth & password hashing utilities
│   └── utils.ts                  # Currency formatter (₹ INR) & styling helpers
├── prisma/
│   ├── schema.prisma             # Full PostgreSQL database schema
│   └── seed.ts                   # Database seed script for 4 categories & tees
├── public/
│   └── images/                   # High-res streetwear SVG assets & mockups
├── types/
│   └── index.ts                  # TypeScript interfaces for entities & filters
├── .env.example                  # Environment configuration template
├── package.json
└── tsconfig.json
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Setup PostgreSQL Database (Optional for local development)

1. Create a PostgreSQL database (local or via Neon / Supabase).
2. Copy `.env.example` to `.env` and set your `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/unfold_db?schema=public"
   ```
3. Run migrations and seed data:
   ```bash
   npx prisma db push
   npm run prisma:seed
   ```

*(Note: If PostgreSQL is not yet configured, the platform features a built-in fallback layer in `lib/data.ts` that immediately serves the 4 categories and sample drops without crashing).*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Milestone 1 Checklist Verification

- [x] Project starts and builds with zero TypeScript errors
- [x] Responsive sticky Navbar with category dropdown, search, wishlist & bag badge
- [x] High-impact editorial Hero banner with "Wear Your Perspective"
- [x] Four Category Cards (Street / Urban, Art / Creative, Statement / Attitude, Vintage / Culture)
- [x] Shop catalog page (`/shop`) with dynamic filters, search, and sorting
- [x] Dynamic category page (`/category/[slug]`)
- [x] Dynamic product detail page (`/product/[slug]`) with gallery, sizes, colors, and add to bag
- [x] Interactive bag drawer and full Cart page (`/cart`) with live quantity and ₹ subtotal
- [x] Checkout foundation (`/checkout`) with address inputs and encrypted SSL badges
- [x] Auth foundation (`/login`, `/signup`, `/forgot-password`, `/account`)
- [x] Admin dashboard foundation (`/admin`, `/admin/products`, `/admin/products/new`)
- [x] Full Prisma schema and seed script configured for PostgreSQL
