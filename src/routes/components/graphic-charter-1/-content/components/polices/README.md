# Composant Police (Version 3.0 - Interactive Complète)

Composant interactif avancé pour explorer une police Google Fonts avec 4
matrices de contrôles en temps réel.

## 📍 Localisation

```
src/routes/web/graphic-chart/-config/components/Police.tsx
```

## 🎯 Objectif

Exploration complète et interactive d'une police Google Fonts avec 4 axes
de personnalisation :

1. **Taille** : 4 options (4XL, XL, Base, SM)
2. **Décorations** : 3 options combinables (Italique, Souligné, Barré)
3. **Épaisseur** : 5 options (Fin, Moyen, Normal, Semi-Gras, Gras)
4. **Couleur** : 6 options (4 couleurs charte + Noir + Blanc)

**Total : 4 × 6 (décorations avec exclusion mutuelle) × 5 × 6 = 720
variantes possibles par police**

## 🆕 Nouveautés Version 3.0

### ✨ Décorations modifiées

- ❌ **Supprimé** : Semi-Gras, Gras (déplacés vers Épaisseur)
- ✅ **Ajouté** : Barré (`line-through`)
- ✅ **Conservé** : Italique, Souligné

### 💪 Nouvelle matrice : Épaisseur

- **Type** : Toggle Group avec 5 options
- **Options** : Fin, Moyen, Normal, Semi-Gras, Gras
- **Par défaut** : Normal (base)
- **Classes Tailwind** : `font-thin`, `font-medium`, `font-normal`,
  `font-semibold`, `font-bold`

### 🎨 Couleurs étendues

- **Ajout** : Noir (#000000) et Blanc (#FFFFFF)
- **Total** : 6 couleurs
- **Particularité Blanc** :
  - Bordure noire pour visibilité
  - Lettre "W" à l'intérieur pour identification
- **Effet sélection** : Scale à 110% avec transition fluide

## 🔧 Props

```typescript
interface PoliceProps {
  /** Famille de police Google Fonts (ex: "Montserrat, sans-serif") */
  fontFamily: string;

  /** Couleur de la bordure gauche en hexadécimal (ex: "#4B9CAD") */
  borderColor: string;

  /** Nom de la police pour affichage (ex: "Montserrat") */
  name: string;

  /** Usage recommandé (ex: "Titres principaux") */
  usage: string;

  /** URL Google Fonts (ex: "https://fonts.google.com/specimen/Montserrat") */
  googleFontsUrl: string;

  /** Poids disponibles (ex: "Weights: 300, 400, 500, 600, 700, 800") */
  weights: string;

  /** Classes CSS supplémentaires (optionnel) */
  class?: string;
}
```

## 📊 Les 4 Matrices de Contrôle

### 1. 📏 Taille (Toggle Group)

- **Type** : Sélection exclusive
- **Options** : 4
  - SM (Small)
  - Base (Normal)
  - XL (Extra Large)
  - 4XL (4x Extra Large)
- **Par défaut** : Base
- **Classes** : `text-sm`, `text-base`, `text-xl`, `text-4xl`

### 2. ✨ Décorations (Checkboxes)

- **Type** : Sélection multiple (combinable)
- **Options** : 3
  - Italique (`italic`)
  - Souligné (`underline`)
  - Barré (`line-through`)
- **Par défaut** : Aucune
- **Combinaisons** : 2^3 = 8 variantes
- **⚠️ Contrainte** : "Souligné" et "Barré" sont **mutuellement exclusifs**
  - Si on coche "Souligné" → "Barré" se décoche automatiquement
  - Si on coche "Barré" → "Souligné" se décoche automatiquement
  - "Italique" reste indépendant et combinable avec l'un ou l'autre

#### 📊 Tableau des Combinaisons de Décorations

| Italique | Souligné | Barré | Résultat                   | Possible |
| -------- | -------- | ----- | -------------------------- | -------- |
| ❌       | ❌       | ❌    | Aucune décoration          | ✅       |
| ✅       | ❌       | ❌    | Texte italique uniquement  | ✅       |
| ❌       | ✅       | ❌    | Texte souligné uniquement  | ✅       |
| ❌       | ❌       | ✅    | Texte barré uniquement     | ✅       |
| ✅       | ✅       | ❌    | Texte italique et souligné | ✅       |
| ✅       | ❌       | ✅    | Texte italique et barré    | ✅       |
| ❌       | ✅       | ✅    | ~~Impossible~~ (exclusif)  | ❌       |
| ✅       | ✅       | ✅    | ~~Impossible~~ (exclusif)  | ❌       |

**Note** : Sur les 8 combinaisons théoriques (2³), seulement **6 sont
réellement possibles** à cause de l'exclusion mutuelle entre "Souligné" et
"Barré".

### 3. 💪 Épaisseur (Toggle Group) - NOUVEAU

- **Type** : Sélection exclusive
- **Options** : 5
  - Fin (`font-thin`)
  - Moyen (`font-medium`)
  - Normal (`font-normal`) ⭐ Par défaut
  - Semi-Gras (`font-semibold`)
  - Gras (`font-bold`)
- **Impact** : Poids de la police

### 4. 🎨 Couleur (Toggle Group avec carrés)

- **Type** : Sélection exclusive
- **Options** : 6
  - Bleu Ivoire (#2C5364)
  - Turquoise (#4B9CAD)
  - Vert Olive (#8A9A40)
  - Beige Clair (#D2C48C)
  - Noir (#000000) - NOUVEAU
  - Blanc (#FFFFFF) - NOUVEAU avec "W"
- **Taille normale** : 10×10 (w-10 h-10)
- **Taille sélectionnée** : 11×11 (w-11 h-11 scale-110)
- **Transition** : 200ms fluide

## 🎨 Spécificités Visuelles

### Carrés de Couleur

```tsx
// Carré normal
<div class='w-10 h-10' />

// Carré sélectionné (scale 110%)
<div class='w-11 h-11 scale-110' />

// Blanc avec bordure et "W"
<div class='border-gray-300'>
  <span class='text-xs font-bold text-black'>W</span>
</div>
```

### Effets de Transition

- **Couleur** : `transition-all duration-200`
- **Échelle** : Animation smooth du scale
- **Bordure** : Changement de couleur (#2C5364 quand sélectionné)

## 🗂️ Architecture Technique

```typescript
// Types
type FontSize = '4xl' | 'xl' | 'base' | 'sm';
type FontDecoration = 'italic' | 'underline' | 'line-through';
type FontThickness = 'thin' | 'medium' | 'base' | 'semibold' | 'bold';

// États réactifs
const [selectedSize, setSelectedSize] = createSignal<FontSize>('base');
const [selectedDecorations, setSelectedDecorations] = createSignal<
  FontDecoration[]
>([]);
const [selectedThickness, setSelectedThickness] =
  createSignal<FontThickness>('base');
const [selectedColor, setSelectedColor] = createSignal<string>(
  PALETTE_COLORS[0].color,
);

// Couleurs étendues
const EXTENDED_COLORS = [
  ...PALETTE_COLORS,
  { text: 'Noir', color: '#000000' },
  { text: 'Blanc', color: '#FFFFFF' },
];
```

## 📖 Utilisation

```tsx
import { Police } from './-config/components/Police';

<Police
  name='Montserrat'
  fontFamily='Montserrat, sans-serif'
  borderColor='#4B9CAD'
  usage='Titres principaux'
  googleFontsUrl='https://fonts.google.com/specimen/Montserrat'
  weights='Weights: 300, 400, 500, 600, 700, 800'
/>;
```

## 🎭 Workflow Utilisateur

1. **Développer l'accordéon** : "Aperçu de [Police]"
2. **Choisir une taille** : Cliquer sur SM/Base/XL/4XL
3. **Cocher des décorations** : Italique, Souligné, Barré (combinables)
4. **Sélectionner l'épaisseur** : Fin à Gras
5. **Choisir une couleur** : Cliquer sur un carré (avec effet scale)
6. **Observer l'aperçu** : Mise à jour instantanée
7. **Lire le résumé** : Tous les paramètres affichés

## 🎨 Exemples de Combinaisons

### Titre Principal

- Taille : 4XL
- Épaisseur : Gras
- Décorations : Aucune
- Couleur : Bleu Ivoire

### Citation Importante

- Taille : XL
- Épaisseur : Moyen
- Décorations : Italique
- Couleur : Vert Olive

### Texte Barré (Promo)

- Taille : Base
- Épaisseur : Normal
- Décorations : Barré
- Couleur : Rouge (ou autre)

### Titre Blanc sur Fond Sombre

- Taille : 4XL
- Épaisseur : Gras
- Décorations : Aucune
- Couleur : Blanc (avec "W" visible)

## 🎭 Dépendances

- **SolidJS** : `createSignal`, `For`
- **Kobalte UI** :
  - `Checkbox` (décorations)
  - `ToggleGroup` (taille, épaisseur, couleur)
- **AccordionQA** : Organisation du contenu
- **Tailwind CSS** : Classes utilitaires + transitions
- **cn()** : Fusion de classes

## ♿ Accessibilité

- ✅ Labels ARIA sur tous les contrôles
- ✅ Navigation au clavier (Tab, Entrée, Espace)
- ✅ Tooltips sur les carrés de couleur
- ✅ Indicateur visuel de sélection (bordure + scale)
- ✅ Contraste respecté (même pour Blanc)
- ✅ Screen reader friendly

## 📊 Calcul des Variantes

```
Total = Tailles × Décorations × Épaisseurs × Couleurs
      = 4 × 6 × 5 × 6
      = 720 variantes possibles

Note : Les décorations passent de 8 (2³) à 6 combinaisons réelles
à cause de l'exclusion mutuelle entre "Souligné" et "Barré".
```

## 🔄 Évolution depuis v2.0

| Aspect                      | v2.0                                  | v3.0                                  |
| --------------------------- | ------------------------------------- | ------------------------------------- |
| **Décorations**             | 4 (italic, underline, semibold, bold) | 3 (italic, underline, line-through)   |
| **Exclusivité déco**        | Aucune                                | Souligné/Barré mutuellement exclusifs |
| **Combinaisons déco**       | 16 (2⁴)                               | 6 (avec contrainte d'exclusion)       |
| **Épaisseur**               | Inclus dans décorations               | Matrice séparée (5 options)           |
| **Couleurs**                | 4 (charte)                            | 6 (charte + noir + blanc)             |
| **Effet sélection couleur** | Bordure simple                        | Scale 110% + transition               |
| **Blanc**                   | Absent                                | Avec bordure + "W"                    |
| **Total variantes**         | 256                                   | 720                                   |
| **Contrôles**               | 3 matrices                            | 4 matrices                            |

## 🚀 Avantages

- ✅ **Séparation claire** : Décorations vs Épaisseur
- ✅ **Plus d'options** : 720 variantes au lieu de 256 (v2.0)
- ✅ **UX intuitive** : Souligné/Barré mutuellement exclusifs (pas de
  conflit visuel)
- ✅ **Meilleure UX** : Effet scale sur couleur sélectionnée
- ✅ **Accessibilité Blanc** : Bordure + "W" pour identification
- ✅ **Flexibilité** : Barré ajouté pour promotions/corrections
- ✅ **Performance** : Transitions CSS optimisées
- ✅ **Logique métier** : Empêche les combinaisons visuellement ambiguës

## 🧪 Tests Recommandés

### Test de Base

1. Ouvrir `/web/graphic-chart`
2. Développer "Aperçu de Montserrat"
3. Tester chaque matrice indépendamment
4. Vérifier l'aperçu en temps réel

### Test de Combinaisons

1. Taille 4XL + Gras + Italique + Turquoise
2. Base + Fin + Barré + Noir
3. XL + Semi-Gras + Souligné + Blanc (vérifier "W")

### Test d'Accessibilité

1. Navigation au clavier uniquement
2. Vérifier focus visible sur tous les contrôles
3. Tester avec screen reader
4. Vérifier tooltips sur survol

### Test Visuel

1. Sélectionner Blanc → Vérifier bordure + "W"
2. Changer de couleur → Vérifier animation scale
3. Tester toutes les décorations combinées
4. Vérifier les 5 épaisseurs

## 💡 Cas d'Usage Réels

### Marketing

- **Promo barrée** : Base + Normal + Barré + Rouge
- **CTA** : XL + Gras + Noir

### Design

- **Titre élégant** : 4XL + Fin + Italique + Bleu Ivoire
- **Contraste** : 4XL + Gras + Blanc (sur fond sombre)

### Accessibilité

- **Lisibilité** : Base + Moyen + Noir (contraste maximum)
- **Emphase douce** : Base + Semi-Gras + Vert Olive

## 📝 Notes Techniques

- Le blanc a une bordure `border-gray-300` pour visibilité sur fond clair
- L'effet scale utilise `transform: scale(1.1)` avec
  `transition-all duration-200`
- **Contrainte logique** : "Souligné" et "Barré" sont mutuellement
  exclusifs pour éviter la confusion visuelle
- Les décorations "Italique" + ("Souligné" OU "Barré") sont combinables
- L'épaisseur et les décorations sont indépendantes
- Le composant utilise `cn()` pour gérer les classes conditionnelles

---

**Version** : 3.1 (Interactive Complète avec Exclusion Mutuelle)  
**Mis à jour le** : 17 octobre 2025  
**Auteur** : @chlbri (avec GitHub Copilot)  
**Projet** : Ivoire Cours - Charte Graphique  
**Changelog** :

- v3.1 : Ajout exclusion mutuelle Souligné/Barré (720 variantes au lieu
  de 960)
- v3.0 : Ajout matrice Épaisseur, couleurs Noir/Blanc, effet scale
- v2.0 : Contrôles interactifs
- v1.0 : Accordéon statique
