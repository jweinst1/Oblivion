"use strict";
/**
 * Created by Josh on 2/22/17.
 * File for the Line svg object
 */
var Line;
(function (Line_1) {
    //two point, basic line
    var Line = (function () {
        function Line(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.style = {};
        }
        Line.prototype.strForamt = function () {
            return undefined;
        };
        Line.prototype.type = function () {
            return undefined;
        };
        return Line;
    }());
    Line_1.Line = Line;
})(Line = exports.Line || (exports.Line = {}));
//# sourceMappingURL=Line.js.map