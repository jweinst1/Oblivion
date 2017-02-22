/**
 * Created by Josh on 2/21/17.
 * File that implements pair object and related features
 */
"use strict";
var Pair;
(function (Pair_1) {
    var Pair = (function () {
        function Pair(first, second) {
            this.first = first;
            this.second = second;
        }
        Pair.prototype.strFormat = function () {
            return this.first + "," + this.second;
        };
        return Pair;
    }());
    Pair_1.init = function (first, second) {
        return new Pair(first, second);
    };
})(Pair = exports.Pair || (exports.Pair = {}));
//# sourceMappingURL=Pair.js.map