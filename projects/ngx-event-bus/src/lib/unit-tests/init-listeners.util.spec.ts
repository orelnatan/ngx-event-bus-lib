import type { Renderer2 } from '@angular/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { PAYLOAD_PROTOTYPE } from '../consts';
import { initListeners } from '../utils';

describe('initListeners', () => {
  let renderer2: Renderer2;

  beforeEach(() => {
    renderer2 = {
      listen: vi.fn(() => vi.fn()), // returns unsubscribe fn
    } as unknown as Renderer2;
  });

  it('should register a listener for each event', () => {
    const events = [
      { type: 'event:a', action: 'onA' },
      { type: 'event:b', action: 'onB' },
    ];

    const instance = {
      onA: vi.fn(),
      onB: vi.fn(),
    };

    const unsubscribers = initListeners(events, instance, renderer2);

    expect(renderer2.listen).toHaveBeenCalledTimes(2);
    expect(unsubscribers).toHaveLength(2);
    unsubscribers.forEach(fn => expect(typeof fn).toBe('function'));
  });

  it('should listen on window with the correct event type', () => {
    const events = [{ type: 'test:event', action: 'onEvent' }];
    const instance = { onEvent: vi.fn() };

    initListeners(events, instance, renderer2);

    expect(renderer2.listen).toHaveBeenCalledWith(
      'window',
      'test:event',
      expect.any(Function)
    );
  });

  it('should call instance action with trusted payload', () => {
    const events = [{ type: 'trusted:event', action: 'handle' }];
    const instance = { handle: vi.fn() };

    initListeners(events, instance, renderer2);

    const listener = (renderer2.listen as any).mock.calls[0][2];

    const trustedDetail = Object.create(PAYLOAD_PROTOTYPE);
    trustedDetail.foo = 'bar';

    listener({ detail: trustedDetail });

    expect(instance.handle).toHaveBeenCalledOnce()
    expect(instance.handle).toHaveBeenCalledWith(trustedDetail[0]);
  });

  it('should ignore events with untrusted payload prototype', () => {
    const events = [{ type: 'untrusted:event', action: 'handle' }];
    const instance = { handle: vi.fn() };

    initListeners(events, instance, renderer2);

    const listener = (renderer2.listen as any).mock.calls[0][2];

    listener({ detail: { foo: 'bar' } });

    expect(instance.handle).not.toHaveBeenCalled();
  });

  it('should throw an error if action is not a function', () => {
    const events = [{ type: 'bad:event', action: 'missingHandler' }];
    const instance = {}; // no method

    initListeners(events, instance, renderer2);

    const listener = (renderer2.listen as any).mock.calls[0][2];

    const trustedDetail = Object.create(PAYLOAD_PROTOTYPE);

    expect(() => listener({ detail: trustedDetail })).toThrowError(
      'Interceptor error: "missingHandler" is not a function'
    );
  });
});
