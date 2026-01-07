# @tanstack/pacer-lite

> Documentation récupérée depuis
> [TanStack Pacer GitHub](https://github.com/TanStack/pacer) et
> [npm](https://www.npmjs.com/package/@tanstack/pacer-lite)

## Vue d'ensemble

Une bibliothèque légère de planification et de temporisation pour le
debouncing, le throttling, la limitation de débit, la mise en file
d'attente et le batching.

**Version actuelle:** 0.2.0  
**Licence:** MIT  
**Homepage:** [tanstack.com/pacer](https://tanstack.com/pacer)  
**Repository:** [github.com/TanStack/pacer](https://github.com/TanStack/pacer)

> **Note:** TanStack Pacer est actuellement principalement une bibliothèque
> côté client, mais elle est conçue pour potentiellement être utilisée
> également côté serveur.

## Caractéristiques principales

### Debouncing

- Retarde l'exécution jusqu'après une période d'inactivité, utile lorsque
  vous ne vous souciez que de la dernière exécution dans une séquence
- Utilitaires de Debounce synchrones ou asynchrones avec support des
  promesses et gestion des erreurs
- Contrôle des options leading, trailing et enabled

### Throttling

- Limite en douceur la fréquence à laquelle une fonction peut s'exécuter
- Utilitaires de Throttle synchrones ou asynchrones avec support des
  promesses et gestion des erreurs
- Contrôle des options leading, trailing et enabled

### Rate Limiting (Limitation de débit)

- Limite la fréquence à laquelle une fonction peut s'exécuter sur une
  période de temps
- Utilitaires de Rate Limiting synchrones ou asynchrones avec support des
  promesses et gestion des erreurs
- Variantes Fixed ou Sliding Window de Rate Limiting

### Queuing (Mise en file d'attente)

- Met en file d'attente les fonctions à exécuter dans un ordre spécifique
- Choix entre les implémentations de file FIFO, LIFO et Priority
- Contrôle de la vitesse de traitement avec des temps d'attente
  configurables ou des limites de concurrence
- Gestion de l'exécution de la file d'attente avec des capacités de
  démarrage/arrêt
- Expiration des éléments de la file d'attente après une durée configurable

### Batching

- Regroupe plusieurs opérations en lots plus importants pour réduire le
  nombre total d'opérations aller-retour
- Batch par période de temps, taille de batch, le premier qui arrive, ou
  une condition personnalisée pour déclencher les exécutions de batch

### Variations asynchrones ou synchrones

- Choix entre les versions synchrones et asynchrones de chaque utilitaire
- Gestion optionnelle des erreurs, des succès et des settlements pour les
  variations async
- Support de Retry et Abort pour les variations async

### Gestion d'état

- Utilise TanStack Store sous le capot pour la gestion d'état avec
  réactivité fine
- Intégration facile avec votre propre bibliothèque de gestion d'état de
  choix
- Persistance de l'état dans le stockage local ou de session pour certains
  utilitaires comme rate limiting et queuing

### Hooks pratiques

- Réduit le code boilerplate avec des hooks pré-construits comme
  `useDebouncedCallback`, `useThrottledValue` et `useQueuedState`, et plus
  encore
- Plusieurs couches d'abstraction au choix en fonction de votre cas
  d'utilisation
- Fonctionne avec les solutions de gestion d'état par défaut de chaque
  framework, ou avec la bibliothèque de gestion d'état personnalisée que
  vous préférez

### Type Safety

- Sécurité de type complète avec TypeScript qui garantit que vos fonctions
  seront toujours appelées avec les bons arguments
- Génériques pour des utilitaires flexibles et réutilisables

### Adaptateurs de Framework

- React, Solid, Preact et plus
- [React Pacer](https://tanstack.com/pacer/latest/docs/framework/react/react-pacer)
- [Preact Pacer](https://tanstack.com/pacer/latest/docs/framework/preact/preact-pacer)
- [Solid Pacer](https://tanstack.com/pacer/latest/docs/framework/solid/solid-pacer)
- Angular Pacer - a besoin d'un contributeur!
- Svelte Pacer - a besoin d'un contributeur!
- Vue Pacer - a besoin d'un contributeur!

### Tree Shaking

- Tree-shaking correct pour vos applications par défaut
- Imports profonds supplémentaires pour chaque utilitaire, facilitant
  l'intégration de ces utilitaires dans vos bibliothèques sans augmenter
  les rapports bundle-phobia de votre bibliothèque

## Installation

```bash
npm i @tanstack/pacer-lite
```

ou avec pnpm:

```bash
pnpm add @tanstack/pacer-lite
```

## Statistiques du package

- **Taille non compressée:** 266 kB
- **Fichiers totaux:** 43
- **Téléchargements hebdomadaires:** 177,473
- **Dernière publication:** Il y a un mois (décembre 2024)
- **Utilisé par:** 583 projets
- **Dépendances:** 0
- **Dependents:** 2

## Documentation complète

Pour une documentation détaillée, des guides et des exemples, visitez:

📖 [https://tanstack.com/pacer](https://tanstack.com/pacer)

## Ressources

- **Repository GitHub:**
  [https://github.com/TanStack/pacer](https://github.com/TanStack/pacer)
- **NPM Package:**
  [https://www.npmjs.com/package/@tanstack/pacer-lite](https://www.npmjs.com/package/@tanstack/pacer-lite)
- **Discussions GitHub:**
  [https://github.com/TanStack/pacer/discussions](https://github.com/TanStack/pacer/discussions)
- **Discord:**
  [https://discord.com/invite/WrRKjPJ](https://discord.com/invite/WrRKjPJ)
- **Twitter:** [@TanStack](https://twitter.com/tan_stack)

## S'impliquer

- Les issues et pull requests sont les bienvenues!
- Participez aux
  [discussions GitHub](https://github.com/TanStack/pacer/discussions)
- Chattez avec la communauté sur
  [Discord](https://discord.com/invite/WrRKjPJ)
- Voir
  [CONTRIBUTING.md](https://github.com/TanStack/pacer/blob/main/CONTRIBUTING.md)
  pour les instructions de configuration

## Sponsors

Devenez un sponsor!
[https://github.com/sponsors/tannerlinsley/](https://github.com/sponsors/tannerlinsley/)

## Collaborateurs

- [tannerlinsley](https://www.npmjs.com/~tannerlinsley)
- [schiller-manuel](https://www.npmjs.com/~schiller-manuel)
- [lachlancollins](https://www.npmjs.com/~lachlancollins)
- [kylemathews](https://www.npmjs.com/~kylemathews)

## Mots-clés

`debounce`, `throttle`, `rate-limit`, `pacer`, `lightweight`, `minimal`
