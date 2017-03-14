"use strict";
/**
 * Created by Josh on 3/13/17.
 * File to contain objects that assist in SVG string synthesis.
 */
var Wrappers;
(function (Wrappers) {
    var Line = (function () {
        function Line() {
            this.pointStr = "";
            this.stroke = "black";
            this.strokeWidth = 1;
        }
        Line.prototype.put = function (item) {
        };
        Line.prototype.getSVGString = function () {
            return undefined;
        };
        return Line;
    }());
    Wrappers.Line = Line;
})(Wrappers = exports.Wrappers || (exports.Wrappers = {}));
//# sourceMappingURL=Wrappers.js.map