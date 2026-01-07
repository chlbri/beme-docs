import {
  createBatcher as create,
  type BatcherOptions,
  type BatcherState,
} from '@tanstack/solid-pacer';
import {
  createEffect,
  createSignal,
  untrack,
  type Accessor,
} from 'solid-js';

type CreateProps<TValue, TSelected> = {
  fn: (items: Array<TValue>) => void;
  options?: BatcherOptions<any> & { defaultValue?: TValue };
  selector?: (state: BatcherState<TValue>) => TSelected;
};

export const createBatcher = <TValue, TSelected>({
  fn,
  options,
  selector,
}: CreateProps<TValue, TSelected>) => {
  const [all, setBatches] = createSignal<TValue[]>([]);

  const _value = options?.defaultValue;
  if (_value) setBatches([_value]);

  const _batch = create<TValue, TSelected>(
    items => {
      setBatches(prev => [...prev, ...items]);
      fn(items);
    },
    options,
    selector,
  );

  const last = () => {
    const _items = all();
    return _items[_items.length - 1];
  };

  const batch = {
    ..._batch,
    all,
    last,
  };

  return batch;
};

type ListenProps<TValue, TSelected> = {
  fn: Accessor<TValue>;
  options?: BatcherOptions<any>;
  selector?: (state: BatcherState<TValue>) => TSelected;
};

export const listenBatcher = <TValue, TSelected>({
  options,
  selector,
  fn,
}: ListenProps<TValue, TSelected>) => {
  const _batch = createBatcher<TValue, TSelected>({
    options: { ...options, defaultValue: untrack(fn) },
    selector,
    fn: () => {},
  });

  createEffect(() => {
    _batch.addItem(fn());
  });

  return _batch;
};
