import {debounce} from "../src";

jest.mock('lodash.debounce', () => {
    return (func, wait) => {
        let timeout;
        return function (this: any, ...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        }
    };
});

jest.useFakeTimers();

class Test {
    id;

    constructor(id) {
        this.id = id;
    }

    @debounce(3000)
    method() {
        this.id++;
    }
}

describe('Multi instance support', () => {
    describe('Debounce', () => {
        it('should work with multi instance', () => {
            const classA = new Test(1);
            const classB = new Test(100);
            classA.method();
            jest.advanceTimersByTime(1000);
            classB.method();
            jest.advanceTimersByTime(2001);
            expect(classA.id).toBe(2);
            jest.advanceTimersByTime(1000);
            expect(classB.id).toBe(101);
        });
    });
});