import { debounce, throttle, once, SortBy } from '../src';
jest.mock('lodash.debounce');
jest.mock('lodash.throttle');
import * as throttleFn from 'lodash.throttle';
import * as debounceFn from 'lodash.debounce';

jest.useFakeTimers();

describe('Decorators', () => {
  describe('debounce', function() {
    const func = function() {
      return 'called';
    };
    debounceFn['mockImplementation'](function() {
      return func;
    });
    class TestDebounce {
      @debounce(3000)
      method() {
        console.log('Debounce Worked!');
      }
    }
    it('should call debounce', function() {
      new TestDebounce().method();
      expect(debounceFn).toBeCalled();
      expect(debounceFn['mock'].calls[0][1]).toEqual(3000);
      expect(debounceFn['mock'].calls[0][2]).toEqual({});
    });
  });

  describe('throttle', function() {
    const func = function() {
      return 'called';
    };
    throttleFn['mockImplementation'](function() {
      return func;
    });
    class TestThrottle {
      @throttle(3000)
      method() {
        console.log('Throttle Worked!');
      }
    }
    it('should call throttle', function() {
      new TestThrottle().method();
      expect(throttleFn).toBeCalled();
      expect(throttleFn['mock'].calls[0][1]).toEqual(3000);
      expect(throttleFn['mock'].calls[0][2]).toEqual({});
    });
  });

  describe('once', function() {
    class TestOnce {
      @once
      method() {
        console.warn('Once Worked!');
      }
    }
    it('should call the method only once', function() {
      const instance = new TestOnce();
      const consoleSpy = jest.spyOn(console, 'warn');
      instance.method();
      instance.method();
      instance.method();
      expect(consoleSpy).toBeCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('arraySort', function() {
    
    it('should sort testing array by name property in ascending order', function() {
      class TestArraySortAscending {
        @SortBy('name', {
          isDescending: false,
          type: 'string'
        })
        testingArray = [
          {
            name: 'b'
          },
          {
            name: 'a'
          },
          {
            name: 'c'
          }
        ]; 
      }
      
      const instance = new TestArraySortAscending();
      
      expect(instance.testingArray).toEqual([
        {
          name: 'a'
        },
        {
          name: 'b'
        },
        {
          name: 'c'
        }
      ]);
    });

    it('should sort testing array by name property in descending order', function() {
      class TestArraySortDescending {
        @SortBy('name', {
          isDescending: true,
          type: 'string'
        })
        testingArray = [
          {
            name: 'b'
          },
          {
            name: 'a'
          },
          {
            name: 'c'
          }
        ]; 
      }
      const instance = new TestArraySortDescending();
      expect(instance.testingArray).toEqual([
        {
          name: 'c'
        },
        {
          name: 'b'
        },
        {
          name: 'a'
        }
      ]);
    });

    it('should sort array containing non-object items in ascending order', function() {
      class TestArraySortDescending {
        @SortBy('', {
          isDescending: false,
          type: 'number'
        })
        testingArray = [ 6, 3, 4, 1 ]; 
      }
      const instance = new TestArraySortDescending();
      expect(instance.testingArray).toEqual([ 1, 3, 4, 6 ]);
    });
    
    it('should sort array containing non-object items in ascending order', function() {
      class TestArraySortDescending {
        @SortBy('', {
          isDescending: false,
          type: 'number'
        })
        testingArray = [ 6, 3, 4, 1 ]; 
      }
      const instance = new TestArraySortDescending();
      expect(instance.testingArray).toEqual([ 1, 3, 4, 6 ]);
    });
    
    it('should be able to sort date type items', function() {
      class TestArraySortDescending {
        @SortBy('', {
          isDescending: true,
          type: 'date'
        })
        testingArray = [ '2020-06-17', '2020-06-16', '2020-06-20', '2020-06-10' ]; 
      }
      const instance = new TestArraySortDescending();
      expect(instance.testingArray).toEqual([ '2020-06-20', '2020-06-17', '2020-06-16', '2020-06-10' ]);
    });
    
    it('should throw error if any element cannot be convert to date type when predefined type is date', function() {
      class TestArraySortDescending {
        @SortBy('', {
          isDescending: false,
          type: 'date'
        })
        testingArray;
      }
      const instance = new TestArraySortDescending();
      try {
        instance.testingArray = [ 'aaaa', undefined, '2020-06-20', '2020-06-10' ];
      } catch (e) {
        expect(e).toBe(`Value aaaa is not of predefined type date`);
      }
      
      try {
        instance.testingArray = [ undefined, '2020-06-20', '2020-06-10' ];
      } catch (e) {
        expect(e).toBe(`Value undefined is not of predefined type date`);
      }
    });

    it('should throw error if value is not an array', function() {
      class TestTypeError {
        @SortBy('name', {
          isDescending: true,
          type: 'string'
        })
        testingArray; 
      }
      const instance = new TestTypeError();
      try {
        instance.testingArray = 'abc';
      } catch (e) {
        expect(e).toBe(`Value of property testingArray is not a valid array!`);
      }
      try {
        instance.testingArray = undefined;
      } catch (e) {
        expect(e).toBe(`Value of property testingArray is not a valid array!`);
      }
      try {
        instance.testingArray = null;
      } catch (e) {
        expect(e).toBe(`Value of property testingArray is not a valid array!`);
      }
      try {
        instance.testingArray = 1234;
      } catch (e) {
        expect(e).toBe(`Value of property testingArray is not a valid array!`);
      }
      try {
        instance.testingArray = [
          {
            id: 'a'
          },
          {
            id: 'b'
          },
          {
            id: 'c'
          }
        ];
      } catch (e) {
        expect(e).toBe(`Property testingArray has some elements that do not have property name!`);
      }
    });
  });
});
