"use strict";
/**
 * Created by Josh on 2/22/17.
 * File for the Line svg object
 */
var Line;
(function (Line_1) {
    //function for Lib
    Line_1.initLine = function (env, args) {
        return new Line(env.callLib(env, args[0].node, args[0].args), env.callLib(env, args[1].node, args[1].args), env.callLib(env, args[2].node, args[2].args), env.callLib(env, args[3].node, args[3].args));
    };
    //two point, basic line
    var Line = (function () {
        function Line(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.style = { stroke: "black", 'stroke-width': 1 };
        }
        Line.prototype.styleStrFormat = function () {
            var str = '';
            for (var key in this.style) {
                str += key + "=\"" + this.style[key] + "\" ";
            }
            return str;
        };
        Line.prototype.strFormat = function () {
            return "<line x1=\"" + this.x1 + "\" x2=\"" + this.x2 + "\" y1=\"" + this.y1 + "\" y2=\"" + this.y2 + "\" " + this.styleStrFormat() + "/>";
        };
        Line.prototype.type = function () {
            return "Line";
        };
        Line.prototype.setStrokeWidth = function (width) {
            this.style['stroke-width'] = width;
        };
        Line.prototype.getStrokeWidth = function () {
            return this.style['stroke-width'];
        };
        Line.prototype.setStrokeColor = function (color) {
            this.style['stroke'] = color.strValue();
        };
        Line.prototype.getStrokeColor = function () {
            return this.style['stroke'];
        };
        return Line;
    }());
    Line_1.Line = Line;
})(Line = exports.Line || (exports.Line = {}));
//# sourceMappingURL=LineObj.js.map