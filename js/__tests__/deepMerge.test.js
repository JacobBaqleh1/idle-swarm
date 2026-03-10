const { deepMerge } = require('../save.js');

describe('deepMerge', () => {
  test('merges flat objects', () => {
    const dst = { a: 1, b: 2 };
    deepMerge(dst, { b: 99, c: 3 });
    expect(dst).toEqual({ a: 1, b: 99, c: 3 });
  });

  test('deep-merges nested objects', () => {
    const dst = { x: { a: 1, b: 2 } };
    deepMerge(dst, { x: { b: 99 } });
    expect(dst.x).toEqual({ a: 1, b: 99 });
  });

  test('does not lose dst keys absent from src', () => {
    const dst = { keep: true, nested: { keep: true, overwrite: false } };
    deepMerge(dst, { nested: { overwrite: true } });
    expect(dst.keep).toBe(true);
    expect(dst.nested.keep).toBe(true);
    expect(dst.nested.overwrite).toBe(true);
  });

  test('overwrites leaf values with src values', () => {
    const dst = { n: 0 };
    deepMerge(dst, { n: 42 });
    expect(dst.n).toBe(42);
  });

  test('handles deeply nested structures', () => {
    const dst = { a: { b: { c: 1 } } };
    deepMerge(dst, { a: { b: { c: 2, d: 3 } } });
    expect(dst.a.b.c).toBe(2);
    expect(dst.a.b.d).toBe(3);
  });
});
