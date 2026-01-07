import type { Accessor, Component } from 'solid-js';
import type { OmitPropsOf } from '../types';
import { cn } from '../cn/utils';

export const Counter: Component<
  {
    count: Accessor<number>;
  } & OmitPropsOf<'button'>
> = ({ onClick, children: children, count, ...props }) => {
  return (
    <button
      class={cn(
        'px-5 py-3 bg-blue-200 text-blue-800 rounded-2xl border-2 border-gray-900 outline-none cursor-pointer focus:border-blue-600 active:bg-gray-200',
        props.class,
      )}
      onClick={onClick}
      type='button'
    >
      {`${children}${count()}`}
    </button>
  );
};
