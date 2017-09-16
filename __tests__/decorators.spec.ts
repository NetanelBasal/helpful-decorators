import { timeout, debounce } from '../src';
jest.mock('lodash.debounce');
import * as debounceFn from 'lodash.debounce';
jest.useFakeTimers();
describe('Decorators', () => {

  describe('timeout', function () {
    class Test {
      @timeout(1000)
      method() {
        console.log('Worked');
      }
    }

    it('should call setTimeout', function () {
      new Test().method();
      expect(setTimeout['mock'].calls.length).toBe(1);
      expect(setTimeout['mock'].calls[0][1]).toBe(1000);
    });

    it('should invoke the console.log', function () {
      const spy = jest.spyOn(console, 'log');
      new Test().method();
      jest.runAllTimers();
      expect(spy).toBeCalled()
      expect(spy).toHaveBeenCalledWith('Worked');
    });
  });

  describe('debounce', function () {
    const func = function () {
      return 'called';
    }
    debounceFn['mockImplementation'](function () {
      return func;
    });
    class TestA {
      @debounce(3000)
      method() {
        console.log('Debounce Worked!');
      }
    }
    it('should call debounce', function () {
      new TestA().method();
      expect(debounceFn).toBeCalled();
      expect(debounceFn['mock'].calls[0][1]).toEqual(3000);
      expect(debounceFn['mock'].calls[0][2]).toEqual({});
    });
  })

});