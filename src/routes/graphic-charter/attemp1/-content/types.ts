import type { Accessor } from 'solid-js';
import type { DECORATIONS, FONT_SIZES, THICKNESSES } from './constants';

export type ColorProps = {
  text: string;
  color: string;
};

export interface PoliceProps {
  /** Famille de police Google Fonts */
  fontFamily: string;
  /** Couleur de la bordure gauche (hex) */
  borderColor: string;
  /** Nom de la police pour affichage */
  name: string;
  /** Usage recommandé */
  usage: string;
  /** Lien Google Fonts */
  googleFontsUrl: string;
  /** Poids disponibles */
  weights: string;
  /** Classes CSS supplémentaires */
  class?: string;

  colors: ColorProps[];
  index?: Accessor<number>;
}

export type FontSize = (typeof FONT_SIZES)[number];
export type FontDecoration = (typeof DECORATIONS)[number];
export type FontThickness = (typeof THICKNESSES)[number];
