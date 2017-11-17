import * as delayFn from 'lodash.once';

/**
 * 
 * @param wait 
 * @param options 
 */
export function delay( wait : number = 0, args ) {
  return function ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
    const originalMethod = descriptor.value;
    descriptor.value = delayFn(originalMethod, wait, args);
    return descriptor;
  }
}