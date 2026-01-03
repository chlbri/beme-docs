import type { Accessor, Setter } from 'solid-js';

export type StackItem = {
  id: number;
  name: string;
  type?: 'main' | 'promise' | 'timeout';
};

export type Item = {
  name: string;
} & (
  | {
      type: 'timeout';
      delay: number;
    }
  | {
      type: 'promise' | 'main';
      delay?: never;
    }
);

export type WebApiItem = {
  id: number;
  name: string;
  delay: number;
  remaining: Accessor<number>;
  setRemaining: Setter<number>;
};

export type QueueItem = {
  id: number;
  name: string;
};
