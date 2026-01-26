import { describe, it, expect, afterEach } from 'vitest';

import { isRuntimeDomEventSupport } from '../utils';

describe('isRuntimeDomEventSupport', () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  const originalAddEventListener = globalThis.addEventListener;
  const originalDispatchEvent = globalThis.dispatchEvent;

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      configurable: true,
    });

    Object.defineProperty(globalThis, 'document', {
      value: originalDocument,
      configurable: true,
    });

    Object.defineProperty(globalThis, 'addEventListener', {
      value: originalAddEventListener,
      configurable: true,
    });

    Object.defineProperty(globalThis, 'dispatchEvent', {
      value: originalDispatchEvent,
      configurable: true,
    });
  });

  it('returns true in a browser-like runtime', () => {
    Object.defineProperty(globalThis, 'window', {
      value: {},
      configurable: true,
    });

    Object.defineProperty(globalThis, 'document', {
      value: {},
      configurable: true,
    });

    Object.defineProperty(globalThis, 'addEventListener', {
      value: () => {},
      configurable: true,
    });

    Object.defineProperty(globalThis, 'dispatchEvent', {
      value: () => true,
      configurable: true,
    });

    expect(isRuntimeDomEventSupport()).toBe(true);
  });

  it('returns false in SSR (no window)', () => {
    // simulate SSR
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
    });

    Object.defineProperty(globalThis, 'document', {
      value: {},
      configurable: true,
    });

    Object.defineProperty(globalThis, 'addEventListener', {
      value: () => {},
      configurable: true,
    });

    Object.defineProperty(globalThis, 'dispatchEvent', {
      value: () => true,
      configurable: true,
    });

    expect(isRuntimeDomEventSupport()).toBe(false);
  });
});
