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

  const minWidth = createMemo(() => {
    // Calculate min width based on the length of the larger value
    let valLength = Math.max(
      String(props.value()).length,
      String(props.sync()).length,
    );
    if (notSynced()) valLength += 0.5; // Extra space for warning icon;
    return `${valLength}ch`;
  });

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
      <div class='flex items-center justify-between space-x-2'>
        <span
          class='text-xl text-blue-500 text-start text-ellipsis text-nowrap overflow-hidden grow max-w-min transition-discrete duration-150 ease-in-out'
          classList={{ 'text-slate-400': changed() }}
        >
          {props.title}
        </span>
        <div
          class='text-5xl font-black select-none transition-colors duration-150 ease-in-out grow inline w-fit'
          classList={{
            'text-red-400': changed(),
            'text-slate-700': !changed(),
          }}
          style={{ 'min-width': minWidth() }}
        >
          <div class='@container/main flex items-center space-x-1 justify-end'>
            <Show when={notSynced()}>
              <div class='text-xl flex flex-col items-center'>
                <div class='animate-pulse @5xs/main:-mb-1'>⚠️</div>
                <div class='text-2xs font-light text-yellow-600 @max-5xs/main:hidden tracking-tight text-nowrap'>
                  out of sync
                </div>
              </div>
            </Show>
            <span class='opacity-55'>{props.value()}</span>
          </div>
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
