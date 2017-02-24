"use strict";
var STD_1 = require("./Comp/STD");
var Line_1 = require("./svg/Line");
var draw_1 = require("./svg/draw");
/**
 * Created by Josh on 2/13/17.
 * File that holds the standard library
 */
//processes AST nodes
var Lib;
(function (Lib) {
    //retrieves a library function
    Lib.get = function (AST) {
        if (Lib.contains(AST))
            return Lib.defs[AST["node"]];
    };
    Lib.contains = function (AST) {
        return AST["node"] in Lib.defs;
    };
    //optimized function for calling AST against the active library
    Lib.defs = {
        "?=": STD_1.STD.assign,
        "?func": STD_1.STD.func,
        "?params": STD_1.STD.params,
        "?name": STD_1.STD.name,
        "?gen": STD_1.STD.generator,
        "?process": STD_1.STD.process,
        "+": STD_1.STD.add,
        "-": STD_1.STD.sub,
        "*": STD_1.STD.mul,
        "/": STD_1.STD.div,
        "%": STD_1.STD.rem,
        "==": STD_1.STD.eq,
        "!=": STD_1.STD.ne,
        "<": STD_1.STD.lt,
        ">": STD_1.STD.gt,
        "<=": STD_1.STD.le,
        ">=": STD_1.STD.ge,
        "if": STD_1.STD._if,
        "print": STD_1.STD.print,
        "?number": STD_1.STD.c_number,
        "?bool": STD_1.STD.c_bool,
        "?null": STD_1.STD.c_null,
        "?word": STD_1.STD.wordVar,
        "return": STD_1.STD._return,
        /*SVG*/
        "?draw": draw_1.drawSVG.draw,
        "line": Line_1.Line.initLine
    };
})(Lib = exports.Lib || (exports.Lib = {}));
//# sourceMappingURL=Lib.js.map