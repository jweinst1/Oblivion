/**
 * Created by Josh on 3/12/17.
 */
"use strict";
var Points;
(function (Points) {
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    Points.Point = Point;
})(Points = exports.Points || (exports.Points = {}));
//# sourceMappingURL=Point.js.map