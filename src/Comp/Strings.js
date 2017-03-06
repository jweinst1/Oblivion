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
        //used for iterators
        OblString.prototype.arrayValue = function () {
            return this.str.split("");
        };
        OblString.prototype.strFormat = function () {
            return "\"" + this.str + "\"";
        };
        OblString.prototype.innerValue = function () {
            return this.str;
        };
        OblString.prototype.getItem = function (index) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.str.length)
                throw new Errors_1.Errors.IndexError(index);
            else
                return this.str[index];
        };
        OblString.prototype.setItem = function (index, value) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.str.length)
                throw new Errors_1.Errors.IndexError(index);
            this.str = this.str.replace(this.str.charAt(index), value);
        };
        //checks if string contains substring
        OblString.prototype.hasItem = function (item) {
            return this.str.search(item.innerValue()) !== -1;
        };
        OblString.prototype.size = function () {
            return this.str.length;
        };
        OblString.prototype.append = function (item) {
            this.str += item;
        };
        OblString.prototype.appendLeft = function (item) {
            this.str = item + this.str;
        };
        OblString.prototype.pop = function () {
            if (this.str) {
                var popped = this.str[this.str.length];
                this.str = this.str.slice(0, -1);
                return popped;
            }
            else {
                throw new Error("LengthError: String cannot be popped when empty.");
            }
        };
        OblString.prototype.popLeft = function () {
            if (this.str) {
                var popped = this.str[0];
                this.str = this.str.slice(1);
                return popped;
            }
            else {
                throw new Error("LengthError: String cannot be popped when empty.");
            }
        };
        OblString.prototype.remove = function (item) {
            this.str = this.str.replace(item, "");
        };
        OblString.prototype.insert = function (index, item) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (typeof item === 'object')
                item = item.strValue();
            this.str = this.str.slice(0, index) + item + this.str.slice(index);
        };
        OblString.prototype.extend = function (other) {
        };
        OblString.prototype.find = function (item) {
            return undefined;
        };
        return OblString;
    }());
    Strings.OblString = OblString;
})(Strings = exports.Strings || (exports.Strings = {}));
//# sourceMappingURL=Strings.js.map