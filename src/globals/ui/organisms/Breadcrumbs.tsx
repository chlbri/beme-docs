import { Link, useLocation } from '@tanstack/solid-router';
import { For, Show, type Component } from 'solid-js';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

const getBreadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
  if (!pathname || pathname === '/') return [];

  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [];

  // Add Home
  items.push({
    label: 'Home',
    path: '/',
    isLast: false,
  });

  // Build breadcrumbs from path segments
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Format label: capitalize and replace - or _ with space
    const label = segment
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({
      label,
      path: currentPath,
      isLast,
    });
  });

  return items;
};

export const Breadcrumbs: Component = () => {
  const location = useLocation();
  const breadcrumbs = () => getBreadcrumbsFromPath(location.pathname);

  return (
    <Show when={breadcrumbs().length > 1}>
      <nav class='flex items-center space-x-2 text-sm mb-4 px-4 py-3 bg-slate-800/50 rounded-lg border border-purple-500/20 max-w-full overflow-x-auto'>
        <For each={breadcrumbs()}>
          {(item, index) => (
            <>
              <Show when={index() > 0}>
                <svg
                  class='w-4 h-4 text-purple-400 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </Show>
              <Show
                when={!item.isLast}
                fallback={
                  <span class='text-purple-400 font-medium whitespace-nowrap'>
                    {item.label}
                  </span>
                }
              >
                <Link
                  to={item.path}
                  class='text-gray-400 hover:text-purple-300 transition-colors whitespace-nowrap'
                >
                  {item.label}
                </Link>
              </Show>
            </>
          )}
        </For>
      </nav>
    </Show>
  );
};
