import { createMemo } from 'solid-js';

export const createMemo2 = <T>(
  ...args: Parameters<typeof createMemo<NoInfer<T>, T, NoInfer<T>>>
) => createMemo<T, T, T>(...args);
