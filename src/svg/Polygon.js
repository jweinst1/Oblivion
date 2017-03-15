"use strict";
var Polygons;
(function (Polygons) {
    var Polygon = (function () {
        function Polygon(point, next) {
            if (next === void 0) { next = null; }
            this.point = point;
            this.next = next;
            this.color = "black";
        }
        Polygon.prototype.getLast = function () {
            if (this.hasNext()) {
                return this.next.getLast();
            }
            else
                return this;
        };
        Polygon.prototype.getPoint = function () {
            return this.point;
        };
        Polygon.prototype.getNext = function () {
            return this.next;
        };
        Polygon.prototype.hasNext = function () {
            return this.next !== null;
        };
        Polygon.prototype.setNext = function (other) {
            this.next = other;
        };
        Polygon.prototype.strFormat = function () {
            if (this.hasNext())
                return this.point.strFormat() + " *> " + this.next.strFormat();
            else
                return "" + this.point.strFormat();
        };
        Polygon.prototype.type = function () {
            return "polygon";
        };
        return Polygon;
    }());
    Polygons.Polygon = Polygon;
})(Polygons = exports.Polygons || (exports.Polygons = {}));
//# sourceMappingURL=Polygon.js.map