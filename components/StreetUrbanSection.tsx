import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StreetUrbanSection() {
  return (
    <section className="w-full relative overflow-hidden bg-black">
      {/* Top label bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-zinc-950 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">01</span>
          <span className="text-[11px] font-mono tracking-widest text-white uppercase font-bold">
            STREET / URBAN
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-600 uppercase tracking-widest ml-2">
            - DROP 01 / URBAN COLLECTION
          </span>
        </div>
        <Link
          href="/category/street-urban"
          className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors"
        >
          <span>SHOP NOW</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Full-width collection image */}
      <Link href="/category/street-urban" className="block group relative">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1] overflow-hidden">
          <Image
            src="/images/street-urban-collection.png"
            alt="UNFOLD Street Urban Collection"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase mb-1">
                UNFOLD - DROP 01
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans leading-none">
                STREET / URBAN
              </h2>
              <p className="text-xs sm:text-sm font-mono text-zinc-300 mt-2 max-w-lg">
                City After Dark &middot; Concrete Dreams &middot; Just Chill &middot; 404 City Not Found &middot; Different POV
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[11px] font-mono font-bold uppercase tracking-widest rounded-sm group-hover:bg-accent-volt transition-colors duration-300">
                EXPLORE COLLECTION
                <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* 5-product quick-view strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-zinc-800">
        {[
          { name: "CITY AFTER DARK", color: "Black Washed", price: "Rs. 1,499", slug: "city-after-dark" },
          { name: "CONCRETE DREAMS", color: "Washed Mocha", price: "Rs. 1,499", slug: "concrete-dreams" },
          { name: "JUST CHILL // 69", color: "Cobalt Washed", price: "Rs. 1,599", slug: "just-chill-oversized-tee" },
          { name: "404 CITY NOT FOUND", color: "Jet Black", price: "Rs. 1,499", slug: "404-city-not-found" },
          { name: "DIFFERENT POV", color: "Chalk White", price: "Rs. 1,499", slug: "different-pov" },
        ].map((product, i) => (
          <Link
            key={product.slug}
            href={`/product/${product.slug}`}
            className="group flex flex-col gap-1 px-4 sm:px-6 py-4 border-r border-b lg:border-b-0 border-zinc-800 hover:bg-zinc-900 transition-colors last:border-r-0"
          >
            <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
              0{i + 1}
            </span>
            <span className="text-[11px] sm:text-xs font-bold font-mono text-white uppercase tracking-wide group-hover:text-accent-volt transition-colors line-clamp-1">
              {product.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              {product.color}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 mt-0.5">{product.price}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}