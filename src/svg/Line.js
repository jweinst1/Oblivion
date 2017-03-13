"use strict";
var Lines;
(function (Lines) {
    var Line = (function () {
        function Line(point, next) {
            if (next === void 0) { next = null; }
            this.point = point;
            this.next = next;
        }
        Line.prototype.getPoint = function () {
            return this.point;
        };
        Line.prototype.getNext = function () {
            return this.next;
        };
        Line.prototype.hasNext = function () {
            return this.next !== null;
        };
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