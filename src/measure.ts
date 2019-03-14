export function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    const start = performance.now();
    originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`Call to ${propertyKey} took ${(end - start).toFixed(2)} milliseconds.`);
  };

  return descriptor;
}
