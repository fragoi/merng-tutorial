import { pipe } from './FUtils';

test('Basic test', () => {
  const f = pipe(x => x + 1);
  expect(f(1)).toBe(2);
});

test('Not a function', () => {
  expect(() => pipe(true)).toThrowError(TypeError);
});

test('Chain test', () => {
  const a = x => x + 1;
  const b = x => x * 2;
  const f = pipe(a, b);
  expect(f(1)).toBe(4);
});

test('NaN', () => {
  const f = x => x + 1;
  const f1 = pipe(f);
  const f2 = pipe(
    x => x ? x : 0,
    f
  );
  expect(f1()).toBeNaN();
  expect(f2()).toBe(1);
});
