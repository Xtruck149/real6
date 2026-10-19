import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PropertyBrowser } from "@/components/PropertyBrowser";
import { properties } from "@/content/properties";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Biens disponibles", "Terrains, maisons, villas et studios à vendre ou à louer à Abidjan : filtrez par commune, budget et disponibilité.", "/biens");

export default function PropertiesPage() {
  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Biens disponibles">
        <p>Filtrez par transaction, type, commune et budget. Les biens affichés sont des exemples fictifs.</p>
      </PageHeader>
      <div className="container-site">
        {/* Filters read the URL query: the list is rendered on the client from the static data. */}
        <Suspense fallback={<p className="text-muted">Chargement du catalogue…</p>}>
          <PropertyBrowser properties={properties} />
        </Suspense>
      </div>
    </>
  );
}
