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
      class='flex flex-col mt-5 space-y-4 ring ring-blue-500 p-4 rounded-lg'
      classList={{ 'ring-4 ring-red-400 ring-offset-4': changed() }}
    >
      <h2
        class='text-base text-blue-500'
        classList={{ 'text-red-400': changed() }}
      >
        {props.title}
      </h2>
      <div class='grid grid-cols-2 gap-x-10 gap-y-5'>
        <Btn
          children='Increment : '
          onClick={props.increment}
          class='text-xs px-3 py-1.5 rounded-md'
        />
        <Btn
          children='Increment (+5) : '
          onClick={props.incrementByFive}
          class='text-xs px-3 py-2 rounded-md'
        />
        <Btn
          children='Decrement : '
          onClick={props.decrement}
          class='text-xs px-3 py-2 rounded-md'
        />
        <Btn
          children='Decrement by (-7) : '
          onClick={props.decrementBySeven}
          class='text-xs px-3 py-2 rounded-md'
        />
      </div>
    </div>
  );
};
