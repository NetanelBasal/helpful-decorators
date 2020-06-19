const sortFunc = (a: any, b: any) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
};

/**
  * Sort array by a specific element property, its value type must be one of string, number and date
  * @param {string | undefined} sortByProperty specify a property from each element that sorting will be based on, undefined means sorty by element itself
  * @param {
      isDescending: boolean;
      sortByPropertyType: string;
    } options 
  * @returns script version
  */
export function SortBy<T>(
  sortByProperty: string | symbol | number,
  options: {
    isDescending: boolean;
    type: string;
  } = {
    isDescending: true,
    type: 'string',
  }
) {
  const cachedValueKey = Symbol();
  return function (
    target: any,
    propertyKey: string,
    descriptor?: PropertyDescriptor
  ) {
    Object.defineProperty(target, propertyKey, {
      set: function (arr: Array<T>) {
        if (!arr || !Array.isArray(arr)) {
          throw `Value of property ${propertyKey} is not a valid array!`;
        }

        // Perform sorting logic
        const isDateType = options.type === 'date';
        if (sortByProperty) {
          this[cachedValueKey] = arr.sort(function (a: any, b: any) {
            const aValue = isDateType
              ? new Date(a[sortByProperty])
              : a[sortByProperty];
            const bValue = isDateType
              ? new Date(b[sortByProperty])
              : b[sortByProperty];
            const sortResult = sortFunc(aValue, bValue);
            return options.isDescending ? sortResult * -1 : sortResult;
          });
        } else {
          this[cachedValueKey] = arr.sort(function (a: any, b: any) {
            const aValue = isDateType ? new Date(a) : a;
            const bValue = isDateType ? new Date(b) : b;
            const sortResult = sortFunc(aValue, bValue);
            return options.isDescending ? sortResult * -1 : sortResult;
          });
        }
      },
      get: function () {
        return this[cachedValueKey];
      },
    });
  };
}
