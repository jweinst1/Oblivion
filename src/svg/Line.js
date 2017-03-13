"use strict";
var Lines;
(function (Lines) {
    var Line = (function () {
        function Line() {
        }
        Line.prototype.strFormat = function () {
            return undefined;
        };
        Line.prototype.type = function () {
            return "line";
        };
        return Line;
    }());
    Lines.Line = Line;
})(Lines = exports.Lines || (exports.Lines = {}));
//# sourceMappingURL=Line.js.map