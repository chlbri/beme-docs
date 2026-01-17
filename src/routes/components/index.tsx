import { createFileRoute, useNavigate } from '@tanstack/solid-router';
import { For, type Component, createSignal, Show } from 'solid-js';
import { cn } from '~cn/utils';
import { ArrowRight, Search } from 'lucide-solid';

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  path: string;
}

const COMPONENTS: ComponentItem[] = [
  {
    id: 'border-hover',
    name: 'Border Hover',
    description:
      'An elegant component with a beautiful border hover effect.',
    path: '/components/border-hover',
  },
  {
    id: 'graphic-charter-1',
    name: 'Graphic Charter 1',
    description:
      'A comprehensive graphic charter showcasing color palettes, typography systems, and brand design guidelines.',
    path: '/components/graphic-charter-1',
  },
  {
    id: 'login-beauty-1',
    name: 'Login Beauty 1',
    description:
      'A sophisticated login component with modern design and smooth interactions.',
    path: '/components/login_beauty1',
  },
  {
    id: 'nav-beauty-hover',
    name: 'Navigation Beauty Hover',
    description:
      'An attractive navigation component featuring interactive hover effects.',
    path: '/components/nav_beauty_hover',
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description:
      'A versatile tooltip component that provides informative hover effects.',
    path: '/components/tooltip',
  },
];

const ComponentCard: Component<{ item: ComponentItem }> = props => {
  const navigate = useNavigate();

  return (
    <article
      class={cn(
        'group border border-gray-200 dark:border-gray-700 rounded-lg p-6',
        'bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg',
        'transition-all duration-300 cursor-pointer',
        'hover:border-orange-400 dark:hover:border-orange-400/50',
      )}
      onClick={() => navigate({ to: props.item.path })}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate({ to: props.item.path });
        }
      }}
    >
      <div class='flex items-start justify-between mb-4'>
        <h3 class='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-400 transition-colors'>
          {props.item.name}
        </h3>
        <ArrowRight
          size={20}
          class='text-gray-400 group-hover:text-orange-400 group-hover:translate-x-1 transition-all'
        />
      </div>

      <p class='text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
        {props.item.description}
      </p>

      <div class='mt-4 pt-4 border-t border-gray-100 dark:border-gray-800'>
        <span class='text-xs font-medium text-orange-400'>
          View Component →
        </span>
      </div>
    </article>
  );
};

export const Route = createFileRoute('/components/')({
  component: () => {
    const [searchQuery, setSearchQuery] = createSignal('');

    const filteredComponents = () => {
      const query = searchQuery().toLowerCase();
      if (!query) return COMPONENTS;
      return COMPONENTS.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query),
      );
    };

    return (
      <div class='w-full max-w-5xl mx-auto py-8 px-4'>
        <div class='mb-10'>
          <h1 class='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Components Gallery
          </h1>
          <p class='text-lg text-gray-600 dark:text-gray-400 mb-6'>
            Explore a collection of beautifully designed and interactive UI
            components built with SolidJS and Tailwind CSS.
          </p>

          <div class='relative max-w-md'>
            <Search class='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search components...'
              value={searchQuery()}
              onInput={e => setSearchQuery(e.currentTarget.value)}
              class={cn(
                'w-full pl-10 pr-4 py-2 rounded-lg',
                'border border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-900',
                'text-gray-900 dark:text-white',
                'placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-orange-400',
              )}
              aria-label='Search components'
            />
          </div>
        </div>

        <Show
          when={filteredComponents().length > 0}
          fallback={
            <div class='text-center py-12'>
              <p class='text-gray-500 dark:text-gray-400'>
                No components found matching your search.
              </p>
            </div>
          }
        >
          <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <For each={filteredComponents()}>
              {item => <ComponentCard item={item} />}
            </For>
          </div>
        </Show>
      </div>
    );
  },
});
