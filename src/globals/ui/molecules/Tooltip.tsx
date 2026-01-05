import { type Component, type JSX } from 'solid-js';
import { cn } from '../cn/utils';
import type { OmitPropsOf } from '../types';
import { useHook } from './Tooltip.hook';

type Position =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'viewport-relative';

type Props = {
  tooltip: JSX.Element;
  showDelay?: number;
  hideDelay?: number;
  position?: Position;
} & OmitPropsOf<'div'>;

export const TootTip: Component<Props> = props => {
  const { isVisible, positionClass, containerE, handlers, local } =
    useHook(props);

  return (
    <div
      {...local}
      ref={containerE}
      class={cn('relative', props.class)}
      {...handlers}
    >
      {props.children}
      <div
        class={cn(
          'absolute z-50 px-2 py-1 text-sm text-white bg-black rounded-md shadow-lg whitespace-nowrap transition-opacity duration-200',
          positionClass(),
          isVisible()
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        {props.tooltip}
      </div>
    </div>
  );
};
