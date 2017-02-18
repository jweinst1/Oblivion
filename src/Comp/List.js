/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */
"use strict";
var Lists;
(function (Lists) {
    var List = (function () {
        function List() {
            this.array = [];
            this.dict = {};
        }
        //takes one argument
        List.prototype.append = function (item) {
            this.array.push(item);
        };
        //takes arbitrary amount of arguments
        List.prototype.appendAll = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            Array.prototype.push.apply(this.array, items);
        };
        List.prototype.appendLeft = function (item) {
            this.array.unshift(item);
        };
        List.prototype.pop = function () {
            if (this.array.length > 0)
                return this.array.pop();
            else
                throw "Length Error: No items in list.";
        };
        List.prototype.popLeft = function () {
            if (this.array.length > 0)
                return this.array.shift();
            else
                throw "Length Error: No items in list.";
        };
        List.prototype.extend = function (other) {
            this.array = this.array.concat(other.array);
        };
        return List;
    }());
    Lists.List = List;
})(Lists = exports.Lists || (exports.Lists = {}));
//# sourceMappingURL=List.js.map