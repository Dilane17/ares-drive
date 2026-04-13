# Spécification du Design System : Cinematic Velocity

## 1. Vue d’ensemble & Direction Créative : "The Kinetic Noir"

Ce design system est conçu pour évoquer l’univers exigeant et précis de la performance automobile de luxe. Notre direction créative principale est **"The Kinetic Noir"** — un langage visuel qui équilibre l’agressivité mécanique d’une supercar avec l’élégance silencieuse et immersive d’une galerie nocturne.

Pour éviter l’effet “template” courant dans les interfaces automobiles, nous rejetons les grilles rigides et centrées. À la place, nous utilisons une **asymétrie intentionnelle**. Les éléments doivent donner une impression de mouvement grâce à :

- des superpositions de couches
- une typographie décalée
- une gestion du vide type “shutter”

Les espaces vides sombres (#050505) sont aussi importants que le contenu lui-même.

👉 Ce n’est pas juste une interface : c’est un cockpit digital.

---

## 2. Couleurs & Architecture des Surfaces

La palette repose sur la profondeur absolue. Le rouge n’est pas décoratif : c’est un signal, une alerte visuelle de puissance.

### Hiérarchie des surfaces

Nous n’utilisons pas de lignes pour structurer, mais du **“sculptage tonal”**.

- **Couche de base :** `surface` (#131313) → fond principal
- **Éléments en retrait :** `surface-container-lowest` (#0e0e0e) → effet encastré
- **Éléments élevés :** `surface-container-high` (#2a2a2a) → modules interactifs

---

### Règle “No-Line”

❌ Les bordures classiques (1px solid) sont interdites pour structurer.

✔️ On utilise des variations de surface.

Exception :
👉 “Ignition Glow”

- bordure 1px en `primary_container` (#df2531)
- glow externe 5px
- utilisé pour les éléments actifs/importants

---

### Texture signature : “Ghost Gradient”

Pour éviter un rendu trop plat :

👉 Appliquer un dégradé radial subtil :

- `primary` (#ffb3ae) à 15% d’opacité
- vers `primary_container` (#df2531) à 100%

➡️ Effet peinture automobile / lumière

---

## 3. Typographie : Précision vs Poésie

Le système repose sur un contraste fort.

### Typo agressive (Space Grotesk)

- utilisée pour titres (display, headline)
- en MAJUSCULES
- letter-spacing : 0.1em à 0.2em

👉 représente la machine

---

### Typo élégante (Cardo / Newsreader)

- utilisée pour le corps de texte
- en italique

👉 représente l’humain / l’expérience

---

### Règle de hiérarchie

Associer :

- un titre massif (Space Grotesk)
- avec un texte secondaire fluide (italique)

👉 effet éditorial premium

---

## 4. Profondeur & Élévation : Principe Aero-Glass

On évite les ombres classiques.

### Principe de superposition

La profondeur est créée par empilement de surfaces.

---

### Ombres ambiantes

- couleur : `on-surface` à 4%
- blur : 40px

👉 effet atmosphérique, pas une ombre

---

### Glassmorphism

Pour overlays :

- fond : `surface_container`
- blur : 20px
- opacité : 60%

👉 laisse passer les effets lumineux

---

### Ghost Border

- couleur : `outline-variant` (#5c3f3d)
- opacité : 20%

👉 quasi invisible

---

## 5. Composants

### Boutons

#### Primary

- fond : `primary_container` (#df2531)
- texte : `on_primary_container`
- radius : 0px
- hover : glow rouge

---

#### Secondary

- style ghost
- bordure légère
- texte clair

---

#### Tertiary

- texte uniquement (MAJUSCULES)
- underline rouge animé

---

### Cards & Lists

#### Cards

- fond : `surface-container-low`
- ❌ pas de séparateurs
- ✔️ espacement interne large

---

#### Lists

- hover = changement de fond subtil

---

### Inputs

#### Champs

- fond : `surface-container-lowest`
- bordure basse uniquement
- focus = rouge + glow

---

#### Checkbox / Radio

- carrés (radius 0)
- rouge plein quand actif

---

### Composant signature : “Telemetry HUD”

- petites infos techniques
- style discret
- position dans les coins

👉 renforce l’aspect performance

---

## 6. Do & Don’t

### ✔️ À faire

- utiliser beaucoup d’espace vide
- superposer les éléments
- garder des angles nets

---

### ❌ À éviter

- utiliser du gris classique
- arrondir les boutons
- utiliser des ombres classiques

---

## 7. Système d’espacement

### Espacement serré

0.35rem → 1rem
👉 données techniques

---

### Espacement large

4rem → 8.5rem
👉 sections / hero

---

👉 Le vide crée la tension et le luxe
