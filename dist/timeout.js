"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param milliseconds
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor)=>PropertyDescriptor}
 */
function timeout(milliseconds) {
    if (milliseconds === void 0) { milliseconds = 0; }
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            setTimeout(function () {
                originalMethod.apply(_this, args);
            }, milliseconds);
        };
        return descriptor;
    };
}
exports.timeout = timeout;
