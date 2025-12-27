import { Renderer2 } from '@angular/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { initListeners } from '../utils';
import { Event } from '../models';

describe('initListeners', () => {
  let renderer2Mock: Renderer2;

  beforeEach(() => {
    // Mock Renderer2
    renderer2Mock = {
      listen: vi.fn(),
    } as unknown as Renderer2;
  });

  it('should call the correct instance method when event fires', () => {
    const spyFn = vi.fn();
    class TestClass {
      myAction = spyFn;
    }
    const instance = new TestClass();
    const event: Event = { type: 'click', action: 'myAction' };

    // Correctly mock listen with 3 args
    (renderer2Mock.listen as any).mockImplementation(
      (host: string, eventName: string, callback: (e: any) => void) => {
        // simulate event firing
        callback({ detail: 'testData' });
        return vi.fn(); // unlistener
      }
    );

    const unlisteners = initListeners([event], instance, renderer2Mock);

    expect(spyFn).toHaveBeenCalledWith('testData');
    expect(unlisteners.length).toBe(1);
  });

  it('should throw if the instance method does not exist', () => {
    class TestClass {}
    const instance = new TestClass();
    const event: Event = { type: 'click', action: 'nonExistent' };

    (renderer2Mock.listen as any).mockImplementation(
      (host: string, eventName: string, callback: (e: any) => void) => {
        // calling the callback triggers the error in initListeners
        callback({ detail: null });
        return vi.fn();
      }
    );

    expect(() => initListeners([event], instance, renderer2Mock)).toThrowError(
      /Interceptor error: "nonExistent" is not a function on TestClass/
    );
  });

  it('should return an array of unlisteners', () => {
    class TestClass {
      someAction() {}
    }
    const instance = new TestClass();
    const event: Event = { type: 'scroll', action: 'someAction' };

    const dummyUnlistener = vi.fn();
    (renderer2Mock.listen as any).mockReturnValue(dummyUnlistener);

    const unlisteners = initListeners([event], instance, renderer2Mock);

    expect(unlisteners).toEqual([dummyUnlistener]);
  });

  it('should call all instance methods for multiple events and return all unlisteners', () => {
    const spyFn1 = vi.fn();
    const spyFn2 = vi.fn();
    const spyFn3 = vi.fn();

    class TestClass {
      actionOne = spyFn1;
      actionTwo = spyFn2;
      actionThree = spyFn3;
    }

    const instance = new TestClass();

    const events: Event[] = [
      { type: 'click', action: 'actionOne' },
      { type: 'scroll', action: 'actionTwo' },
      { type: 'keydown', action: 'actionThree' },
    ];

    // Each call to renderer2.listen returns a different unlistener
    const unlistenerMocks = [vi.fn(), vi.fn(), vi.fn()];

    let callCount = 0;
    (renderer2Mock.listen as any).mockImplementation(
      (host: string, eventName: string, callback: (e: any) => void) => {
        // simulate event firing immediately
        callback({ detail: `data-${callCount + 1}` });
        return unlistenerMocks[callCount++];
      }
    );

    const unlisteners = initListeners(events, instance, renderer2Mock);

    // All instance methods called with correct data
    expect(spyFn1).toHaveBeenCalledWith('data-1');
    expect(spyFn2).toHaveBeenCalledWith('data-2');
    expect(spyFn3).toHaveBeenCalledWith('data-3');

    // All unlisteners returned
    expect(unlisteners).toEqual(unlistenerMocks);

    // Ensure listen was called for each event type
    expect(renderer2Mock.listen).toHaveBeenCalledTimes(3);
    expect(renderer2Mock.listen).toHaveBeenCalledWith('window', 'click', expect.any(Function));
    expect(renderer2Mock.listen).toHaveBeenCalledWith('window', 'scroll', expect.any(Function));
    expect(renderer2Mock.listen).toHaveBeenCalledWith('window', 'keydown', expect.any(Function));
  });
});
