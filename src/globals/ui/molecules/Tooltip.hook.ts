import { createMemo, createSignal, splitProps } from 'solid-js';
import type { TooltipProps } from './Tooltip.types';
import { undefinedCall } from '../helpers';
import type { PropsOf } from '../types';
import { getPositionClass } from './Tooltip.helpers';

type PropsHandlers = PropsOf<
  'div',
  'onMouseOver' | 'onMouseOut' | 'onFocus' | 'onBlur'
>;

type ExtractFn<T extends keyof PropsHandlers> = (
  e: Parameters<Extract<PropsHandlers[T], (...args: any) => any>>[0],
) => any;

export const useHook = (props: TooltipProps) => {
  let timeoutShow: ReturnType<typeof setTimeout>;
  let timeoutHide: ReturnType<typeof setTimeout>;
  let containerE: HTMLDivElement | undefined;

  const [isVisible, setIsVisible] = createSignal(false);
  const [computedPosition, setComputedPosition] = createSignal<
    'top' | 'bottom'
  >('top');

  const showTooltip = () => {
    if (timeoutHide) clearTimeout(timeoutHide);

    // Calculate position for viewport-relative
    if (props.position === 'viewport-relative' && containerE) {
      const rect = containerE.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceAbove = rect.top;
      const spaceBelow = viewportHeight - rect.bottom;

      // Default to top, but switch to bottom if not enough space above
      setComputedPosition(
        spaceAbove < 100 && spaceBelow > spaceAbove ? 'bottom' : 'top',
      );
    }

    timeoutShow = setTimeout(() => {
      setIsVisible(true);
    }, props.showDelay ?? 500);
  };

  const hideTooltip = () => {
    if (timeoutShow) clearTimeout(timeoutShow);
    timeoutHide = setTimeout(() => {
      setIsVisible(false);
    }, props.hideDelay ?? 200);
  };

  const [_handlers, local] = splitProps(props, [
    'onMouseOver',
    'onMouseOut',
    'onFocus',
    'onBlur',
  ]);

  const onMouseOver: ExtractFn<'onMouseOver'> = e => {
    showTooltip();
    return undefinedCall(_handlers.onMouseOver, e);
  };

  const onMouseOut: ExtractFn<'onMouseOut'> = e => {
    hideTooltip();
    return undefinedCall(_handlers.onMouseOut, e);
  };

  const onFocus: ExtractFn<'onFocus'> = e => {
    showTooltip();
    return undefinedCall(_handlers.onFocus, e);
  };

  const onBlur: ExtractFn<'onBlur'> = e => {
    hideTooltip();
    return undefinedCall(_handlers.onBlur, e);
  };

  const positionClass = createMemo(() =>
    getPositionClass(props.position, computedPosition()),
  );

  const handlers = {
    onMouseOver,
    onMouseOut,
    onFocus,
    onBlur,
  };

  return {
    isVisible,
    positionClass,
    containerE,
    handlers,
    local,
  };
};
