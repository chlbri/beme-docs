import { createFileRoute } from '@tanstack/solid-router';
import { For } from 'solid-js';
import {
  BorderHover,
  type BorderHoverProps,
} from '~ui/molecules/BorderHover';

const DATA: (BorderHoverProps & { children: string })[] = [
  {
    alt: 'Stunning visual element',
    class: 'bg-slate-200 text-gray-500',
    children: 'Elegant design showcased here',
  },
  {
    alt: 'Modern UI element',
    class: 'bg-zinc-400',
    children: 'Sophisticated visual component',
  },
  {
    alt: 'Attractive display section',
    class: 'bg-yellow-500',
    children: 'Outstanding presentation element',
  },
  {
    alt: 'Creative presentation block',
    class: 'bg-blue-400',
    children: 'Impressive feature display',
  },
  {
    alt: 'Amazing interface component',
    class: 'bg-orange-800',
    children: 'Beautiful component to show publicly',
  },
  {
    alt: 'Remarkable interface piece',
    children: 'Exceptional component showcase',
  },
];

export const Route = createFileRoute('/components/border-hover')({
  component: () => (
    <div class='text-lg min-h-[90vh] content-center place-items-center grid grid-cols-1 md:grid-cols-2 pt-12 gap-6'>
      <For each={DATA}>
        {item => (
          <BorderHover
            alt={item.alt}
            width={item.width}
            class={item.class}
          >
            <h1 class='text-4xl font-bold select-none'>{item.children}</h1>
          </BorderHover>
        )}
      </For>
    </div>
  ),
});
