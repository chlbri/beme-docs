import { createEffect, createSignal, on, type Component } from 'solid-js';
import { createBtn } from './-states.hooks';
import type { BtnGroupProps } from './-states.types';

export const BtnGroup: Component<BtnGroupProps> = props => {
  const Btn = createBtn(props.value);
  const [changed, setChanged] = createSignal(false);

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
      <div
        class='absolute -z-10 top-2 right-2 text-3xl opacity-55 font-black items-center justify-center flex text-slate-700 select-none'
        classList={{ 'text-red-400!': changed() }}
      >
        {props.value()}
      </div>
      <h2
        class='text-base text-blue-500'
        classList={{ 'text-slate-400': changed() }}
      >
        {props.title}
      </h2>
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
