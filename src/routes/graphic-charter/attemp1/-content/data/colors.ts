import type { ColorProps } from '../types';

export const PALETTE_COLORS = [
  {
    text: 'Bleu Ivoire',
    color: '#A3C4BC',
  },
  {
    text: 'Turquoise',
    color: '#4B9CAD',
  },
  {
    text: 'Vert Olive',
    color: '#8A9A40',
  },
  {
    text: 'Beige Clair',
    color: '#D2C48C',
  },
] as const satisfies ColorProps[];

// Couleurs étendues avec noir et blanc
export const EXTENDED_COLORS = [
  ...PALETTE_COLORS,
  { text: 'Noir', color: '#000000' },
  { text: 'Blanc', color: '#FFFFFF' },
] as const satisfies ColorProps[];
