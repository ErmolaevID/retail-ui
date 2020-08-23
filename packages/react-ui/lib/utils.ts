import { ReactComponentLike } from 'prop-types';

import { isClient } from './client';

// NOTE: Copy-paste from @types/react
export type Defaultize<P, D> = P extends any
  ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
        Partial<Pick<P, Extract<keyof P, keyof D>>> &
        Partial<Pick<D, Exclude<keyof D, keyof P>>>
  : never;

export type DefaultizeProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const emptyHandler = () => {
  /* noop */
};

export class CancelationError extends Error {
  public code = 'CancelationError';
}

export function taskWithDelay(task: () => void, ms: number) {
  let cancelationToken: () => void = () => null;

  new Promise((resolve, reject) => {
    cancelationToken = reject;
    setTimeout(resolve, ms);
  })
    .then(task)
    .catch(() => null);

  return cancelationToken;
}

export function isFunction<T>(x: T | Function): x is Function {
  return typeof x === 'function';
}

export function isFunctionalComponent(Component: ReactComponentLike) {
  return typeof Component === 'function' && !(Component.prototype && Component.prototype.isReactComponent);
}

export function escapeRegExpSpecChars(s: string): string {
  return s.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const getRandomID = (): string =>
  Math.random()
    .toString(16)
    .slice(2);

export const hasSvgAnimationSupport = (() => {
  let has: boolean | null = null;

  return () => {
    if (has !== null) {
      return has;
    }
    if (!isClient()) {
      return false;
    }
    if (document.createElementNS) {
      const namespaceURI = 'http://www.w3.org/2000/svg';
      const element = document.createElementNS(namespaceURI, 'animate');

      if (element) {
        return (has = element.toString().includes('SVGAnimate'));
      }
    }

    return (has = false);
  };
})();

export const isExternalLink = (link: string): boolean => {
  return new RegExp(`^(https?:)?//(?!${window.location.host})\\S+`, 'gi').test(link);
};

