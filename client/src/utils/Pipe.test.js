import Pipe from './Pipe';

test('Basic test', () => {
  const f = Pipe.builder()
    .pipe(x => x + 1)
    .build();
  expect(f(1)).toBe(2);
});

test('Not a function', () => {
  expect(() =>
    Pipe.builder()
      .pipe(true)
      .build()
  ).toThrowError(TypeError);
});

test('Chain test', () => {
  const f = Pipe.builder()
    .pipe(x => x + 1)
    .pipe(x => x * 2)
    .build();
  expect(f(1)).toBe(4);
});

test('Immutability', () => {
  const builder = Pipe.builder()
  const f1 = builder.pipe(x => x + 1).build();
  expect(f1(1)).toBe(2);
  const f2 = builder.pipe(x => x * 2).build();
  expect(f2(1)).toBe(4);
});

test('NaN', () => {
  const f1 = Pipe.builder()
    .pipe(x => x + 1)
    .build();
  expect(f1()).toBeNaN();
  const f2 = Pipe.builder()
    .pipe(x => x ? x : 0)
    .pipe(x => x + 1)
    .build();
  expect(f2()).toBe(1);
});
