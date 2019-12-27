import { debounce, throttle, once, arraySort } from '../src';
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
        @arraySort('name')
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
        @arraySort('name', true)
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

    it('should throw error if value is not an array', function() {
      class TestTypeError {
        @arraySort('name', true)
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
