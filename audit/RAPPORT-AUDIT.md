# Audit du site officiel — DELAFOSSE GROUP SARL

| | |
|---|---|
| **Site examiné** | https://delafossegroup.com/ (pages publiques) |
| **Date** | 19/10/2026, 17:21 – 18:20 UTC |
| **Méthode** | HTML des pages publiques, rendu Chromium avec JavaScript, Lighthouse 12 (mobile simulé), mesures Playwright sur 390 px |
| **Hors périmètre (volontairement)** | Espace client (`/login`), panier et paiement : non utilisés ; aucune tentative d'accès administrateur |
| **Réalisé par** | RealSpill — audit indépendant, sans contact avec l'entreprise |

**Légende.** 🔴 problème confirmé · 🟡 à vérifier · 🔵 amélioration recommandée.

## Synthèse

| | Site institutionnel | Branche immobilière |
|---|---|---|
| **État** | En ligne, structure claire (5 à 6 secteurs), boutique active (produits affichés) | Page de présentation en ligne, **catalogue vide** |
| **Constat majeur** | Coordonnées incomplètes (téléphone « +225 21 xx xx xx »), page Contact inexistante | **0 bien affiché** alors que la branche annonce gérer « environ 18 biens » |
| **Mobile** | Page de 14,5 Mo, LCP 28 s (mobile simulé), léger débordement horizontal | Pas de fiche bien, pas de demande de visite |
| **Opportunité** | Corrections ciblées (contacts, poids, SEO) | **Maquette ciblée justifiée** : catalogue, filtres, fiches, demande de visite |

## A. Site institutionnel

### 1. Structure générale et navigation

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| S1 | 🔴 | Pages inexistantes renvoyées avec un code **200** au lieu de 404 : `/contact`, `/a-propos`, `/sitemap.xml` affichent une page « 404 » mais avec le statut HTTP 200 | `curl` : code 200, 19 849 octets identiques, `h1 = 404` | Vrai code 404 ; page Contact réelle |
| S2 | 🔴 | Toute adresse de secteur inconnue affiche la page **BestCash** (statut 200) | `/secteur-activite/test-inexistant-audit` → 200, h1 « BESTCASH - CARTES VISA PRÉPAYÉES » ; même résultat pour `/secteur-activite/monetique` (minuscule) | 404 pour les secteurs inconnus ; adresses en minuscules et insensibles à la casse |
| S3 | 🔴 | Même titre de page (« Delafosse Group SARL ») sur toutes les pages testées | Accueil, secteurs, biens immobiliers, panier | Titre unique par page |
| S4 | 🔵 | Les liens des secteurs depuis l'accueil fonctionnent (Monétique, Électroménager, Immobilier, Store, Mini Market, BBL, BestCash) | Codes 200 et titres cohérents | — |
| S5 | 🔴 | Fautes visibles dans l'interface : « Acceuil », « Addresse », « Interval de prix », « Articles qui pourraient vous interessez » ; accents manquants (« Monetique », « Electromenager ») | Texte des pages | Relecture |

### 2. Présentation des secteurs

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| P1 | 🔴 | Listes de secteurs différentes entre l'accueil (Monétique, Immobilier, Store, Électroménager, BBL Energy Drink) et le pied de page (Boutique, BestCash CI, BBL, Immobilier, Store, **Mini Market de Gros**) | Texte de l'accueil vs pied de page | Une seule liste, cohérente partout |
| P2 | 🔵 | Texte d'introduction générique, sans chiffre ni preuve (« un éventail diversifié de services… ») | Section « Nos secteurs d'activités » | Une phrase de valeur et un appel à l'action par secteur |
| P3 | 🟡 | Indicateurs « + 5 » et « 95 % de clients satisfaits » sans source | Accueil | Préciser la source ou retirer |

### 3. Facilité de demande d'information

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| F1 | 🔴 | **Numéro de téléphone factice** dans le pied de page de toutes les pages : « +225 21 xx xx xx » | Pied de page | Numéro réel cliquable (`tel:`) |
| F2 | 🔴 | Aucun lien `tel:`, aucun lien WhatsApp de contact, aucun formulaire de contact sur le site | Analyse des liens et formulaires (accueil, immobilier) | Formulaire de contact + WhatsApp Business |
| F3 | 🔵 | Seule adresse e-mail : un compte Gmail | Pied de page | Adresse au nom de domaine (`contact@delafossegroup.com`) |
| F4 | 🔵 | Les liens WhatsApp présents servent au **partage** de produits (`whatsapp://send?url=…`), pas au contact | Accueil | Distinguer « Partager » et « Nous écrire » |

### 4. Expérience mobile

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| M1 | 🔴 | Débordement horizontal de 15 px sur l'accueil (en-tête) | Playwright 390 px : `scrollWidth 405`, élément `UL.header-right` | Corriger l'en-tête |
| M2 | 🔴 | 22 liens sans nom accessible (icônes seules) | Lighthouse `link-name` : 22 éléments | `aria-label` sur les liens-icônes |
| M3 | 🔴 | 32 cibles tactiles de moins de 24 px | Playwright | Cibles d'au moins 44 px |

### 5. Performances et référencement

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| R1 | 🔴 | Accueil de **14,5 Mo** ; LCP **28,2 s** et Speed Index 12,3 s en mobile simulé ; performance 51/100 | `evidence/lighthouse-mobile.json` | Objectif < 2 Mo et LCP < 2,5 s |
| R2 | 🔴 | Images d'illustration des secteurs de 1,7 à 1,9 Mo chacune, vidéo `.mov` de 1,9 Mo chargée d'emblée | Lighthouse (6 plus gros fichiers) | WebP/AVIF redimensionnés, vidéo MP4 différée avec image d'aperçu |
| R3 | 🔴 | Mots-clés hérités d'un modèle e-commerce de mode (« pixio », « fashion store », « minimal shop »…) | Balise `meta keywords` | Supprimer (ignorée par Google, mais trahit le modèle) |
| R4 | 🔴 | Pas de sitemap XML réel (`/sitemap.xml` = page 404 en HTML), pas d'URL canonique, pas de données structurées | `curl`, analyse HTML | Sitemap, canoniques, JSON-LD `Organization` / `RealEstateAgent` |
| R5 | 🔴 | 3 images sans attribut `alt`, 5 contrastes insuffisants, 2 attributs ARIA invalides | Lighthouse | Corrections ciblées |
| R6 | 🔵 | Lien de partage Twitter hérité du modèle (`related=costo`) | Liens de partage | Retirer ou personnaliser |

### 6. Cohérence des informations publiques

| Sujet | Site | Sources publiques | Cohérence |
|---|---|---|---|
| Adresse | Cocody Riviera Faya, en face de la gare des taxis | Riviera Faya (annuaire business.abidjan.net) | ✅ |
| Activités | Monétique, immobilier, store, électroménager, BBL, mini market | Immobilier, monétique, sonorisation, vêtements, événementiel, transfert d'argent (annuaire) | ⚠️ périmètres différents |
| Téléphone | « +225 21 xx xx xx » | — | ❌ placeholder |
| Réseaux sociaux | 5 pages Facebook distinctes (groupe, monétique, immobilier, store, BBL) | — | 🔵 à présenter clairement |

Source : [business.abidjan.net — Delafosse Group](https://business.abidjan.net/pages-jaunes/details-1-services-aux-entreprises-341-immobilier/22320-delafosse-group)

## B. Branche immobilière (évaluée séparément)

### 7. Parcours immobilier

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| I1 | 🔴 | **Catalogue vide** : `/bien-immobilier` affiche « (0 résultats) » | Contrôlé en HTML brut, **après exécution du JavaScript** et avec les filtres « à louer » et « à vendre » : toujours 0 | Publier les biens disponibles |
| I2 | 🟡 | Incohérence : la page du secteur indique « Gestion locative, incluant environ 18 biens » et « Depuis plus de 4 ans… » | `/secteur-activite/immobilier` | Vérifier si les biens existent mais ne sont pas publiés |
| I3 | 🔵 | Filtres existants mais minimaux : prix (min/max) et type de transaction (location, vente, location-vente) | Formulaires de la page | Ajouter type de bien, commune/quartier, surface, pièces, disponibilité |
| I4 | 🔴 | Pas de demande de visite ni de formulaire d'information sur la branche | 0 formulaire sur `/secteur-activite/immobilier` | Demande de visite par bien, avec créneau préféré |
| I5 | 🔵 | Horaires publiés sur la page immobilière (lun.–ven. 8h–18h, sam. 8h–16h) mais absents ailleurs | Page secteur | Les reprendre sur la page Contact et en données structurées |

### 8. Présentation des biens et des produits

| # | Statut | Observation | Preuve | Recommandation |
|---|---|---|---|---|
| B1 | 🔴 | Aucune fiche de bien consultable (aucun lien vers un bien) | Liens de la page catalogue | Fiche : galerie, prix, surface, pièces, disponibilité, localisation, visite |
| B2 | 🔵 | Boutique fonctionnelle avec produits (132 liens produits sur la page boutique) | `/boutique` | Hors périmètre de la maquette ciblée |

### 9. Fonctionnement des liens et formulaires

| # | Statut | Observation | Preuve |
|---|---|---|---|
| L1 | 🔵 | Liens des secteurs, de la boutique et du panier : réponses 200 | `curl` |
| L2 | 🔴 | Pages Contact / À propos : statut 200 mais contenu « 404 » (voir S1) | `curl` |
| L3 | 🔵 | Filtres du catalogue immobilier : fonctionnels mais sans résultat (catalogue vide) | Paramètre `?filtre=` testé |

## Recommandations priorisées

1. **Immobilier (opportunité principale)** : publier les biens dans un catalogue filtrable avec fiches et
   demandes de visite. Voir la **maquette ciblée** dans [`../maquette/`](../maquette/). Une refonte complète
   du site du groupe n'est pas nécessaire à ce stade.
2. **Contact** (rapide, fort impact) : vrai numéro, page Contact, formulaire, WhatsApp.
3. **Performances** : compression et redimensionnement des images, vidéo différée.
4. **Technique et SEO** : vrais 404, titres uniques, sitemap, nettoyage des mots-clés du modèle.
5. **Contenu** : liste de secteurs unique, relecture orthographique.
