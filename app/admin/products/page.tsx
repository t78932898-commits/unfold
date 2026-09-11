import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, ExternalLink } from "lucide-react";
import { getProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/Button";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
            PRODUCT MANAGEMENT
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Total of {products.length} graphic tees registered in database.
          </p>
        </div>

        <Link href="/admin/products/new">
          <Button size="sm" className="gap-1.5 font-mono text-xs">
            <PlusCircle size={14} />
            <span>ADD NEW T-SHIRT</span>
          </Button>
        </Link>
      </div>

      {/* Product Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 uppercase">
              <tr>
                <th className="p-4">PRODUCT</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">TOTAL STOCK</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {products.map((p) => {
                const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);

                return (
                  <tr key={p.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-zinc-900 rounded overflow-hidden relative shrink-0 border border-zinc-800">
                          <Image
                            src={p.images[0]?.url || "/images/products/street-01.jpg"}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white uppercase line-clamp-1">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            {p.fit} &bull; {p.variants.length} VARIANTS
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 uppercase text-zinc-400">
                      {p.category?.name || "UNASSIGNED"}
                    </td>

                    <td className="p-4 font-bold text-white">
                      {formatCurrency(p.price)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`font-bold ${
                          totalStock > 20
                            ? "text-emerald-400"
                            : totalStock > 0
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {totalStock} UNITS
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                        ACTIVE / PUBLISHED
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-zinc-400 hover:text-white"
                        title="View on storefront"
                      >
                        <span>VIEW</span>
                        <ExternalLink size={12} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
