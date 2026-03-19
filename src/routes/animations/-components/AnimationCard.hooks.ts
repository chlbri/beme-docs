import { createSignal } from 'solid-js';
import { isOverFlowed } from '~/globals/ui/signals/overflow';
import type { AnimationState } from '../types';

export const useAnimationCardHook = (id: string) => {
  const [state, setState] = createSignal<AnimationState>('playing');
  const [showCode, setShowCode] = createSignal(false);

  const [overflowed, setOverRef] = isOverFlowed.x();

  const noBorder = id === 'color-shift';

  const handleStart = () => setState('playing');
  const handlePause = () => setState('paused');
  const handleStop = () => setState('stopped');

  const handleReset = () => {
    setState('stopped');
    setTimeout(() => setState('playing'), 50);
  };

  const animationStyle = () => {
    const currentState = state();
    const toPause =
      currentState === 'paused' || currentState === 'stopped';
    if (toPause) return 'paused';
    return 'running';
  };

  return {
    state,
    overflowed,
    setOverRef,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
    noBorder,
    animationStyle,
    showCode,
    setShowCode,
  };
};
