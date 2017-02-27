"use strict";
var Errors_1 = require("../Errors");
/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */
var Lists;
(function (Lists) {
    var OblList = (function () {
        function OblList() {
            this.items = [];
        }
        OblList.prototype.getItem = function (index) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            return this.items[index];
        };
        OblList.prototype.setItem = function (index, value) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            this.items[index] = value;
        };
        OblList.prototype.hasItem = function (item) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var val = _a[_i];
                if (val === item)
                    return true;
            }
            return false;
        };
        OblList.prototype.size = function () {
            return this.items.length;
        };
        return OblList;
    }());
    Lists.OblList = OblList;
})(Lists = exports.Lists || (exports.Lists = {}));
//# sourceMappingURL=List.js.map