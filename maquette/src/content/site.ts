import type { SiteConfig } from "./types";

const OFFICIAL = "Site officiel delafossegroup.com, page « immobilier », consultée le 19/10/2026";

export const site: SiteConfig = {
  name: "Delafosse Group Immobilier",
  shortName: "DG",
  schemaType: "RealEstateAgent",
  tagline: "Vente, location et gestion de biens à Abidjan",
  description:
    "Maquette ciblée pour la branche immobilière de Delafosse Group : catalogue de biens filtrable, fiches détaillées, disponibilité et demande de visite.",
  locality: "Abidjan",
  district: "Cocody Riviera Faya",
  keywords: ["immobilier Abidjan", "terrain à vendre Abidjan", "studio à louer Cocody", "location Riviera Faya", "Delafosse Group Immobilier"],
  nav: [
    { href: "/", label: "Accueil" },
    { href: "/biens", label: "Biens disponibles" },
    { href: "/biens?transaction=location", label: "Louer" },
    { href: "/biens?transaction=vente", label: "Acheter" },
    { href: "/contact", label: "Contact" },
  ],
  primaryCta: { href: "/biens", label: "Voir les biens" },
  contact: {
    address: { value: "Abidjan, Cocody Riviera Faya, en face de la gare des taxis", status: "public", source: OFFICIAL },
    // The official site shows a placeholder ("+225 21 xx xx xx"): no number until the company provides one.
    phone: { value: "Numéro à confirmer", status: "demo" },
    email: { value: "delafossegroupsarl@gmail.com", status: "public", source: OFFICIAL },
    whatsapp: null,
    whatsappMessage: "Bonjour, je souhaite des informations sur un bien immobilier.",
    mapsQuery: "Riviera Faya gare des taxis Cocody Abidjan",
    hours: {
      status: "public",
      source: OFFICIAL,
      rows: [
        { days: "Lundi – vendredi", hours: "8 h – 18 h" },
        { days: "Samedi", hours: "8 h – 16 h" },
      ],
    },
  },
  social: [],
};

export const copy = {
  heroEyebrow: "Delafosse Group · Immobilier",
  heroTitle: "Trouvez le bien qui vous convient, visitez-le en deux clics.",
  heroText:
    "Terrains, maisons et studios à Abidjan : filtrez par commune, budget et disponibilité, consultez chaque fiche en détail et demandez une visite.",
  services: [
    { title: "Vente de terrains et de maisons", text: "Des biens présentés avec surface, localisation et documents à fournir." },
    { title: "Construction", text: "Accompagnement de projets de construction (offre à détailler)." },
    { title: "Gestion locative", text: "Gestion de biens pour le compte de propriétaires." },
    { title: "Location de studios", text: "Studios et appartements, disponibilité mise à jour." },
  ],
  servicesSource: OFFICIAL,
};
