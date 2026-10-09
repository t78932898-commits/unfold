import prisma from "./db";
import { Category, Product } from "@/types";

export const SEED_CATEGORIES: Category[] = [
  {
    id: "cat_street_urban",
    name: "Street / Urban",
    slug: "street-urban",
    description: "Oversized, bold, edgy, contemporary. Graffiti, raw typography, skate, and hip-hop aesthetics.",
    image: "/images/street-urban-collection.png",
    active: true,
  },
  {
    id: "cat_art_creative",
    name: "Art / Creative",
    slug: "art-creative",
    description: "Artistic, experimental, aesthetic. Surrealism, abstract compositions, hand-drawn art, and digital collage.",
    image: "/images/categories/art-creative.svg",
    active: true,
  },
  {
    id: "cat_statement_attitude",
    name: "Statement / Attitude",
    slug: "statement-attitude",
    description: "Gen-Z, relatable, bold, expressive. Quotations, sarcasm, minimal typography, humor, and social commentary.",
    image: "/images/categories/statement-attitude.svg",
    active: true,
  },
  {
    id: "cat_vintage_culture",
    name: "Vintage / Culture",
    slug: "vintage-culture",
    description: "Retro, nostalgic, timeless. 70s, 80s, and 90s graphics, retro type, vintage cars, vinyl, and travel posters.",
    image: "/images/categories/vintage-culture.svg",
    active: true,
  },
];

export const SEED_PRODUCTS: Product[] = [
  // ─── STREET / URBAN — REAL COLLECTION PRODUCTS ───────────────────────────
  {
    id: "prod_01",
    name: "CITY AFTER DARK",
    slug: "city-after-dark",
    description: "Black washed oversized tee. High-density street calligraphy graphic — raw city energy captured in ink. Drop shoulder boxy cut for ultimate street fit.",
    price: 1499,
    fit: "Oversized Boxy Fit",
    material: "100% Super Combed Cotton (240 GSM)",
    collection: "Drop 01 / Street Urban",
    active: true,
    categoryId: "cat_street_urban",
    badge: "NEW",
    images: [
      { id: "img_01_f", url: "/images/products/city-after-dark/front.jpg", altText: "City After Dark Tee Front View", sortOrder: 0 },
      { id: "img_01_b", url: "/images/products/city-after-dark/back.jpg", altText: "City After Dark Tee Back View", sortOrder: 1 },
    ],
    variants: [
      { id: "var_01_s_blk", size: "S", color: "Black Washed", sku: "CAD-BLK-S", stock: 15 },
      { id: "var_01_m_blk", size: "M", color: "Black Washed", sku: "CAD-BLK-M", stock: 25 },
      { id: "var_01_l_blk", size: "L", color: "Black Washed", sku: "CAD-BLK-L", stock: 30 },
      { id: "var_01_xl_blk", size: "XL", color: "Black Washed", sku: "CAD-BLK-XL", stock: 18 },
    ],
  },
  {
    id: "prod_02",
    name: "CONCRETE DREAMS",
    slug: "concrete-dreams",
    description: "Washed mocha brown street art tee. Built from nothing in the concrete jungle. Same city, different dreams. High-density screen printed cityscape and midnight moon graphic on heavyweight combed cotton.",
    price: 1499,
    fit: "Oversized Street Fit",
    material: "100% Super Combed Cotton (240 GSM)",
    collection: "Drop 01 / Street Urban",
    active: true,
    categoryId: "cat_street_urban",
    badge: "BEST SELLER",
    images: [
      { id: "img_02_f", url: "/images/products/concrete-dreams/front.jpg", altText: "Concrete Dreams Tee Front View", sortOrder: 0 },
      { id: "img_02_b", url: "/images/products/concrete-dreams/back.jpg", altText: "Concrete Dreams Tee Back View", sortOrder: 1 },
      { id: "img_02_p", url: "/images/products/concrete-dreams/poster.jpg", altText: "Concrete Dreams Campaign Poster", sortOrder: 2 },
      { id: "img_02_d", url: "/images/products/concrete-dreams/details.jpg", altText: "Concrete Dreams Print & Fabric Details", sortOrder: 3 },
    ],
    variants: [
      { id: "var_02_s_gry", size: "S", color: "Washed Mocha", sku: "CD-MCH-S", stock: 10 },
      { id: "var_02_m_gry", size: "M", color: "Washed Mocha", sku: "CD-MCH-M", stock: 20 },
      { id: "var_02_l_gry", size: "L", color: "Washed Mocha", sku: "CD-MCH-L", stock: 25 },
      { id: "var_02_xl_gry", size: "XL", color: "Washed Mocha", sku: "CD-MCH-XL", stock: 12 },
    ],
  },
  {
    id: "prod_03_street",
    name: "404 CITY NOT FOUND",
    slug: "404-city-not-found",
    description: "Jet black heavyweight tee. A glitchy digital-meets-street statement — for those who exist outside the map. Bold oversized back graphic.",
    price: 1499,
    fit: "Oversized Boxy Fit",
    material: "100% Bio-Washed Combed Cotton (240 GSM)",
    collection: "Drop 01 / Street Urban",
    active: true,
    categoryId: "cat_street_urban",
    badge: "NEW",
    images: [
      { id: "img_03s_f", url: "/images/products/404-city-not-found/front.jpg", altText: "404 City Not Found Tee Front View", sortOrder: 0 },
      { id: "img_03s_b", url: "/images/products/404-city-not-found/back.jpg", altText: "404 City Not Found Tee Back View", sortOrder: 1 },
    ],
    variants: [
      { id: "var_03s_s_blk", size: "S", color: "Jet Black", sku: "404-BLK-S", stock: 12 },
      { id: "var_03s_m_blk", size: "M", color: "Jet Black", sku: "404-BLK-M", stock: 22 },
      { id: "var_03s_l_blk", size: "L", color: "Jet Black", sku: "404-BLK-L", stock: 28 },
      { id: "var_03s_xl_blk", size: "XL", color: "Jet Black", sku: "404-BLK-XL", stock: 15 },
    ],
  },
  {
    id: "prod_04_street",
    name: "DIFFERENT POV",
    slug: "different-pov",
    description: "Chalk white drop shoulder tee. Wear a different lens — because your perspective is your identity. Clean contrast print on crisp white canvas.",
    price: 1499,
    fit: "Drop Shoulder Relaxed Fit",
    material: "100% Combed Cotton (240 GSM)",
    collection: "Drop 01 / Street Urban",
    active: true,
    categoryId: "cat_street_urban",
    badge: "NEW",
    images: [
      { id: "img_04s_f", url: "/images/products/different-pov/front.jpg", altText: "Different POV Tee Front View", sortOrder: 0 },
      { id: "img_04s_b", url: "/images/products/different-pov/back.jpg", altText: "Different POV Tee Back View", sortOrder: 1 },
    ],
    variants: [
      { id: "var_04s_s_wht", size: "S", color: "Chalk White", sku: "DPOV-WHT-S", stock: 18 },
      { id: "var_04s_m_wht", size: "M", color: "Chalk White", sku: "DPOV-WHT-M", stock: 30 },
      { id: "var_04s_l_wht", size: "L", color: "Chalk White", sku: "DPOV-WHT-L", stock: 25 },
      { id: "var_04s_xl_wht", size: "XL", color: "Chalk White", sku: "DPOV-WHT-XL", stock: 20 },
    ],
  },
  {
    id: "prod_05_street",
    name: "JUST CHILL // SIXTY NINE OVERSIZED TEE",
    slug: "just-chill-oversized-tee",
    description: "Vibrant royal washed cobalt blue heavyweight tee. Minimal 'Sixty Nine' chest branding with an expansive surrealist 'JUST CHILL' ice-cube anime graphic on the back. Heavy soft wash finish for vintage streetwear feel.",
    price: 1599,
    fit: "Oversized Boxy Fit",
    material: "100% Bio-Washed Heavyweight Cotton (240 GSM)",
    collection: "Drop 01 / Street Urban",
    active: true,
    categoryId: "cat_street_urban",
    badge: "NEW",
    images: [
      { id: "img_jc_f", url: "/images/products/just-chill/front.jpg", altText: "Just Chill Tee Front View", sortOrder: 0 },
      { id: "img_jc_b", url: "/images/products/just-chill/back.jpg", altText: "Just Chill Tee Back View", sortOrder: 1 },
      { id: "img_jc_l", url: "/images/products/just-chill/lookbook.jpg", altText: "Just Chill Front & Back Lookbook", sortOrder: 2 },
    ],
    variants: [
      { id: "var_jc_s_blu", size: "S", color: "Cobalt Washed Blue", sku: "JC-BLU-S", stock: 15 },
      { id: "var_jc_m_blu", size: "M", color: "Cobalt Washed Blue", sku: "JC-BLU-M", stock: 25 },
      { id: "var_jc_l_blu", size: "L", color: "Cobalt Washed Blue", sku: "JC-BLU-L", stock: 30 },
      { id: "var_jc_xl_blu", size: "XL", color: "Cobalt Washed Blue", sku: "JC-BLU-XL", stock: 18 },
    ],
  },
  {
    id: "prod_06_cyberpunk",
    name: "CYBERPUNK NEON GLITCH TEE",
    slug: "cyberpunk-neon-glitch-tee",
    description: "Futuristic street calligraphy with neon reactive screenprint. Minimalist glowing starburst chest motif on the front and high-density cyberpunk glitch hooded silhouette on the back. Heavy soft bio-washed finish for peak streetwear aesthetics.",
    price: 1899,
    fit: "Oversized Boxy Fit",
    material: "100% Super Combed Cotton (240 GSM)",
    collection: "Drop 01 / Street Urban",
    active: true,
    categoryId: "cat_street_urban",
    badge: "NEW",
    images: [
      { id: "img_cyber_f", url: "/images/products/cyberpunk-neon-glitch-tee/front.jpg", altText: "Cyberpunk Neon Glitch Tee Front View", sortOrder: 0 },
      { id: "img_cyber_b", url: "/images/products/cyberpunk-neon-glitch-tee/back.jpg", altText: "Cyberpunk Neon Glitch Tee Back View", sortOrder: 1 },
    ],
    variants: [
      { id: "var_cyber_s", size: "S", color: "Washed Black", sku: "CYBER-BLK-S", stock: 12 },
      { id: "var_cyber_m", size: "M", color: "Washed Black", sku: "CYBER-BLK-M", stock: 24 },
      { id: "var_cyber_l", size: "L", color: "Washed Black", sku: "CYBER-BLK-L", stock: 30 },
      { id: "var_cyber_xl", size: "XL", color: "Washed Black", sku: "CYBER-BLK-XL", stock: 18 },
      { id: "var_cyber_xxl", size: "XXL", color: "Washed Black", sku: "CYBER-BLK-XXL", stock: 10 },
    ],
  },
  {
    id: "prod_03",
    name: "SURREAL HORIZON ABSTRACT TEE",
    slug: "surreal-horizon-abstract-tee",
    description: "Experimental surrealist artwork exploring distorted dimensions. Museum-grade DTG high fidelity print capturing painterly gradients.",
    price: 1699,
    fit: "Contemporary Relaxed",
    material: "100% Organic Pima Cotton (210 GSM)",
    collection: "Studio Series / Infinite Canvas",
    active: true,
    categoryId: "cat_art_creative",
    badge: "LIMITED",
    images: [
      { id: "img_03_f", url: "/images/products/surreal-horizon-abstract-tee/front.jpg", altText: "SURREAL HORIZON ABSTRACT TEE Front View", sortOrder: 0 },
      { id: "img_03_b", url: "/images/products/surreal-horizon-abstract-tee/back.jpg", altText: "SURREAL HORIZON ABSTRACT TEE Back View", sortOrder: 1 },
      { id: "img_03_det", url: "/images/products/surreal-horizon-abstract-tee/details.jpg", altText: "SURREAL HORIZON ABSTRACT TEE Details & Color", sortOrder: 2 },
      { id: "img_03_lb", url: "/images/products/surreal-horizon-abstract-tee/lookbook.jpg", altText: "SURREAL HORIZON ABSTRACT TEE Full Lookbook", sortOrder: 3 },
    ],
    variants: [
      { id: "var_03_s_wht", size: "S", color: "Raw Off-White", sku: "SH-WHT-S", stock: 12 },
      { id: "var_03_m_wht", size: "M", color: "Raw Off-White", sku: "SH-WHT-M", stock: 18 },
      { id: "var_03_l_wht", size: "L", color: "Raw Off-White", sku: "SH-WHT-L", stock: 20 },
      { id: "var_03_xl_wht", size: "XL", color: "Raw Off-White", sku: "SH-WHT-XL", stock: 10 },
      { id: "var_03_xxl_wht", size: "XXL", color: "Raw Off-White", sku: "SH-WHT-XXL", stock: 8 },
    ],
  },
  {
    id: "prod_04",
    name: "CYBER DISSOLUTION DIGITAL ART TEE",
    slug: "cyber-dissolution-digital-art-tee",
    description: "Deconstructed digital collage celebrating creative glitch culture and neon accents on deep obsidian cotton.",
    price: 1549,
    fit: "Oversized Boxy Fit",
    material: "100% French Terry Cotton (240 GSM)",
    collection: "Studio Series / Infinite Canvas",
    active: true,
    categoryId: "cat_art_creative",
    badge: "NEW",
    images: [
      { id: "img_04_f", url: "/images/products/cyber-dissolution-digital-art-tee/front.jpg", altText: "CYBER DISSOLUTION DIGITAL ART TEE Front View", sortOrder: 0 },
      { id: "img_04_b", url: "/images/products/cyber-dissolution-digital-art-tee/back.jpg", altText: "CYBER DISSOLUTION DIGITAL ART TEE Back View", sortOrder: 1 },
      { id: "img_04_det", url: "/images/products/cyber-dissolution-digital-art-tee/details.jpg", altText: "CYBER DISSOLUTION DIGITAL ART TEE Macro Details", sortOrder: 2 },
      { id: "img_04_lb", url: "/images/products/cyber-dissolution-digital-art-tee/lookbook.jpg", altText: "CYBER DISSOLUTION DIGITAL ART TEE Full Poster", sortOrder: 3 },
    ],
    variants: [
      { id: "var_04_s_blk", size: "S", color: "Jet Black", sku: "CD-BLK-S", stock: 12 },
      { id: "var_04_m_blk", size: "M", color: "Jet Black", sku: "CD-BLK-M", stock: 14 },
      { id: "var_04_l_blk", size: "L", color: "Jet Black", sku: "CD-BLK-L", stock: 22 },
      { id: "var_04_xl_blk", size: "XL", color: "Jet Black", sku: "CD-BLK-XL", stock: 15 },
      { id: "var_04_xxl_blk", size: "XXL", color: "Jet Black", sku: "CD-BLK-XXL", stock: 8 },
    ],
  },
  {
    id: "prod_05",
    name: "DO NOT DISTURB MY PEACE TEE",
    slug: "do-not-disturb-my-peace-tee",
    description: "Bold brutalist micro-type on chest with oversized back statement typography. Unapologetic self-expression for the boundary-setters.",
    price: 1399,
    fit: "Drop Shoulder Oversized",
    material: "100% Combed Cotton (220 GSM)",
    collection: "Unfiltered / Gen-Z Echoes",
    active: true,
    categoryId: "cat_statement_attitude",
    badge: "BEST SELLER",
    images: [
      { id: "img_05_f", url: "/images/products/do-not-disturb-my-peace-tee/front.jpg", altText: "DO NOT DISTURB MY PEACE TEE Front View", sortOrder: 0 },
      { id: "img_05_b", url: "/images/products/do-not-disturb-my-peace-tee/back.jpg", altText: "DO NOT DISTURB MY PEACE TEE Back View", sortOrder: 1 },
      { id: "img_05_det", url: "/images/products/do-not-disturb-my-peace-tee/details.jpg", altText: "DO NOT DISTURB MY PEACE TEE Details & Label", sortOrder: 2 },
      { id: "img_05_lb", url: "/images/products/do-not-disturb-my-peace-tee/lookbook.jpg", altText: "DO NOT DISTURB MY PEACE TEE Full Lookbook", sortOrder: 3 },
    ],
    variants: [
      { id: "var_05_s_blk", size: "S", color: "Pitch Black", sku: "DND-BLK-S", stock: 20 },
      { id: "var_05_m_blk", size: "M", color: "Pitch Black", sku: "DND-BLK-M", stock: 35 },
      { id: "var_05_l_blk", size: "L", color: "Pitch Black", sku: "DND-BLK-L", stock: 40 },
      { id: "var_05_xl_blk", size: "XL", color: "Pitch Black", sku: "DND-BLK-XL", stock: 25 },
      { id: "var_05_xxl_blk", size: "XXL", color: "Pitch Black", sku: "DND-BLK-XXL", stock: 15 },
    ],
  },
  {
    id: "prod_06",
    name: "CONTROL IS AN ILLUSION STATEMENT TEE",
    slug: "control-is-an-illusion-statement-tee",
    description: "Minimalist existential statement rendered in high-contrast Swiss typography with strike-through detailing.",
    price: 1449,
    fit: "Relaxed Fit",
    material: "100% Ringspun Cotton (220 GSM)",
    collection: "Unfiltered / Gen-Z Echoes",
    active: true,
    categoryId: "cat_statement_attitude",
    badge: "NEW",
    images: [
      { id: "img_06_1", url: "/images/products/statement-02.svg", altText: "Control Is An Illusion Tee Front View", sortOrder: 0 },
    ],
    variants: [
      { id: "var_06_s_wht", size: "S", color: "Chalk White", sku: "CIAI-WHT-S", stock: 15 },
      { id: "var_06_m_wht", size: "M", color: "Chalk White", sku: "CIAI-WHT-M", stock: 28 },
      { id: "var_06_l_wht", size: "L", color: "Chalk White", sku: "CIAI-WHT-L", stock: 30 },
    ],
  },
  {
    id: "prod_07",
    name: "1988 TOKYO MIDNIGHT RACER VINTAGE TEE",
    slug: "1988-tokyo-midnight-racer-vintage-tee",
    description: "Heavy garment washed vintage aesthetic. Japanese retro car club illustration with authentic cracked puff ink treatment.",
    price: 1599,
    fit: "Vintage Boxy Fit",
    material: "100% Vintage Washed Heavy Cotton (250 GSM)",
    collection: "Archive '88 / Nostalgia Core",
    active: true,
    categoryId: "cat_vintage_culture",
    badge: "BEST SELLER",
    images: [
      { id: "img_07_b", url: "/images/products/1988-tokyo-midnight-racer-vintage-tee/back.jpg", altText: "1988 TOKYO MIDNIGHT RACER VINTAGE TEE Back View", sortOrder: 0 },
      { id: "img_07_det", url: "/images/products/1988-tokyo-midnight-racer-vintage-tee/details.jpg", altText: "1988 TOKYO MIDNIGHT RACER VINTAGE TEE Macro Details", sortOrder: 1 },
      { id: "img_07_lb", url: "/images/products/1988-tokyo-midnight-racer-vintage-tee/lookbook.jpg", altText: "1988 TOKYO MIDNIGHT RACER VINTAGE TEE Full Lookbook", sortOrder: 2 },
    ],
    variants: [
      { id: "var_07_s_vnt", size: "S", color: "Washed Black", sku: "TR-BLK-S", stock: 12 },
      { id: "var_07_m_vnt", size: "M", color: "Washed Black", sku: "TR-BLK-M", stock: 24 },
      { id: "var_07_l_vnt", size: "L", color: "Washed Black", sku: "TR-BLK-L", stock: 30 },
      { id: "var_07_xl_vnt", size: "XL", color: "Washed Black", sku: "TR-BLK-XL", stock: 18 },
      { id: "var_07_xxl_vnt", size: "XXL", color: "Washed Black", sku: "TR-BLK-XXL", stock: 10 },
    ],
  },
  {
    id: "prod_08",
    name: "ANALOG TAPES 1994 CULTURE TEE",
    slug: "analog-tapes-1994-culture-tee",
    description: "Authentic 90s cassette mixtape design with distressed halftone typography and golden era hip-hop vibes.",
    price: 1499,
    fit: "Oversized Street Fit",
    material: "100% Combed Cotton (230 GSM)",
    collection: "Archive '88 / Nostalgia Core",
    active: true,
    categoryId: "cat_vintage_culture",
    badge: "OVERSIZED",
    images: [
      { id: "img_08_1", url: "/images/products/vintage-02.svg", altText: "Analog Tapes Tee Front View", sortOrder: 0 },
    ],
    variants: [
      { id: "var_08_s_blk", size: "S", color: "Vintage Black", sku: "AT-BLK-S", stock: 12 },
      { id: "var_08_m_blk", size: "M", color: "Vintage Black", sku: "AT-BLK-M", stock: 24 },
      { id: "var_08_l_blk", size: "L", color: "Vintage Black", sku: "AT-BLK-L", stock: 25 },
      { id: "var_08_xl_blk", size: "XL", color: "Vintage Black", sku: "AT-BLK-XL", stock: 10 },
    ],
  },
];

// Helper to attach category object to products
function enrichProduct(product: Product, categories: Category[]): Product {
  const cat = categories.find((c) => c.id === product.categoryId);
  return {
    ...product,
    category: cat,
  };
}

// Fast timeout wrapper (750ms) to ensure instant fallback when PostgreSQL is offline
let lastDbFailure = 0;
const DB_RETRY_INTERVAL = 15000; // 15 seconds cooldown

function isDbTemporarilyUnavailable(): boolean {
  return Date.now() - lastDbFailure < DB_RETRY_INTERVAL;
}

function markDbFailed(): void {
  lastDbFailure = Date.now();
}

async function safeDbQuery<T>(queryFn: () => Promise<T>): Promise<T> {
  if (isDbTemporarilyUnavailable()) {
    throw new Error("DB_COOLDOWN");
  }
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("DB_TIMEOUT")), 750);
  });
  try {
    return await Promise.race([queryFn(), timeoutPromise]);
  } catch (err) {
    markDbFailed();
    throw err;
  } finally {
    clearTimeout(timer!);
  }
}

async function getCustomProductsSafe(): Promise<Product[]> {
  if (typeof window !== "undefined") return [];
  try {
    const { getCustomProducts } = await import("./products-store");
    return await getCustomProducts();
  } catch {
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  const customProducts = await getCustomProductsSafe();
  const allProducts = [...customProducts, ...SEED_PRODUCTS];

  try {
    const categoriesFromDb = await safeDbQuery(() =>
      prisma.category.findMany({
        where: { active: true },
        orderBy: { createdAt: "asc" },
        include: {
          _count: {
            select: { products: true },
          },
        },
      })
    );

    if (categoriesFromDb && categoriesFromDb.length > 0) {
      return categoriesFromDb.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        active: cat.active,
        productCount: cat._count.products + customProducts.filter((p) => p.categoryId === cat.id).length,
      }));
    }
  } catch (error) {
    // Graceful fallback when DB is offline or not yet connected
  }

  // Count products for seed categories
  return SEED_CATEGORIES.map((cat) => ({
    ...cat,
    productCount: allProducts.filter((p) => p.categoryId === cat.id).length,
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const cat = await safeDbQuery(() =>
      prisma.category.findUnique({
        where: { slug },
        include: {
          _count: { select: { products: true } },
        },
      })
    );
    if (cat) {
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        active: cat.active,
        productCount: cat._count.products,
      };
    }
  } catch (error) {
    // Database fallback
  }

  const found = SEED_CATEGORIES.find((c) => c.slug === slug);
  if (!found) return null;
  return {
    ...found,
    productCount: SEED_PRODUCTS.filter((p) => p.categoryId === found.id).length,
  };
}

export async function getProducts(options?: {
  categoryId?: string;
  categorySlug?: string;
  badge?: string;
  search?: string;
  sort?: string;
}): Promise<Product[]> {
  const categories = await getCategories();

  try {
    const where: Record<string, unknown> = { active: true };
    if (options?.categoryId) where.categoryId = options.categoryId;
    if (options?.categorySlug) {
      const cat = categories.find((c) => c.slug === options.categorySlug);
      if (cat) where.categoryId = cat.id;
    }
    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: "insensitive" } },
        { description: { contains: options.search, mode: "insensitive" } },
      ];
    }

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (options?.sort === "price-asc") orderBy = { price: "asc" };
    if (options?.sort === "price-desc") orderBy = { price: "desc" };

    const dbProducts = await safeDbQuery(() =>
      prisma.product.findMany({
        where,
        orderBy,
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          variants: true,
          category: true,
        },
      })
    );

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: Number(p.price),
        fit: p.fit,
        material: p.material,
        collection: p.collection,
        active: p.active,
        categoryId: p.categoryId,
        category: p.category ? {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
          description: p.category.description,
          image: p.category.image,
          active: p.category.active,
        } : undefined,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          sortOrder: img.sortOrder,
        })),
        variants: p.variants.map((v) => ({
          id: v.id,
          size: v.size,
          color: v.color,
          sku: v.sku,
          stock: v.stock,
        })),
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
    }
  } catch (error) {
    // Database fallback
  }

  // Merge custom products created via admin with seed products
  const customProducts = await getCustomProductsSafe();
  const allAvailable = [...customProducts, ...SEED_PRODUCTS];
  let results = allAvailable.map((p) => enrichProduct(p, categories));

  if (options?.categorySlug) {
    const cat = categories.find((c) => c.slug === options.categorySlug);
    if (cat) results = results.filter((p) => p.categoryId === cat.id);
  }

  if (options?.categoryId) {
    results = results.filter((p) => p.categoryId === options.categoryId);
  }

  if (options?.badge) {
    results = results.filter((p) => p.badge === options.badge);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    results = results.filter(
      (p) => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q))
    );
  }

  if (options?.sort === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (options?.sort === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  }

  return results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const categories = await getCategories();

  try {
    const p = await safeDbQuery(() =>
      prisma.product.findUnique({
        where: { slug },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          variants: true,
          category: true,
        },
      })
    );

    if (p) {
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: Number(p.price),
        fit: p.fit,
        material: p.material,
        collection: p.collection,
        active: p.active,
        categoryId: p.categoryId,
        category: p.category ? {
          id: p.category.id,
          name: p.category.name,
          slug: p.category.slug,
          description: p.category.description,
          image: p.category.image,
          active: p.category.active,
        } : undefined,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
          altText: img.altText,
          sortOrder: img.sortOrder,
        })),
        variants: p.variants.map((v) => ({
          id: v.id,
          size: v.size,
          color: v.color,
          sku: v.sku,
          stock: v.stock,
        })),
      };
    }
  } catch (error) {
    // Database fallback
  }

  // Check custom products created via admin
  const customProducts = await getCustomProductsSafe();
  const customFound = customProducts.find((item) => item.slug === slug);
  if (customFound) return enrichProduct(customFound, categories);

  const p = SEED_PRODUCTS.find((item) => item.slug === slug);
  if (!p) return null;
  return enrichProduct(p, categories);
}
