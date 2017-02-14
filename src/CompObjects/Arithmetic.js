"use strict";
/**
 * Created by Josh on 2/13/17.
 */
var Arithmetic;
(function (Arithmetic) {
    var Add = (function () {
        function Add(args) {
            this.args = args;
        }
        Add.prototype.call = function (env) {
            return undefined;
        };
        Add.prototype.getBody = function () {
            return undefined;
        };
        return Add;
    }());
    Arithmetic.Add = Add;
})(Arithmetic = exports.Arithmetic || (exports.Arithmetic = {}));
//# sourceMappingURL=Arithmetic.js.map