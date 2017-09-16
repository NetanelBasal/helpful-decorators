"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debounceFn = require("lodash.debounce");
/**
 *
 * @export
 * @param {number} [milliseconds=0]
 * @param {any} [options={}]
 * @returns
 */
function debounce(milliseconds, options) {
    if (milliseconds === void 0) { milliseconds = 0; }
    if (options === void 0) { options = {}; }
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = debounceFn(originalMethod, milliseconds, options);
        return descriptor;
    };
}
exports.debounce = debounce;
