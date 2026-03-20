import { throttle } from '@tanstack/solid-pacer';
import {
  createFileRoute,
  retainSearchParams,
} from '@tanstack/solid-router';
import { Search } from 'lucide-solid';
import { For, Show } from 'solid-js';
import * as v from 'valibot';
import { cn } from '~cn/utils';
import { ComponentCard } from './-components/card';
import { COMPONENTS } from './-components/data';

const validateSearch = v.object({
  q: v.optional(v.string(), ''),
});

export const Route = createFileRoute('/components/')({
  validateSearch,
  search: { middlewares: [retainSearchParams(['q'])] },
  component: () => {
    const search = Route.useSearch();
    const navigate = Route.useNavigate();
    const searchQuery = () => search().q;

    const setSearchQuery = throttle(
      (q: string) => {
        if (q === searchQuery()) return;

        return navigate({
          search: () => ({ q }),
          // replace: true,
        });
      },
      {
        wait: 300,
        key: 'SEARCH_COMPONENTS',
      },
    );

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

          <div class='relative max-w-md mx-auto'>
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
            <For each={filteredComponents()} children={ComponentCard} />
          </div>
        </Show>
      </div>
    );
  },
});
