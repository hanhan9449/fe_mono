import { describe, expect, it, test, rstest } from '@rstest/core';
import { computed, effect, isSignal, signal } from '../src';

describe('simple-signal', () => {
  describe('base', () => {
    it('should work nice', () => {
      const foo = signal(1);
      const bar = computed(() => foo.value * 2);
      expect(isSignal(foo)).toBeTruthy();
      expect(isSignal(bar)).toBeTruthy();
    });
    test('signal read and write', () => {
      const foo = signal(1);
      expect(foo.value).toBe(1);
      foo.value = 2;
      expect(foo.value).toBe(2);
    });

    test('signal computed read', () => {
      const foo = signal(1);
      const bar = computed(() => foo.value * 2);
      expect(foo.value).toBe(1);
      expect(bar.value).toBe(2);
      foo.value = 2;
      expect(foo.value).toBe(2);
      expect(bar.value).toBe(4);
    });

    test('signal effect', async () => {
      const foo = signal(1);
      const bar = computed(() => foo.value * 2);
      let count = 0;
      const fn = rstest.fn((...a) => console.log('FnInvoke', ++count, a));
      effect(() => {
        const fooValue = foo.value;
        const barValue = bar.value;
        console.log(`foo: ${fooValue}, bar: ${barValue}`);
        fn(fooValue, barValue);
      });
      expect(fn).toHaveBeenCalledTimes(1);
      foo.value = 2;
      expect(fn).toHaveBeenCalledTimes(1);
      await new Promise((r) => setTimeout(r, 1000));
      foo.value = 3;
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
