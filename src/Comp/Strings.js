"use strict";
/**
 * Created by Josh on 2/25/17.
 */
//contains OblString class and string util methods
var Strings;
(function (Strings) {
    var OblString = (function () {
        function OblString(str) {
            if (str === void 0) { str = ""; }
            this.str = str;
        }
        OblString.prototype.strFormat = function () {
            return "\"" + this.str + "\"";
        };
        OblString.prototype.innerValue = function () {
            return this.str;
        };
        return OblString;
    }());
    Strings.OblString = OblString;
})(Strings = exports.Strings || (exports.Strings = {}));
//# sourceMappingURL=Strings.js.map