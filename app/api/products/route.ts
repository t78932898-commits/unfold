import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getProducts } from "@/lib/data";
import { saveCustomProduct } from "@/lib/products-store";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import prisma from "@/lib/db";
import { Product } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const badge = searchParams.get("badge") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const products = await getProducts({
      categorySlug: category,
      badge,
      search,
      sort,
    });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("[GET /api/products Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Independent Route-Level Admin Session Verification
    const cookieStore = cookies();
    const adminToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const session = adminToken ? await verifyAdminToken(adminToken) : null;

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Valid administrator authentication is required to create products.",
        },
        { status: 401 }
      );
    }

    // 2. CSRF / Origin Verification
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host !== host) {
          return NextResponse.json(
            { success: false, error: "Cross-Origin mutation blocked." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid request origin." },
          { status: 403 }
        );
      }
    }

    // 3. Parse & Validate Product Payload
    const body = await request.json();
    const {
      name,
      slug: rawSlug,
      description,
      price: rawPrice,
      categoryId: rawCategoryId,
      fit,
      material,
      collection,
      badge,
      images: inputImages,
      variants: inputVariants,
    } = body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Product name must be at least 3 characters long." },
        { status: 400 }
      );
    }

    // Validate and sanitize slug
    let slug = (rawSlug || name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!slug || slug.length < 2) {
      return NextResponse.json(
        { success: false, error: "A valid URL-safe product slug is required." },
        { status: 400 }
      );
    }

    // Handle Duplicate Slug: check existing products and append suffix if exists
    const existingProducts = await getProducts();
    const isDuplicate = existingProducts.some((p) => p.slug === slug);
    if (isDuplicate) {
      let counter = 2;
      let uniqueSlug = `${slug}-${counter}`;
      while (existingProducts.some((p) => p.slug === uniqueSlug)) {
        counter++;
        uniqueSlug = `${slug}-${counter}`;
      }
      slug = uniqueSlug;
    }

    // Validate price
    const price = parseFloat(rawPrice);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { success: false, error: "Valid price (greater than or equal to 0) is required." },
        { status: 400 }
      );
    }

    // Normalize category ID
    let categoryId = rawCategoryId || "cat_street_urban";
    const categoryMap: Record<string, string> = {
      "street-urban": "cat_street_urban",
      "art-creative": "cat_art_creative",
      "statement-attitude": "cat_statement_attitude",
      "vintage-culture": "cat_vintage_culture",
    };
    if (categoryMap[categoryId]) {
      categoryId = categoryMap[categoryId];
    }

    // Validate and normalize images
    let productImages = [];
    if (Array.isArray(inputImages) && inputImages.length > 0) {
      for (let i = 0; i < inputImages.length; i++) {
        const img = inputImages[i];
        if (typeof img?.url === "string" && img.url.trim().length > 0) {
          // Disallow SVG or script URLs in product images
          const urlLower = img.url.toLowerCase();
          if (urlLower.includes(".svg") || urlLower.startsWith("javascript:") || urlLower.startsWith("data:text")) {
            return NextResponse.json(
              { success: false, error: "SVG or unsafe script URLs are disallowed for product imagery." },
              { status: 400 }
            );
          }
          productImages.push({
            id: `img_${Date.now()}_${i}`,
            url: img.url.trim(),
            altText: img.altText || `${name} view ${i + 1}`,
            sortOrder: i,
          });
        }
      }
    }

    // Fallback image if none provided
    if (productImages.length === 0) {
      productImages.push({
        id: `img_${Date.now()}_0`,
        url: "/images/products/street-01.jpg",
        altText: name,
        sortOrder: 0,
      });
    }

    // Validate and normalize S-XXL variants
    const standardSizes = ["S", "M", "L", "XL", "XXL"];
    let productVariants = [];

    if (Array.isArray(inputVariants) && inputVariants.length > 0) {
      for (let i = 0; i < inputVariants.length; i++) {
        const v = inputVariants[i];
        const size = standardSizes.includes(v.size) ? v.size : standardSizes[i % standardSizes.length];
        const stock = Math.max(0, parseInt(v.stock, 10) || 0);
        productVariants.push({
          id: `var_${Date.now()}_${i}`,
          size,
          color: v.color || "Standard",
          sku: `${slug.toUpperCase()}-${size}`,
          stock,
        });
      }
    } else {
      // Default standard stock allocation
      productVariants = standardSizes.map((size, idx) => ({
        id: `var_${Date.now()}_${idx}`,
        size,
        color: "Standard",
        sku: `${slug.toUpperCase()}-${size}`,
        stock: 20,
      }));
    }

    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: name.trim(),
      slug,
      description: typeof description === "string" ? description.trim() : null,
      price: Math.round(price * 100) / 100,
      fit: fit ? fit.trim() : "Oversized Boxy Fit",
      material: material ? material.trim() : "100% Super Combed Cotton (240 GSM)",
      collection: collection ? collection.trim() : "Drop 01 / Street Urban",
      badge: badge || "NEW",
      active: true,
      categoryId,
      images: productImages,
      variants: productVariants,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 4. Atomic Write to JSON Store (guaranteed persistence across restarts)
    await saveCustomProduct(newProduct);

    // 5. Secondary Sync to PostgreSQL via Prisma (if database is available)
    try {
      await prisma.product.create({
        data: {
          name: newProduct.name,
          slug: newProduct.slug,
          description: newProduct.description,
          price: newProduct.price,
          fit: newProduct.fit,
          material: newProduct.material,
          collection: newProduct.collection,
          categoryId: newProduct.categoryId,
          images: {
            create: productImages.map((img) => ({
              url: img.url,
              altText: img.altText,
              sortOrder: img.sortOrder,
            })),
          },
          variants: {
            create: productVariants.map((v) => ({
              size: v.size,
              color: v.color,
              sku: v.sku,
              stock: v.stock,
            })),
          },
        },
      });
    } catch {
      // Graceful fallback: Prisma offline or not provisioned; local JSON persistence is intact
    }

    // 6. On-Demand Next.js Cache Revalidation
    try {
      revalidatePath("/shop");
      revalidatePath("/admin/products");
      revalidatePath(`/product/${newProduct.slug}`);
      revalidatePath("/");
    } catch (revalidateError) {
      console.warn("[Cache Revalidation Warning]:", revalidateError);
    }

    console.info(`[Product Created]: Successfully published "${newProduct.name}" (${newProduct.slug}) by ${session.email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Product created and published successfully.",
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/products Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process product creation." },
      { status: 500 }
    );
  }
}
