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
        OblMap.prototype.getItem = function (index) {
            if (typeof index !== 'object') {
                if (index in this.pairs)
                    return this.pairs[index];
                else
                    throw new Errors_1.Errors.IndexError(index);
            }
            else {
                if (index.innerValue() in this.pairs)
                    return this.pairs[index.innerValue()];
                else
                    throw new Errors_1.Errors.IndexError(index.innerValue());
            }
        };
        OblMap.prototype.setItem = function (index, value) {
        };
        OblMap.prototype.hasItem = function (item) {
            return undefined;
        };
        OblMap.prototype.size = function () {
            return undefined;
        };
        return OblMap;
    }());
    Maps.OblMap = OblMap;
})(Maps = exports.Maps || (exports.Maps = {}));
//# sourceMappingURL=Maps.js.map