import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/data";
import { Container } from "@/components/Container";
import { ProductDetailClient } from "@/components/ProductDetailClient";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found — UNFOLD" };
  }
  return {
    title: `${product.name} — UNFOLD Streetwear`,
    description:
      product.description ||
      "UNFOLD 240 GSM heavy combed cotton graphic printed T-shirt.",
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Fetch related products within same category
  const allCategoryProducts = await getProducts({
    categoryId: product.categoryId,
  });

  const relatedProducts = allCategoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 sm:py-12 pb-24">
      <Container>
        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts}
        />
      </Container>
    </div>
  );
}
