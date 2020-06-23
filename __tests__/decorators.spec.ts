import { debounce, throttle, once, SortBy, measure } from "../src";
jest.mock("lodash.debounce");
jest.mock("lodash.throttle");
import * as throttleFn from "lodash.throttle";
import * as debounceFn from "lodash.debounce";

jest.useFakeTimers();

describe("Decorators", () => {
  describe("debounce", function () {
    const func = function () {
      return "called";
    };
    debounceFn["mockImplementation"](function () {
      return func;
    });
    class TestDebounce {
      @debounce(3000)
      method() {
        console.log("Debounce Worked!");
      }
    }
    it("should call debounce", function () {
      new TestDebounce().method();
      expect(debounceFn).toBeCalled();
      expect(debounceFn["mock"].calls[0][1]).toEqual(3000);
      expect(debounceFn["mock"].calls[0][2]).toEqual({});
    });
  });

  describe("throttle", function () {
    const func = function () {
      return "called";
    };
    throttleFn["mockImplementation"](function () {
      return func;
    });
    class TestThrottle {
      @throttle(3000)
      method() {
        console.log("Throttle Worked!");
      }
    }
    it("should call throttle", function () {
      new TestThrottle().method();
      expect(throttleFn).toBeCalled();
      expect(throttleFn["mock"].calls[0][1]).toEqual(3000);
      expect(throttleFn["mock"].calls[0][2]).toEqual({});
    });
  });

  describe("once", function () {
    class TestOnce {
      @once
      method() {
        console.warn("Once Worked!");
      }
    }
    it("should call the method only once", function () {
      const instance = new TestOnce();
      const consoleSpy = jest.spyOn(console, "warn");
      instance.method();
      instance.method();
      instance.method();
      expect(consoleSpy).toBeCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("arraySort", function () {
    function testClass(
      array: any[],
      sortByProperty: string,
      config?: {
        isDescending: boolean;
        type: string;
      }
    ) {
      class TestClass {
        @SortBy(sortByProperty, config)
        testingArray = array;
      }
      return new TestClass();
    }

    describe("Default Config: { isDescending: true, type: 'string', }", function () {
      it("should sort testing array in type string in descending order by default", function () {
        const testingArray = ["b", "a", "c"];
        const expectArray = ["c", "b", "a"];
        const instance = testClass(testingArray, "");
        expect(instance.testingArray).toEqual(expectArray);
      });
    });

    describe("Type: string", function () {
      it("should sort testing array by name property of string type in ascending order", function () {
        const testingArray = [{ name: "b" }, { name: "a" }, { name: "c" }];
        const expectArray = [{ name: "a" }, { name: "b" }, { name: "c" }];
        const instance = testClass(testingArray, "name", {
          isDescending: false,
          type: "string",
        });

        expect(instance.testingArray).toEqual(expectArray);
      });

      it("should sort testing array by name property of string type in descending order", function () {
        const testingArray = [{ name: "b" }, { name: "a" }, { name: "c" }];
        const expectArray = [{ name: "c" }, { name: "b" }, { name: "a" }];
        const instance = testClass(testingArray, "name", {
          isDescending: true,
          type: "string",
        });
        expect(instance.testingArray).toEqual(expectArray);
      });
    });

    describe("Type: date", function () {
      it("should be able to sort date in descending order", function () {
        const testingArray = [
          "2020-06-17",
          "2020-06-16",
          "2020-06-20",
          "2020-06-10",
        ];
        const instance = testClass(testingArray, "", {
          isDescending: true,
          type: "date",
        });
        expect(instance.testingArray).toEqual([
          "2020-06-20",
          "2020-06-17",
          "2020-06-16",
          "2020-06-10",
        ]);
      });

      it("should be able to sort date in ascending order", function () {
        const testingArray = [
          "2020-06-17",
          "2020-06-16",
          "2020-06-20",
          "2020-06-10",
        ];
        const expectArray = [
          "2020-06-10",
          "2020-06-16",
          "2020-06-17",
          "2020-06-20",
        ];
        const instance = testClass(testingArray, "", {
          isDescending: false,
          type: "date",
        });
        expect(instance.testingArray).toEqual(expectArray);
      });
    });

    describe("Type: number", function () {
      it("should be able to sort number value in descending order", function () {
        const testingArray = [0, 6, -1, 6, 3, -11, 4, 1];
        const expectArray = [6, 6, 4, 3, 1, 0, -1, -11];
        const instance = testClass(testingArray, "", {
          isDescending: true,
          type: "number",
        });
        expect(instance.testingArray).toEqual(expectArray);
      });

      it("should be able to sort number value in ascending order", function () {
        const testingArray = [0, 6, -1, 6, 3, -11, 4, 1];
        const expectArray = [-11, -1, 0, 1, 3, 4, 6, 6];
        const instance = testClass(testingArray, "", {
          isDescending: false,
          type: "number",
        });
        expect(instance.testingArray).toEqual(expectArray);
      });
    });

    describe("Nullish Values", function () {
      it("should push nullish values to the end of array", function () {
        const testingArray = [
          "2020-06-17",
          undefined,
          "2020-06-16",
          null,
          "2020-06-20",
          "2020-06-10",
        ];
        const expectArray = [
          "2020-06-20",
          "2020-06-17",
          "2020-06-16",
          "2020-06-10",
          null,
          undefined,
        ];
        const instance = testClass(testingArray, "", {
          isDescending: true,
          type: "date",
        });
        expect(instance.testingArray).toEqual(expectArray);
      });
    });

    describe("measure", function () {
      const fibonacci = (n: number): number => {
        if (n === 0) {
          return 0;
        }
        if (n === 1) {
          return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
      };

      class Calculator {
        @measure
        public sum(a: number, b: number): number {
          return a + b;
        }

        @measure
        public longRun(n: number): number {
          return fibonacci(n);
        }

        @measure
        public async asyncLongRun(n: number): Promise<number> {
          return fibonacci(n);
        }
      }
      it("measure decorator test", async function () {
        const cal = new Calculator();
        cal.sum(10, 10);
        await cal.asyncLongRun(30);
        cal.longRun(30);
      });
    });
  });
});
