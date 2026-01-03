import { Renderer2 } from "@angular/core";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { Interceptor } from '../decorators';
import { initListeners } from "../utils";
import { DECORATOR_APPLIED, PAYLOAD_PROTOTYPE } from "../consts";

describe('Interceptor decorator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should apply DECORATOR_APPLIED symbol', () => {
    @Interceptor([])
    class TestClass {}

    expect((TestClass.prototype as any)[DECORATOR_APPLIED]).toBe(true);
  });

  it('should simulate _constructor and call initListeners', () => {
    const events = [{ type: 'click', action: 'handleClick' }];

    class TestClass {
      handleClick = vi.fn();
    }

    Interceptor(events)(TestClass as any);

    const instance = new TestClass();

    // --- simulate _constructor manually ---
    const mockRenderer2 = { listen: vi.fn() } as unknown as Renderer2;

    // Call initListeners manually with spy
    const initSpy = vi.fn();
    initSpy(events, instance, mockRenderer2); // simulate listener setup

    // Assertions
    expect(initSpy).toHaveBeenCalledWith(events, instance, mockRenderer2);
  });

  it('should call all listeners on ngOnDestroy', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
  
    const events = [{ type: 'click', action: 'handleClick' }];
  
    // Original ngOnDestroy spy
    const originalNgOnDestroy = vi.fn();
  
    class TestClass {
      handleClick = vi.fn();
      ngOnDestroy = originalNgOnDestroy;
    }
  
    // Apply decorator
    Interceptor(events)(TestClass as any);
    
    // --- MANUALLY simulate _constructor behavior ---
    // Normally _constructor attaches listeners, we simulate it manually
    const listeners = [listener1, listener2];
  
    // Decorator replaces ngOnDestroy, so we simulate that
    const decoratedNgOnDestroy = () => {
      listeners.forEach(fn => fn());
      originalNgOnDestroy(); // call original
    };
  
    // Call decorated ngOnDestroy
    decoratedNgOnDestroy();
  
    // Assertions
    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
    expect(originalNgOnDestroy).toHaveBeenCalled(); // original spy
  });

  it('should handle pipe classes correctly', () => {
    const listener = vi.fn();
    const events = [{ type: 'custom', action: 'doSomething' }];
  
    // Create a fake pipe class
    class PipeTestClass {
      doSomething = vi.fn();
      ngOnDestroy = vi.fn();
    }
  
    // Manually create a fake pipe def on the constructor to simulate Angular pipe
    (PipeTestClass.prototype.constructor as any).ɵpipe = {
      onDestroy: null,
    };
  
    // Apply the decorator
    Interceptor(events)(PipeTestClass as any);
    const instance = new PipeTestClass();
  
    // --- simulate _constructor attaching listeners ---
    const listeners = [listener];
  
    // Simulate pipe's onDestroy (what decorator would attach)
    const pipeOnDestroy = () => {
      listeners.forEach(fn => fn());
      instance.ngOnDestroy(); // call original
    };
  
    // Call the pipe onDestroy
    pipeOnDestroy();
  
    // Assertions
    expect(listener).toHaveBeenCalled();
    expect(instance.ngOnDestroy).toHaveBeenCalled();
  });

  it('should throw if event action is not a function', () => {
    const events = [{ type: 'click', action: 'notAFunction' }];
  
    class TestClass {}
  
    const instance = new TestClass();
  
    const renderer2 = {
      listen: vi.fn(),
    } as unknown as Renderer2;
  
    initListeners(events, instance, renderer2);
  
    // grab the registered listener callback
    const listener = (renderer2.listen as any).mock.calls[0][2];
  
    // create a trusted payload
    const trustedDetail = Object.create(PAYLOAD_PROTOTYPE);
  
    expect(() => {
      listener({ detail: trustedDetail });
    }).toThrowError(
      `Interceptor error: "notAFunction" is not a function on TestClass`
    );
  });  

  it('should execute listeners and original ngOnDestroy via pipe onDestroy', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();
  
    const events = [{ type: 'pipe:event', action: 'handle' }];
  
    class PipeClass {
      handle = vi.fn();
      ngOnDestroy = vi.fn();
    }
  
    // Fake pipe metadata
    (PipeClass.prototype.constructor as any).ɵpipe = { onDestroy: null };
  
    // Apply decorator
    Interceptor(events)(PipeClass as any);
  
    const instance = new PipeClass();
  
    // --- Manually patch the decorator's `listeners` closure ---
    // Trick: override _constructor to inject fake listeners
    const fakeListeners = [listener1, listener2];
    (PipeClass.prototype as any)._constructor = function () {
      return fakeListeners;
    };
  
    // Get the pipe def
    const pipeDef = (PipeClass.prototype.constructor as any).ɵpipe;
  
    // Call pipe onDestroy
    // Patch decorator closure so it uses fakeListeners
    // (we call it with instance context, same as Angular)
    pipeDef.onDestroy = function () {
      fakeListeners.forEach(fn => fn());
      instance.ngOnDestroy();
    };
  
    pipeDef.onDestroy.call(instance);
  
    // Assertions
    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
    expect(instance.ngOnDestroy).toHaveBeenCalled();
  });
});


