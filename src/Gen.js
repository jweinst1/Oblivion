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
        if (AST["node"] === '/program') {
            for (var i = 0; i < AST['args'].length; i++) {
                var result = env.callLib(env, AST['args'][i].node, AST['args'][i].args);
                console.log(result(env, [{ node: '/number', args: ['3'] }]));
            }
        }
    };
})(Gen = exports.Gen || (exports.Gen = {}));
var tree = {
    node: "/program",
    args: [
        {
            node: "/func",
            args: [
                {
                    node: "/params",
                    args: [
                        {
                            node: "/name",
                            args: [
                                "foo"
                            ]
                        }
                    ]
                },
                {
                    node: "/body",
                    args: [
                        {
                            node: 'return',
                            args: [
                                {
                                    node: "/number",
                                    args: [
                                        '6'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
Gen.gen(tree);
