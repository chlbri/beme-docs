import type { PoliceProps } from '../types';
import { EXTENDED_COLORS as colors } from './colors';

export const POLICES_DATA = [
  {
    name: 'Montserrat',
    fontFamily: 'Montserrat, sans-serif',
    borderColor: '#4B9CAD',
    usage: 'Titres principaux',
    googleFontsUrl: 'https://fonts.google.com/specimen/Montserrat',
    weights: 'Weights: 300, 400, 500, 600, 700, 800',
    colors,
  },
  {
    name: 'Open Sans',
    fontFamily: 'Open Sans, sans-serif',
    borderColor: '#F4A460',
    usage: 'Corps de texte principal',
    googleFontsUrl: 'https://fonts.google.com/specimen/Open+Sans',
    weights: 'Weights: 300, 400, 500, 600, 700, 800',
    colors,
  },
  {
    name: 'Poppins',
    fontFamily: 'Poppins, sans-serif',
    borderColor: '#A0522D',
    usage: 'Sous-titres et accents',
    googleFontsUrl: 'https://fonts.google.com/specimen/Poppins',
    weights: 'Weights: 300, 400, 500, 600, 700, 800',
    colors,
  },
  {
    name: 'Roboto',
    fontFamily: 'Roboto, sans-serif',
    borderColor: '#2C5364',
    usage: 'Textes informatifs et UI',
    googleFontsUrl: 'https://fonts.google.com/specimen/Roboto',
    weights: 'Weights: 300, 400, 500, 700, 900',
    colors,
  },
  {
    name: 'Lora',
    fontFamily: 'Lora, serif',
    borderColor: '#F4A460',
    usage: 'Citations et contenus premium',
    googleFontsUrl: 'https://fonts.google.com/specimen/Lora',
    weights: 'Weights: 400, 500, 600, 700',
    colors,
  },
] as const satisfies PoliceProps[];
