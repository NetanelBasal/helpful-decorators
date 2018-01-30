
/**
 * 
 * Credit: https://github.com/andreypopp/autobind-decorator/blob/master/src/index.js
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
export function bind(target, key, descriptor) {
  let fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  let definingProperty = false;

  return {
    configurable: true,
    get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key)
        || typeof fn !== 'function') {
        return fn;
      }

      let boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set(value) {
      fn = value;
    }
  };
}