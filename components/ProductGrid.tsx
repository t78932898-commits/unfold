import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  emptyMessage = "No graphic tees found matching your criteria.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-zinc-800 rounded bg-zinc-950/40">
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${gridColsClass} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
