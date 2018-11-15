"use strict";
exports.__esModule = true;
var default_1 = (function () {
    function default_1() {
        this.headNode = document.getElementsByTagName('head')[0];
        this.styleNode = document.createElement('style');
        this.styleNode.setAttribute('type', 'text/css');
        this.map = {};
    }
    ;
    default_1.prototype.add = function (_a) {
        var url = _a.url, fontFamily = _a.fontFamily;
        if (undefined !== this.map[fontFamily])
            return;
        this.map[fontFamily] = url;
        if (!this.headNode.contains(this.styleNode)) {
            this.headNode.appendChild(this.styleNode);
        }
        this.styleNode.textContent += "\n                \r\n\n                @font-face {\n                    font-family: " + fontFamily + ";\n                    src: url(\"" + url + "\");\n                }\n            ";
    };
    ;
    default_1.prototype.remove = function (fontFamily) {
        var willMap = {};
        for (var _i = 0, _a = Object.entries(this.map); _i < _a.length; _i++) {
            var _b = _a[_i], oldFontFamily = _b[0], url = _b[1];
            if (fontFamily !== oldFontFamily) {
                willMap[oldFontFamily] = url;
            }
        }
        this.styleNode.textContent = '';
        this.map = {};
        for (var _c = 0, _d = Object.entries(willMap); _c < _d.length; _c++) {
            var _e = _d[_c], fontFamily_1 = _e[0], url = _e[1];
            this.add({ url: url, fontFamily: fontFamily_1 });
        }
    };
    default_1.prototype.destroy = function () {
        this.map = null;
        this.headNode.removeChild(this.styleNode);
    };
    ;
    return default_1;
}());
exports["default"] = default_1;
;
