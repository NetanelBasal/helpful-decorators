/**
  * Sort array by a specific element property, its value type must be one of string, number and date
  * @param {string | undefined} sortByProperty specify a property from each element that sorting will be based on, undefined means sorty by element itself
  * @param {
      isDescending: boolean;
      sortByPropertyType: string;
    } options 
  * @returns script version
  */
export function SortBy<T>(sortByProperty: string | symbol | number, options: {
  isDescending: boolean;
  type: string;
} = {
  isDescending: true,
  type: 'string'
}) {
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

        if (!!sortByProperty && value.some(item => !item.hasOwnProperty(sortByProperty))) {
          throw `Property ${propertyKey} has some elements that do not have property ${sortByProperty ? sortByProperty.toString() : ''}!`;
        }
      
  
        const errorMsg = (item: any, type: string) => `Value ${item} is not of predefined type ${type}`;

        // Check if any element that does not follow pre-defined type
        value.forEach((item: any) => {
          switch(options.type) {
            case 'string':
              if (sortByProperty ? typeof item[sortByProperty] !== 'string' : typeof item !== 'string') {
                throw errorMsg(item, options.type);
              }  
              return;
            case 'number':
              if (sortByProperty ? typeof item[sortByProperty] !== 'number' : typeof item !== 'number') {
                throw errorMsg(item, options.type);
              }
              return;
            case 'date':
              if (sortByProperty ? !Date.parse(item[sortByProperty]) : !Date.parse(item)) {
                throw errorMsg(item, options.type);
              }
              return; 
            default:
              throw errorMsg(item, options.type);
          }
        })

        const sortFunc = (a: any, b: any) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          }
          return 0;
        }
       
        // Perform sorting logic
        if (sortByProperty) {
          this[cachedValueKey] = value.sort(function(a: any, b: any) {
            const aValue = options.type === 'date' ? new Date(a[sortByProperty]) : a[sortByProperty]; 
            const bValue = options.type === 'date' ? new Date(b[sortByProperty]) : b[sortByProperty]; 
            return sortFunc(aValue, bValue); 
          });
        } else {
          this[cachedValueKey] = value.sort(function(a: any, b: any) {
            const aValue = options.type === 'date' ? new Date(a) : a; 
            const bValue = options.type === 'date' ? new Date(b) : b;
            return sortFunc(aValue, bValue);
          });
        }
        

        if (options.isDescending) {
          this[cachedValueKey] = this[cachedValueKey].reverse();
        }

      },
      get: function() {
        return this[cachedValueKey];
      },
    });
  };
}