import { Link } from '@tanstack/solid-router';
import { For, type Component } from 'solid-js';
import { createLinks, formatLabel1 as formatLabel } from '~signals/links';
import type { PropsOf } from '~ui/types';

type LinkProps = Omit<
  ReturnType<typeof createLinks>[number],
  'children' | 'search'
> &
  Partial<Pick<ReturnType<typeof createLinks>[number], 'search'>> &
  PropsOf<typeof Link, 'children'>;

const NavLink: Component<LinkProps> = ({
  children,
  to,
  search = () => undefined,
}) => {
  return (
    <Link
      to={to}
      search={search()}
      class='relative text-gray-300 hover:text-purple-400 transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium group'
      activeProps={{
        class: 'text-purple-500 font-semibold bg-purple-500/10',
      }}
    >
      {children}
      <span class='absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300' />
    </Link>
  );
};

export const Navbar: Component = () => {
  const LINKS = createLinks({
    filter: value => value === '/projects' || !value.includes('projects'),
    formatLabel,
  });

  return (
    <nav class='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10'>
      <div class='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div class='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' class='flex items-center space-x-2 group'>
            <div class='relative'>
              <div class='absolute inset-0 bg-purple-500 blur-md opacity-50 group-hover:opacity-75 transition-opacity' />
              <span class='relative text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent'>
                beme-docs
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div class='flex items-center space-x-1'>
            <For each={LINKS}>{link => <NavLink {...link} />}</For>
          </div>
        </div>
      </div>
    </nav>
  );
};
