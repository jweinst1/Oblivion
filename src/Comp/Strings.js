"use strict";
var Errors_1 = require("../Errors");
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
        OblString.prototype.getItem = function (index) {
            //might need type check
            if (index < 0 || index >= this.str.length)
                throw new Errors_1.Errors.IndexError(index);
            else
                return this.str[index];
        };
        OblString.prototype.setItem = function (index, value) {
            if (index < 0 || index >= this.str.length)
                throw new Errors_1.Errors.IndexError(index);
            this.str = this.str.replace(this.str.charAt(index), value);
        };
        //checks if string contains substring
        OblString.prototype.hasItem = function (item) {
            return this.str.search(item.innerValue()) !== -1;
        };
        OblString.prototype.size = function () {
            return undefined;
        };
        return OblString;
    }());
    Strings.OblString = OblString;
})(Strings = exports.Strings || (exports.Strings = {}));
//# sourceMappingURL=Strings.js.map