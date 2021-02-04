export default class Pipe {

  static builder() {
    return new Pipe();
  }

  constructor() {
    this.queue = [];
  }

  build() {
    const functions = [...this.queue];
    return input => functions.reduce((x, f) => f(x), input);
  }

  pipe(f) {
    if (typeof f !== 'function') {
      throw new TypeError(`${f} is not a function`);
    }
    this.queue.push(f);
    return this;
  }

}
