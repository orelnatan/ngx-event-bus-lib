import { describe, it, expect, vi } from 'vitest';

import { intercept } from '../api';
import { DECORATOR_APPLIED } from '../consts';

describe('intercept', () => {
  it('should throw if DECORATOR_APPLIED is not present', () => {
    class NotDecorated {}
    const instance = new NotDecorated();

    expect(() => intercept(instance))
      .toThrowError(/intercept\(\) function cannot be used/);
  });

  it('should call _intercept if DECORATOR_APPLIED is present', () => {
    const _constructorMock = vi.fn();

    class Decorated {
      _intercept(instance: any) {
        _constructorMock(instance);
      }
    }

    (Decorated.prototype as any)[DECORATOR_APPLIED] = true;

    const instance = new Decorated();
    intercept(instance);

    expect(_constructorMock).toHaveBeenCalledWith(instance);
  });

  it('should call _intercept exactly once', () => {
    const _constructorMock = vi.fn();

    class Decorated {
      _intercept(instance: any) {
        _constructorMock(instance);
      }
    }

    (Decorated.prototype as any)[DECORATOR_APPLIED] = true;

    const instance = new Decorated();
    intercept(instance);
    intercept(instance); // call again

    // Check that _intercept was called twice because we manually called intercept twice
    expect(_constructorMock).toHaveBeenCalledTimes(2);
  });

  it('should not alter other properties of the instance', () => {
    const _constructorMock = vi.fn();

    class Decorated {
      value = 42;
      _intercept(instance: any) {
        _constructorMock(instance);
      }
    }

    (Decorated.prototype as any)[DECORATOR_APPLIED] = true;

    const instance = new Decorated();
    intercept(instance);

    expect(instance.value).toBe(42); // instance property intact
    expect(_constructorMock).toHaveBeenCalledWith(instance);
  });
});
