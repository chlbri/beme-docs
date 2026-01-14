import type { Accessor, Component, JSX } from 'solid-js';

export type BtnType = 'debounce' | 'normal';

export type Btn1 = Component<{
  onClick: () => void;
  children: JSX.Element;
}>;

export type BtnGroupProps = {
  title: JSX.Element;
  value: Accessor<number>;
  sync: Accessor<number>;
  increment: () => number;
  decrement: () => number;
  incrementByFive: () => number;
  decrementBySeven: () => number;
};
