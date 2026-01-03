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
    expect(dispatchedEvent.detail).toMatchObject(payload);
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
});
