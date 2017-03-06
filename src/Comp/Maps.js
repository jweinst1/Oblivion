"use strict";
var Errors_1 = require("../Errors");
/**
 * Created by Josh on 2/27/17.
 * File that stores the Maps namespace
 */
var Maps;
(function (Maps) {
    var OblMap = (function () {
        function OblMap(dict) {
            if (dict === void 0) { dict = {}; }
            this.pairs = dict;
        }
        //used for iterators
        OblMap.prototype.arrayValue = function () {
            var arr = [];
            for (var key in this.pairs) {
                arr.push(key);
            }
            return arr;
        };
        OblMap.prototype.getItem = function (index) {
            if (typeof index !== 'object') {
                if (index in this.pairs)
                    return this.pairs[index];
                else
                    throw new Errors_1.Errors.IndexError(index);
            }
            else {
                //uses string format for object wrapped valus.
                var str = index.strFormat();
                if (str in this.pairs)
                    return this.pairs[str];
                else
                    throw new Errors_1.Errors.IndexError(str);
            }
        };
        OblMap.prototype.setItem = function (index, value) {
            if (typeof index !== 'object')
                this.pairs[index] = value;
            else
                this.pairs[index.strFormat()] = value;
        };
        OblMap.prototype.hasItem = function (item) {
            if (typeof item !== 'object')
                return item in this.pairs;
            else
                return item.strFormat() in this.pairs;
        };
        OblMap.prototype.size = function () {
            var total = 0;
            for (var key in this.pairs)
                total++;
            return total;
        };
        OblMap.prototype.strFormat = function () {
            return JSON.stringify(this.pairs);
        };
        OblMap.prototype.innerValue = function () {
            return this.pairs;
        };
        return OblMap;
    }());
    Maps.OblMap = OblMap;
})(Maps = exports.Maps || (exports.Maps = {}));
//# sourceMappingURL=Maps.js.map