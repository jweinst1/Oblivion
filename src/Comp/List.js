"use strict";
var Errors_1 = require("../Errors");
/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */
var Lists;
(function (Lists) {
    var List = (function () {
        function List(lst) {
            if (lst === void 0) { lst = []; }
            this.items = lst;
        }
        //used for iterators
        List.prototype.arrayValue = function () {
            return this.items;
        };
        List.prototype.strFormat = function () {
            return JSON.stringify(this.items);
        };
        List.prototype.innerValue = function () {
            return this.items;
        };
        List.prototype.getItem = function (index) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            return this.items[index];
        };
        List.prototype.setItem = function (index, value) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            this.items[index] = value;
        };
        List.prototype.hasItem = function (item) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var val = _a[_i];
                if (val === item)
                    return true;
            }
            return false;
        };
        List.prototype.size = function () {
            return this.items.length;
        };
        List.prototype.append = function (item) {
            this.items.push(item);
        };
        List.prototype.appendLeft = function (item) {
            this.items.unshift(item);
        };
        List.prototype.pop = function () {
            if (this.items.length === 0)
                throw new Error("Pop Error: Pop method requires list not have length 0");
            return this.items.pop();
        };
        List.prototype.popLeft = function () {
            if (this.items.length === 0)
                throw new Error("Pop Error: Pop method requires list not have length 0");
            return this.items.shift();
        };
        //wont do anything if item not in list
        List.prototype.remove = function (item) {
            for (var i = 0; i < this.items.length; i++) {
                if (item === this.items[i]) {
                    this.items.splice(i, 1);
                }
            }
        };
        List.prototype.insert = function (index, item) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            this.items.splice(index, 0, item);
        };
        List.prototype.extend = function (other) {
            if (typeof other === 'object')
                this.items = this.items.concat(other.arrayValue());
            else
                this.items = this.items.concat(other);
        };
        List.prototype.find = function (item) {
            var result = this.items.indexOf(item);
            return result !== -1 ? result : false;
        };
        //function that implements copying
        List.prototype.copy = function () {
            var newArr = [];
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].constructor.name === 'List') {
                    newArr.push(this.items[i].copy());
                }
                else
                    newArr.push(this.items[i]);
            }
            return new List(newArr);
        };
        return List;
    }());
    Lists.List = List;
})(Lists = exports.Lists || (exports.Lists = {}));
//# sourceMappingURL=List.js.map