export function arraySort<T>(sortByProperty: string, isDescending = false) {
  const cachedValueKey = Symbol();
  return function(
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor
  ) {
    Object.defineProperty(target, propertyKey, {
      set: function(value: Array<T>) {
        if (!value || !Array.isArray(value)) {
          throw `Value of property ${propertyKey} is not a valid array!`;
        }
        if (value.some(item => !item.hasOwnProperty(sortByProperty))) {
          throw `Property ${propertyKey} has some elements that do not have property ${sortByProperty}!`;
        }
        this[cachedValueKey] = value.sort(function(a, b) {
          if (a[sortByProperty] < b[sortByProperty]) {
            return -1;
          } else if (a[sortByProperty] > b[sortByProperty]) {
            return 1;
          }
          return 0;
        });
        if (isDescending) {
          this[cachedValueKey] = this[cachedValueKey].reverse();
        }
      },
      get: function() {
        return this[cachedValueKey];
      },
    });
  };
}