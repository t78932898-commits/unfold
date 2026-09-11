import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting UNFOLD database seed...");

  // 1. Clean existing records
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Cleared existing records.");

  // 2. Insert the 4 categories
  const streetUrban = await prisma.category.create({
    data: {
      name: "Street / Urban",
      slug: "street-urban",
      description: "Oversized, bold, edgy, contemporary. Graffiti, raw typography, skate, and hip-hop aesthetics.",
      image: "/images/categories/street-urban.svg",
      active: true,
    },
  });

  const artCreative = await prisma.category.create({
    data: {
      name: "Art / Creative",
      slug: "art-creative",
      description: "Artistic, experimental, aesthetic. Surrealism, abstract compositions, hand-drawn art, and digital collage.",
      image: "/images/categories/art-creative.svg",
      active: true,
    },
  });

  const statementAttitude = await prisma.category.create({
    data: {
      name: "Statement / Attitude",
      slug: "statement-attitude",
      description: "Gen-Z, relatable, bold, expressive. Quotations, sarcasm, minimal typography, humor, and social commentary.",
      image: "/images/categories/statement-attitude.svg",
      active: true,
    },
  });

  const vintageCulture = await prisma.category.create({
    data: {
      name: "Vintage / Culture",
      slug: "vintage-culture",
      description: "Retro, nostalgic, timeless. 70s, 80s, and 90s graphics, retro type, vintage cars, vinyl, and travel posters.",
      image: "/images/categories/vintage-culture.svg",
      active: true,
    },
  });

  console.log("Created 4 core categories:");
  console.log(`- ${streetUrban.name} (${streetUrban.slug})`);
  console.log(`- ${artCreative.name} (${artCreative.slug})`);
  console.log(`- ${statementAttitude.name} (${statementAttitude.slug})`);
  console.log(`- ${vintageCulture.name} (${vintageCulture.slug})`);

  // 3. Insert Products
  // Product 1: Street / Urban
  await prisma.product.create({
    data: {
      name: "REBELLION CHRONICLES OVERSIZED TEE",
      slug: "rebellion-chronicles-oversized-tee",
      description: "240 GSM heavy combed cotton. High-density screen printed street calligraphy graphic on the back with distressed typography on front chest. Drop shoulder relaxed fit.",
      price: 1499,
      fit: "Oversized Boxy Fit",
      material: "100% Super Combed Cotton (240 GSM)",
      collection: "Drop 01 / Urban Metamorphosis",
      active: true,
      categoryId: streetUrban.id,
      images: {
        create: [
          { url: "/images/products/street-01.svg", altText: "Rebellion Chronicles Tee Front", sortOrder: 0 },
          { url: "/images/products/street-01-back.svg", altText: "Rebellion Chronicles Tee Back", sortOrder: 1 },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Acid Black", sku: "RC-BLK-S", stock: 15 },
          { size: "M", color: "Acid Black", sku: "RC-BLK-M", stock: 25 },
          { size: "L", color: "Acid Black", sku: "RC-BLK-L", stock: 30 },
          { size: "XL", color: "Acid Black", sku: "RC-BLK-XL", stock: 18 },
          { size: "XXL", color: "Acid Black", sku: "RC-BLK-XXL", stock: 8 },
        ],
      },
    },
  });

  // Product 2: Art / Creative
  await prisma.product.create({
    data: {
      name: "SURREAL HORIZON ABSTRACT TEE",
      slug: "surreal-horizon-abstract-tee",
      description: "Experimental surrealist artwork exploring distorted dimensions. Museum-grade DTG high fidelity print capturing painterly gradients.",
      price: 1699,
      fit: "Contemporary Relaxed",
      material: "100% Organic Pima Cotton (210 GSM)",
      collection: "Studio Series / Infinite Canvas",
      active: true,
      categoryId: artCreative.id,
      images: {
        create: [
          { url: "/images/products/art-01.svg", altText: "Surreal Horizon Abstract Tee", sortOrder: 0 },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Raw Off-White", sku: "SH-WHT-S", stock: 12 },
          { size: "M", color: "Raw Off-White", sku: "SH-WHT-M", stock: 18 },
          { size: "L", color: "Raw Off-White", sku: "SH-WHT-L", stock: 20 },
          { size: "XL", color: "Raw Off-White", sku: "SH-WHT-XL", stock: 10 },
        ],
      },
    },
  });

  // Product 3: Statement / Attitude
  await prisma.product.create({
    data: {
      name: "DO NOT DISTURB MY PEACE TEE",
      slug: "do-not-disturb-my-peace-tee",
      description: "Bold brutalist micro-type on chest with oversized back statement typography. Unapologetic self-expression for the boundary-setters.",
      price: 1399,
      fit: "Drop Shoulder Oversized",
      material: "100% Combed Cotton (220 GSM)",
      collection: "Unfiltered / Gen-Z Echoes",
      active: true,
      categoryId: statementAttitude.id,
      images: {
        create: [
          { url: "/images/products/statement-01.svg", altText: "Do Not Disturb Statement Tee", sortOrder: 0 },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Pitch Black", sku: "DND-BLK-S", stock: 20 },
          { size: "M", color: "Pitch Black", sku: "DND-BLK-M", stock: 35 },
          { size: "L", color: "Pitch Black", sku: "DND-BLK-L", stock: 40 },
          { size: "XL", color: "Pitch Black", sku: "DND-BLK-XL", stock: 25 },
        ],
      },
    },
  });

  // Product 4: Vintage / Culture
  await prisma.product.create({
    data: {
      name: "1988 TOKYO MIDNIGHT RACER VINTAGE TEE",
      slug: "1988-tokyo-midnight-racer-vintage-tee",
      description: "Heavy garment washed vintage aesthetic. Japanese retro car club illustration with authentic cracked puff ink treatment.",
      price: 1599,
      fit: "Vintage Boxy Fit",
      material: "100% Vintage Washed Heavy Cotton (250 GSM)",
      collection: "Archive '88 / Nostalgia Core",
      active: true,
      categoryId: vintageCulture.id,
      images: {
        create: [
          { url: "/images/products/vintage-01.svg", altText: "1988 Tokyo Racer Vintage Tee", sortOrder: 0 },
        ],
      },
      variants: {
        create: [
          { size: "S", color: "Faded Olive", sku: "TR-OLV-S", stock: 8 },
          { size: "M", color: "Faded Olive", sku: "TR-OLV-M", stock: 20 },
          { size: "L", color: "Faded Olive", sku: "TR-OLV-L", stock: 22 },
          { size: "XL", color: "Faded Olive", sku: "TR-OLV-XL", stock: 14 },
        ],
      },
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
