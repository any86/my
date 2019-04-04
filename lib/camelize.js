"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (string) {
    var camelizeRE = /-(\w)/g;
    return string.replace(camelizeRE, function (word) {
        return word.toLocaleUpperCase().slice(1);
    });
});
