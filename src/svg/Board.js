"use strict";
var CSS_1 = require("./CSS");
/**
 * Created by Josh on 2/19/17.
 * File that implements the SVG Board, which transform into the finished string project
 */
var SVGSize_1 = require("./SVGSize");
var Board;
(function (Board_1) {
    var Board = (function () {
        function Board() {
            this.css = new CSS_1.CSS.Container();
            this.svg = "";
            this.size = SVGSize_1.SVGSize.init();
        }
        Board.prototype.createCSSClass = function (name, attributes) {
            this.css.createClass(name, attributes);
        };
        Board.prototype.drawSVG = function (SVGString) {
            this.svg += SVGString;
        };
        Board.xmldat = 'version="1.1" xmlns="http://www.w3.org/2000/svg"';
        return Board;
    }());
    Board_1.Board = Board;
    Board_1.init = function () {
        return new Board();
    };
})(Board = exports.Board || (exports.Board = {}));
//# sourceMappingURL=Board.js.map