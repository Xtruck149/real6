"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Property } from "@/content/types";
import { AVAILABILITY, TRANSACTIONS, TYPES } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";

const SORTS = { recent: "Pertinence", "prix-asc": "Prix croissant", "prix-desc": "Prix décroissant", surface: "Surface" } as const;

/**
 * Catalogue filters live in the URL (?transaction=location&commune=Cocody…), so a filtered list can be
 * shared on WhatsApp and the browser "back" button keeps the selection.
 */
export function PropertyBrowser({ properties }: { properties: Property[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Local state answers instantly; the URL follows (and wins again on back/forward or a shared link).
  const [filters, setFilters] = useState<Record<string, string>>(() => Object.fromEntries(params));
  useEffect(() => setFilters(Object.fromEntries(params)), [params]);
  const get = (k: string) => filters[k] ?? "";

  function set(key: string, value: string) {
    const next = { ...filters, [key]: value };
    if (!value) delete next[key];
    setFilters(next);
    const query = new URLSearchParams(next).toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  const communes = [...new Set(properties.map((p) => p.commune))].sort();
  const budget = Number(get("budget")) || 0;
  const sort = (get("tri") || "recent") as keyof typeof SORTS;

  const visible = properties
    .filter(
      (p) =>
        (!get("transaction") || p.transaction === get("transaction")) &&
        (!get("type") || p.type === get("type")) &&
        (!get("commune") || p.commune === get("commune")) &&
        (!budget || p.price <= budget) &&
        (get("dispo") !== "1" || p.availability === "disponible"),
    )
    .sort((a, b) => (sort === "prix-asc" ? a.price - b.price : sort === "prix-desc" ? b.price - a.price : sort === "surface" ? b.surface - a.surface : 0));

  const select = (key: string, label: string, options: [string, string][], all = "Tous") => (
    <label className="text-sm font-semibold">
      {label}
      <select className="field-input mt-2" value={get(key)} onChange={(e) => set(key, e.target.value)}>
        <option value="">{all}</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <>
      <div role="search" aria-label="Filtrer les biens" className="card grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-5">
        {select("transaction", "Transaction", Object.entries(TRANSACTIONS), "Toutes")}
        {select("type", "Type de bien", Object.entries(TYPES))}
        {select("commune", "Commune", communes.map((c) => [c, c]), "Toutes")}
        <label className="text-sm font-semibold">
          Budget maximum (FCFA)
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={10000}
            className="field-input mt-2"
            value={get("budget")}
            placeholder="Sans limite"
            onChange={(e) => set("budget", e.target.value)}
          />
        </label>
        {select("tri", "Trier par", Object.entries(SORTS).filter(([k]) => k !== "recent") as [string, string][], "Pertinence")}
        <label className="flex min-h-11 items-center gap-3 text-sm font-semibold sm:col-span-2 lg:col-span-5">
          <input type="checkbox" className="h-5 w-5 accent-[var(--color-accent)]" checked={get("dispo") === "1"} onChange={(e) => set("dispo", e.target.checked ? "1" : "")} />
          Uniquement les biens disponibles ({AVAILABILITY.disponible.label.toLowerCase()} maintenant)
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          {visible.length} bien{visible.length > 1 ? "s" : ""} trouvé{visible.length > 1 ? "s" : ""}
        </p>
        {Object.keys(filters).length ? (
          <button type="button" className="text-sm font-semibold text-accent underline" onClick={() => { setFilters({}); router.replace(pathname, { scroll: false }); }}>
            Effacer les filtres
          </button>
        ) : null}
      </div>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <PropertyCard p={p} priority={i < 3} />
          </li>
        ))}
      </ul>
      {visible.length === 0 ? (
        <div className="card mt-6 p-6 text-center">
          <p className="font-semibold">Aucun bien ne correspond à ces critères.</p>
          <p className="mt-1 text-muted">Élargissez la recherche ou laissez-nous votre demande : nous vous prévenons dès qu&apos;un bien correspond.</p>
        </div>
      ) : null}
    </>
  );
}
