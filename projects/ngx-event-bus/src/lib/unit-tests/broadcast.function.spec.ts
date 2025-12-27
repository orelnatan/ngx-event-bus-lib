import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { broadcast } from '../api';
import { GEvent } from '../classes';

describe('broadcast', () => {
  let dispatchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    dispatchSpy = vi.spyOn(window, 'dispatchEvent').mockImplementation(() => true);
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('should dispatch a CustomEvent with the correct type and payload', () => {
    const payload = { message: 'hello' };
    const event = new GEvent('TEST_EVENT', payload);

    broadcast(event);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<typeof payload>;
    expect(customEvent.type).toBe('TEST_EVENT');
    expect(customEvent.detail).toEqual(payload);
  });

  it('should work with void payload', () => {
    const event = new GEvent<void, 'VOID_EVENT'>('VOID_EVENT', undefined);
  
    broadcast(event);
  
    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<void>;
    expect(customEvent.type).toBe('VOID_EVENT');
    expect(customEvent.detail).toBeNull(); 
  });

  it('should handle string payload', () => {
    const payload = 'hello string';
    const event = new GEvent('STRING_EVENT', payload);

    broadcast(event);

    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<string>;
    expect(customEvent.detail).toBe(payload);
  });

  it('should handle numeric payload', () => {
    const payload = 42;
    const event = new GEvent('NUMBER_EVENT', payload);

    broadcast(event);

    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<number>;
    expect(customEvent.detail).toBe(42);
  });

  it('should handle null payload', () => {
    const event = new GEvent<null, 'NULL_EVENT'>('NULL_EVENT', null);

    broadcast(event);

    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<null>;
    expect(customEvent.detail).toBeNull();
  });

  it('should handle array payload', () => {
    const payload = [1, 2, 3];
    const event = new GEvent<number[], 'ARRAY_EVENT'>('ARRAY_EVENT', payload);

    broadcast(event);

    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<number[]>;
    expect(customEvent.detail).toEqual([1, 2, 3]);
  });

  it('should handle object payload', () => {
    const payload = { foo: 'bar', count: 10 };
    const event = new GEvent<typeof payload, 'OBJECT_EVENT'>('OBJECT_EVENT', payload);

    broadcast(event);

    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent<typeof payload>;
    expect(customEvent.detail).toEqual(payload);
  });
});
