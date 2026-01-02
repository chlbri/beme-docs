# Guide Tailwind CSS v4 (pnpm + Vite + SolidJS)

Ce document explique comment installer et configurer Tailwind CSS v4 dans ce
projet (pnpm + Vite + SolidJS). Les instructions utilisent la nouvelle
approche CSS-first de Tailwind v4.

## 1) Installer les dépendances

Ouvre un terminal à la racine du projet et lance :

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

Notes :

- `@tailwindcss/vite` est recommandé pour une intégration transparente avec
  Vite.
- Tailwind v4 n'a plus besoin de PostCSS ou Autoprefixer séparés, tout est
  intégré.

## 2) Configuration CSS-first (plus de fichier .config.ts)

Tailwind v4 utilise une approche **CSS-first** : la configuration se fait
directement dans votre fichier CSS avec la directive `@theme`.

Créez ou modifiez votre fichier CSS principal (par exemple `tailwind.css`) :

```css
@import 'tailwindcss';

@theme {
  /* Configuration personnalisée du thème */
  --color-primary: oklch(0.5 0.2 250);
  --breakpoint-3xl: 120rem;
  --font-display: 'Inter', sans-serif;

  /* Animations personnalisées */
  --animate-fade-in: fade-in 0.3s ease-out;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

/* Variantes personnalisées */
@custom-variant dark (&:is(.dark *));

/* Utilitaires personnalisés */
@utility no-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
}
```

Remarques importantes :

- **Plus besoin de `tailwind.config.js` ou `.ts`** : tout se configure en CSS
- Les couleurs utilisent le format `oklch` pour un meilleur rendu
- Les keyframes s'ajoutent directement dans `@theme`
- Le `content` (chemins de fichiers) est automatiquement détecté par Vite

## 3) Configurer Vite

Ajoutez le plugin Tailwind dans `vite.config.ts` :

```ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
});
```

## 4) Importer le CSS dans votre application

Importez le fichier CSS dans votre point d'entrée (par ex. `src/index.tsx`) :

```ts
import './tailwind.css';
```

## 5) Scripts utiles

Ajoutez/contrôlez ces scripts dans `package.json` :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Lancez le serveur de dev :

```bash
pnpm run dev
```

## 6) Vérification rapide

- Dans une page ou un composant `.tsx`, ajoutez :

```tsx
<h1 class="text-3xl font-bold underline">Hello Tailwind v4</h1>
```

- Démarrez le dev server et vérifiez que le style est appliqué.

## 7) Personnalisation avancée

### Variables CSS personnalisées

```css
@theme {
  /* Couleurs (format oklch recommandé) */
  --color-brand: oklch(0.5 0.2 250);
  --color-accent: oklch(0.7 0.15 120);

  /* Espacements */
  --spacing-huge: 10rem;

  /* Breakpoints */
  --breakpoint-4xl: 120rem;

  /* Fonts */
  --font-display: 'Inter', sans-serif;
}
```

### Utilitaires personnalisés

```css
@utility glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Variantes personnalisées

```css
@custom-variant theme-dark (&:where([data-theme='dark'] *));
```

## 8) Debug / FAQ rapide

- **Classes non générées** : Tailwind v4 détecte automatiquement les fichiers
  via le plugin Vite, pas besoin de configurer `content`
- **Cache / build stale** : relancez le serveur `pnpm run dev`
- **Erreurs de syntaxe** : vérifiez que vous utilisez bien la syntaxe v4
  (`@theme`, `@utility`, etc.)
- **Animations ne fonctionnent pas** : assurez-vous que les `@keyframes` sont
  bien dans le bloc `@theme`

## 9) Migration depuis Tailwind v3

Si vous migrez depuis v3 :

1. **Supprimez** `tailwind.config.js` ou `.ts`
2. **Convertissez** votre configuration en CSS avec `@theme`
3. **Remplacez** `@tailwind base/components/utilities` par
   `@import 'tailwindcss'`
4. **Mettez à jour** les couleurs au format `oklch` (recommandé)
5. **Déplacez** les animations dans `@theme` avec `@keyframes`

## 10) Conseils pour ce dépôt

- Ce projet utilise `pnpm` et `vite` — la configuration ci‑dessus est
  compatible et testée localement.
- Toutes les animations personnalisées (accordion, collapsible, caret-blink)
  sont définies dans `tailwind.css`
- Le thème dark utilise une variante personnalisée avec Kobalte UI
- Si vous avez des workflows CI qui installent en mode offline, utilisez
  `pnpm install --offline`

## Ressources

- [Documentation officielle Tailwind CSS v4](https://tailwindcss.com/docs)
- [Guide de migration v3 → v4](https://tailwindcss.com/docs/upgrade-guide)
- [Theme variables reference](https://tailwindcss.com/docs/theme)

---
