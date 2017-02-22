/**
 * Created by Josh on 2/18/17.
 * Small file that handles StdOut
 */
"use strict";
//statically encapsulated IO
var IO;
(function (IO) {
    var Out = "";
    var In = "";
    var svg = "";
    var css = "";
    IO.pushOut = function (input) {
        Out += input + '\n';
    };
    IO.pushIn = function (input) {
        In += input + '\n';
    };
    IO.getOut = function () {
        return Out;
    };
    IO.getIn = function () {
        return In;
    };
    IO.flushOut = function () {
        Out = "";
    };
    IO.flushIn = function () {
        In = "";
    };
})(IO = exports.IO || (exports.IO = {}));
//# sourceMappingURL=IO.js.map