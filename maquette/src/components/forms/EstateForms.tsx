"use client";

import { dateBounds } from "@/lib/forms";
import { ConsentField, SelectField, TextAreaField, TextField } from "./Fields";
import { FormShell } from "./FormShell";

const PRIVACY =
  "Vos données servent uniquement à organiser la visite ou à répondre à votre demande ; elles ne sont ni revendues ni utilisées pour de la publicité, et sont supprimées sur simple demande (loi ivoirienne n° 2013-450). Aucune pièce d'identité n'est demandée en ligne.";

type Option = { value: string; label: string };

export function VisitForm({ properties, defaultProperty = "" }: { properties: Option[]; defaultProperty?: string }) {
  const { min, max } = dateBounds();
  return (
    <FormShell
      kind="visite"
      title="Demander une visite"
      submitLabel="Envoyer ma demande de visite"
      successTitle="Demande de visite envoyée."
      successText="Un conseiller vous rappelle pour confirmer le jour et l'heure. La visite n'est confirmée qu'après cet appel."
    >
      <TextField form="visite" name="nom" label="Nom complet" required autoComplete="name" />
      <TextField form="visite" name="telephone" label="Téléphone" type="tel" inputMode="tel" required autoComplete="tel" hint="Ex. 07 00 00 00 00" />
      <SelectField form="visite" name="bien" label="Bien à visiter" required wide defaultValue={defaultProperty} options={[{ value: "", label: "Choisir…" }, ...properties]} />
      <TextField form="visite" name="date" label="Date souhaitée" type="date" min={min} max={max} required />
      <SelectField
        form="visite"
        name="creneau"
        label="Créneau préféré"
        required
        options={[
          { value: "", label: "Choisir…" },
          { value: "matin", label: "Matin (8 h – 12 h)" },
          { value: "apres-midi", label: "Après-midi (12 h – 16 h)" },
          { value: "fin-de-journee", label: "Fin de journée (16 h – 18 h)" },
        ]}
      />
      <TextField form="visite" name="email" label="E-mail (facultatif)" type="email" autoComplete="email" wide />
      <TextAreaField form="visite" name="message" label="Questions ou précisions (facultatif)" maxLength={1000} />
      <ConsentField form="visite">{PRIVACY}</ConsentField>
    </FormShell>
  );
}

export function ContactForm() {
  return (
    <FormShell
      kind="contact"
      title="Nous écrire"
      submitLabel="Envoyer mon message"
      successTitle="Message envoyé."
      successText="Un conseiller vous recontacte rapidement par téléphone ou par e-mail."
    >
      <TextField form="contact" name="nom" label="Nom complet" required autoComplete="name" />
      <TextField form="contact" name="telephone" label="Téléphone" type="tel" inputMode="tel" required autoComplete="tel" hint="Ex. 07 00 00 00 00" />
      <SelectField
        form="contact"
        name="sujet"
        label="Votre projet"
        required
        options={[
          { value: "", label: "Choisir…" },
          { value: "achat", label: "Acheter un bien ou un terrain" },
          { value: "location", label: "Louer un logement" },
          { value: "gestion", label: "Confier la gestion de mon bien" },
          { value: "construction", label: "Faire construire" },
          { value: "autre", label: "Autre" },
        ]}
      />
      <TextField form="contact" name="email" label="E-mail (facultatif)" type="email" autoComplete="email" />
      <TextAreaField form="contact" name="message" label="Votre message" required maxLength={1000} hint="Commune souhaitée, budget, délai…" />
      <ConsentField form="contact">{PRIVACY}</ConsentField>
    </FormShell>
  );
}
