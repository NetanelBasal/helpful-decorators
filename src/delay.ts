export function delay(milliseconds: number = 0): any {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, milliseconds);
    };
    return descriptor;
  };
}
