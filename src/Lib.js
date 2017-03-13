"use strict";
var STD_1 = require("./Comp/STD");
var Color_1 = require("./svg/Color");
var Line_1 = require("./svg/Line");
var Polygon_1 = require("./svg/Polygon");
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
        "?method": STD_1.STD.methodCall,
        "?.": STD_1.STD.attribute,
        "?=>": STD_1.STD.attrAssign,
        "+": STD_1.STD.add,
        "-": STD_1.STD.sub,
        "*": STD_1.STD.mul,
        "/": STD_1.STD.div,
        "%": STD_1.STD.rem,
        "==": STD_1.STD.eq,
        "~=": STD_1.STD.same,
        "!=": STD_1.STD.ne,
        "<": STD_1.STD.lt,
        ">": STD_1.STD.gt,
        "<=": STD_1.STD.le,
        ">=": STD_1.STD.ge,
        "?if": STD_1.STD._if,
        "?loop": STD_1.STD.loop,
        "?for": STD_1.STD._for,
        "print": STD_1.STD.print,
        "?number": STD_1.STD.c_number,
        "?string": STD_1.STD.c_string,
        "?list": STD_1.STD.c_list,
        "?map": STD_1.STD.c_map,
        "?bool": STD_1.STD.c_bool,
        "?null": STD_1.STD.c_null,
        "?word": STD_1.STD.wordVar,
        "?return": STD_1.STD._return,
        /*Lib functons with !*/
        "!range": STD_1.STD.range,
        "!repeat": STD_1.STD.repeat,
        "!type": STD_1.STD.type,
        "!get": STD_1.STD.get,
        "!set": STD_1.STD.set,
        "!append": STD_1.STD.append,
        "!append-left": STD_1.STD.appendLeft,
        "!remove": STD_1.STD.remove,
        "!pop": STD_1.STD.pop,
        "!pop-left": STD_1.STD.popLeft,
        "!len": STD_1.STD.len,
        "!in": STD_1.STD._in,
        "!insert": STD_1.STD.insert,
        "!extend": STD_1.STD.extend,
        "!find": STD_1.STD.find,
        /*SVG*/
        "!color": Color_1.Colors.colorToMap,
        "!line": Line_1.Line.makeLine,
        "!shape": Polygon_1.Polygon.makePolygon
    };
})(Lib = exports.Lib || (exports.Lib = {}));
//# sourceMappingURL=Lib.js.map