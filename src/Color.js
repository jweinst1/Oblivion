/**
 * Created by Josh on 2/7/17.
 * File for color classes
 */
"use strict";
var Colors;
(function (Colors) {
    var RGB = (function () {
        function RGB(r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            this.red = r;
            this.green = g;
            this.blue = b;
        }
        RGB.prototype.strValue = function () {
            return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
        };
        return RGB;
    }());
    Colors.RGB = RGB;
    var HEX = (function () {
        function HEX(digits) {
            if (digits === void 0) { digits = []; }
            if (digits.length !== 6) {
                throw "Error Hex Color invalid";
            }
            this.digits = digits;
        }
        HEX.prototype.strValue = function () {
            return "#" + this.digits.join("");
        };
        return HEX;
    }());
    Colors.HEX = HEX;
})(Colors = exports.Colors || (exports.Colors = {}));
//# sourceMappingURL=Color.js.map