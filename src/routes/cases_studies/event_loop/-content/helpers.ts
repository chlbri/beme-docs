import { createMemo, type Accessor } from 'solid-js';
import type { Item } from './types';

export const generateCode = (items: Accessor<Item[]>) => {
  return createMemo(() => {
    type Group = { code: string; indent: number }[];
    const lines: Group[] = [];

    items().forEach(item => {
      if (item.type === 'main') {
        const group: Group = [
          { code: `console.log('${item.name}')`, indent: 0 },
        ];
        lines.push(group);
      } else if (item.type === 'timeout') {
        const group: Group = [];
        group.push({ code: `setTimeout(() => {`, indent: 0 });
        group.push({ code: `console.log('${item.name}')`, indent: 1 });
        group.push({ code: `}, ${item.delay})`, indent: 0 });
        lines.push(group);
      } else if (item.type === 'promise') {
        const group: Group = [];
        group.push({ code: `Promise.resolve('${item.name}')`, indent: 0 });
        group.push({ code: `.then(res => console.log(res))`, indent: 1 });
        lines.push(group);
      }
    });

    return lines;
  });
};
