const onceFn = require('lodash.once');

export function once(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
  const originalMethod = descriptor.value;
  descriptor.value = onceFn(originalMethod);
  return descriptor;
}
