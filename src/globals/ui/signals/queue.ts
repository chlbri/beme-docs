import {
  createQueuer as create,
  type QueuerOptions,
  type QueuerState,
} from '@tanstack/solid-pacer';
import {
  createEffect,
  createSignal,
  onMount,
  untrack,
  type Accessor,
} from 'solid-js';

type CreateProps<TValue, TSelected> = {
  fn: (item: TValue) => void;
  options?: QueuerOptions<TValue> & { defaultValue?: TValue };
  selector?: (state: QueuerState<TValue>) => TSelected;
};

export const createQueue = <TValue, TSelected>({
  fn,
  options,
  selector,
}: CreateProps<TValue, TSelected>) => {
  const [all, setQueue] = createSignal<TValue[]>([]);

  const _value = options?.defaultValue;
  if (_value) setQueue([_value]);

  const _queue = create<TValue, TSelected>(
    item => {
      setQueue(prev => [...prev, item]);
      fn(item);
    },
    options,
    selector,
  );

  const last = () => {
    const _items = all();
    return _items[_items.length - 1];
  };

  const queue = {
    ..._queue,
    all,
    last,
  };

  return queue;
};

type ListenProps<TValue, TSelected> = {
  fn: Accessor<TValue>;
  options?: QueuerOptions<TValue>;
  selector?: (state: QueuerState<TValue>) => TSelected;
};

export const listenQueue = <TValue, TSelected>({
  options,
  selector,
  fn,
}: ListenProps<TValue, TSelected>) => {
  const _queue = createQueue<TValue, TSelected>({
    options: { ...options, defaultValue: untrack(fn) },
    selector,
    fn: () => {},
  });

  createEffect(() => {
    _queue.addItem(fn());
  });

  onMount(_queue.start);

  return _queue;
};
