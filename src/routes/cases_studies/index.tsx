import { createFileRoute, useNavigate } from '@tanstack/solid-router';
import { For, type Component, createSignal, Show } from 'solid-js';
import { cn } from '~cn/utils';
import { Zap, Brain, Search } from 'lucide-solid';

interface CaseStudyItem {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: Component;
  tags: string[];
}

const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'event-loop',
    name: 'Event Loop',
    description:
      'An interactive visualization of how the JavaScript event loop works, helping you understand asynchronous execution and the call stack.',
    path: '/cases_studies/event_loop',
    icon: Zap,
    tags: ['JavaScript', 'Async', 'Education'],
  },
  {
    id: 'states',
    name: 'State Management',
    description:
      'A comprehensive exploration of different state management patterns and hooks in modern frameworks.',
    path: '/cases_studies/states',
    icon: Brain,
    tags: ['State', 'Hooks', 'Patterns'],
  },
];

const CaseStudyCard: Component<{ item: CaseStudyItem }> = props => {
  const navigate = useNavigate();
  const IconComponent = props.item.icon;

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
        <div class='flex items-center gap-3'>
          <div class='p-2 bg-orange-400/10 rounded-lg group-hover:bg-orange-400/20 transition-colors'>
            <div class='text-orange-400 w-6 h-6'>
              <IconComponent />
            </div>
          </div>
          <h3 class='text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-400 transition-colors'>
            {props.item.name}
          </h3>
        </div>
      </div>

      <p class='text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4'>
        {props.item.description}
      </p>

      <div class='flex flex-wrap gap-2 mb-4'>
        <For each={props.item.tags}>
          {tag => (
            <span class='text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full'>
              {tag}
            </span>
          )}
        </For>
      </div>

      <div class='pt-4 border-t border-gray-100 dark:border-gray-800'>
        <span class='text-xs font-medium text-orange-400'>
          Explore Study →
        </span>
      </div>
    </article>
  );
};

export const Route = createFileRoute('/cases_studies/')({
  component: () => {
    const [searchQuery, setSearchQuery] = createSignal('');
    const [selectedTag, setSelectedTag] = createSignal<string | null>(
      null,
    );

    const allTags = () => {
      const tags = new Set<string>();
      CASE_STUDIES.forEach(study =>
        study.tags.forEach(tag => tags.add(tag)),
      );
      return Array.from(tags).sort();
    };

    const filteredStudies = () => {
      const query = searchQuery().toLowerCase();
      const tag = selectedTag();

      return CASE_STUDIES.filter(item => {
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);
        const matchesTag = !tag || item.tags.includes(tag);
        return matchesSearch && matchesTag;
      });
    };

    return (
      <div class='w-full max-w-5xl mx-auto py-8 px-4'>
        <div class='mb-10'>
          <h1 class='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Case Studies
          </h1>
          <p class='text-lg text-gray-600 dark:text-gray-400 mb-6'>
            Dive into detailed case studies exploring JavaScript concepts,
            state management patterns, and interactive visualizations.
          </p>

          <div class='space-y-4'>
            <div class='relative max-w-md'>
              <Search class='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search case studies...'
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
                aria-label='Search case studies'
              />
            </div>

            <div class='flex flex-wrap gap-2'>
              <button
                onClick={() => setSelectedTag(null)}
                class={cn(
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  !selectedTag()
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                )}
              >
                All
              </button>
              <For each={allTags()}>
                {tag => (
                  <button
                    onClick={() => setSelectedTag(tag)}
                    class={cn(
                      'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                      selectedTag() === tag
                        ? 'bg-orange-400 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                    )}
                  >
                    {tag}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>

        <Show
          when={filteredStudies().length > 0}
          fallback={
            <div class='text-center py-12'>
              <p class='text-gray-500 dark:text-gray-400'>
                No case studies found matching your criteria.
              </p>
            </div>
          }
        >
          <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <For each={filteredStudies()}>
              {item => <CaseStudyCard item={item} />}
            </For>
          </div>
        </Show>
      </div>
    );
  },
});
