"use strict";
var STD_1 = require("./Comp/STD");
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
        "=": STD_1.STD.assign,
        "/func": STD_1.STD.func,
        "/params": STD_1.STD.params,
        "/name": STD_1.STD.name,
        "add": STD_1.STD.add,
        "sub": STD_1.STD.sub,
        "mul": STD_1.STD.mul,
        "div": STD_1.STD.div,
        "rem": STD_1.STD.rem,
        "print": STD_1.STD.print,
        "/number": STD_1.STD.c_number,
        "/bool": STD_1.STD.c_bool,
        "/null": STD_1.STD.c_null,
        "return": STD_1.STD._return
    };
})(Lib = exports.Lib || (exports.Lib = {}));
//# sourceMappingURL=Lib.js.map