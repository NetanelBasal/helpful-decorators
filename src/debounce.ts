import * as debounceFn from 'lodash.debounce';
/**
 *
 * @export
 * @param {number} [milliseconds=0]
 * @param {any} [options={}]
 * @returns
 */
export function debounce( milliseconds : number = 0, options = {} ) {
  return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
    const map = new WeakMap();
    const originalMethod = descriptor.value;
    descriptor.value = function() {
      let debounced = map.get(this);
      if (!debounced) {
        debounced = debounceFn(originalMethod, milliseconds, options).bind(this);
        map.set(this, debounced);
      }
      debounced();
    };
    return descriptor;
  }
}