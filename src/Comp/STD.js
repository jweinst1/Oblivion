"use strict";
var IO_1 = require("../IO");
var Errors_1 = require("../Errors");
var List_1 = require("./List");
var Maps_1 = require("./Maps");
var Iter_1 = require("./Iter");
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
    //handles a process, no parameter bodies of statemnts evaluated in child scope
    STD.process = function (env, args) {
        var procBody = args[0].args;
        return function (env, args) {
            var procEnv = env.createChild();
            if (args.length !== 0)
                throw new Errors_1.Errors.ArgumentError(args.length, 0);
            //calls all statements in the procBody
            for (var j = 0; j < procBody.length; j++) {
                procEnv.callLib(procEnv, procBody[j].node, procBody[j].args);
            }
            //returns localized return value
            return procEnv.getReturnValue();
        };
    };
    //handles variable assignment
    STD.assign = function (env, args) {
        env.set(env.callLib(env, args[0].node, args[0].args), env.callLib(env, args[1].node, args[1].args));
    };
    //handles Word rule, which retrieves variables
    STD.wordVar = function (env, args) {
        var varr = env.safeGet(args[0]);
        if (varr !== undefined)
            return varr;
        else
            return args[0];
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
            var printed = env.callLib(env, args[i].node, args[i].args);
            if (typeof printed === 'object')
                IO_1.IO.pushOut(printed.strFormat());
            else
                IO_1.IO.pushOut(printed);
        }
    };
    //need to be changed to operator
    STD.add = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Error("+ only supports number type.");
        return left + right;
    };
    STD.sub = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Error("- only supports number type.");
        return left - right;
    };
    STD.mul = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Error("* only supports number type.");
        return left * right;
    };
    STD.div = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Error("/ only supports number type.");
        return left / right;
    };
    STD.rem = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Error("% only supports number type.");
        return left % right;
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
        return env.callLib(env, args[0].node, args[0].args) === env.callLib(env, args[1].node, args[1].args);
    };
    STD.ne = function (env, args) {
        return env.callLib(env, args[0].node, args[0].args) !== env.callLib(env, args[1].node, args[1].args);
    };
    //only numbers can be compared with <, <=, >=, and >
    STD.lt = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left < right;
    };
    STD.gt = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left > right;
    };
    STD.le = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left <= right;
    };
    STD.ge = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return left >= right;
    };
    //comparison that works on lists and maps
    STD.same = function (env, args) {
        return JSON.stringify(env.callLib(env, args[0].node, args[0].args)) === JSON.stringify(env.callLib(env, args[1].node, args[1].args));
    };
    //logical or operator
    STD._or = function (env, args) {
        return Boolean(env.callLib(env, args[0].node, args[0].args) || env.callLib(env, args[1].node, args[1].args));
    };
    //logical and operator
    STD._and = function (env, args) {
        return Boolean(env.callLib(env, args[0].node, args[0].args) && env.callLib(env, args[1].node, args[1].args));
    };
    /*Conditional StdLib funcs*/
    STD._if = function (env, args) {
        if (args.length < 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var cond = env.callLib(env, args[0].node, args[0].args);
        var trueBody = args[1].args;
        var falseBody = args[2].args;
        //if condition is true, executes statements in the true body
        if (cond) {
            for (var i = 0; i < trueBody.length; i++) {
                var statement = env.callLib(env, trueBody[i].node, trueBody[i].args);
                if (typeof statement === 'function')
                    statement(env, []);
            }
        }
        else {
            for (var j = 0; j < falseBody.length; j++) {
                var state = env.callLib(env, falseBody[j].node, falseBody[j].args);
                if (typeof state === 'function')
                    state(env, []);
            }
        }
    };
    STD.loop = function (env, args) {
        //must have at least a condition and statement/argument
        var loopBody = args[1].args;
        while (env.callLib(env, args[0].node, args[0].args)) {
            for (var i = 0; i < loopBody.length; i++) {
                //treats function types genrated from AST as callable blocks
                var state = env.callLib(env, loopBody[i].node, loopBody[i].args);
                if (typeof state === 'function')
                    state(env, []);
            }
        }
    };
    //repeat function useful for drawing and looping
    //only accepts 2 arguments
    STD.repeat = function (env, args) {
        if (args.length !== 2)
            throw new Error("ArgumentError: Expected 2 arguments but got " + args.length);
        var times = env.callLib(env, args[0].node, args[0].args);
        var proc = env.callLib(env, args[1].node, args[1].args);
        if (typeof proc !== 'function' || typeof times !== 'number')
            throw new Error("repeat() must take one number and one process or function.");
        while (times--) {
            proc(env, []);
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
        var method = env.callLib(env, args[0].node, args[0].args);
        if (typeof method !== 'function')
            throw new Errors_1.Errors.TypeError('callable', typeof args[0]);
        return method(env, args.slice(1));
    };
    //function for => operator
    STD.attrAssign = function (env, args) {
        var obj = env.get(args[0].args[0].args[0]);
        if (obj.constructor.name !== 'List')
            throw new Error('=> Operator can only be used on lists');
        var key = env.callLib(env, args[0].args[1].node, args[0].args[1].args);
        return obj.setItem(key, env.callLib(env, args[1].node, args[1].args));
    };
    //creates new list object
    STD.c_list = function (env, args) {
        var newlst = [];
        for (var i = 0; i < args.length; i++) {
            newlst.push(env.callLib(env, args[i].node, args[i].args));
        }
        return new List_1.Lists.List(newlst);
    };
    //creates new map object
    STD.c_map = function (env, args) {
        var map = new Maps_1.Maps.OblMap();
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var pair = args_1[_i];
            map.setItem(env.callLib(env, pair.args[0].node, pair.args[0].args), env.callLib(env, pair.args[1].node, pair.args[1].args));
        }
        return map;
    };
    //produces lists in a range
    STD.range = function (env, args) {
        switch (args.length) {
            case 0:
                return new List_1.Lists.List();
            case 1:
                var lst = [];
                var limit = env.callLib(env, args[0].node, args[0].args);
                if (typeof limit !== 'number')
                    throw new Error("TypeError: Got type " + typeof limit + " but needs number.");
                for (var i = 0; i < limit; i++)
                    lst.push(i);
                return new List_1.Lists.List(lst);
            case 2:
                var lst = [];
                var start = env.callLib(env, args[0].node, args[0].args);
                var end = env.callLib(env, args[1].node, args[1].args);
                if (typeof start !== 'number' || typeof end !== 'number')
                    throw new Error("TypeError: Needs type number.");
                for (var i = start; i < end; i++)
                    lst.push(i);
                return new List_1.Lists.List(lst);
        }
    };
    STD._for = function (env, args) {
        var varName = env.callLib(env, args[0].node, args[0].args);
        var iterable = Iter_1.Iter.makeIter(env.callLib(env, args[1].node, args[1].args));
        var forBody = args[2].args;
        //calls for body continously for each in the iterator
        while (!iterable.done) {
            env.set(varName, iterable.next());
            for (var i = 0; i < forBody.length; i++)
                env.callLib(env, forBody[i].node, forBody[i].args);
        }
    };
    /*Generic get and set functions*/
    /*Generic Collection functions*/
    STD.len = function (env, args) {
        var obj = env.callLib(env, args[0].node, args[0].args);
        switch (typeof obj) {
            case 'number': return obj;
            case 'object': return obj.size();
            default: return 1;
        }
    };
    STD._in = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object' || obj === null)
            throw new Error('TypeError: Argument not of collection type');
        return obj.hasItem(env.callLib(env, args[1].node, args[1].args));
    };
    STD.pop = function (env, args) {
        if (args.length !== 1)
            throw new Errors_1.Errors.ArgumentError(args.length, 1);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (obj.constructor.name !== 'List')
            throw new Error();
        return obj.pop();
    };
    STD.insert = function (env, args) {
        if (args.length < 3)
            throw new Errors_1.Errors.ArgumentError(args.length, 3);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (obj.constructor.name !== 'List')
            throw new Error('TypeError: Argument not of List type');
        return obj.insert(env.callLib(env, args[1].node, args[1].args), env.callLib(env, args[2].node, args[2].args));
    };
    //operator implementation of &
    STD.extend = function (env, args) {
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (obj.constructor.name !== 'List')
            throw new Error('TypeError: Argument not of collection type');
        return obj.extend(env.callLib(env, args[1].node, args[1].args));
    };
    STD.find = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (obj.constructor.name !== 'List')
            throw new Error('TypeError: Argument not of List type');
        return obj.find(env.callLib(env, args[1].node, args[1].args));
    };
    STD.slice = function (env, args) {
        if (args.length < 2 || args.length > 3)
            throw new Error("slice() takes either 2 or 3 arguments only");
        var lst = env.callLib(env, args[0].node, args[0].args);
        switch (args.length) {
            case 2:
                var start = env.callLib(env, args[1].node, args[1].args);
                if (typeof start !== 'number')
                    throw new Error("slice() indexes must be a number");
                return lst.copy(start);
            case 3:
                var start = env.callLib(env, args[1].node, args[1].args);
                var end = env.callLib(env, args[2].node, args[2].args);
                if (typeof start !== 'number' || typeof end !== 'number')
                    throw new Error("slice() indexes must be a number");
                return lst.copy(start, end);
        }
    };
    //random number operator
    STD.rand = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (typeof left !== 'number' || typeof right !== 'number')
            throw new Errors_1.Errors.TypeError('number', typeof left + " and " + typeof right);
        return Math.floor((Math.random() * right) + left);
    };
})(STD = exports.STD || (exports.STD = {}));
//# sourceMappingURL=STD.js.map