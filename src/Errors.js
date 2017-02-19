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
})(Errors = exports.Errors || (exports.Errors = {}));
//# sourceMappingURL=Errors.js.map