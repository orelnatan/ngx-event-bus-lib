import { Directive, Pipe, PipeTransform } from '@angular/core';
import { describe, it, expect } from 'vitest';

import { isPipe } from '../utils';

describe('isPipe', () => {
  it('should return true for a real @Pipe-decorated class', () => {
    @Pipe({ name: 'testPipe' })
    class TestPipe implements PipeTransform {
      transform(value: unknown): unknown {
        return value;
      }
    }

    expect(isPipe(TestPipe)).toBe(true);
  });

  it('should return false for a non @Pipe-decorated class', () => {
    @Directive({ selector: '[testDirective]' })
    class TestDirective {}

    expect(isPipe(TestDirective)).toBe(false);
  });

  it('should return false for a class without a pipe definition', () => {
    class RegularClass {}

    expect(isPipe(RegularClass)).toBe(false);
  });

  it('should return false for plain objects', () => {
    const obj = {};

    expect(isPipe(obj)).toBe(false);
  });

  it('should return false for functions', () => {
    function fn() {}

    expect(isPipe(fn)).toBe(false);
  });
});
