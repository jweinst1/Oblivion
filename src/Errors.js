/**
 * Created by Josh on 2/17/17.
 * File which implements Errors
 * All Errors follow an interface
 */
"use strict";
var Errors;
(function (Errors) {
    var NameError = (function () {
        function NameError(name) {
            this.name = name;
        }
        NameError.prototype.type = function () {
            return "NameError";
        };
        NameError.prototype.message = function () {
            return "Name " + this.name + " not defined";
        };
        return NameError;
    }());
    Errors.NameError = NameError;
    var IndexError = (function () {
        function IndexError(index) {
            this.index = index;
        }
        IndexError.prototype.type = function () {
            return "IndexError";
        };
        IndexError.prototype.message = function () {
            return "Index " + this.index + " not defined on list.";
        };
        return IndexError;
    }());
    Errors.IndexError = IndexError;
    var ArgumentError = (function () {
        function ArgumentError(got, expected) {
            this.got = got;
            this.expected = expected;
        }
        ArgumentError.prototype.type = function () {
            return "ArgumentError";
        };
        ArgumentError.prototype.message = function () {
            return "Got " + this.got + " arguments but expected: " + this.expected;
        };
        return ArgumentError;
    }());
    Errors.ArgumentError = ArgumentError;
    var CssAttributeError = (function () {
        function CssAttributeError(classname, key) {
            this.name = classname;
            this.key = key;
        }
        CssAttributeError.prototype.type = function () {
            return "CssAttributeError";
        };
        CssAttributeError.prototype.message = function () {
            return "Attribute " + this.key + " not defined on style " + this.name;
        };
        return CssAttributeError;
    }());
    Errors.CssAttributeError = CssAttributeError;
    //possibly not needed due to writing SVG/CSS components
    var CssClassError = (function () {
        function CssClassError(name) {
            this.name = name;
        }
        ;
        CssClassError.prototype.type = function () {
            return "CssClassError";
        };
        CssClassError.prototype.message = function () {
            return "CSS Class " + this.name + " is not defined.";
        };
        return CssClassError;
    }());
    Errors.CssClassError = CssClassError;
    var TypeError = (function () {
        function TypeError(required, got) {
            this.required = required;
            this.got = got;
        }
        ;
        TypeError.prototype.type = function () {
            return "TypeError";
        };
        TypeError.prototype.message = function () {
            return "Call requires type " + this.required + " but got " + this.got;
        };
        return TypeError;
    }());
    Errors.TypeError = TypeError;
})(Errors = exports.Errors || (exports.Errors = {}));
//# sourceMappingURL=Errors.js.map