const throttleFn = require('lodash.throttle');

export function throttle(milliseconds: number = 0, options = {}): any {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = throttleFn(originalMethod, milliseconds, options);
    return descriptor;
  };
}
