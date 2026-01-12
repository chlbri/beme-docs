import type { Component } from 'solid-js';

export const Footer: Component = () => {
  return (
    <div class='mt-3 text-center pt-1 border-t-2 border-zinc-400/30 pb-2'>
      <p class='text-foreground/70 text-sm font-mono'>
        {'<Coded/>'} by{' '}
        <a
          href='https://beme-dev.vercel.app'
          target='_blank'
          rel='noopener noreferrer'
          class='text-orange-600 font-semibold hover:underline underline-offset-2'
        >
          beme.dev
        </a>{' '}
        ·{' 2026'}
      </p>
    </div>
  );
};
