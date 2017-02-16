"use strict";
/**
 * Created by Josh on 2/13/17.
 */
//AST functions that implement standard library
var STD;
(function (STD) {
    //produces a callable Oblivion function
    STD.func = function (env, args) {
        //functionally scoped environment
        var funcEnv = env.createChild();
    };
    //handles parameters for a function
    STD.params = function (env, args) {
        for (var i = 0; i < args.length; i++) {
        }
    };
    //processes name nodes
    STD.name = function (env, args) {
        return args[0];
    };
    STD.print = function (env, args) {
        for (var i = 0; i < args.length; i++) {
            console.log(env.callLib(env, args[i].node, args[i].args));
        }
    };
    STD.add = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 0; i < args.length; i++) {
            reduc += env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.sub = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 0; i < args.length; i++) {
            reduc -= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.c_number = function (env, args) {
        return Number(args[0]);
    };
})(STD = exports.STD || (exports.STD = {}));
//# sourceMappingURL=STD.js.map