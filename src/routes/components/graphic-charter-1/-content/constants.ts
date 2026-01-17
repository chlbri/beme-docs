import type { FontDecoration, FontSize, FontThickness } from './types';

type CommonValue = { class: string; label: string };

export const FONT_SIZES = ['sm', 'base', 'xl', '4xl'] as const;

export const FONT_SIZE_CONFIG = {
  '4xl': { class: 'text-4xl', label: '4XL' },
  xl: { class: 'text-xl', label: 'XL' },
  base: { class: 'text-base', label: 'base' },
  sm: { class: 'text-sm', label: 'sm' },
} as const satisfies Record<FontSize, CommonValue>;

export const DECORATIONS = [
  'italic',
  'underline',
  'line-through',
] as const;

export const DECORATION_CONFIG = {
  italic: { class: 'italic', label: 'italique' },
  underline: { class: 'underline', label: 'souligné' },
  'line-through': { class: 'line-through', label: 'barré' },
} as const satisfies Record<FontDecoration, CommonValue>;

export const THICKNESSES = [
  'thin',
  'base',
  'medium',
  'semibold',
  'bold',
] as const;

export const THICKNESS_CONFIG = {
  thin: { class: 'font-thin', label: 'Fin' },
  base: { class: 'font-normal', label: 'Normal' },
  medium: { class: 'font-medium', label: 'Moyen' },
  semibold: { class: 'font-semibold', label: 'Semi-Gras' },
  bold: { class: 'font-bold', label: 'Gras' },
} as const satisfies Record<FontThickness, CommonValue>;
