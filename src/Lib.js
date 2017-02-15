/**
 * Created by Josh on 2/13/17.
 * File that holds the standard library
 */
"use strict";
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
    Lib.defs = {
        "add": null
    };
})(Lib = exports.Lib || (exports.Lib = {}));
//# sourceMappingURL=Lib.js.map