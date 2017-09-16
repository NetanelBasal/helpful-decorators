import * as throttleFn from 'lodash.throttle';

/**
 *
 * @export
 * @param {number} [milliseconds=0]
 * @param {any} [options={}]
 * @returns
 */
export function throttle( milliseconds : number = 0, options = {} ) {
  return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
    const originalMethod = descriptor.value;
    descriptor.value = throttleFn(originalMethod, milliseconds, options);
    return descriptor;
  }

}