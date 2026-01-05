import type { ValuesOf } from '@bemedev/app-ts/lib/types';
import { JSX } from 'solid-js';

type Returns<T> = T extends (...args: any[]) => infer R ? R : undefined;

type CanBeFunction = ValuesOf<
  JSX.CustomEventHandlersCamelCase<any> &
    JSX.CustomEventHandlersLowerCase<any> &
    JSX.CustomEventHandlersNamespaced<any>
>;

export function undefinedCall<T = never>(value?: T): Returns<T>;
export function undefinedCall<T extends (...args: any) => any>(
  value: T | undefined,
  ...args: Parameters<T>
): Returns<T>;

export function undefinedCall<T extends CanBeFunction>(
  value: T | undefined,
  ...args: Parameters<Extract<T, (...args: any) => any>>
): Returns<T>;

export function undefinedCall<T>(value: T, ...args: any[]) {
  const out = (
    typeof value === 'function'
      ? (value as (...args: any[]) => any)(...args)
      : value
  ) as Returns<T>;

  return out;
}
