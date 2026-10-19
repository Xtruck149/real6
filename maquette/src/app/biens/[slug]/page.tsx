import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyGallery } from "@/components/PropertyGallery";
import { VisitForm } from "@/components/forms/EstateForms";
import { properties } from "@/content/properties";
import { AVAILABILITY, TRANSACTIONS, TYPES, formatDay, formatPrice } from "@/lib/properties";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = properties.find((x) => x.slug === slug);
  return p ? pageMetadata(p.title, `${TYPES[p.type]} ${TRANSACTIONS[p.transaction].toLowerCase()} à ${p.quartier}, ${p.commune} : ${p.surface} m², ${formatPrice(p)}.`, `/biens/${p.slug}`) : {};
}

export default async function PropertyPage({ params }: Params) {
  const { slug } = await params;
  const p = properties.find((x) => x.slug === slug);
  if (!p) notFound();
  const a = AVAILABILITY[p.availability];
  const similar = properties.filter((x) => x.slug !== p.slug && (x.type === p.type || x.commune === p.commune)).slice(0, 3);
  const specs = [
    ["Type", TYPES[p.type]],
    ["Transaction", TRANSACTIONS[p.transaction]],
    ["Surface", `${p.surface} m²`],
    ["Pièces", p.rooms?.toString()],
    ["Chambres", p.bedrooms?.toString()],
    ["Salles d'eau", p.bathrooms?.toString()],
    ["Localisation", `${p.quartier}, ${p.commune}`],
  ].filter(([, v]) => v) as [string, string][];
  const canVisit = p.availability !== "indisponible";

  return (
    <>
      <nav aria-label="Fil d'Ariane" className="container-site pt-8 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/" className="hover:underline">Accueil</Link> /</li>
          <li><Link href="/biens" className="hover:underline">Biens</Link> /</li>
          <li aria-current="page" className="text-ink">{p.title}</li>
        </ol>
      </nav>

      <div className="container-site mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <PropertyGallery images={p.images} title={p.title} />
        <div>
          {p.status !== "confirme" ? (
            <p role="note" className="mb-4 rounded-xl border-2 border-highlight p-3 text-sm">
              <strong>Exemple fictif.</strong> Ce bien n&apos;existe pas : prix, surface, disponibilité et visuels sont inventés pour la démonstration.
            </p>
          ) : null}
          <p className="text-sm font-bold uppercase tracking-widest text-accent">{TRANSACTIONS[p.transaction]} · {TYPES[p.type]}</p>
          <h1 className="mt-2 text-3xl sm:text-4xl">{p.title}</h1>
          <p className="mt-2 text-muted">{p.quartier}, {p.commune}</p>
          <p className="mt-5 text-3xl font-bold text-accent">{formatPrice(p)}</p>
          <p className="mt-3">
            <span className={`rounded-full px-3 py-1 text-sm font-bold ${a.tone}`}>{a.label}</span>
            {p.availableFrom ? <span className="ml-2 text-sm text-muted">à partir du {formatDay(p.availableFrom)}</span> : null}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {specs.map(([k, v]) => (
              <div key={k} className="rounded-xl bg-surface-2 p-3">
                <dt className="text-xs font-bold uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <a href={canVisit ? "#visite" : "/contact"} className="btn btn-primary mt-6 w-full">
            {canVisit ? "Demander une visite" : "Être alerté d'un bien similaire"}
          </a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.quartier} ${p.commune} Abidjan`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 w-full">
            Voir le quartier sur la carte<span className="sr-only"> (nouvel onglet)</span>
          </a>
        </div>
      </div>

      <div className="container-site mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section aria-labelledby="desc-title" className="card p-6 md:p-8">
          <h2 id="desc-title" className="text-2xl">Description</h2>
          <p className="mt-3 text-muted">{p.description}</p>
          <h3 className="mt-6 text-lg">Atouts</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {p.features.map((f) => (
              <li key={f} className="rounded-full bg-surface-2 px-3 py-1 text-sm">{f}</li>
            ))}
          </ul>
        </section>
        {canVisit ? (
          <section id="visite" aria-label="Demande de visite">
            <VisitForm properties={properties.filter((x) => x.availability !== "indisponible").map((x) => ({ value: x.slug, label: x.title }))} defaultProperty={p.slug} />
          </section>
        ) : (
          <section aria-labelledby="unavailable-title" className="card p-6 md:p-8">
            <h2 id="unavailable-title" className="text-2xl">Ce bien n&apos;est plus disponible</h2>
            <p className="mt-2 text-muted">Laissez-nous votre projet : nous vous prévenons dès qu&apos;un bien similaire se libère.</p>
            <Link href="/contact" className="btn btn-primary mt-4">Nous écrire</Link>
          </section>
        )}
      </div>

      {similar.length ? (
        <section aria-labelledby="similar-title" className="container-site mt-16">
          <h2 id="similar-title" className="text-2xl md:text-3xl">Biens similaires</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((x) => (
              <li key={x.slug}><PropertyCard p={x} /></li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
