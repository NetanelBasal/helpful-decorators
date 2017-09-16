"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_debounce_1 = require("lodash.debounce");
function debounce(milliseconds, options) {
    if (milliseconds === void 0) { milliseconds = 0; }
    if (options === void 0) { options = {}; }
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = lodash_debounce_1.debounce(originalMethod, milliseconds);
        return descriptor;
    };
}
exports.debounce = debounce;
