import {
  createEffect,
  createMemo,
  createSignal,
  on,
  Show,
  type Component,
} from 'solid-js';
import { createBtn } from './-states.hooks';
import type { BtnGroupProps } from './-states.types';

export const BtnGroup: Component<BtnGroupProps> = props => {
  const Btn = createBtn(props.value);
  const [changed, setChanged] = createSignal(false);
  const notSynced = createMemo(() => props.value() < props.sync());

  createEffect(
    on(props.value, () => {
      setChanged(true);
      setTimeout(() => setChanged(false), 300);
    }),
  );

  return (
    <div
      class='relative flex flex-col mt-5 space-y-4 ring-2 ring-blue-500 p-4 transition duration-150 ease-in-out'
      classList={{ 'ring-4 ring-red-400': changed() }}
    >
      <div class='flex items-center justify-between space-x-4'>
        <h2
          class='text-base text-blue-500 text-start text-ellipsis text-nowrap'
          classList={{ 'text-slate-400': changed() }}
        >
          {props.title}
        </h2>
        <div
          class='text-4xl font-black items-center flex space-x-0.5 select-none transition-colors duration-150 ease-in-out'
          classList={{
            'text-red-400': changed(),
            'text-slate-700': !changed(),
          }}
        >
          <Show when={notSynced()}>
            <span class='text-xl'>⚠️</span>
          </Show>
          <span class='opacity-55'>{props.value()}</span>
        </div>
      </div>
      <div class='grid grid-cols-2 gap-x-10 gap-y-5'>
        <Btn
          children='Increment : '
          onClick={props.increment}
          class='text-xs px-3 py-1.5 rounded-none'
        />
        <Btn
          children='Increment (+5) : '
          onClick={props.incrementByFive}
          class='text-xs px-3 py-2 rounded-none'
        />
        <Btn
          children='Decrement : '
          onClick={props.decrement}
          class='text-xs px-3 py-2 rounded-none'
        />
        <Btn
          children='Decrement by (-7) : '
          onClick={props.decrementBySeven}
          class='text-xs px-3 py-2 rounded-none'
        />
      </div>
    </div>
  );
};
