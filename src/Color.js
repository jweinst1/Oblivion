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
            if (digits === void 0) { digits = '#FFFFFF'; }
            if (!(HEX.isHex(digits))) {
                throw "Error Hex Color invalid";
            }
            this.digits = digits;
        }
        HEX.prototype.strValue = function () {
            return "#" + this.digits;
        };
        //checks if a color is a valid 3 or 6 digit HEX color.
        HEX.isHex = function (input) {
            return HEX.hexRegex.test(input);
        };
        HEX.hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        return HEX;
    }());
    Colors.HEX = HEX;
    var Swatch = (function () {
        function Swatch(name) {
            if (name === void 0) { name = "black"; }
            this.name = name;
        }
        Swatch.prototype.strValue = function () {
            return this.name;
        };
        //checks if a color is a named SVG color.
        Swatch.isSwatch = function (input) {
            return input in Swatch.swatchSet;
        };
        Swatch.swatchSet = {
            black: true, white: true, gray: true,
            cyan: true, blue: true, red: true,
            yellow: true, turquoise: true, indigo: true,
            green: true, brown: true, lightpink: true,
            violet: true, tan: true, orange: true
        };
        return Swatch;
    }());
    Colors.Swatch = Swatch;
})(Colors = exports.Colors || (exports.Colors = {}));
//# sourceMappingURL=Color.js.map