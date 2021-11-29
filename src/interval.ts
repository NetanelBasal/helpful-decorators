export function interval(milliseconds: number = 0): any {
    return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
  
      descriptor.value = function(...args) {
        setInterval(() => {
          originalMethod.apply(this, args);
        }, milliseconds);
      };
      return descriptor;
    };
  }
  