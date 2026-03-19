import { createHotkey } from '@tanstack/solid-hotkeys';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { generateCode, isDefaultTailwind } from '../-helpers';
import { CodeTab } from '../types';
import { CodeOverlayProps } from './CodeOverlay.types';

export const useCodeOverlayHook = (props: CodeOverlayProps) => {
  const [activeTab, setActiveTab] = createSignal<CodeTab>('jsx');
  const [copied, setCopied] = createSignal(false);
  const [jsx, setJsxTabRef] = createSignal<HTMLButtonElement>();
  const [css, setCssTabRef] = createSignal<HTMLButtonElement>();
  const [tabs, setTabsBarRef] = createSignal<HTMLDivElement>();
  const is = (active: CodeTab) => activeTab() === active;
  const code = generateCode(props.animation, activeTab);
  onMount(() => (document.body.style.overflow = 'hidden'));
  onCleanup(() => (document.body.style.overflow = ''));
  createHotkey('C', props.onClose);

  const [indicatorStyle, setIndcatorStyle] = createSignal({
    width: '0px',
    transform: 'translateX(0px)',
  });

  const showCssTab = () => {
    const isNotTailwind = !isDefaultTailwind(
      props.animation.animationClass,
    );
    return isNotTailwind;
  };

  createEffect(() => {
    const activeRef = activeTab() === 'jsx' ? jsx() : (css() ?? jsx());
    const bar = tabs();
    const barLeft = bar!.getBoundingClientRect().left;
    const tabRect = activeRef!.getBoundingClientRect();

    setIndcatorStyle({
      width: `${tabRect.width}px`,
      transform: `translateX(${tabRect.left - barLeft}px)`,
    });
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  const onClose = (e: MouseEvent) => {
    const check = e.target === e.currentTarget;
    if (check) props.onClose();
  };

  return {
    setActiveTab,
    copied,
    code,
    indicatorStyle,
    setJsxTabRef,
    setCssTabRef,
    setTabsBarRef,
    showCssTab,
    handleCopy,
    is,
    onClose,
  };
};
