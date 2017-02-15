"use strict";
/**
 * Created by Josh on 2/13/17.
 */
//AST functions that deal with numbers and their operations
var Arithmetic;
(function (Arithmetic) {
    Arithmetic.add = function (env, args, flag) {
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
                //functional objct formation for flag 1.
                break;
        }
    };
    Arithmetic.number = function (env, args, flag) {
        switch (flag) {
            case 0:
                return Number(args[0]);
            case 1:
                break;
        }
    };
})(Arithmetic = exports.Arithmetic || (exports.Arithmetic = {}));
//# sourceMappingURL=Arithmetic.js.map