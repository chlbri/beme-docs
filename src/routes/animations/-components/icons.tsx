import { cn } from '~cn/utils';
import type { Component } from 'solid-js';

export const CssLogo: Component<{ class?: string }> = props => (
  <svg
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    class={cn('size-3.5', props.class)}
    aria-label='CSS'
    fill='currentColor'
  >
    <path d='M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z' />
  </svg>
);

type IconProps = {
  class?: string;
};

export const CopyIcon: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={cn('size-4', props.class)}
  >
    <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
    <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
  </svg>
);

export const CheckIcon: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2.5'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={cn('size-4', props.class)}
  >
    <path d='M20 6 9 17l-5-5' />
  </svg>
);

export const CodeIcon: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={cn('size-4', props.class)}
  >
    <polyline points='16 18 22 12 16 6' />
    <polyline points='8 6 2 12 8 18' />
  </svg>
);

export const XIcon: Component<IconProps> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    class={cn('size-4', props.class)}
  >
    <path d='M18 6 6 18' />
    <path d='m6 6 12 12' />
  </svg>
);

export const SolidLogo: Component<{ class?: string }> = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 166 155.3'
    class={cn('size-3.5', props.class)}
    aria-label='CSS3'
  >
    <defs>
      <linearGradient
        id='a'
        gradientUnits='userSpaceOnUse'
        x1='27.5'
        y1='3'
        x2='152'
        y2='63.5'
      >
        <stop offset='.1' stop-color='#76b3e1' />
        <stop offset='.3' stop-color='#dcf2fd' />
        <stop offset='1' stop-color='#76b3e1' />
      </linearGradient>
      <linearGradient
        id='b'
        gradientUnits='userSpaceOnUse'
        x1='95.8'
        y1='32.6'
        x2='74'
        y2='105.2'
      >
        <stop offset='0' stop-color='#76b3e1' />
        <stop offset='.5' stop-color='#4377bb' />
        <stop offset='1' stop-color='#1f3b77' />
      </linearGradient>
      <linearGradient
        id='c'
        gradientUnits='userSpaceOnUse'
        x1='18.4'
        y1='64.2'
        x2='144.3'
        y2='149.8'
      >
        <stop offset='0' stop-color='#315aa9' />
        <stop offset='.5' stop-color='#518ac8' />
        <stop offset='1' stop-color='#315aa9' />
      </linearGradient>
      <linearGradient
        id='d'
        gradientUnits='userSpaceOnUse'
        x1='75.2'
        y1='74.5'
        x2='24.4'
        y2='260.8'
      >
        <stop offset='0' stop-color='#4377bb' />
        <stop offset='.5' stop-color='#1a336b' />
        <stop offset='1' stop-color='#1a336b' />
      </linearGradient>
    </defs>
    <path
      d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z'
      fill='#76b3e1'
    />
    <path
      d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z'
      opacity='.3'
      fill='url(#a)'
    />
    <path
      d='M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z'
      fill='#518ac8'
    />
    <path
      d='M52 35l-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z'
      opacity='.3'
      fill='url(#b)'
    />
    <path
      d='M134 80a45 45 0 00-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z'
      fill='url(#c)'
    />
    <path
      d='M114 115a45 45 0 00-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z'
      fill='url(#d)'
    />
  </svg>
);

// ── React logo — proper atom (3 orbital ellipses + nucleus) ───────────────────

export const ReactLogo: Component<{ class?: string }> = props => (
  <svg
    viewBox='0 0 100 100'
    xmlns='http://www.w3.org/2000/svg'
    class={cn('size-3.5', 'stroke-cyan-500', props.class)}
    aria-label='React'
    fill='none'
    stroke-width='4'
  >
    {/* Orbital ellipse 1 — horizontal */}
    <ellipse cx='50' cy='50' rx='48' ry='18' />

    {/* Orbital ellipse 2 — rotated +60° */}
    <ellipse
      cx='50'
      cy='50'
      rx='48'
      ry='18'
      transform='rotate(60 50 50)'
    />

    {/* Orbital ellipse 3 — rotated -60° (120°) */}
    <ellipse
      cx='50'
      cy='50'
      rx='48'
      ry='18'
      transform='rotate(120 50 50)'
    />

    {/* Nucleus */}
    <circle cx='50' cy='50' r='6' stroke='none' />
  </svg>
);
