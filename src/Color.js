/**
 * Created by Josh on 2/7/17.
 * File for color classes
 */
"use strict";
var Color;
(function (Color) {
    var RGB = (function () {
        function RGB(r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            this.red = r;
            this.green = g;
            this.blue = b;
        }
        return RGB;
    }());
    Color.RGB = RGB;
})(Color = exports.Color || (exports.Color = {}));
//# sourceMappingURL=Color.js.map