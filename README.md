# Ares Drive

Site de location de voitures de luxe — Next.js 16, Supabase, Cloudinary, Resend.

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript strict |
| Style | Tailwind CSS v4 |
| BDD | Supabase (PostgreSQL) |
| Auth admin | Supabase Auth (email/password) |
| Images | Cloudinary (upload widget) |
| Email | Resend + React Email |
| Déploiement | Vercel |

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ares-drive-vehicles

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=admin@example.com

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

En production sur Vercel, remplacer `NEXT_PUBLIC_SITE_URL` par l'URL réelle du domaine.

---

## Commandes

```bash
npm run dev      # Serveur de développement (http://localhost:3000)
npm run build    # Build de production
npm run lint     # ESLint
```

---

## Architecture des dossiers

```
src/
├── app/
│   ├── page.tsx                   Homepage
│   ├── catalogue/                 Liste des véhicules avec filtres
│   ├── voitures/[slug]/           Fiche véhicule + BookingCard
│   ├── reservation/               Wizard de réservation 3 étapes
│   ├── admin/
│   │   ├── login/                 Page de connexion admin
│   │   └── (protected)/
│   │       ├── page.tsx           Dashboard (stats)
│   │       ├── vehicules/         CRUD véhicules + upload images
│   │       └── reservations/      Liste des demandes
│   └── api/
│       └── reservations/          POST — sauvegarde Supabase + email admin
├── components/
│   ├── admin/                     Composants back-office
│   ├── home/                      Sections homepage (FleetPreview, BookingSection…)
│   ├── vehicle/                   Fiche véhicule (BookingCard, Gallery, Specs…)
│   ├── reservation/               Formulaire 3 étapes (VehicleSelector, DatePicker…)
│   ├── catalogue/                 Grille + FilterBar
│   ├── layout/                    Nav, Footer, Section, Container
│   └── ui/                        Atoms réutilisables (Button, Input, Badge, Card…)
├── emails/
│   └── ReservationNotification.tsx   Template email admin (React Email)
├── lib/
│   ├── actions/                   Server Actions (CRUD véhicules, images, réservations)
│   ├── cloudinary/                Helper getCloudinaryUrl()
│   ├── email/                     sendReservationNotification()
│   ├── queries/                   Requêtes Supabase en lecture
│   ├── supabase/                  Clients server / client / admin
│   └── utils/                     cn(), buildWhatsAppUrl(), formatters
└── types/
    ├── vehicle.ts                 Vehicle, VehicleCard, VehicleImage
    └── reservation.ts             Reservation, ReservationFormData
```

---

## Flux de réservation

```
Client remplit le formulaire (BookingCard ou ReservationForm)
        │
        ▼
handleSubmit() côté client
        │
        ├─── fetch('/api/reservations')  ──►  POST /api/reservations
        │         (fire & forget)                      │
        │                                    INSERT reservations (Supabase)
        │                                              │
        └─── window.open(WhatsApp URL)       after(() => sendReservationNotification())
                    ▲                                  │
             Ouvre immédiatement              Email admin via Resend
             sans attendre l'API             (après que la réponse 201 est renvoyée)
```

**Règles** :
- Le `fetch` n'est jamais `await`-é côté client — WhatsApp s'ouvre toujours, même si l'API échoue.
- Côté serveur, `after()` (Next.js) garantit que l'email part après la réponse HTTP.
- Une erreur Resend est loguée mais ne bloque ni la réponse API ni le flux WhatsApp.

---

## Back-office admin

URL : `/admin`

**Connexion** : email + mot de passe via Supabase Auth.
Créer le compte depuis le dashboard Supabase → Authentication → Users.

**Fonctionnalités** :
- Dashboard avec statistiques (véhicules, réservations, taux de disponibilité)
- CRUD véhicules : créer, éditer, uploader des photos via Cloudinary, supprimer
- Liste des réservations avec changement de statut (pending / confirmed / cancelled)

**Sécurité** : le middleware (`src/proxy.ts`) protège toutes les routes `/admin/*` sauf `/admin/login`. Toute requête non authentifiée est redirigée vers la page de connexion.

---

## Ajouter un véhicule

1. Aller sur `/admin/vehicules/nouveau`
2. Remplir marque, modèle, catégorie, prix, caractéristiques
3. Enregistrer → redirige automatiquement vers la fiche du véhicule
4. Uploader les photos via le widget Cloudinary intégré
5. Cocher **Disponible à la location** pour qu'il apparaisse dans les formulaires clients
6. Cocher **Mis en avant** pour l'afficher dans la section homepage

---

## Schéma Supabase

### `vehicles`
| Colonne | Type | Notes |
|---------|------|-------|
| id | uuid | Clé primaire |
| slug | text | Unique, utilisé dans les URLs |
| name | text | Modèle |
| brand | text | Marque |
| category | enum | `supercar` `suv` `cabriolet` `berline` |
| tagline | text | Accroche courte |
| description | text | Description longue |
| price_per_day | int | Prix en euros |
| power_hp | int | Puissance (ch) |
| acceleration | text | Ex : "2.9s 0-100" |
| top_speed | int | Vitesse max (km/h) |
| transmission | text | Ex : "Automatique" |
| seats | int | Nombre de places |
| is_available | bool | Visible dans les formulaires clients |
| is_featured | bool | Affiché en homepage |

### `vehicle_images`
| Colonne | Type | Notes |
|---------|------|-------|
| id | uuid | Clé primaire |
| vehicle_id | uuid | FK → vehicles |
| cloudinary_id | text | Public ID Cloudinary |
| url | text | URL sécurisée |
| alt | text | Texte alternatif |
| position | int | Ordre d'affichage |
| is_hero | bool | Image principale de la fiche |

### `reservations`
| Colonne | Type | Notes |
|---------|------|-------|
| id | uuid | Clé primaire |
| vehicle_id | uuid | FK → vehicles |
| client_name | text | Nom complet |
| client_phone | text | Téléphone (requis) |
| client_email | text | Email (optionnel) |
| start_date | date | Date de début |
| end_date | date | Date de fin |
| message | text | Message libre (optionnel) |
| status | enum | `pending` `confirmed` `cancelled` |
| created_at | timestamptz | Auto |

---

## Configurer Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Ajouter et vérifier votre domaine d'envoi (DNS)
3. Dans `src/lib/email/sendReservationNotification.ts`, remplacer :
   ```
   from: 'ARES DRIVE <onboarding@resend.dev>'
   ```
   par :
   ```
   from: 'ARES DRIVE <noreply@votre-domaine.com>'
   ```
4. Renseigner `RESEND_API_KEY` et `ADMIN_EMAIL` dans les variables d'environnement

> En développement, `onboarding@resend.dev` fonctionne sans domaine vérifié — les emails arrivent uniquement à l'adresse associée au compte Resend.

---

## Déploiement Vercel

```bash
# Lier au projet Vercel
vercel link

# Ajouter les variables d'environnement
vercel env add RESEND_API_KEY
vercel env add ADMIN_EMAIL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_SITE_URL

# Le déploiement est automatique à chaque push sur main
git push origin main
```
