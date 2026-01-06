import type { Component } from 'solid-js';

export const Footer: Component = () => {
  return (
    <div class='mt-8 text-center pt-4 border-t border-purple-500/20 pb-4 bg-gradient-to-r from-slate-900 via-purple-900/10 to-slate-900'>
      <p class='text-gray-400 text-sm font-mono'>
        {'<Coded/>'} by{' '}
        <a
          href='https://beme-dev.vercel.app'
          target='_blank'
          rel='noopener noreferrer'
          class='text-purple-400 font-semibold hover:text-orange-500 transition-colors hover:underline underline-offset-2'
        >
          beme.dev
        </a>{' '}
        · 2025
      </p>
    </div>
  );
};
