export function pipe(...functions) {
  functions.forEach(f => {
    if (typeof f !== 'function') {
      throw new TypeError(`${f} is not a function`);
    }
  });
  return input => functions.reduce((x, f) => f(x), input);
}
