"use strict";
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
            return undefined;
        };
        OblList.prototype.setItem = function (index, value) {
        };
        OblList.prototype.hasItem = function (item) {
            return undefined;
        };
        OblList.prototype.size = function () {
            return this.items.length;
        };
        return OblList;
    }());
    Lists.OblList = OblList;
})(Lists = exports.Lists || (exports.Lists = {}));
//# sourceMappingURL=List.js.map