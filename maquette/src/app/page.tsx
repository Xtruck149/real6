import Link from "next/link";
import { DemoImage } from "@/components/DemoImage";
import { FactBadge, FactText } from "@/components/FactBadge";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/content/properties";
import { copy, site } from "@/content/site";
import { TRANSACTIONS, TYPES } from "@/lib/properties";

export default function HomePage() {
  const featured = properties.filter((p) => p.availability === "disponible").slice(0, 3);
  const communes = [...new Set(properties.map((p) => p.commune))].sort();

  return (
    <>
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <DemoImage file="hero.webp" alt="Visuel de démonstration d'un quartier résidentiel" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/10" />
        <p className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white">Visuel de démonstration</p>
        <div className="container-site py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/85">{copy.heroEyebrow}</p>
          <h1 id="hero-title" className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{copy.heroText}</p>

          <form action="/biens" method="get" role="search" aria-label="Recherche rapide" className="mt-8 grid max-w-4xl gap-3 rounded-2xl bg-surface p-4 shadow-xl sm:grid-cols-4">
            <label className="text-sm font-semibold">
              Je souhaite
              <select name="transaction" className="field-input mt-1" defaultValue="">
                <option value="">Acheter ou louer</option>
                {Object.entries(TRANSACTIONS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Type de bien
              <select name="type" className="field-input mt-1" defaultValue="">
                <option value="">Tous</option>
                {Object.entries(TYPES).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Commune
              <select name="commune" className="field-input mt-1" defaultValue="">
                <option value="">Toutes</option>
                {communes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary self-end">Rechercher</button>
          </form>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="container-site py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Biens disponibles</p>
            <h2 id="featured-title" className="mt-2 text-3xl md:text-4xl">À la une</h2>
            <p className="mt-2 text-muted">Exemples fictifs : les vrais biens seront publiés après validation.</p>
          </div>
          <Link href="/biens" className="btn btn-ghost">Tout le catalogue</Link>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug}><PropertyCard p={p} /></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="services-title" className="bg-surface-2 py-16 md:py-20">
        <div className="container-site">
          <h2 id="services-title" className="text-3xl md:text-4xl">
            Nos services
            <FactBadge status="public" source={copy.servicesSource} />
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.services.map((s) => (
              <li key={s.title} className="card p-6">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-title" className="container-site py-16 md:py-20">
        <h2 id="how-title" className="text-3xl md:text-4xl">Visiter un bien en 3 étapes</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Choisissez", "Filtrez par commune, budget et disponibilité."],
            ["Demandez une visite", "Indiquez le jour et le créneau qui vous arrangent."],
            ["Visitez", "Un conseiller confirme par téléphone et vous accompagne."],
          ].map(([t, d], i) => (
            <li key={t} className="card p-6">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-accent font-bold text-accent-ink">{i + 1}</span>
              <h3 className="mt-4 text-xl">{t}</h3>
              <p className="mt-1 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="agency-title" className="container-site">
        <div className="card flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 id="agency-title" className="text-2xl md:text-3xl">Notre agence</h2>
            <p className="mt-2"><FactText fact={site.contact.address} /></p>
            <p className="mt-1 text-sm text-muted">{site.contact.hours.rows.map((r) => `${r.days} : ${r.hours}`).join(" · ")}</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Nous contacter</Link>
        </div>
      </section>
    </>
  );
}
