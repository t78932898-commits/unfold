import React from "react";
import { getCategories } from "@/lib/data";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
          CATEGORY MANAGEMENT
        </h1>
        <p className="text-xs font-mono text-zinc-400 mt-1">
          The 4 core perspective worlds configured in the database.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-zinc-950 border border-zinc-800 p-6 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold uppercase text-white font-sans">
                  {cat.name}
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  slug: /{cat.slug}
                </span>
              </div>
              <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {cat.description}
            </p>

            <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>{cat.productCount ?? 0} ACTIVE PRODUCTS</span>
              <span className="text-zinc-400">DATABASE BACKED</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
