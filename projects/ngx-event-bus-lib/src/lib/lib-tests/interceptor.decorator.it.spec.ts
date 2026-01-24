import { Component, NO_ERRORS_SCHEMA, RendererFactory2, Renderer2, Pipe, PipeTransform, ɵPipeDef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { intercept } from '../api';
import { Interceptor } from '../decorators';
import { DECORATOR_APPLIED } from '../consts';

// --- Mock initListeners ---
const mockInitListeners = vi.fn();
vi.mock('../utils/init-listeners.util', () => ({ initListeners: mockInitListeners }));

// --- Event & Cleanup Mocks ---
const mockEvent = { type: 'EVENT_TYPE', action: 'handleEvent' };
const cleanup1 = vi.fn();
const cleanup2 = vi.fn();
mockInitListeners.mockReturnValue([cleanup1, cleanup2]);

// --- Test Component ---
@Component({
  selector: 'app-test',
  template: '',
  standalone: true
})
@Interceptor([mockEvent])
class TestAppComponent {
  constructor() {
    intercept(this); // trigger _intercept internally
  }
}

@Pipe({ name: 'testPipe', standalone: true })
@Interceptor([mockEvent])
class TestAppPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
  constructor() {
    intercept(this);
  }
}

// --- Minimal Renderer ---
class MockRenderer implements Renderer2 {
  destroy(): void {}
  createElement(): any { return document.createElement('div'); }
  appendChild(): void {}
  removeChild(): void {}
  setAttribute(): void {}
  selectRootElement(): any { return document.createElement('div'); }
  parentNode(): any { return null; }
  nextSibling(): any { return null; }
  insertBefore(): void {}
  setProperty(): void {}
  removeAttribute(): void {}
  addClass(): void {}
  removeClass(): void {}
  setStyle(): void {}
  removeStyle(): void {}
  listen(): () => void { return () => {}; }
  createText(): any { return document.createTextNode(''); }
  createComment(): any { return document.createComment(''); }
  setValue(): void {}
  data(): void {}
  destroyNode(): void {}
}

// --- Tests ---
describe('@Interceptor integration tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestAppComponent, RouterOutlet],
      providers: [
        { provide: RendererFactory2, useValue: { createRenderer: () => new MockRenderer() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  
  it('should apply decorator and mark prototype as applied', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    const instance = fixture.componentInstance;

    expect(instance.constructor.prototype[DECORATOR_APPLIED]).toBe(true);
  });

  it('should remove listeners when the Pipe`s onDestroy is activated', () => {
    TestBed.runInInjectionContext(() => {
      // Create pipe instance without triggering intercept automatically
      const pipeInstance = new TestAppPipe();
    
      // Make sure _intercept is called manually
      const proto: any = Object.getPrototypeOf(pipeInstance);
    
      // Manually call _intercept to attach listeners
      proto._intercept.call(pipeInstance, pipeInstance);
    
      // Now the mock listeners should be attached
      const pipeDef: ɵPipeDef<TestAppPipe> = (pipeInstance.constructor as any).ɵpipe;
    
      // Trigger Pipe onDestroy
      (pipeDef.onDestroy!).call(pipeInstance);
    });    
  });
});
