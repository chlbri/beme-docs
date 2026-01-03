import { DECORATION_CONFIG } from './constants';
import type { FontDecoration } from './types';

export const getDecorationClasses = (
  decorations: FontDecoration[],
): string => {
  return decorations.map(d => DECORATION_CONFIG[d].class).join(' ');
};
