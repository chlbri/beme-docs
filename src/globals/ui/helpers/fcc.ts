import Color, { type ColorLike } from 'color';

export const CONTRAST_OFFSET = 2.5;

const _contrastByLight = (color: ColorLike) => {
  const white = Color('white');
  const _color = Color(color).contrast(white);
  return _color > CONTRAST_OFFSET;
};

const fcc = (color: ColorLike) => {
  return _contrastByLight(color) ? 'white' : 'black';
};

fcc.contrastByLight = _contrastByLight;

fcc.custom = (
  color: ColorLike,
  lightColor: ColorLike = 'white',
  darkColor: ColorLike = 'black',
) => {
  const light = Color(lightColor);
  const _color = Color(color).contrast(light);
  return _color > CONTRAST_OFFSET ? lightColor : darkColor;
};

/**
 * Ajuste la luminosité d'une couleur HEX
 * @param hex - Couleur au format #RRGGBB
 * @param percent - Pourcentage d'ajustement (positif pour éclaircir, négatif pour assombrir)
 */
export const adjustBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + percent));
  const b = Math.max(0, Math.min(255, (num & 0xff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export default fcc;
