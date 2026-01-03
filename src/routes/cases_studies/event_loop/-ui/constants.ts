import type { Item } from './types';

export const DEFAULT_ITEMS: Item[] = [
  { type: 'main', name: 'Start!' },
  { type: 'timeout', name: 'Timeout (0 ms)!', delay: 0 },
  { type: 'timeout', name: 'Timeout (2000 ms)!', delay: 2000 },
  { type: 'promise', name: 'Promise!' },
  { type: 'main', name: 'End!' },
];
