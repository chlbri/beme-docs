import { clickOutside } from '#directives';
import {
  createSignal,
  For,
  Show,
  type Accessor,
  type Component,
} from 'solid-js';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemInput,
  RadioGroupItemLabel,
} from '~cn-comp/radio-group';
import { Syntax } from './Syntax';
import { useHooks, type Props } from './hooks';
import type { Item } from './types';
import { createScroll } from '~signals/scroll';

// #region Directives ts-hack
{
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  [clickOutside];
}
// #endregion

export const EventLoop: Component<Props> = props => {
  const {
    callStack,
    removeItem,
    eraseAllItems,
    resetItems,
    setFloatedPosition,
    resetFloatedPosition,
    addItemFloated,
    isFloated,
    webApis,
    microtaskQueue,
    macrotaskQueue,
    consoleOutput,
    isRunning,
    code,
    runDemo,
    reset,
  } = useHooks(props);

  const [modalOpened, setModalOpened] = createSignal(false);
  const [itemType, setItemType] = createSignal<
    'main' | 'promise' | 'timeout'
  >('main');
  const [itemName, setItemName] = createSignal('');
  const [itemDelay, setItemDelay] = createSignal(1000);
  const { setRef: setScrollRef, scrollY } = createScroll();

  const openModal = (index: number) => {
    setModalOpened(true);
    setFloatedPosition(index);
    setItemType('main');
    setItemName('');
    setItemDelay(1000);
    scrollY();
  };

  const closeModal = () => {
    setModalOpened(false);
    resetFloatedPosition();
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const name = itemName().trim();
    if (!name) return;

    const type = itemType();
    const newItem: Item =
      type === 'timeout'
        ? {
            type,
            name: `${name} (${itemDelay()}ms)`,
            delay: itemDelay(),
          }
        : { type, name };

    addItemFloated(newItem);
    closeModal();
  };

  const Add: Component<{
    index: Accessor<number>;
  }> = ({ index }) => (
    <div
      class='h-0.5 mx-3 rounded-xl opacity-5 bg-orange-600 group my-2.5 cursor-pointer relative'
      classList={{
        'opacity-100 pointer-events-none':
          modalOpened() && isFloated(index()),
        'hover:opacity-95': !modalOpened(),
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='3'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='absolute inset-0 flex items-center justify-center size-3.5 bg-orange-600 rounded-full p-0.25 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform duration-200 ease-in-out group-active:scale-95 cursor-pointer'
        onClick={() => {
          openModal(index() + 1);
        }}
      >
        <line x1='12' y1='6' x2='12' y2='18' />
        <line x1='6' y1='12' x2='18' y2='12' />
      </svg>
    </div>
  );

  const Modal: Component = () => (
    <div
      class='absolute inset-0 z-50 p-2 pointer-events-none'
      use:clickOutside={closeModal}
    >
      <form
        class='bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg mt-2 opacity-100 pointer-events-auto min-w-[230px]'
        onSubmit={handleSubmit}
      >
        <h3 class='text-xs font-bold text-gray-200 mb-3'>
          Ajouter un élément
        </h3>

        <div class='space-y-3 text-2xs'>
          {/* Radio Group for Type */}
          <div>
            <label class='block text-gray-400 mb-2'>Type</label>
            <RadioGroup
              value={itemType()}
              onChange={setItemType}
              class='flex gap-4'
            >
              <RadioGroupItem
                value='main'
                class='flex items-center gap-1.5'
              >
                <RadioGroupItemInput />
                <RadioGroupItemControl />
                <RadioGroupItemLabel class=' text-gray-300 cursor-pointer'>
                  Main
                </RadioGroupItemLabel>
              </RadioGroupItem>
              <RadioGroupItem
                value='promise'
                class='flex items-center gap-1.5'
              >
                <RadioGroupItemInput />
                <RadioGroupItemControl />
                <RadioGroupItemLabel class=' text-gray-300 cursor-pointer'>
                  Promise
                </RadioGroupItemLabel>
              </RadioGroupItem>
              <RadioGroupItem
                value='timeout'
                class='flex items-center gap-1.5'
              >
                <RadioGroupItemInput />
                <RadioGroupItemControl />
                <RadioGroupItemLabel class=' text-gray-300 cursor-pointer'>
                  Timeout
                </RadioGroupItemLabel>
              </RadioGroupItem>
            </RadioGroup>
          </div>

          {/* Name Input */}
          <div>
            <label class='block text-gray-400 mb-1 text-xs'>Nom</label>
            <input
              type='text'
              value={itemName()}
              onInput={e => setItemName(e.currentTarget.value)}
              class='w-full bg-[#0d1117] border border-gray-700 rounded px-1.5 py-1 text-gray-200 focus:outline-none focus:border-orange-500'
              placeholder="Ex: console.log('Hello')"
              required
            />
          </div>

          {/* Delay Input (only for timeout) */}
          <Show when={itemType() === 'timeout'}>
            <div>
              <label class='block text-gray-400 mb-1'>Délai (ms)</label>
              <input
                type='number'
                value={itemDelay()}
                onInput={e => setItemDelay(Number(e.currentTarget.value))}
                min='0'
                step='100'
                class='w-full bg-[#0d1117] border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-orange-500'
              />
            </div>
          </Show>

          {/* Buttons */}
          <div class='flex gap-2 pt-2 text-xs'>
            <button
              type='submit'
              class='flex-1 px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded font-medium transition-colors'
            >
              Ajouter
            </button>
            <button
              type='button'
              onClick={closeModal}
              class='flex-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded font-medium transition-colors'
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div class='bg-[#0d1117] text-white p-4 font-sans h-full grow min-w-7xl w-full'>
      <div class='max-w-7xl mx-auto'>
        <div class='flex justify-between items-center mb-8'>
          <h1 class='text-2xl font-bold text-gray-200'>
            Event Loop Visualization
          </h1>
          <div class='flex gap-4'>
            <button
              onClick={runDemo}
              disabled={isRunning()}
              class='px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-medium transition-colors'
            >
              {isRunning() ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={reset}
              class='px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors'
            >
              Reset
            </button>
          </div>
        </div>

        <div class='flex flex-col lg:flex-row gap-6 h-[600px]'>
          {/* Left Column: Code & Console */}
          <div class='w-full lg:w-1/3 flex flex-col gap-4 h-full'>
            {/* Code Editor */}
            <div class='bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden flex flex-col h-1/2 w-full'>
              <div class='bg-[#0d1117] px-3 py-2 border-b border-gray-700 text-xs text-gray-400 flex items-center justify-between'>
                <button
                  class='size-4 rounded-full bg-red-500/20 border border-red-500/50 p-0.5 hover:scale-125 transition-transform duration-200 ease-in-out active:scale-95 cursor-pointer'
                  onClick={eraseAllItems}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='w-full h-full'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </button>

                <span class='font-bold'>script.js</span>
                <div class='flex space-x-3'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    class='size-4 rounded-full bg-yellow-500/20 border border-yellow-500/50 p-0.5 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer active:scale-95 stroke-gray-300'
                    onClick={resetItems}
                  >
                    <g fill='none' stroke='currentColor' stroke-width='3'>
                      <path
                        d='m13 8.768l6.097-4.46C20.399 3.411 22 4.58 22 6.426v11.148c0 1.847-1.6 3.015-2.903 2.118L13 15.232'
                        opacity='.5'
                      />
                      <path d='M2.921 10.147c-1.228.807-1.228 2.899 0 3.706l7.418 4.877c1.194.785 2.661-.237 2.661-1.853V7.123c0-1.616-1.467-2.638-2.661-1.853z' />
                    </g>
                  </svg>
                  <button class='size-4 rounded-full bg-blue-500/20 border border-blue-500/50 p-0.25 hover:scale-125 transition-transform duration-200 ease-in-out active:scale-95 cursor-pointer'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      stroke-width='3'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      class='w-full h-full'
                    >
                      <line x1='12' y1='6' x2='12' y2='18' />
                      <line x1='6' y1='12' x2='18' y2='12' />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                class='p-3 font-mono text-2xs leading-relaxed overflow-auto relative flex-1 text-start flex flex-col select-none'
                ref={setScrollRef}
              >
                <div>
                  <Add index={() => -1} />
                </div>

                {modalOpened() && <Modal />}

                <For each={code()}>
                  {(line, index) => (
                    <div>
                      <div class='w-full flex justify-between item-center'>
                        <div>
                          <For each={line} children={Syntax} />
                        </div>
                        <button
                          class='grayscale-45'
                          onClick={() => {
                            removeItem(index());
                          }}
                        >
                          ❌
                        </button>
                      </div>
                      <Add index={index} />
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Console Output */}
            <div class='bg-black border border-gray-800 rounded-lg overflow-hidden flex flex-col h-1/2 shadow-inner'>
              <div class='bg-[#161b22] px-4 py-2 border-b border-gray-800 text-xs text-gray-400'>
                Console
              </div>
              <div class='p-3 font-mono text-sm flex-1 overflow-auto text-start pl-5'>
                <For each={consoleOutput()}>
                  {log => (
                    <div class='text-gray-300 mb-1'>
                      <span class='text-gray-600 mr-2'>&gt;</span>
                      {log}
                    </div>
                  )}
                </For>
                <Show when={consoleOutput().length === 0}>
                  <div class='text-gray-600 italic'>
                    Waiting for output...
                  </div>
                </Show>
              </div>
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div class='w-full lg:w-2/3 relative flex flex-col gap-6'>
            {/* Top Row: Stack & Web API */}
            <div class='flex gap-6 h-1/3'>
              {/* Call Stack */}
              <div
                class='flex-1 border-2 border-green-500/50 rounded-xl p-4 flex flex-col relative transform duration-200 ease-in-out'
                classList={{
                  'border-4': callStack().length > 0,
                }}
              >
                <div class='absolute -top-2 left-4 bg-[#0d1117] px-2 text-green-500 font-bold text-xs'>
                  CALL STACK
                </div>
                <div class='flex-1 flex flex-col gap-2 overflow-hidden'>
                  <For each={callStack().reverse()}>
                    {item => (
                      <div class='bg-green-900/30 border border-green-500/50 text-green-400 p-2 rounded text-center font-mono text-xs shadow-[0_0_10px_rgba(34,197,94,0.2)] animate-in fade-in slide-in-from-bottom-2 duration-300'>
                        {item.name}
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* Web API */}
              <div
                class='flex-1 border-2 border-red-500/50 rounded-xl p-4 flex flex-col relative bg-[#0d1117] transform duration-200 ease-in-out'
                classList={{
                  'border-4': webApis().length > 0,
                }}
              >
                <div class='absolute -top-2 left-4 bg-[#0d1117] px-2 text-red-500 font-bold text-xs'>
                  WEB API
                </div>
                <div class='flex-1 flex flex-col gap-2 overflow-hidden'>
                  <For each={webApis()}>
                    {item => (
                      <div class='bg-red-900/30 border border-red-500/50 text-red-400 p-2 rounded flex justify-between items-center font-mono text-xs shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-in fade-in zoom-in duration-300'>
                        <span class='truncate max-w-[70%]'>
                          {item.name}
                        </span>
                        <span class='text-[10px] bg-red-900/50 px-1 py-0.5 rounded'>
                          {item.remaining()} ms
                        </span>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>

            {/* Middle: Event Loop & Queues */}
            <div class='flex-1 flex gap-6 relative'>
              {/* Event Loop Circle */}
              <div class='w-1/4 flex flex-col justify-center items-center relative'>
                <div class='relative w-24 h-24 flex items-center justify-center'>
                  <div
                    class={`absolute inset-0 border-4 border-cyan-500/30 rounded-full ${isRunning() ? 'animate-spin-slow' : ''}`}
                    style={{ 'animation-duration': '3s' }}
                  ></div>
                  <div
                    class={`absolute inset-2 border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full ${isRunning() ? 'animate-spin' : ''}`}
                  ></div>
                  <div class='text-center z-10'>
                    <div class='text-cyan-400 font-bold text-xs'>
                      EVENT
                    </div>
                    <div class='text-cyan-400 font-bold text-xs'>LOOP</div>
                  </div>
                </div>
                {/* Arrows */}
              </div>

              <div class='flex-1 flex flex-col gap-6'>
                {/* Microtask Queue */}
                <div
                  class='flex-1 border-2 border-orange-500/50 rounded-xl p-4 flex flex-col relative transform duration-200 ease-in-out'
                  classList={{
                    'border-4': microtaskQueue().length > 0,
                  }}
                >
                  <div class='absolute -top-2 left-4 px-2 bg-[#0d1117]  text-orange-500 font-bold text-xs'>
                    MICROTASK QUEUE
                  </div>
                  <div class='flex-1 grid grid-cols-1 lg:grid-cols-2 items-start gap-1 overflow-auto px-2 no-scrollbar'>
                    <For each={microtaskQueue()}>
                      {item => (
                        <div class='min-w-[100px] bg-orange-900/30 border border-orange-500/50 text-orange-400 p-1.5 rounded text-center font-mono text-[10px] shadow-[0_0_10px_rgba(249,115,22,0.2)] animate-in fade-in slide-in-from-right-2 duration-300'>
                          {item.name}
                        </div>
                      )}
                    </For>
                  </div>
                </div>

                {/* Macrotask Queue */}
                <div
                  class='flex-1 border-2 border-yellow-500/50 rounded-xl p-4 flex flex-col relative transform duration-200 ease-in-out'
                  classList={{
                    'border-4': macrotaskQueue().length > 0,
                  }}
                >
                  <div class='absolute -top-2 left-4 px-2 bg-[#0d1117] text-yellow-500 font-bold text-xs'>
                    MACROTASK QUEUE
                  </div>
                  <div class='flex-1 grid grid-cols-1 lg:grid-cols-2 items-start gap-1 overflow-auto p-2 no-scrollbar'>
                    <For each={macrotaskQueue()}>
                      {item => (
                        <div class='min-w-[100px] bg-yellow-900/30 border border-yellow-500/50 text-yellow-400 p-1.5 rounded text-center font-mono text-[10px] shadow-[0_0_10px_rgba(234,179,8,0.2)] animate-in fade-in slide-in-from-right-2 duration-300'>
                          {item.name}
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
