"use strict";
/**
 * Created by Josh on 2/20/17.
 * File that is responsible for CSS styling for SVG components
 */
var CSS;
(function (CSS) {
    //all legal CSS attribute names for SVG
    var ATTRIBUTES = {
        "x": true, "y": true, "cx": true,
        "points": true, "cy": true,
        "stroke": true, "fill": true, "color": true,
        "stroke-linejoin": true, "stroke-opacity": true,
        "stroke-width": true, "class": true, "r": true,
        "fill-opacity": true
    };
    CSS.isAttribute = function (input) {
        return input in ATTRIBUTES;
    };
    //main CSS class
    var CSSClass = (function () {
        function CSSClass() {
        }
        CSSClass.prototype.getItem = function (index) {
            return undefined;
        };
        CSSClass.prototype.setItem = function (index, value) {
        };
        CSSClass.prototype.hasItem = function (item) {
            return undefined;
        };
        CSSClass.prototype.arrayValue = function () {
            return undefined;
        };
        CSSClass.prototype.size = function () {
            return undefined;
        };
        CSSClass.prototype.strFormat = function () {
            return undefined;
        };
        CSSClass.prototype.innerValue = function () {
            return undefined;
        };
        return CSSClass;
    }());
    CSS.CSSClass = CSSClass;
})(CSS = exports.CSS || (exports.CSS = {}));
//# sourceMappingURL=CSS.js.map