import Image from "next/image";
import Link from "next/link";
import manifest from "@/content/images.generated.json";
import type { Property } from "@/content/types";
import { AVAILABILITY, TRANSACTIONS, TYPES, formatPrice } from "@/lib/properties";

type Entry = { width: number; height: number; blurDataURL: string };

export function PropertyCard({ p, priority }: { p: Property; priority?: boolean }) {
  const m = (manifest as Record<string, Entry>)[p.images[0]];
  const a = AVAILABILITY[p.availability];
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div className="relative">
        <Image src={`/images/${p.images[0]}`} alt="" width={m.width} height={m.height} placeholder="blur" blurDataURL={m.blurDataURL} priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-ink">{TRANSACTIONS[p.transaction]}</span>
        {p.status !== "confirme" ? <span className="absolute right-3 top-3 rounded-full bg-highlight px-3 py-1 text-xs font-bold text-white">Exemple fictif</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">
          {TYPES[p.type]} · {p.quartier}, {p.commune}
        </p>
        <h3 className="mt-1 text-xl">
          <Link href={`/biens/${p.slug}`} className="after:absolute after:inset-0 group-hover:underline">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">
          {p.surface} m²{p.rooms ? ` · ${p.rooms} pièce${p.rooms > 1 ? "s" : ""}` : ""}
          {p.bedrooms ? ` · ${p.bedrooms} ch.` : ""}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-lg font-bold text-accent">{formatPrice(p)}</p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.tone}`}>{a.label}</span>
        </div>
      </div>
    </article>
  );
}
