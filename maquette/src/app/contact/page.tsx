import { FactBadge, FactText } from "@/components/FactBadge";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/forms/EstateForms";
import { site } from "@/content/site";
import { telHref } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact", "Agence immobilière Delafosse Group à Cocody Riviera Faya : adresse, horaires, itinéraire et formulaire de contact.", "/contact");

export default function ContactPage() {
  const c = site.contact;
  const tel = telHref(c.phone);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Parlons de votre projet">
        <p>Achat, location, gestion de votre bien ou construction : un conseiller vous répond.</p>
      </PageHeader>
      <div className="container-site grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <section aria-labelledby="agency-title" className="card p-6 md:p-8">
          <h2 id="agency-title" className="text-2xl">L&apos;agence</h2>
          <address className="mt-3 not-italic"><FactText fact={c.address} /></address>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapsQuery)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
            Itinéraire<span className="sr-only"> (nouvel onglet)</span>
          </a>
          <h3 className="mt-8 text-lg">Téléphone</h3>
          <p className="mt-1">{c.phone && tel ? <a href={tel} className="underline">{c.phone.value}</a> : c.phone ? <FactText fact={c.phone} /> : "Non communiqué"}</p>
          {c.email ? (
            <>
              <h3 className="mt-6 text-lg">E-mail</h3>
              <p className="mt-1"><FactText fact={c.email} /></p>
            </>
          ) : null}
          <h3 className="mt-6 text-lg">
            Horaires
            <FactBadge status={c.hours.status} source={c.hours.source} />
          </h3>
          <ul className="mt-1 text-muted">
            {c.hours.rows.map((r) => (
              <li key={r.days}>{r.days} : {r.hours}</li>
            ))}
          </ul>
        </section>
        <section aria-label="Formulaire de contact">
          <ContactForm />
        </section>
      </div>
    </>
  );
}
