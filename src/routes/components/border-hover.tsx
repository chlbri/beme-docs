import { createDebouncedSignal } from '@tanstack/solid-pacer';
import { createFileRoute } from '@tanstack/solid-router';
import { createEffect, createMemo, For, onMount } from 'solid-js';
import { createWindowHandler } from '~/globals/ui/signals/window';
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
  component: () => {
    const [windowWidth, setWindowWidth] = createDebouncedSignal(0, {
      wait: 50,
    });

    createWindowHandler.onMount('resize', () => {
      setWindowWidth(window.innerWidth);
    });

    onMount(() => {
      setWindowWidth(window.innerWidth);
    });

    const width = createMemo(() => {
      const isBig = windowWidth() > 600;
      return isBig ? 500 : 300;
    });

    createEffect(() => {
      console.log('windowWidth changed:', windowWidth());
    });
    return (
      <div class='text-lg min-h-[90vh] content-center place-items-center grid grid-cols-1 lg:grid-cols-2 pt-12 gap-6'>
        <For each={DATA}>
          {({ children, ...rest }) => (
            <BorderHover {...rest} width={width}>
              <h1 class='text-4xl font-bold select-none'>{children}</h1>
            </BorderHover>
          )}
        </For>
      </div>
    );
  },
});
