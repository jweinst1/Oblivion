"use strict";
/**
 * Created by Josh on 2/13/17.
 */
//AST functions that implement standard library
var STD;
(function (STD) {
    STD.print = function (env, args, flag) {
        switch (flag) {
            case 0:
                for (var i = 0; i < args.length; i++) {
                    console.log(env.callLib(env, args[i].node, args[i].args, flag));
                }
                break;
            case 1:
                break;
        }
    };
    STD.add = function (env, args, flag) {
        switch (flag) {
            case 0:
                if (args.length === 0)
                    return 0;
                var reduc = env.callLib(env, args[0].node, args[0].args, flag);
                for (var i = 0; i < args.length; i++) {
                    reduc += env.callLib(env, args[i].node, args[i].args, flag);
                }
                return reduc;
            case 1:
                //functional object formation for flag 1.
                break;
        }
    };
    STD.sub = function (env, args, flag) {
        switch (flag) {
            case 0:
                if (args.length === 0)
                    return 0;
                var reduc = env.callLib(env, args[0].node, args[0].args, flag);
                for (var i = 0; i < args.length; i++) {
                    reduc -= env.callLib(env, args[i].node, args[i].args, flag);
                }
                return reduc;
            case 1:
                //functional object formation for flag 1.
                break;
        }
    };
    STD.c_number = function (env, args, flag) {
        switch (flag) {
            case 0:
                return Number(args[0]);
            case 1:
                break;
        }
    };
})(STD = exports.STD || (exports.STD = {}));
//# sourceMappingURL=STD.js.map