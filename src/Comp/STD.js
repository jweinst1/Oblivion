"use strict";
var IO_1 = require("../IO");
var Errors_1 = require("../Errors");
var Strings_1 = require("./Strings");
/**
 * Created by Josh on 2/13/17.
 */
//AST functions that implement standard library
var STD;
(function (STD) {
    //produces a callable Oblivion function
    STD.func = function (env, args) {
        var paramList = env.callLib(env, args[0].node, args[0].args);
        var funcBody = args[1].args;
        return function (env, args) {
            //functionally scoped environment
            var funcEnv = env.createChild();
            if (args.length !== paramList.length)
                throw "Argument Error, expected " + paramList.length + " args but got " + args.length;
            for (var i = 0; i < paramList.length; i++) {
                //binds called arguments to new Env
                funcEnv.set(paramList[i], funcEnv.callLib(funcEnv, args[i].node, args[i].args));
            }
            //calls all statements in body
            for (var j = 0; j < funcBody.length; j++) {
                funcEnv.callLib(funcEnv, funcBody[j].node, funcBody[j].args);
            }
            return funcEnv.getReturnValue();
        };
    };
    //creates a generator object
    STD.generator = function (env, args) {
        var defBody = args[0].args;
        var genBody = args[1].args;
        var genEnv = env.createChild();
        //runs the def body only once, to set up generator
        for (var i = 0; i < defBody.length; i++) {
            genEnv.callLib(genEnv, defBody[i].node, defBody[i].args);
        }
        return function (env, args) {
            if (args.length !== 0)
                throw new Errors_1.Errors.ArgumentError(args.length, 0);
            //calls all statements in the generator body
            for (var j = 0; j < genBody.length; j++) {
                genEnv.callLib(genEnv, genBody[j].node, genBody[j].args);
            }
            //This is preserved between generator calls, but functions the same as a return
            return genEnv.getReturnValue();
        };
    };
    //handles a process, no parameter bodies of statemnts evaluated in the same scope
    STD.process = function (env, args) {
        var procBody = args[0].args;
        return function (env, args) {
            if (args.length !== 0)
                throw new Errors_1.Errors.ArgumentError(args.length, 0);
            //calls all statements in the procBody
            for (var j = 0; j < procBody.length; j++) {
                env.callLib(env, procBody[j].node, procBody[j].args);
            }
        };
    };
    //handles variable assignment
    STD.assign = function (env, args) {
        env.set(env.callLib(env, args[0].node, args[0].args), env.callLib(env, args[1].node, args[1].args));
    };
    //handles Word rule, which retrieves variables
    STD.wordVar = function (env, args) {
        return env.get(args[0]);
    };
    //facilitates return function
    STD._return = function (env, args) {
        if (args.length === 1)
            env.setReturnValue(env.callLib(env, args[0].node, args[0].args));
    };
    //handles parameters for a function
    STD.params = function (env, args) {
        for (var i = 0; i < args.length; i++) {
            args[i] = env.callLib(env, args[i].node, args[i].args);
        }
        return args;
    };
    //processes name nodes
    STD.name = function (env, args) {
        return args[0];
    };
    STD.print = function (env, args) {
        for (var i = 0; i < args.length; i++) {
            IO_1.IO.pushOut(env.callLib(env, args[i].node, args[i].args));
        }
    };
    STD.add = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 1; i < args.length; i++) {
            reduc += env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.sub = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 1; i < args.length; i++) {
            reduc -= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.mul = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 1; i < args.length; i++) {
            reduc *= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.div = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 1; i < args.length; i++) {
            reduc /= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.rem = function (env, args) {
        if (args.length === 0)
            return 0;
        var reduc = env.callLib(env, args[0].node, args[0].args);
        for (var i = 1; i < args.length; i++) {
            reduc %= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };
    STD.c_number = function (env, args) {
        return Number(args[0]);
    };
    //handles bool nodes
    STD.c_bool = function (env, args) {
        return args[0];
    };
    STD.c_null = function (env, args) {
        return null;
    };
    //eq logical op functions -------------
    STD.eq = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        return env.callLib(env, args[0].node, args[0].args) === env.callLib(env, args[1].node, args[1].args);
    };
    STD.ne = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        return env.callLib(env, args[0].node, args[0].args) !== env.callLib(env, args[1].node, args[1].args);
    };
    //only numbers can be compared with <, <=, >=, and >
    STD.lt = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left < right;
    };
    STD.gt = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left > right;
    };
    STD.le = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left <= right;
    };
    STD.ge = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left >= right;
    };
    //comparison that works on lists and maps
    STD.same = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        return JSON.stringify(env.callLib(env, args[0].node, args[0].args)) === JSON.stringify(env.callLib(env, args[1].node, args[1].args));
    };
    /*Conditional StdLib funcs*/
    STD._if = function (env, args) {
        if (args.length < 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var cond = env.callLib(env, args[0].node, args[0].args);
        //if condition is true, only executes first statement
        if (cond) {
            //calls if function is present in if statemnt
            var statement = env.callLib(env, args[1].node, args[1].args);
            if (typeof statement === 'function')
                statement(env, []);
        }
        else if (args.length > 2) {
            for (var i = 2; i < args.length; i++) {
                var state = env.callLib(env, args[i].node, args[i].args);
                if (typeof state === 'function')
                    state(env, []);
            }
        }
    };
    STD.loop = function (env, args) {
        //must have at least a condition and statement/argument
        if (args.length < 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        while (env.callLib(env, args[0].node, args[0].args)) {
            for (var i = 1; i < args.length; i++) {
                //treats function types genrated from AST as callable blocks
                var state = env.callLib(env, args[i].node, args[i].args);
                if (typeof state === 'function')
                    state(env, []);
            }
        }
    };
    STD.attribute = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.get(env.callLib(env, args[0].node, args[0].args));
        var index = env.callLib(env, args[1].node, args[1].args);
        if (typeof obj === 'object' && obj !== null) {
            return obj.getItem(index); //collection interface
        }
        else
            throw new Errors_1.Errors.TypeError('Collection', typeof obj);
    };
    //handles any forms of a.b()
    STD.methodCall = function (env, args) {
        var objnode = args[0].args[0];
        var key = env.callLib(env, args[0].args[1].node, args[0].args[1].args);
        var obj = env.callLib(env, objnode.node, objnode.args);
        if (typeof obj !== 'object' || obj === null)
            throw new Errors_1.Errors.TypeError('Collction', typeof obj);
        if (key in obj.constructor.prototype) {
            for (var i = 1; i < args.length; i++) {
                args[i] = env.callLib(env, args[i].node, args[i].args);
            }
            return obj[key](args.slice(1));
        }
    };
    STD.c_string = function (env, args) {
        return new Strings_1.Strings.OblString(args[0]);
    };
})(STD = exports.STD || (exports.STD = {}));
//# sourceMappingURL=STD.js.map