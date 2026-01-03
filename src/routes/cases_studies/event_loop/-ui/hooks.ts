import { createMemo, createSignal } from 'solid-js';
import type { Item, QueueItem, StackItem, WebApiItem } from './types';
import { generateCode } from './helpers';
import { DEFAULT_ITEMS } from './constants';
import { sleep } from '~/globals/ui/helpers';

export type Props = {
  defaultItems?: Item[];
  slowTimeFactor?: 1 | 2 | 4 | 8 | 10;
  delay?: number;
};

export const useHooks = ({
  defaultItems = DEFAULT_ITEMS,
  slowTimeFactor,
  delay,
}: Props) => {
  const MULTIPLIER = slowTimeFactor ?? 2;
  const DELAY = delay ?? 500;

  const waitDelay = () => sleep(DELAY);
  const [items, _setItems] = createSignal(defaultItems);

  const [callStack, setCallStack] = createSignal<StackItem[]>([]);
  const [webApis, setWebApis] = createSignal<WebApiItem[]>([]);
  const [microtaskQueue, setMicrotaskQueue] = createSignal<QueueItem[]>(
    [],
  );
  const [macrotaskQueue, setMacrotaskQueue] = createSignal<QueueItem[]>(
    [],
  );
  const [consoleOutput, setConsoleOutput] = createSignal<string[]>([]);
  const [isRunning, setIsRunning] = createSignal(false);
  const [activeTask, setActiveTask] = createSignal<string | null>(null);
  const [floatedPosition, setFloatedPosition] = createSignal(-1);

  const resetFloatedPosition = () => setFloatedPosition(-1);

  const isFloated = (index: number) => floatedPosition() === index + 1;

  const addItems = (...newItems: Item[]) => {
    _setItems(prev => [...prev, ...newItems]);
  };

  const addItemFloated = (item: Item) => {
    const index = floatedPosition();
    if (!isRunning() && index !== -1) {
      _setItems(prev => {
        const newItems = [...prev];
        newItems.splice(index, 0, item);
        return newItems;
      });
    }
  };

  const removeItem = (index: number) => {
    if (!isRunning()) {
      _setItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const eraseAllItems = () => {
    if (!isRunning()) _setItems([]);
  };

  const resetItems = () => {
    if (!isRunning()) {
      _setItems(defaultItems);
      resetFloatedPosition();
    }
  };

  let idCounter = 0;
  const getId = () => ++idCounter;
  const code = generateCode(items);

  const log = (message: string) => {
    setConsoleOutput(prev => [...prev, message]);
  };

  const pushToStack = (
    name: string,
    type?: StackItem['type'],
  ): StackItem => {
    const item = { id: getId(), name, type };
    setCallStack(prev => [...prev, item]);
    return item;
  };

  const popFromStack = () => {
    setCallStack(prev => prev.slice(0, -1));
    //remove last element
  };

  const addToWebApi = (name: string, delay: number): WebApiItem => {
    const [_remaining, setRemaining] = createSignal(delay * MULTIPLIER);

    const remaining = createMemo(() => _remaining() / MULTIPLIER);
    const item = { id: getId(), name, delay, remaining, setRemaining };
    setWebApis(prev => [...prev, item]);
    return item;
  };

  const removeFromWebApi = (id: number) => {
    setWebApis(prev => prev.filter(item => item.id !== id));
  };

  const addToMacrotaskQueue = (name: string) => {
    setMacrotaskQueue(prev => [...prev, { id: getId(), name }]);
  };

  const addToMicrotaskQueue = (name: string) => {
    setMicrotaskQueue(prev => [...prev, { id: getId(), name }]);
  };

  const popFromMacrotaskQueue = (): QueueItem | undefined => {
    const queue = macrotaskQueue();
    if (queue.length === 0) return undefined;
    const item = queue[0];
    setMacrotaskQueue(prev => prev.slice(1));
    return item;
  };

  const popFromMicrotaskQueue = (): QueueItem | undefined => {
    const queue = microtaskQueue();
    if (queue.length === 0) return undefined;
    const item = queue[0];
    setMicrotaskQueue(prev => prev.slice(1));
    return item;
  };

  const runEventLoop = async () => {
    while (isRunning()) {
      // Only run if call stack is empty
      if (callStack().length === 0) {
        // 1. Check Microtask Queue first (Process ALL microtasks)
        if (microtaskQueue().length > 0) {
          setActiveTask('microtask');
          await waitDelay();
          const task = popFromMicrotaskQueue();
          if (task) {
            pushToStack(task.name, 'promise');
            await waitDelay();
            // Extract message from callback name
            const match = task.name.match(/'([^']+)'/);
            if (match) {
              log(match[1]);
            }
            popFromStack();
          }
          setActiveTask(null);
          continue; // Continue loop to check for more microtasks
        }

        // 2. If Microtask Queue is empty, check Macrotask Queue (Process ONE macrotask)
        if (macrotaskQueue().length > 0) {
          setActiveTask('macrotask');
          await waitDelay();
          const task = popFromMacrotaskQueue();
          if (task) {
            pushToStack(task.name, 'timeout');
            await waitDelay();
            // Extract message from callback name
            const match = task.name.match(/'([^']+)'/);
            if (match) {
              log(match[1]);
            }
            popFromStack();
          }
          setActiveTask(null);
        }
      }
      await waitDelay();
    }
  };

  const runWebApiTimers = async () => {
    while (isRunning()) {
      for (const api of webApis()) {
        if (api.remaining() > 0) {
          api.setRemaining(remaining => Math.max(0, remaining - 100));
        } else {
          removeFromWebApi(api.id);
          addToMacrotaskQueue(api.name);
        }
      }
      await sleep(100);
    }
  };

  const _resetOutputs = () => {
    setCallStack([]);
    setWebApis([]);
    setMacrotaskQueue([]);
    setMicrotaskQueue([]);
    setConsoleOutput([]);
  };

  const runDemo = async () => {
    // #region Reset state
    _resetOutputs();
    setIsRunning(true);
    // #endregion

    // #region Start background processes
    runEventLoop();
    runWebApiTimers();
    // #endregion

    items().forEach(item => {
      if (item.type === 'main') {
        pushToStack(`console.log('${item.name}')`, 'main');
        setTimeout(() => {
          log(item.name);
          popFromStack();
        }, DELAY);
      } else if (item.type === 'timeout') {
        setTimeout(() => {
          addToWebApi(`cb: console.log('${item.name}')`, item.delay);
          popFromStack();
        }, DELAY);
      } else if (item.type === 'promise') {
        setTimeout(() => {
          addToMicrotaskQueue(`cb: console.log('${item.name}')`);
          popFromStack();
        }, DELAY);
      }
    });

    // Wait for queues to empty
    while (
      callStack().length > 0 ||
      webApis().length > 0 ||
      microtaskQueue().length > 0 ||
      macrotaskQueue().length > 0
    ) {
      await sleep(100);
    }

    await waitDelay();
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    _resetOutputs();
    resetFloatedPosition();
    setActiveTask(null);
  };

  return {
    items,
    addItems,
    removeItem,
    resetItems,
    eraseAllItems,
    addItemFloated,
    isFloated,
    setFloatedPosition,
    resetFloatedPosition,
    callStack,
    webApis,
    microtaskQueue,
    macrotaskQueue,
    consoleOutput,
    isRunning,
    activeTask,
    code,
    runDemo,
    reset,
  };
};
