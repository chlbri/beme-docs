import { cn } from '~cn/utils';
import { animationsData, type AnimationData } from './-data';
import { For, createSignal, Show, type Component } from 'solid-js';
import { MultiText } from '~/globals/ui/molecules';

type AnimationState = 'playing' | 'paused' | 'stopped';

type AnimationCardProps = {
  animation: AnimationData;
};

const AnimationCard: Component<AnimationCardProps> = props => {
  const [state, setState] = createSignal<AnimationState>('playing');

  const handleStart = () => setState('playing');
  const handlePause = () => setState('paused');
  const handleStop = () => setState('stopped');
  const handleReset = () => {
    setState('stopped');
    setTimeout(() => setState('playing'), 50);
  };

  const getAnimationStyle = () => {
    if (state() === 'paused') return 'paused';
    if (state() === 'stopped') return 'paused';
    return 'running';
  };

  const noBorder = props.animation.id === 'color-shift';

  return (
    <article class='bg-card rounded-lg border border-gray-500 overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      <div class='h-48 bg-muted flex items-center justify-center relative overflow-hidden'>
        <Show
          when={props.animation.type === 'text'}
          fallback={
            <div
              class={cn(
                'size-24 bg-orange-400 border-slate-800',
                props.animation.animationClass,
                noBorder ? '' : 'border-2',
              )}
              classList={{
                'opacity-50': state() === 'stopped',
              }}
              style={{
                'animation-play-state': getAnimationStyle(),
                'border-radius':
                  props.animation.id === 'morph-square-circle'
                    ? '0%'
                    : '0%',
              }}
            />
          }
        >
          <span
            class={cn(
              'text-2xl font-bold text-foreground',
              props.animation.animationClass,
            )}
            classList={{
              'opacity-50': state() === 'stopped',
            }}
            style={{ 'animation-play-state': getAnimationStyle() }}
          >
            I am animated !!!
          </span>
        </Show>
      </div>

      <div class='p-4'>
        <h3 class='text-lg font-semibold text-card-foreground mb-1'>
          {props.animation.name}
        </h3>
        <p class='text-muted-foreground text-sm mb-4'>
          {props.animation.description}
        </p>

        <div class='flex items-center gap-2 flex-wrap'>
          <button
            type='button'
            onClick={handleStart}
            disabled={state() === 'playing'}
            class='px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Start
          </button>
          <button
            type='button'
            onClick={handlePause}
            disabled={state() === 'paused' || state() === 'stopped'}
            class='px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Pause
          </button>
          <button
            type='button'
            onClick={handleStop}
            disabled={state() === 'stopped'}
            class='px-3 py-1.5 text-xs font-medium rounded-md bg-red-400 text-white hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Stop
          </button>
          <button
            type='button'
            onClick={handleReset}
            class='px-3 py-1.5 text-xs font-medium rounded-md border border-blue-600 bg-blue-100 text-slate-700 transition-colors'
          >
            Reset
          </button>
        </div>

        <div class='mt-3 flex items-center gap-2'>
          <span class='text-xs text-muted-foreground'>Duration:</span>
          <span class='text-xs font-mono bg-muted px-2 py-0.5 rounded'>
            {props.animation.duration}s
          </span>
          <span class='text-xs text-muted-foreground ml-2'>Type:</span>
          <span
            class={`text-xs font-mono px-2 py-0.5 rounded ${
              props.animation.type === 'text'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            }`}
          >
            {props.animation.type}
          </span>
        </div>
      </div>
    </article>
  );
};

export const AnimationsPage: Component<{
  data?: AnimationData[];
}> = ({ data = animationsData }) => {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [selectedCategories, setSelectedCategories] = createSignal<
    Set<'shape' | 'text'>
  >(new Set(['shape', 'text']));

  const toggleCategory = (category: 'shape' | 'text') => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredAnimations = () => {
    const query = searchQuery().toLowerCase();
    return data.filter(animation => {
      const matchesSearch =
        animation.name.toLowerCase().includes(query) ||
        animation.description.toLowerCase().includes(query);
      const matchesCategory = selectedCategories().has(animation.type);
      return matchesSearch && matchesCategory;
    });
  };

  const filteredByType = (type: 'shape' | 'text') => {
    return filteredAnimations().filter(a => a.type === type);
  };

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
                ' buttons.',
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
              onInput={e => setSearchQuery(e.currentTarget.value)}
              class='w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-slate-700'
            />
          </div>

          {/* Category Filters */}
          <div class='flex flex-wrap gap-3 mx-auto max-w-md justify-center'>
            <button
              type='button'
              onClick={() => toggleCategory('shape')}
              class={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                selectedCategories().has('shape')
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-slate-700 border-gray-500 text-muted-foreground hover:border-blue-500'
              }`}
            >
              <span class='w-3 h-3 rounded-full bg-current opacity-70' />
              Shape
            </button>
            <button
              type='button'
              onClick={() => toggleCategory('text')}
              class={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                selectedCategories().has('text')
                  ? 'bg-purple-500 text-white border-purple-500'
                  : 'bg-slate-700 border-gray-500 text-muted-foreground hover:border-purple-500'
              }`}
            >
              <span class='w-3 h-3 rounded-full bg-current opacity-70' />
              Text
            </button>
          </div>

          {/* Results count */}
          <p class='text-sm text-muted-foreground text-center'>
            Showing {filteredAnimations().length} of {data.length}{' '}
            animations
          </p>
        </div>
      </div>

      <div class='flex flex-col px-6 space-y-16'>
        <Show
          when={
            selectedCategories().has('shape') &&
            filteredByType('shape').length > 0
          }
        >
          <section class='mb-12'>
            <h3 class='text-3xl font-semibold text-foreground mb-4'>
              Shape Animations ({filteredByType('shape').length})
            </h3>
            <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
              <For each={filteredByType('shape')}>
                {animation => <AnimationCard animation={animation} />}
              </For>
            </div>
          </section>
        </Show>

        <Show
          when={
            selectedCategories().has('text') &&
            filteredByType('text').length > 0
          }
        >
          <section class='mb-12'>
            <h3 class='text-3xl font-semibold text-foreground mb-4'>
              Text Animations ({filteredByType('text').length})
            </h3>
            <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
              <For each={filteredByType('text')}>
                {animation => <AnimationCard animation={animation} />}
              </For>
            </div>
          </section>
        </Show>

        <Show when={filteredAnimations().length === 0}>
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
