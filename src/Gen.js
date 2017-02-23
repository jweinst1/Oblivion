"use strict";
var Env_1 = require("./Env");
/**
 * Created by Josh on 2/15/17.
 * File that handles the main generator function
 */
var Gen;
(function (Gen) {
    //main processing function that generates SVG and processes statements
    Gen.gen = function (AST) {
        var env = new Env_1.Environment.Env();
        if (AST["node"] === '?program') {
            for (var i = 0; i < AST['args'].length; i++) {
                env.callLib(env, AST['args'][i].node, AST['args'][i].args);
            }
        }
        //needs SVG output infrastructure
    };
})(Gen = exports.Gen || (exports.Gen = {}));
//# sourceMappingURL=Gen.js.map