import type { Accessor } from 'solid-js';
import { reduceComponent } from '~ui/molecules';
import { Counter } from '~ui/molecules/Counter';
import { createCounter } from '~ui/signals';

export const createBtn = (count: Accessor<number>) => {
  return reduceComponent(Counter, { count });
};

export const useHook = (data: number) => {
  const { count, increment, decrement, incrementFn, decrementFn } =
    createCounter(data);

  const incrementByFive = incrementFn(5);
  const decrementBySeven = decrementFn(7);

  return {
    count,
    increment,
    decrement,
    incrementByFive,
    decrementBySeven,
  };
};
