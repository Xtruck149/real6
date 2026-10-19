import type { Availability, Property, PropertyType, Transaction } from "@/content/types";

export const TRANSACTIONS: Record<Transaction, string> = { vente: "À vendre", location: "À louer", "location-vente": "Location-vente" };
export const TYPES: Record<PropertyType, string> = { terrain: "Terrain", maison: "Maison", villa: "Villa", appartement: "Appartement", studio: "Studio" };
export const AVAILABILITY: Record<Availability, { label: string; tone: string }> = {
  disponible: { label: "Disponible", tone: "bg-success/15 text-success" },
  bientot: { label: "Bientôt disponible", tone: "bg-accent/15 text-accent" },
  reserve: { label: "Réservé", tone: "bg-highlight/15 text-highlight" },
  indisponible: { label: "Indisponible", tone: "bg-ink/10 text-muted" },
};

export function formatPrice(p: Pick<Property, "price" | "transaction">) {
  const amount = `${p.price.toLocaleString("fr-FR")} FCFA`;
  return p.transaction === "vente" ? amount : `${amount} / mois`;
}

export const formatDay = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
