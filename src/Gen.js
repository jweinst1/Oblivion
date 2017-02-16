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
                var result = env.callLib(env, AST['args'][i].node, AST['args'][i].args, 0);
                console.log(result);
            }
        }
    };
})(Gen = exports.Gen || (exports.Gen = {}));
var tree = {
    node: "/program",
    args: [
        {
            node: '/number',
            args: ['3']
        },
        {
            node: 'add',
            args: [
                {
                    node: '/number',
                    args: ['44']
                },
                {
                    node: '/number',
                    args: ['44']
                },
                {
                    node: '/number',
                    args: ['44']
                },
                {
                    node: 'add',
                    args: [
                        {
                            node: '/number',
                            args: ['44']
                        },
                        {
                            node: '/number',
                            args: ['44']
                        },
                        {
                            node: '/number',
                            args: ['44']
                        },
                        {
                            node: 'add',
                            args: [
                                {
                                    node: '/number',
                                    args: ['44']
                                },
                                {
                                    node: '/number',
                                    args: ['44']
                                },
                                {
                                    node: '/number',
                                    args: ['44']
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
//# sourceMappingURL=Gen.js.map