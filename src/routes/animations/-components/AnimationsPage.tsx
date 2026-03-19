import { For, Show, type Component } from 'solid-js';
import { MultiText } from '~/globals/ui/molecules';
import { cn } from '~cn/utils';
import { animationsData } from '../-data';
import type { AnimationData } from '../-types';
import { AnimationCard } from './AnimationCard';
import { useAnimationsPageHook } from './AnimationsPage.hooks';

export const AnimationsPage: Component<{
  data?: AnimationData[];
}> = ({ data = animationsData }) => {
  const {
    toggleCategory,
    length,
    filteredByType,
    has,
    searchQuery,
    setSearchQuery,
  } = useAnimationsPageHook(...data);

  return (
    <div>
      <div class='my-16'>
        <h2 class='text-5xl xl:text-6xl font-bold text-orange-500 mb-10'>
          Animation Showcase
        </h2>

        <div class='text-lg'>
          <div>
            <MultiText
              texts={[
                'A collection of ',
                data.length.toLocaleString(),
                ' CSS ',
                'animations',
                ' built with ',
                'TailwindCSS',
              ]}
              class='text-muted-foreground mb-8 select-none font-mono'
              props={{
                1: { class: 'font-bold text-foreground' },
                3: {
                  class:
                    'italic text-orange-800 font-medium font-serif text-2xl animate-bounce inline-block',
                },
                5: {
                  class:
                    'underline underline-offset-2 text-blue-500 cursor-pointer mx-0.5 font-semibold',
                  onClick: () => {
                    window.open('https://tailwindcss.com/', '_blank');
                  },
                },
              }}
            />
          </div>
          <div>
            <MultiText
              texts={[
                'Each animation can be controlled with ',
                'start',
                ',  ',
                'pause',
                ',  ',
                'stop',
                ',  and ',
                'reset',
                ' buttons. Click ',
                'Code',
                ' to see the usage example.',
              ]}
              class='text-muted-foreground mb-8 select-none font-mono'
              props={{
                1: {
                  class:
                    'px-2 py-1 font-medium bg-gray-700 text-white -skew-x-16 inline-block',
                },
                3: {
                  class:
                    'px-2 py-1 font-medium bg-gray-200 text-gray-800 -skew-x-16 inline-block',
                },
                5: {
                  class:
                    'px-2 py-1 font-medium bg-red-500 text-white -skew-x-16 inline-block',
                },
                7: {
                  class:
                    'px-2 py-1 font-medium bg-blue-100 text-blue-700 -skew-x-16 inline-block',
                },
                9: {
                  class:
                    'px-2 py-1 font-medium border border-zinc-300 bg-zinc-50 text-zinc-600 inline-flex items-center gap-1 mx-0.5',
                },
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div class='space-y-4 my-12'>
          {/* Search Input */}
          <div class='relative max-w-md mx-auto'>
            <svg
              class='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <input
              type='search'
              placeholder='Search animations...'
              value={searchQuery()}
              onInput={e => {
                const query = e.currentTarget.value;
                return setSearchQuery(query);
              }}
              class='w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-zinc-50'
            />
          </div>

          {/* Category Filters */}
          <div class='flex flex-wrap gap-3 mx-auto max-w-md justify-center'>
            <button
              type='button'
              onClick={() => toggleCategory('shape')}
              class={cn(
                'flex items-center gap-2 px-4 py-1.5 rounded-lg ring-[1.5px] transition-all ease-out cursor-pointer',
                has('shape')
                  ? 'bg-blue-500 text-white ring-blue-500'
                  : 'bg-slate-100 ring-gray-500 text-blue-700/80 hover:ring-blue-500',
              )}
            >
              <span class='w-3 h-3 rounded-full bg-current opacity-70' />
              Shape
            </button>
            <button
              type='button'
              onClick={() => toggleCategory('text')}
              class={cn(
                'flex items-center gap-2 px-4 py-1.5 rounded-lg ring-[1.5px] transition-all ease-out cursor-pointer',
                has('text')
                  ? 'bg-purple-500 text-white ring-purple-500'
                  : 'bg-slate-100 ring-gray-500 text-purple-700/80 hover:ring-purple-500',
              )}
            >
              <span class='w-3 h-3 rounded-full bg-current opacity-70' />
              Text
            </button>
          </div>

          {/* Results count */}
          <p class='text-sm text-muted-foreground text-center'>
            Showing {length()} of {data.length} animations
          </p>
        </div>
      </div>

      <div class='flex flex-col px-6 space-y-16'>
        <Show when={has('shape')}>
          <section class='mb-12'>
            <h3 class='text-3xl font-semibold text-foreground mb-4'>
              Shape Animations ({filteredByType('shape').length})
            </h3>
            <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10'>
              <For each={filteredByType('shape')}>
                {animation => <AnimationCard animation={animation} />}
              </For>
            </div>
          </section>
        </Show>

        <Show when={has('text')}>
          <section class='mb-12'>
            <h3 class='text-3xl font-semibold text-foreground mb-4'>
              Text Animations ({filteredByType('text').length})
            </h3>
            <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10'>
              <For each={filteredByType('text')}>
                {animation => <AnimationCard animation={animation} />}
              </For>
            </div>
          </section>
        </Show>

        <Show when={length() === 0}>
          <div class='text-center py-12'>
            <p class='text-muted-foreground text-lg mb-2'>
              Aucune animation trouvée
            </p>
            <p class='text-muted-foreground text-sm'>
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </div>
        </Show>
      </div>
    </div>
  );
};
