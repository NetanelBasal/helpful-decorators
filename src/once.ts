import * as onceFn from 'lodash.once';

/**
 * 
 * 
 * @export
 * @param {*} target 
 * @param {string} propertyKey 
 * @param {PropertyDescriptor} descriptor 
 * @returns 
 */
export function once ( target : any, propertyKey : string, descriptor : PropertyDescriptor ) {
  const originalMethod = descriptor.value;
  descriptor.value = onceFn(originalMethod);
  return descriptor;
}