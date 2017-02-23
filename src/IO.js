"use strict";
var SVGSize_1 = require("./svg/SVGSize");
/**
 * Created by Josh on 2/18/17.
 * Small file that handles StdOut
 */
//statically encapsulated IO
var IO;
(function (IO) {
    var Out = "";
    var In = "";
    var svg = "";
    var css = "";
    var xmldat = 'version="1.1" xmlns="http://www.w3.org/2000/svg"';
    var size = SVGSize_1.SVGSize.init();
    /*SVG/CSS methods*/
    IO.pushSVG = function (input) {
        svg += input + "\n";
    };
    IO.pushCSS = function (input) {
        css += input + "\n";
    };
    //returns format string of svg + css
    IO.getSVGDoc = function (input) {
        return "<svg " + size.strFormat() + " " + xmldat + ">\n<style>" + css + "</style>\n" + svg + "</svg>";
    };
    IO.getflushSVGDoc = function (input) {
        var str = "<svg " + size.strFormat() + " " + xmldat + ">\n<style>" + css + "</style>\n" + svg + "</svg>";
        IO.flushSVG();
        IO.flushCSS();
        return str;
    };
    IO.flushSVG = function () {
        svg = "";
    };
    IO.flushCSS = function () {
        css = "";
    };
    /*StdIn-OUT methods*/
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