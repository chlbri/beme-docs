import { Component, createSignal, For, type JSX } from 'solid-js';
import { Link } from '@tanstack/solid-router';
import { LangSwitcher } from '../molecules/LangSwitcher';
import type { EnhancedLink } from '../types';

type NavigationProps = {
  logo: JSX.Element;
  links: EnhancedLink[];
};

export const Navigation: Component<NavigationProps> = props => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <nav class='fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border  '>
      <div class='max-w-7xl mx-auto px-4 py-4'>
        <div class='flex items-center justify-between'>
          {/* Logo */}
          <div class='flex items-center gap-10'>
            <Link to='/' class='text-2xl font-bold text-primary'>
              {props.logo}
            </Link>
            <LangSwitcher />
          </div>

          {/* Desktop Navigation */}
          <div class='hidden md:flex items-center gap-8'>
            <For each={props.links}>
              {link => (
                <Link
                  to={link.href}
                  class='text-foreground hover:text-primary transition-colors font-medium'
                  activeProps={{
                    class: 'text-primary',
                  }}
                >
                  {link.label}
                </Link>
              )}
            </For>
          </div>

          {/* Mobile Menu Button */}
          <button
            class='md:hidden text-foreground'
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label='Toggle Menu'
          >
            <svg
              class='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMenuOpen() ? (
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen() && (
          <div class='md:hidden pt-4 pb-2 space-y-2'>
            <For each={props.links}>
              {link => (
                <Link
                  to={link.href}
                  class='block py-2 text-foreground hover:text-primary transition-colors'
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </For>
          </div>
        )}
      </div>
    </nav>
  );
};
