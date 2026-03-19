import { Accessor } from 'solid-js';
import { AnimationData } from './types';

/** Tailwind's built-in animate-* utilities that ship without any custom CSS */
const TAILWIND_DEFAULT_ANIMATIONS = new Set([
  'animate-bounce',
  'animate-spin',
  'animate-pulse',
  'animate-ping',
  'animate-none',
]);

/**
 * Returns true when the animationClass only uses default Tailwind utilities
 * (i.e. no `animate-[…]` arbitrary values or extra custom classes).
 */
export const isDefaultTailwind = (animationClass: string): boolean => {
  const classes = animationClass.trim().split(/\s+/);
  return classes.every(
    cls =>
      TAILWIND_DEFAULT_ANIMATIONS.has(cls) || !cls.startsWith('animate-'),
  );
};

const toPascalCase = (id: string): string => {
  return id
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

const generateJsxCode = (animation: AnimationData): string => {
  const isText = animation.type === 'text';

  if (isText) {
    return `export const ${toPascalCase(animation.id)}Animation = () => {
  return (
    <span class="${animation.animationClass}">
      I am animated !!!
    </span>
  );
};`;
  }

  return `export const ${toPascalCase(animation.id)}Animation = () => {
  return (
    <div class="size-24 bg-orange-400 border-2 border-slate-800 ${animation.animationClass}" />
  );
};`;
};

const generateCssCode = (animation: AnimationData): string => {
  // Extract the raw animation name from the arbitrary value syntax:
  //   animate-[fade-in_2s_ease-in-out_infinite]  →  fade-in 2s ease-in-out infinite
  const arbitrary = animation.animationClass
    .split(/\s+/)
    .find(cls => cls.startsWith('animate-[') && cls.endsWith(']'));

  const animationValue = arbitrary
    ? arbitrary.slice('animate-['.length, -1).replace(/_/g, ' ')
    : animation.animationClass;

  // Derive a kebab-case keyframe name (first token before the first space/underscore)
  const keyframeName = animationValue.split(' ')[0];

  return `/* ── Usage ──────────────────────────────────────── */
.my-element {
  animation: ${animationValue};
}

/* ── Keyframe (implement to match your design) ── */
@keyframes ${keyframeName} {
  0%   { /* start state  */ }
  100% { /* end state    */ }
}`;
};

export const generateCode = (
  animation: AnimationData,
  tab: Accessor<'jsx' | 'css'>,
): Accessor<string> => {
  return () => {
    if (tab() === 'css') return generateCssCode(animation);
    return generateJsxCode(animation);
  };
};
