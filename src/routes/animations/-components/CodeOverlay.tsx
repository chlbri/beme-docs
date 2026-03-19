import { Show, type Component, type Setter } from 'solid-js';
import { cn } from '~cn/utils';
import type { AnimationData } from '../-types';
import { useCodeOverlayHook } from './CodeOverlay.hooks';
import {
  CheckIcon,
  CodeIcon,
  CopyIcon,
  CssLogo,
  ReactLogo,
  XIcon,
} from './icons';

type CodeOverlayProps = {
  animation: AnimationData;
  onClose: () => void;
};

export const CodeOverlay: Component<CodeOverlayProps> = props => {
  const {
    is,
    indicatorStyle,
    setJsxTabRef,
    setCssTabRef,
    setTabsBarRef,
    handleCopy,
    showCssTab,
    code,
    copied,
    setActiveTab,
    onClose,
  } = useCodeOverlayHook(props);

  return (
    <article
      class='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2c2416]/50 backdrop-blur-sm'
      onClick={onClose}
    >
      {/* Panel */}
      <div class='relative w-full max-w-3xl h-[85vh] flex flex-col rounded-xl border border-[#d4c9b0] bg-[#faf8f3] shadow-2xl overflow-hidden'>
        {/* ── Header ── */}
        <div class='shrink-0 flex items-center justify-between px-5 py-3.5 border-b border-[#e8e0ce] bg-[#f5f0e8]'>
          <div class='flex items-center gap-2.5 min-w-0'>
            <CodeIcon class='text-[#8a7a62] shrink-0' />
            <span class='text-sm font-semibold text-[#1a1208] truncate'>
              {props.animation.name}
            </span>
            <span class='text-xs text-[#8a7a62] font-mono shrink-0'>
              — usage example
            </span>
          </div>
          <button
            type='button'
            onClick={props.onClose}
            class='ml-3 shrink-0 p-1.5 rounded-md text-[#8a7a62] hover:text-[#1a1208] hover:bg-[#e8e0ce] transition-colors'
            aria-label='Close overlay'
          >
            <XIcon />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div class='shrink-0 relative bg-[#f5f0e8] border-b border-[#d4c9b0]'>
          {/* Tab buttons row */}
          <div
            ref={setTabsBarRef as Setter<HTMLDivElement | null>}
            class='flex items-end gap-0.5 px-5 pt-3 pb-0'
          >
            <button
              ref={setJsxTabRef as Setter<HTMLButtonElement | null>}
              type='button'
              onClick={() => setActiveTab('jsx')}
              class={cn(
                'flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-t-md transition-colors duration-200',
                is('jsx')
                  ? 'text-cyan-700 bg-[#faf8f3]'
                  : 'text-[#8a7a62] hover:text-cyan-700 hover:bg-[#ece7da]',
              )}
            >
              <ReactLogo />
              JSX
            </button>

            <Show when={showCssTab()}>
              <button
                ref={setCssTabRef as Setter<HTMLButtonElement | null>}
                type='button'
                onClick={() => setActiveTab('css')}
                class={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-t-md transition-colors duration-200',
                  is('css')
                    ? 'text-[#7a4818] bg-[#faf8f3] font-bold'
                    : 'text-yellow-800/70 hover:text-[#2c2416] hover:bg-[#ece7da]',
                )}
              >
                <CssLogo />
                CSS
              </button>
            </Show>
          </div>

          {/* Sliding indicator */}
          <div
            class='absolute bottom-0 h-0.5 transition-all duration-200 ease-in-out'
            style={{
              ...indicatorStyle(),
              'background-color': is('css') ? '#b06a2a' : '#0e7490',
            }}
          />
        </div>

        {/* ── Code block ── */}
        <div class='relative flex-1 min-h-0 bg-[#faf8f3]'>
          {/* Copy button */}
          <div class='absolute top-3 right-6 z-10 pointer-events-none'>
            <button
              type='button'
              onClick={handleCopy}
              class='pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-[#d4c9b0] bg-[#f5f0e8]/95 text-[#8a7a62] hover:bg-[#e8e0ce] hover:text-[#2c2416] transition-all active:scale-95 backdrop-blur-sm'
            >
              <Show when={copied()} fallback={<CopyIcon />}>
                <CheckIcon class='text-[#5a8a5a]' />
              </Show>
              <span>{copied() ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Scrollable code area */}
          <pre class='h-full w-full overflow-auto p-5 pt-12 pr-28 text-left text-xs leading-relaxed text-[#2c2416] font-mono whitespace-pre-wrap break-all bg-[#faf8f3]'>
            <code>{code()}</code>
          </pre>
        </div>

        {/* ── Footer ── */}
        <div class='shrink-0 px-5 py-2.5 border-t border-[#e8e0ce] bg-[#f5f0e8] flex items-center justify-between gap-4 overflow-hidden'>
          <span class='text-xs text-[#8a7a62] font-mono truncate min-w-0'>
            animation-class:{' '}
            <span class='text-[#2c2416] font-medium break-all'>
              {props.animation.animationClass}
            </span>
          </span>
          <span class='text-xs text-[#8a7a62] shrink-0'>
            Press{' '}
            <kbd class='px-1.5 py-0.5 rounded border border-[#d4c9b0] bg-[#ece7da] text-[#2c2416] font-mono text-[10px]'>
              C
            </kbd>{' '}
            to close
          </span>
        </div>
      </div>
    </article>
  );
};
