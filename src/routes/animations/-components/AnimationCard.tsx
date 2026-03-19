import { Show, type Component } from 'solid-js';
import { cn } from '~cn/utils';
import { BUTTON_CLASSES } from '../-constants';
import type { AnimationData } from '../-types';
import { useAnimationCardHook } from './AnimationCard.hooks';
import { CodeOverlay } from './CodeOverlay';
import { CodeIcon } from './icons';

type AnimationCardProps = {
  animation: AnimationData;
};

export const AnimationCard: Component<AnimationCardProps> = props => {
  const {
    animationStyle,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
    state,
    showCode,
    setShowCode,
    noBorder,
    overflowed,
    setOverRef,
  } = useAnimationCardHook(props.animation.id);

  return (
    <article class='border border-yellow-900 overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/75 relative'>
      {/* Code overlay */}
      <Show when={showCode()}>
        <CodeOverlay
          animation={props.animation}
          onClose={() => setShowCode(false)}
        />
      </Show>

      {/* ── Preview area ── */}
      <div class='h-50 flex items-center justify-center overflow-hidden'>
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
                'animation-play-state': animationStyle(),
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
            style={{ 'animation-play-state': animationStyle() }}
          >
            I am animated !!!
          </span>
        </Show>
      </div>

      {/* ── Card body ── */}
      <div class='p-4'>
        <h3 class='text-lg font-semibold text-gray-700 mb-1'>
          {props.animation.name}
        </h3>

        <div
          class='text-zinc-500 text-sm mb-4 text-nowrap overflow-x-scroll no-scrollbar text-center mx-5 select-none'
          ref={setOverRef}
          classList={{
            'cursor-col-resize': overflowed(),
          }}
        >
          {props.animation.description} {overflowed() ? '...' : ''}
        </div>

        {/* ── Control buttons ── */}
        <div class='flex items-center justify-center gap-2 flex-wrap'>
          <button
            type='button'
            onClick={handleStart}
            disabled={state() === 'playing'}
            class={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95',
              BUTTON_CLASSES.start,
            )}
          >
            Start
          </button>
          <button
            type='button'
            onClick={handlePause}
            disabled={state() === 'paused' || state() === 'stopped'}
            class={cn(
              'px-3 py-1 text-xs font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 border-3 border-zinc-700',
              BUTTON_CLASSES.pause,
            )}
          >
            Pause
          </button>
          <button
            type='button'
            onClick={handleStop}
            disabled={state() === 'stopped'}
            class={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95',
              BUTTON_CLASSES.stop,
            )}
          >
            Stop
          </button>
          <button
            type='button'
            onClick={handleReset}
            class={cn(
              'px-2 py-1.5 text-xs font-medium rounded-md duration-150 ease-in-out transition-all active:scale-95 ring-blue-600 ring-1 hover:ring-3 italic',
              BUTTON_CLASSES.reset,
            )}
          >
            Reset 🔄
          </button>
        </div>

        {/* ── Meta row ── */}
        <div class='mt-3 flex items-center gap-2 flex-wrap'>
          <span class='text-xs text-muted-foreground'>Duration:</span>
          <span class='text-xs font-mono bg-muted px-2 py-0.5 rounded'>
            {props.animation.duration}s
          </span>

          <span class='text-xs text-muted-foreground ml-2'>Type:</span>
          <span
            class={cn(
              'text-xs font-mono px-2 py-0.5 rounded',
              props.animation.type === 'text'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            )}
          >
            {props.animation.type}
          </span>

          {/* View code button */}
          <button
            type='button'
            onClick={() => setShowCode(true)}
            class='ml-auto flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-zinc-300 bg-zinc-50 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-100 hover:border-zinc-900 transition-all duration-150 active:scale-95'
            title='View code for React & Solid.js'
          >
            <CodeIcon />
            <span>Code</span>
          </button>
        </div>
      </div>
    </article>
  );
};
