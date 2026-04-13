# Documentation de l'Architecture (ares-drive)

Ce document détaille chaque module de l'architecture implémentée pour le projet, en mettant en avant les responsabilités et la structure.

## 1. Ressources Statiques (`public/`)

Ce dossier héberge tous les fichierservis publiquement sans traitement.

- **`fonts/`** : Contient les polices locales spécifiques au design system (Space Grotesk, Cardo, Cardo-Italic, Cardo-Bold).
- **`images/`** : Centralise toutes les photographies.
  - _Note sur la collection `cars`_ : Chaque véhicule (comme la Lamborghini Aventador SVJ) dispose d'un sous-dossier, permettant d'accueillir plusieurs visuels tels que `hero.jpg`, `secondary-1.jpg`, `secondary-2.jpg`, et `texture.jpg` afin d'alimenter les galeries avancées.
  - La section `about/` dispose de ses propres images comme `founder.jpg`.
- **`icons/`** : Fichiers vectoriels légers utilisés pour les SVG comme l'icône WhatsApp.
- **`favicon.ico`** : L'icône de l'onglet du navigateur de l'application.

## 2. Code Source (`src/`)

Il encapsule toute la logique, le style et les composants de l'application Next.js.

### 2.1 Routage & Pages (`src/app/`)

Dédié au routeur d'application (App Router).

- **Fichiers racines** : `layout.tsx` (modèle de page, charge Navbar, Footer et imports de polices globales), `page.tsx` (Homepage) et `globals.css` (variables CSS et directives Tailwind, incluant les tokens et resets scrollbar).
- **Routage Page** :
  - `catalogue/`, `reservation/`, `a-propos/`, `contact/` : Routes correspondantes aux grandes entités du site vitrine/business.
  - `voitures/[slug]/` : Route dynamique affichant les détails d'un véhicule spécifique basé sur son slug.

### 2.2 Composants UI (`src/components/`)

La logique de présentation. Scindée par "Feature" et "Scope" :

- **`layout/`** : Composants répétitifs globaux encadrant tout le site (Navbar à effet glassmorphism, Footer copyright).
- **`ui/`** : Composants partagés (Atoms) essentiels à l'identité "Cinematic Velocity" (Button sharp 0px, Badge, SectionLabel Space Grotesk, TelemetryHUD pour les data-points techniques et le GhostBorder rouge).
- **`home/, catalogue/, vehicle/, reservation/, about/, contact/`** : Dossiers de regroupement qui limitent chaque composant à un seul contexte ou parcours précis (ex: FleetPreview en Homepage asymétrique, Réservation Step-by-Step, VehicleManifesto).

### 2.3 Librairie, Utilitaires et Configuration (`src/lib/`)

Ensemble de code réutilisable non lié à la présentation ni au DOM visuel.

- **`data/`** : Les mocks statiques (comme `vehicles.ts` incluant spécifications techniques et images).
- **`utils/`** : Outils de code. Ex: `cn.ts` (Tw merge) et `whatsapp.ts` pour générer le lien WhatsApp avec message pré-rempli.
- **`constants/`** : Exports de variables pérennes, notamment la liste des liens de navigation (`navigation.ts`) et les configurations du site centralisées telles que nom, adresse et téléphone fictifs (`site.ts`).

### 2.4 TypeScript Types (`src/types/`)

Déclarations globales des interfaces et types utilisés dans tout le projet (ex. `vehicle.ts` décrivant les propriétés communes d'une Supercar et les énumérations associées). Ainsi, les composants peuvent adopter une sécurité de type uniforme.

## 3. Configuration Racine

- **`tailwind.config.ts`, `postcss.config.js`** : Permettent d'orchestrer le moteur utilitaire Tailwind et les plugins Postcss pour la transformation CSS. Contiennent les tokens de conception du System Design "Cinematic Velocity".
- **`next.config.ts`, `tsconfig.json`** : Paramétrages du compilateur Next.js et de TypeScript (imports absolus, chemins, polices externes).
- **`.env.local`** : Fichier contenant les variables d'environnement propres à l'instance de développement, comme `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- **`package.json`** : Manifeste du projet.
