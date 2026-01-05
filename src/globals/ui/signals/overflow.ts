import { createSignal } from 'solid-js';

export const isOverFlowed = (threshold = 0) => {
  const [element, setElement] = createSignal<HTMLElement>();
  const out = () => {
    const el = element();
    return el
      ? el.scrollWidth > el.offsetWidth + threshold ||
          el.scrollHeight > el.offsetHeight + threshold
      : false;
  };
  return [out, setElement] as const;
};

isOverFlowed.x = (threshold = 0) => {
  const [element, setElement] = createSignal<HTMLElement>();
  const out = () => {
    const el = element();
    return el ? el.scrollWidth > el.offsetWidth + threshold : false;
  };
  return [out, setElement] as const;
};

isOverFlowed.y = (threshold = 0) => {
  const [element, setElement] = createSignal<HTMLElement>();
  const out = () => {
    const el = element();
    return el ? el.scrollHeight > el.offsetHeight + threshold : false;
  };
  return [out, setElement] as const;
};
