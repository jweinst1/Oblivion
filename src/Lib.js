"use strict";
var STD_1 = require("./CompObjects/STD");
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
        "/params": STD_1.STD.params,
        "/name": STD_1.STD.name,
        "add": STD_1.STD.add,
        "sub": STD_1.STD.sub,
        "print": STD_1.STD.print,
        "/number": STD_1.STD.c_number
    };
})(Lib = exports.Lib || (exports.Lib = {}));
//# sourceMappingURL=Lib.js.map