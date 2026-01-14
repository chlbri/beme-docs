import { Link, useLocation } from '@tanstack/solid-router';
import { type Component, type JSX, For, Show } from 'solid-js';
import { cn } from '~cn/utils';
import type { OmitPropsOf } from '../types';

type BreadCrumbItem = {
  label: string;
  path: string;
  isLast: boolean;
};

type BreadCrumbProps = {
  /**
   * Custom separator between breadcrumb items
   * @default "/"
   */
  separator?: string;

  /**
   * Custom class for breadcrumb items
   */
  itemClass?: string;
  /**
   * Custom class for the separator
   */
  separatorClass?: string;
  /**
   * Custom home element for root path
   * @default <span class="font-bold text-purple-600">Home</span>
   */
  home?: JSX.Element;
  /**
   * Custom label formatter function
   */
  formatLabel?: (segment: string) => string;
} & OmitPropsOf<'nav'>;

/**
 * Default label formatter: capitalizes first letter and replaces dashes/underscores with spaces
 */
const defaultFormatLabel = (segment: string): string => {
  return segment
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const BreadCrumbs: Component<BreadCrumbProps> = props => {
  const location = useLocation();

  const home = props.home ?? (
    <span class='font-bold text-primary text-lg'>Home</span>
  );

  const breadcrumbs = () => {
    const pathname = location().pathname;

    // Split pathname and filter empty segments
    const segments = pathname.split('/').filter(Boolean);

    // If no segments, return home
    if (segments.length === 0) {
      return [{ label: 'Home', path: '/', isLast: true }];
    }

    const formatLabel = props.formatLabel || defaultFormatLabel;

    // Build breadcrumb items
    const items: BreadCrumbItem[] = [];

    // Add home element
    items.push({
      label: 'Home',
      path: '/',
      isLast: false,
    });

    // Build path incrementally for each segment
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      items.push({
        label: formatLabel(segment),
        path: currentPath,
        isLast: index === segments.length - 1,
      });
    });

    return items;
  };

  const separator = props.separator ?? '/';

  return (
    <nav
      aria-label='Breadcrumb'
      class={cn('flex items-center space-x-2 text-sm', props.class)}
    >
      <ol class='flex items-center space-x-2' role='list'>
        <For each={breadcrumbs()}>
          {item => (
            <li class='flex items-center space-x-2'>
              <Show
                when={!item.isLast}
                fallback={
                  <span
                    class={cn(
                      'text-foreground font-medium',
                      props.itemClass,
                    )}
                    aria-current='page'
                  >
                    {item.label}
                  </span>
                }
              >
                <Link
                  to={item.path}
                  class={cn(
                    'text-muted-foreground hover:text-foreground transition-colors hover:underline',
                    props.itemClass,
                  )}
                >
                  {item.path === '/' ? home : item.label}
                </Link>
                <span
                  class={cn(
                    'text-zinc-300 select-none text-xl font-thin',
                    props.separatorClass,
                  )}
                  aria-hidden='true'
                >
                  {separator}
                </span>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  );
};
