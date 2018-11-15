"use strict";
exports.__esModule = true;
exports["default"] = (function (string) {
    var camelizeRE = /-(\w)/g;
    return string.replace(camelizeRE, function (word) {
        return word.toLocaleUpperCase().slice(1);
    });
});
