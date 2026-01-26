import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { PAYLOAD_PROTOTYPE, TRUSTED_EVENT } from '../consts';
import { GEvent } from '../classes';
import { broadcast } from '../api';

describe('broadcast', () => {
  let dispatchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    dispatchSpy = vi.spyOn(window, 'dispatchEvent');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('should dispatch a CustomEvent with the given type', () => {
    const event = new GEvent('test:event', {});

    broadcast(event);

    expect(dispatchSpy).toHaveBeenCalledOnce();
    expect(dispatchSpy.mock.calls[0][0]).toBeInstanceOf(CustomEvent);
    expect(dispatchSpy.mock.calls[0][0].type).toBe('test:event');
  });

  it('should copy payload properties into event.detail', () => {
    const payload = { foo: 'bar', count: 3 };
    const event = new GEvent('payload:event', payload);

    broadcast(event);

    const dispatchedEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(dispatchedEvent.detail).toMatchObject({ data: payload});
  });

  it('should not reuse the original payload object', () => {
    const payload = { a: 1 };
    const event = new GEvent('clone:event', payload);

    broadcast(event);

    const dispatchedEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(dispatchedEvent.detail).not.toBe(payload);
  });

  it('should create detail object with PAYLOAD_PROTOTYPE as its prototype', () => {
    const event = new GEvent('proto:event', {});

    broadcast(event);

    const dispatchedEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(Object.getPrototypeOf(dispatchedEvent.detail)).toBe(PAYLOAD_PROTOTYPE);
  });

  it('should expose TRUSTED_EVENT via prototype chain', () => {
    const event = new GEvent('trusted:event', {});

    broadcast(event);

    const dispatchedEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;

    // accessible
    expect(dispatchedEvent.detail[TRUSTED_EVENT]).toBe(true);

    // but not an own property
    expect(
      Object.prototype.hasOwnProperty.call(
        dispatchedEvent.detail,
        TRUSTED_EVENT
      )
    ).toBe(false);
  });

  it('should dispatch event with null payload when payload is null', () => {
    const event = new GEvent<'TEST_EVENT', null>('TEST_EVENT', null);

    broadcast(event);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    const dispatchedEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;

    expect(dispatchedEvent.detail).toBeDefined();
    expect(dispatchedEvent.detail.data).toBeNull();
  });
});

describe('broadcast – runtime guard', () => {
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
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

    Object.defineProperty(globalThis, 'dispatchEvent', {
      value: originalDispatchEvent,
      configurable: true,
    });
  });

  it('returns early when runtime does NOT support DOM events', () => {
    // Simulate SSR
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
    });

    Object.defineProperty(globalThis, 'document', {
      value: undefined,
      configurable: true,
    });

    const dispatchSpy = vi.fn();
    Object.defineProperty(globalThis, 'dispatchEvent', {
      value: dispatchSpy,
      configurable: true,
    });

    broadcast({
      type: 'TEST_EVENT',
      payload: { foo: 'bar' },
    });

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});