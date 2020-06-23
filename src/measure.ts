import * as util from 'util'

export function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
  const originalMethod = descriptor.value;

  if (util.types.isAsyncFunction(originalMethod)) {
    descriptor.value = async function (...args: any): Promise<any> {
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`Call to ${propertyKey} took ${(end - start).toFixed(2)} milliseconds.`);
      return result;
    }
  } else {
    descriptor.value = function (...args) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`Call to ${propertyKey} took ${(end - start).toFixed(2)} milliseconds.`);
      return result;
    };
  }
  return descriptor;
}
