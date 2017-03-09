(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Oblivion = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Created by Josh on 3/2/17.
 * File to keep track of Iterator objct
 */
var Iter;
(function (Iter) {
    var Iterator = (function () {
        function Iterator(lst) {
            this.items = lst;
            this.index = 0;
            this.done = false;
        }
        Iterator.prototype.next = function () {
            if (this.index < this.items.length) {
                var item = this.items[this.index];
                this.index++;
                if (this.index === this.items.length)
                    this.done = true;
                return item;
            }
        };
        return Iterator;
    }());
    Iter.Iterator = Iterator;
    Iter.makeIter = function (obj) {
        if (typeof obj !== 'object')
            throw new Error('IterError: Argument does not conform to Iter Format');
        return new Iterator(obj.arrayValue());
    };
})(Iter = exports.Iter || (exports.Iter = {}));

},{}],2:[function(require,module,exports){
"use strict";
var Errors_1 = require("../Errors");
/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */
var Lists;
(function (Lists) {
    var OblList = (function () {
        function OblList(lst) {
            if (lst === void 0) { lst = []; }
            this.items = lst;
        }
        //used for iterators
        OblList.prototype.arrayValue = function () {
            return this.items;
        };
        OblList.prototype.strFormat = function () {
            return JSON.stringify(this.items);
        };
        OblList.prototype.innerValue = function () {
            return this.items;
        };
        OblList.prototype.getItem = function (index) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            return this.items[index];
        };
        OblList.prototype.setItem = function (index, value) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            this.items[index] = value;
        };
        OblList.prototype.hasItem = function (item) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var val = _a[_i];
                if (val === item)
                    return true;
            }
            return false;
        };
        OblList.prototype.size = function () {
            return this.items.length;
        };
        OblList.prototype.append = function (item) {
            this.items.push(item);
        };
        OblList.prototype.appendLeft = function (item) {
            this.items.unshift(item);
        };
        OblList.prototype.pop = function () {
            if (this.items.length === 0)
                throw new Error("Pop Error: Pop method requires list not have length 0");
            return this.items.pop();
        };
        OblList.prototype.popLeft = function () {
            if (this.items.length === 0)
                throw new Error("Pop Error: Pop method requires list not have length 0");
            return this.items.shift();
        };
        //wont do anything if item not in list
        OblList.prototype.remove = function (item) {
            for (var i = 0; i < this.items.length; i++) {
                if (item === this.items[i]) {
                    this.items.splice(i, 1);
                }
            }
        };
        OblList.prototype.insert = function (index, item) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.items.length)
                throw new Errors_1.Errors.IndexError(index + "");
            this.items.splice(index, 0, item);
        };
        OblList.prototype.extend = function (other) {
            if (typeof other === 'object')
                this.items = this.items.concat(other.arrayValue());
            else
                this.items = this.items.concat(other);
        };
        OblList.prototype.find = function (item) {
            var result = this.items.indexOf(item);
            return result !== -1 ? result : false;
        };
        return OblList;
    }());
    Lists.OblList = OblList;
})(Lists = exports.Lists || (exports.Lists = {}));

},{"../Errors":7}],3:[function(require,module,exports){
"use strict";
var Errors_1 = require("../Errors");
/**
 * Created by Josh on 2/27/17.
 * File that stores the Maps namespace
 */
var Maps;
(function (Maps) {
    var OblMap = (function () {
        function OblMap(dict) {
            if (dict === void 0) { dict = {}; }
            this.pairs = dict;
        }
        //used for iterators
        OblMap.prototype.arrayValue = function () {
            var arr = [];
            for (var key in this.pairs) {
                arr.push(key);
            }
            return arr;
        };
        OblMap.prototype.getItem = function (index) {
            if (typeof index !== 'object') {
                if (index in this.pairs)
                    return this.pairs[index];
                else
                    throw new Errors_1.Errors.IndexError(index);
            }
            else {
                //uses string format for object wrapped valus.
                var str = index.strFormat();
                if (str in this.pairs)
                    return this.pairs[str];
                else
                    throw new Errors_1.Errors.IndexError(str);
            }
        };
        OblMap.prototype.setItem = function (index, value) {
            if (typeof index !== 'object')
                this.pairs[index] = value;
            else
                this.pairs[index.strFormat()] = value;
        };
        OblMap.prototype.hasItem = function (item) {
            if (typeof item !== 'object')
                return item in this.pairs;
            else
                return item.strFormat() in this.pairs;
        };
        OblMap.prototype.size = function () {
            var total = 0;
            for (var key in this.pairs)
                total++;
            return total;
        };
        OblMap.prototype.strFormat = function () {
            return JSON.stringify(this.pairs);
        };
        OblMap.prototype.innerValue = function () {
            return this.pairs;
        };
        return OblMap;
    }());
    Maps.OblMap = OblMap;
})(Maps = exports.Maps || (exports.Maps = {}));

},{"../Errors":7}],4:[function(require,module,exports){
"use strict";
var IO_1 = require("../IO");
var Errors_1 = require("../Errors");
var Strings_1 = require("./Strings");
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
        if (env.contains(args[0]))
            return env.get(args[0]);
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
    STD.attrAssign = function (env, args) {
        var obj = env.get(args[0].args[0].args[0]);
        var key = env.callLib(env, args[0].args[1].node, args[0].args[1].args);
        obj.setItem(key, env.callLib(env, args[1].node, args[1].args));
    };
    STD.c_string = function (env, args) {
        return new Strings_1.Strings.OblString(args[0]);
    };
    //creates new list object
    STD.c_list = function (env, args) {
        for (var i = 0; i < args.length; i++) {
            args[i] = env.callLib(env, args[i].node, args[i].args);
        }
        return new List_1.Lists.OblList(args);
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
                return new List_1.Lists.OblList();
            case 1:
                var lst = [];
                var limit = env.callLib(env, args[0].node, args[0].args);
                if (typeof limit !== 'number')
                    throw new Error("TypeError: Got type " + typeof limit + " but needs number.");
                for (var i = 0; i < limit; i++)
                    lst.push(i);
                return new List_1.Lists.OblList(lst);
            case 2:
                var lst = [];
                var start = env.callLib(env, args[0].node, args[0].args);
                var end = env.callLib(env, args[1].node, args[1].args);
                if (typeof start !== 'number' || typeof end !== 'number')
                    throw new Error("TypeError: Needs type number.");
                for (var i = start; i < end; i++)
                    lst.push(i);
                return new List_1.Lists.OblList(lst);
        }
    };
    STD.type = function (env, args) {
        if (args.length !== 1)
            throw new Error("ArgumentError: !type() takes one argument but got " + args.length);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object')
            return new Strings_1.Strings.OblString(typeof obj);
        else
            switch (obj.constructor.name) {
                case 'OblList': return new Strings_1.Strings.OblString('List');
                case 'OblString': return new Strings_1.Strings.OblString('String');
                case 'OblMap': return new Strings_1.Strings.OblString('Map');
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
    STD.get = function (env, args) {
        if (args.length !== 2)
            throw new Error("ArgumentError: !get() takes 2 arguments but got " + args.length);
        return env.callLib(env, args[0].node, args[0].args).getItem(env.callLib(env, args[1].node, args[1].args));
    };
    STD.set = function (env, args) {
        if (args.length !== 3)
            throw new Error("ArgumentError: !get() takes 3 arguments but got " + args.length);
        env.callLib(env, args[0].node, args[0].args).setItem(env.callLib(env, args[1].node, args[1].args), env.callLib(env, args[2].node, args[2].args));
    };
    /*Generic Collection functions*/
    STD.append = function (env, args) {
        if (args.length < 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object' || !('append' in obj.constructor.prototype))
            throw new Error('TypeError: Argument not of collection type');
        for (var i = 1; i < args.length; i++)
            obj.append(env.callLib(env, args[i].node, args[i].args));
    };
    STD.appendLeft = function (env, args) {
        if (args.length < 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object' || !('append' in obj.constructor.prototype))
            throw new Error('TypeError: Argument not of collection type');
        for (var i = 1; i < args.length; i++)
            obj.appendLeft(env.callLib(env, args[i].node, args[i].args));
    };
    STD.remove = function (env, args) {
        if (args.length < 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object' || !('append' in obj.constructor.prototype))
            throw new Error('TypeError: Argument not of collection type');
        obj.remove(env.callLib(env, args[1].node, args[1].args));
    };
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
        if (typeof obj !== 'object')
            throw new Error('TypeError: Argument not of collection type');
        return obj.hasItem(env.callLib(env, args[1].node, args[1].args));
    };
    STD.pop = function (env, args) {
        if (args.length !== 1)
            throw new Errors_1.Errors.ArgumentError(args.length, 1);
        return env.callLib(env, args[0].node, args[0].args).pop();
    };
    STD.popLeft = function (env, args) {
        if (args.length !== 1)
            throw new Errors_1.Errors.ArgumentError(args.length, 1);
        return env.callLib(env, args[0].node, args[0].args).popLeft();
    };
    STD.insert = function (env, args) {
        if (args.length < 3)
            throw new Errors_1.Errors.ArgumentError(args.length, 3);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object' || !('insert' in obj.constructor.prototype))
            throw new Error('TypeError: Argument not of collection type');
        obj.insert(env.callLib(env, args[1].node, args[1].args), env.callLib(env, args[2].node, args[2].args));
    };
    STD.extend = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object')
            throw new Error('TypeError: Argument not of collection type');
        obj.extend(env.callLib(env, args[1].node, args[1].args));
    };
    STD.find = function (env, args) {
        if (args.length !== 2)
            throw new Errors_1.Errors.ArgumentError(args.length, 2);
        var obj = env.callLib(env, args[0].node, args[0].args);
        if (typeof obj !== 'object' || !('insert' in obj.constructor.prototype))
            throw new Error('TypeError: Argument not of ordered collection type');
        return obj.find(env.callLib(env, args[1].node, args[1].args));
    };
})(STD = exports.STD || (exports.STD = {}));

},{"../Errors":7,"../IO":9,"./Iter":1,"./List":2,"./Maps":3,"./Strings":5}],5:[function(require,module,exports){
"use strict";
var Errors_1 = require("../Errors");
/**
 * Created by Josh on 2/25/17.
 */
//contains OblString class and string util methods
var Strings;
(function (Strings) {
    var OblString = (function () {
        function OblString(str) {
            if (str === void 0) { str = ""; }
            this.str = str;
        }
        //used for iterators
        OblString.prototype.arrayValue = function () {
            return this.str.split("");
        };
        OblString.prototype.strFormat = function () {
            return "\"" + this.str + "\"";
        };
        OblString.prototype.innerValue = function () {
            return this.str;
        };
        OblString.prototype.getItem = function (index) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.str.length)
                throw new Errors_1.Errors.IndexError(String(index));
            else
                return this.str[index];
        };
        OblString.prototype.setItem = function (index, value) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (index < 0 || index >= this.str.length)
                throw new Errors_1.Errors.IndexError(String(index));
            this.str = this.str.replace(this.str.charAt(index), value);
        };
        //checks if string contains substring
        OblString.prototype.hasItem = function (item) {
            return this.str.search(item.innerValue()) !== -1;
        };
        OblString.prototype.size = function () {
            return this.str.length;
        };
        OblString.prototype.append = function (item) {
            this.str += item;
        };
        OblString.prototype.appendLeft = function (item) {
            this.str = item + this.str;
        };
        OblString.prototype.pop = function () {
            if (this.str) {
                var popped = this.str[this.str.length];
                this.str = this.str.slice(0, -1);
                return popped;
            }
            else {
                throw new Error("LengthError: String cannot be popped when empty.");
            }
        };
        OblString.prototype.popLeft = function () {
            if (this.str) {
                var popped = this.str[0];
                this.str = this.str.slice(1);
                return popped;
            }
            else {
                throw new Error("LengthError: String cannot be popped when empty.");
            }
        };
        OblString.prototype.remove = function (item) {
            this.str = this.str.replace(item, "");
        };
        OblString.prototype.insert = function (index, item) {
            if (typeof index !== 'number')
                throw new Errors_1.Errors.TypeError('number', typeof index);
            if (typeof item === 'object')
                item = item.strValue();
            this.str = this.str.slice(0, index) + item + this.str.slice(index);
        };
        OblString.prototype.extend = function (other) {
            if (typeof other === 'object')
                other = other.strValue();
            this.str += other;
        };
        OblString.prototype.find = function (item) {
            var result = this.str.search(item);
            return result !== -1 ? result : false;
        };
        return OblString;
    }());
    Strings.OblString = OblString;
})(Strings = exports.Strings || (exports.Strings = {}));

},{"../Errors":7}],6:[function(require,module,exports){
"use strict";
var Lib_1 = require("./Lib");
/**
 * Created by Josh on 2/13/17.
 * File that implements the environment class
 */
var Environment;
(function (Environment) {
    var Env = (function () {
        function Env(parent) {
            if (parent === void 0) { parent = null; }
            this.variables = {};
            this.parent = parent;
            this.lib = Lib_1.Lib.defs;
            this.returnValue = void 0;
        }
        Env.prototype.get = function (key) {
            if (this.contains(key))
                return this.variables[key];
            else if (this.parent) {
                //Checks if variable defined in parent environment
                return this.parent.get(key);
            }
            else
                throw "Key Error, variable " + key + " not found.";
        };
        //unnests from lib
        Env.prototype.callLib = function (env, ASTkey, args) {
            //needs changing
            if (ASTkey in this.lib)
                return this.lib[ASTkey](env, args);
            else if (ASTkey in this.variables)
                return this.get(ASTkey)(env, args);
            else
                throw "Call Error, func " + ASTkey + " not found.";
        };
        ;
        Env.prototype.set = function (key, val) {
            this.variables[key] = val;
        };
        Env.prototype.contains = function (key) {
            return key in this.variables;
        };
        Env.prototype.del = function (key) {
            delete this.variables[key];
        };
        //creates child Env
        Env.prototype.createChild = function () {
            return new Env(this);
        };
        Env.prototype.setReturnValue = function (value) {
            this.returnValue = value;
        };
        Env.prototype.getReturnValue = function () {
            return this.returnValue;
        };
        return Env;
    }());
    Environment.Env = Env;
})(Environment = exports.Environment || (exports.Environment = {}));

},{"./Lib":10}],7:[function(require,module,exports){
/**
 * Created by Josh on 2/17/17.
 * File which implements Errors
 * All Errors follow an interface
 */
"use strict";
var Errors;
(function (Errors) {
    var NameError = (function () {
        function NameError(name) {
            this.name = name;
        }
        NameError.prototype.type = function () {
            return "NameError";
        };
        NameError.prototype.message = function () {
            return "Name " + this.name + " not defined";
        };
        return NameError;
    }());
    Errors.NameError = NameError;
    var IndexError = (function () {
        function IndexError(index) {
            this.index = index;
        }
        IndexError.prototype.type = function () {
            return "IndexError";
        };
        IndexError.prototype.message = function () {
            return "Index " + this.index + " not defined on list.";
        };
        return IndexError;
    }());
    Errors.IndexError = IndexError;
    var ArgumentError = (function () {
        function ArgumentError(got, expected) {
            this.got = got;
            this.expected = expected;
        }
        ArgumentError.prototype.type = function () {
            return "ArgumentError";
        };
        ArgumentError.prototype.message = function () {
            return "Got " + this.got + " arguments but expected: " + this.expected;
        };
        return ArgumentError;
    }());
    Errors.ArgumentError = ArgumentError;
    var CssAttributeError = (function () {
        function CssAttributeError(classname, key) {
            this.name = classname;
            this.key = key;
        }
        CssAttributeError.prototype.type = function () {
            return "CssAttributeError";
        };
        CssAttributeError.prototype.message = function () {
            return "Attribute " + this.key + " not defined on style " + this.name;
        };
        return CssAttributeError;
    }());
    Errors.CssAttributeError = CssAttributeError;
    //possibly not needed due to writing SVG/CSS components
    var CssClassError = (function () {
        function CssClassError(name) {
            this.name = name;
        }
        ;
        CssClassError.prototype.type = function () {
            return "CssClassError";
        };
        CssClassError.prototype.message = function () {
            return "CSS Class " + this.name + " is not defined.";
        };
        return CssClassError;
    }());
    Errors.CssClassError = CssClassError;
    var TypeError = (function () {
        function TypeError(required, got) {
            this.required = required;
            this.got = got;
        }
        ;
        TypeError.prototype.type = function () {
            return "TypeError";
        };
        TypeError.prototype.message = function () {
            return "Call requires type " + this.required + " but got " + this.got;
        };
        return TypeError;
    }());
    Errors.TypeError = TypeError;
})(Errors = exports.Errors || (exports.Errors = {}));

},{}],8:[function(require,module,exports){
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

},{"./Env":6}],9:[function(require,module,exports){
"use strict";
var SVGSize_1 = require("./svg/SVGSize");
/**
 * Created by Josh on 2/18/17.
 * Small file that handles StdOut
 */
//statically encapsulated IO
var IO;
(function (IO) {
    var Out = "";
    var In = "";
    var svg = "";
    var css = "";
    var xmldat = 'version="1.1" xmlns="http://www.w3.org/2000/svg"';
    var size = SVGSize_1.SVGSize.init();
    /*SVG/CSS methods*/
    IO.pushSVG = function (input) {
        svg += input + "\n";
    };
    IO.pushCSS = function (input) {
        css += input + "\n";
    };
    //returns format string of svg + css
    IO.getSVGDoc = function (input) {
        return "<svg " + size.strFormat() + " " + xmldat + ">\n<style>" + css + "</style>\n" + svg + "</svg>";
    };
    IO.getflushSVGDoc = function (input) {
        var str = "<svg " + size.strFormat() + " " + xmldat + ">\n<style>" + css + "</style>\n" + svg + "</svg>";
        IO.flushSVG();
        IO.flushCSS();
        return str;
    };
    IO.flushSVG = function () {
        svg = "";
    };
    IO.flushCSS = function () {
        css = "";
    };
    /*StdIn-OUT methods*/
    IO.pushOut = function (input) {
        Out += input + '\n';
    };
    IO.pushIn = function (input) {
        In += input + '\n';
    };
    IO.getOut = function () {
        return Out;
    };
    IO.getIn = function () {
        return In;
    };
    IO.flushOut = function () {
        Out = "";
    };
    IO.flushIn = function () {
        In = "";
    };
    //gets and flushes stdout
    IO.getFlushOut = function () {
        var result = Out;
        Out = "";
        return result;
    };
})(IO = exports.IO || (exports.IO = {}));

},{"./svg/SVGSize":16}],10:[function(require,module,exports){
"use strict";
var STD_1 = require("./Comp/STD");
var Color_1 = require("./svg/Color");
var Line_1 = require("./svg/Line");
var Polygon_1 = require("./svg/Polygon");
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
        "?=": STD_1.STD.assign,
        "?func": STD_1.STD.func,
        "?params": STD_1.STD.params,
        "?name": STD_1.STD.name,
        "?gen": STD_1.STD.generator,
        "?process": STD_1.STD.process,
        "?method": STD_1.STD.methodCall,
        "?.": STD_1.STD.attribute,
        "?=>": STD_1.STD.attrAssign,
        "+": STD_1.STD.add,
        "-": STD_1.STD.sub,
        "*": STD_1.STD.mul,
        "/": STD_1.STD.div,
        "%": STD_1.STD.rem,
        "==": STD_1.STD.eq,
        "~=": STD_1.STD.same,
        "!=": STD_1.STD.ne,
        "<": STD_1.STD.lt,
        ">": STD_1.STD.gt,
        "<=": STD_1.STD.le,
        ">=": STD_1.STD.ge,
        "?if": STD_1.STD._if,
        "?loop": STD_1.STD.loop,
        "?for": STD_1.STD._for,
        "!print": STD_1.STD.print,
        "?number": STD_1.STD.c_number,
        "?string": STD_1.STD.c_string,
        "?list": STD_1.STD.c_list,
        "?map": STD_1.STD.c_map,
        "?bool": STD_1.STD.c_bool,
        "?null": STD_1.STD.c_null,
        "?word": STD_1.STD.wordVar,
        "?return": STD_1.STD._return,
        /*Lib functons with !*/
        "!range": STD_1.STD.range,
        "!repeat": STD_1.STD.repeat,
        "!type": STD_1.STD.type,
        "!get": STD_1.STD.get,
        "!set": STD_1.STD.set,
        "!append": STD_1.STD.append,
        "!append-left": STD_1.STD.appendLeft,
        "!remove": STD_1.STD.remove,
        "!pop": STD_1.STD.pop,
        "!pop-left": STD_1.STD.popLeft,
        "!len": STD_1.STD.len,
        "!in": STD_1.STD._in,
        "!insert": STD_1.STD.insert,
        "!extend": STD_1.STD.extend,
        "!find": STD_1.STD.find,
        /*SVG*/
        "!color": Color_1.Colors.colorToMap,
        "!line": Line_1.Line.makeLine,
        "!shape": Polygon_1.Polygon.makePolygon
    };
})(Lib = exports.Lib || (exports.Lib = {}));

},{"./Comp/STD":4,"./svg/Color":13,"./svg/Line":14,"./svg/Polygon":15}],11:[function(require,module,exports){
/**
 * Created by Josh on 2/12/17.
 * Main file for Compiler
 */
var prs = require('./parse/parser');
var gen = require('./Gen');
var io = require('./IO');

//option determines output
var Compile = function(code, option){
    if (option === void 0) { option = 1; }
    var ast = prs.parse(code);
    gen.Gen.gen(ast);
    switch(option){
        case 0:
            return io.IO.getOut();
        case 1:
            return io.IO.getflushSVGDoc();
    }
};

exports.Compile = Compile;



},{"./Gen":8,"./IO":9,"./parse/parser":12}],12:[function(require,module,exports){
module.exports = /*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
    (function() {
        "use strict";

        function peg$subclass(child, parent) {
            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
        }

        function peg$SyntaxError(message, expected, found, location) {
            this.message  = message;
            this.expected = expected;
            this.found    = found;
            this.location = location;
            this.name     = "SyntaxError";

            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, peg$SyntaxError);
            }
        }

        peg$subclass(peg$SyntaxError, Error);

        peg$SyntaxError.buildMessage = function(expected, found) {
            var DESCRIBE_EXPECTATION_FNS = {
                literal: function(expectation) {
                    return "\"" + literalEscape(expectation.text) + "\"";
                },

                "class": function(expectation) {
                    var escapedParts = "",
                        i;

                    for (i = 0; i < expectation.parts.length; i++) {
                        escapedParts += expectation.parts[i] instanceof Array
                            ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                            : classEscape(expectation.parts[i]);
                    }

                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                },

                any: function(expectation) {
                    return "any character";
                },

                end: function(expectation) {
                    return "end of input";
                },

                other: function(expectation) {
                    return expectation.description;
                }
            };

            function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            function literalEscape(s) {
                return s
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g,  '\\"')
                    .replace(/\0/g, '\\0')
                    .replace(/\t/g, '\\t')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
            }

            function classEscape(s) {
                return s
                    .replace(/\\/g, '\\\\')
                    .replace(/\]/g, '\\]')
                    .replace(/\^/g, '\\^')
                    .replace(/-/g,  '\\-')
                    .replace(/\0/g, '\\0')
                    .replace(/\t/g, '\\t')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
            }

            function describeExpectation(expectation) {
                return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
            }

            function describeExpected(expected) {
                var descriptions = new Array(expected.length),
                    i, j;

                for (i = 0; i < expected.length; i++) {
                    descriptions[i] = describeExpectation(expected[i]);
                }

                descriptions.sort();

                if (descriptions.length > 0) {
                    for (i = 1, j = 1; i < descriptions.length; i++) {
                        if (descriptions[i - 1] !== descriptions[i]) {
                            descriptions[j] = descriptions[i];
                            j++;
                        }
                    }
                    descriptions.length = j;
                }

                switch (descriptions.length) {
                    case 1:
                        return descriptions[0];

                    case 2:
                        return descriptions[0] + " or " + descriptions[1];

                    default:
                        return descriptions.slice(0, -1).join(", ")
                            + ", or "
                            + descriptions[descriptions.length - 1];
                }
            }

            function describeFound(found) {
                return found ? "\"" + literalEscape(found) + "\"" : "end of input";
            }

            return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
        };

        function peg$parse(input, options) {
            options = options !== void 0 ? options : {};

            var peg$FAILED = {},

                peg$startRuleFunctions = { Program: peg$parseProgram },
                peg$startRuleFunction  = peg$parseProgram,

                peg$c0 = function(c) {return {node:"?program", args:c};},
                peg$c1 = function(a) {return a;},
                peg$c2 = function(d) {return d;},
                peg$c3 = function(i) {return i;},
                peg$c4 = function(f) {return f;},
                peg$c5 = function(g) {return g;},
                peg$c6 = function(l) {return l;},
                peg$c7 = function(c) {return c;},
                peg$c8 = function(r) {return r;},
                peg$c9 = /^[a-zA-Z!><=\/+%*_@$\-]/,
                peg$c10 = peg$classExpectation([["a", "z"], ["A", "Z"], "!", ">", "<", "=", "/", "+", "%", "*", "_", "@", "$", "-"], false, false),
                peg$c11 = "(",
                peg$c12 = peg$literalExpectation("(", false),
                peg$c13 = ")",
                peg$c14 = peg$literalExpectation(")", false),
                peg$c15 = function(node, args) {
                    return {node:node.join(""), args:args};
                },
                peg$c16 = function(method, args) {
                    return {node:"?method", args:[method].concat(args)};
                },
                peg$c17 = "def",
                peg$c18 = peg$literalExpectation("def", false),
                peg$c19 = "_",
                peg$c20 = peg$literalExpectation("_", false),
                peg$c21 = function(n, params, b) {
                    return {node:"?=", args:[n, {node:"?func", args:[params, b]}]};
                },
                peg$c22 = "gen",
                peg$c23 = peg$literalExpectation("gen", false),
                peg$c24 = "call",
                peg$c25 = peg$literalExpectation("call", false),
                peg$c26 = function(n, b, c) {
                    return {node:"?=", args:[n, {node:"?gen", args:[b, c]}]};
                },
                peg$c27 = "return",
                peg$c28 = peg$literalExpectation("return", false),
                peg$c29 = function(a) {
                    return {node:"?return", args:[a]};
                },
                peg$c30 = "if",
                peg$c31 = peg$literalExpectation("if", false),
                peg$c32 = "else",
                peg$c33 = peg$literalExpectation("else", false),
                peg$c34 = function(c, b, d) {
                    return {node:"?if", args:[c, b, d]};
                },
                peg$c35 = "for",
                peg$c36 = peg$literalExpectation("for", false),
                peg$c37 = "in",
                peg$c38 = peg$literalExpectation("in", false),
                peg$c39 = function(v, a, b) {
                    return {node:"?for", args:[v, a, b]};
                },
                peg$c40 = "loop",
                peg$c41 = peg$literalExpectation("loop", false),
                peg$c42 = function(c, b) {
                    return {node:"?loop", args:[c, b]};
                },
                peg$c43 = "=",
                peg$c44 = peg$literalExpectation("=", false),
                peg$c45 = function(v, val) {return {node:"?=", args:[v, val]};},
                peg$c46 = function(v, val) {return {node:"?=>", args:[v, val]};},
                peg$c47 = "[",
                peg$c48 = peg$literalExpectation("[", false),
                peg$c49 = "]",
                peg$c50 = peg$literalExpectation("]", false),
                peg$c51 = function(args) {
                    return {node:"?list", args:args};
                },
                peg$c52 = function(args) {
                    return {node:"?map", args:args};
                },
                peg$c53 = "[:]",
                peg$c54 = peg$literalExpectation("[:]", false),
                peg$c55 = function() {return {node:"?map", args:[]};},
                peg$c56 = ":",
                peg$c57 = peg$literalExpectation(":", false),
                peg$c58 = function(arg1, arg2) {
                    return {node:"?pair", args:[arg1, arg2]};
                },
                peg$c59 = ".",
                peg$c60 = peg$literalExpectation(".", false),
                peg$c61 = function(obj, attr) {return {node:"?.", args:[obj, attr]};},
                peg$c62 = function(p) {return {node:"?params", args:p};},
                peg$c63 = function(s) {return {node:"?body", args:s};},
                peg$c64 = "{",
                peg$c65 = peg$literalExpectation("{", false),
                peg$c66 = "}",
                peg$c67 = peg$literalExpectation("}", false),
                peg$c68 = function(proc) {return {node:"?process", args:[proc]}},
                peg$c69 = function(p) {return p;},
                peg$c70 = function(s) {return s;},
                peg$c71 = peg$otherExpectation("whitespace"),
                peg$c72 = /^[ \t\n\r,]/,
                peg$c73 = peg$classExpectation([" ", "\t", "\n", "\r", ","], false, false),
                peg$c74 = /^[a-zA-Z_@$\-]/,
                peg$c75 = peg$classExpectation([["a", "z"], ["A", "Z"], "_", "@", "$", "-"], false, false),
                peg$c76 = function(n) {return {node:"?name", args:[n.join("")]};},
                peg$c77 = /^[a-z0-9A-Z\-_$@]/,
                peg$c78 = peg$classExpectation([["a", "z"], ["0", "9"], ["A", "Z"], "-", "_", "$", "@"], false, false),
                peg$c79 = function(w) {
                    var result = w.join("");
                    var imdict = {'true':['?bool', true], 'false':['?bool', false], 'null':['?null', null]};
                    if(result in imdict) {return {node:imdict[result][0], args:[imdict[result][1]]}}
                    else if(isNaN(result)) {return {node:"?word", args:[result]};}
                    else return {node:"?number", args:[result]};
                },
                peg$c80 = "\"",
                peg$c81 = peg$literalExpectation("\"", false),
                peg$c82 = /^[^"]/,
                peg$c83 = peg$classExpectation(["\""], true, false),
                peg$c84 = function(s) {return {node:"?string", args:[s.join("")]};},

                peg$currPos          = 0,
                peg$savedPos         = 0,
                peg$posDetailsCache  = [{ line: 1, column: 1 }],
                peg$maxFailPos       = 0,
                peg$maxFailExpected  = [],
                peg$silentFails      = 0,

                peg$result;

            if ("startRule" in options) {
                if (!(options.startRule in peg$startRuleFunctions)) {
                    throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
                }

                peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
            }

            function text() {
                return input.substring(peg$savedPos, peg$currPos);
            }

            function location() {
                return peg$computeLocation(peg$savedPos, peg$currPos);
            }

            function expected(description, location) {
                location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

                throw peg$buildStructuredError(
                    [peg$otherExpectation(description)],
                    input.substring(peg$savedPos, peg$currPos),
                    location
                );
            }

            function error(message, location) {
                location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

                throw peg$buildSimpleError(message, location);
            }

            function peg$literalExpectation(text, ignoreCase) {
                return { type: "literal", text: text, ignoreCase: ignoreCase };
            }

            function peg$classExpectation(parts, inverted, ignoreCase) {
                return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
            }

            function peg$anyExpectation() {
                return { type: "any" };
            }

            function peg$endExpectation() {
                return { type: "end" };
            }

            function peg$otherExpectation(description) {
                return { type: "other", description: description };
            }

            function peg$computePosDetails(pos) {
                var details = peg$posDetailsCache[pos], p;

                if (details) {
                    return details;
                } else {
                    p = pos - 1;
                    while (!peg$posDetailsCache[p]) {
                        p--;
                    }

                    details = peg$posDetailsCache[p];
                    details = {
                        line:   details.line,
                        column: details.column
                    };

                    while (p < pos) {
                        if (input.charCodeAt(p) === 10) {
                            details.line++;
                            details.column = 1;
                        } else {
                            details.column++;
                        }

                        p++;
                    }

                    peg$posDetailsCache[pos] = details;
                    return details;
                }
            }

            function peg$computeLocation(startPos, endPos) {
                var startPosDetails = peg$computePosDetails(startPos),
                    endPosDetails   = peg$computePosDetails(endPos);

                return {
                    start: {
                        offset: startPos,
                        line:   startPosDetails.line,
                        column: startPosDetails.column
                    },
                    end: {
                        offset: endPos,
                        line:   endPosDetails.line,
                        column: endPosDetails.column
                    }
                };
            }

            function peg$fail(expected) {
                if (peg$currPos < peg$maxFailPos) { return; }

                if (peg$currPos > peg$maxFailPos) {
                    peg$maxFailPos = peg$currPos;
                    peg$maxFailExpected = [];
                }

                peg$maxFailExpected.push(expected);
            }

            function peg$buildSimpleError(message, location) {
                return new peg$SyntaxError(message, null, null, location);
            }

            function peg$buildStructuredError(expected, found, location) {
                return new peg$SyntaxError(
                    peg$SyntaxError.buildMessage(expected, found),
                    expected,
                    found,
                    location
                );
            }

            function peg$parseProgram() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = [];
                s2 = peg$parseStatement();
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    s2 = peg$parseStatement();
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 === peg$FAILED) {
                        s2 = null;
                    }
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c0(s1);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseStatement() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 === peg$FAILED) {
                    s1 = null;
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseAssign();
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c1(s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parse_();
                    if (s1 === peg$FAILED) {
                        s1 = null;
                    }
                    if (s1 !== peg$FAILED) {
                        s2 = peg$parseDef();
                        if (s2 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c2(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = peg$parse_();
                        if (s1 === peg$FAILED) {
                            s1 = null;
                        }
                        if (s1 !== peg$FAILED) {
                            s2 = peg$parseIf();
                            if (s2 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c3(s2);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            s1 = peg$parse_();
                            if (s1 === peg$FAILED) {
                                s1 = null;
                            }
                            if (s1 !== peg$FAILED) {
                                s2 = peg$parseFor();
                                if (s2 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c4(s2);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                            if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                s1 = peg$parse_();
                                if (s1 === peg$FAILED) {
                                    s1 = null;
                                }
                                if (s1 !== peg$FAILED) {
                                    s2 = peg$parseGen();
                                    if (s2 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c5(s2);
                                        s0 = s1;
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                                if (s0 === peg$FAILED) {
                                    s0 = peg$currPos;
                                    s1 = peg$parse_();
                                    if (s1 === peg$FAILED) {
                                        s1 = null;
                                    }
                                    if (s1 !== peg$FAILED) {
                                        s2 = peg$parseLoop();
                                        if (s2 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c6(s2);
                                            s0 = s1;
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                    if (s0 === peg$FAILED) {
                                        s0 = peg$currPos;
                                        s1 = peg$parse_();
                                        if (s1 === peg$FAILED) {
                                            s1 = null;
                                        }
                                        if (s1 !== peg$FAILED) {
                                            s2 = peg$parseCall();
                                            if (s2 !== peg$FAILED) {
                                                peg$savedPos = s0;
                                                s1 = peg$c7(s2);
                                                s0 = s1;
                                            } else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                        if (s0 === peg$FAILED) {
                                            s0 = peg$currPos;
                                            s1 = peg$parse_();
                                            if (s1 === peg$FAILED) {
                                                s1 = null;
                                            }
                                            if (s1 !== peg$FAILED) {
                                                s2 = peg$parseReturn();
                                                if (s2 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c8(s2);
                                                    s0 = s1;
                                                } else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            } else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                return s0;
            }

            function peg$parseCall() {
                var s0, s1, s2, s3, s4, s5, s6;

                s0 = peg$currPos;
                s1 = [];
                if (peg$c9.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c10); }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c9.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c10); }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 40) {
                        s2 = peg$c11;
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c12); }
                    }
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parse_();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseOperands();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parse_();
                                if (s5 !== peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 41) {
                                        s6 = peg$c13;
                                        peg$currPos++;
                                    } else {
                                        s6 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c14); }
                                    }
                                    if (s6 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c15(s1, s4);
                                        s0 = s1;
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parseAttribute();
                    if (s1 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 40) {
                            s2 = peg$c11;
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c12); }
                        }
                        if (s2 !== peg$FAILED) {
                            s3 = peg$parse_();
                            if (s3 !== peg$FAILED) {
                                s4 = peg$parseOperands();
                                if (s4 !== peg$FAILED) {
                                    s5 = peg$parse_();
                                    if (s5 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 41) {
                                            s6 = peg$c13;
                                            peg$currPos++;
                                        } else {
                                            s6 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c14); }
                                        }
                                        if (s6 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c16(s1, s4);
                                            s0 = s1;
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }

                return s0;
            }

            function peg$parseDef() {
                var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

                s0 = peg$currPos;
                if (input.substr(peg$currPos, 3) === peg$c17) {
                    s1 = peg$c17;
                    peg$currPos += 3;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c18); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseName();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 40) {
                                    s5 = peg$c11;
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c12); }
                                }
                                if (s5 !== peg$FAILED) {
                                    s6 = peg$parse_();
                                    if (s6 !== peg$FAILED) {
                                        s7 = peg$parseParams();
                                        if (s7 !== peg$FAILED) {
                                            s8 = peg$parse_();
                                            if (s8 !== peg$FAILED) {
                                                if (input.charCodeAt(peg$currPos) === 41) {
                                                    s9 = peg$c13;
                                                    peg$currPos++;
                                                } else {
                                                    s9 = peg$FAILED;
                                                    if (peg$silentFails === 0) { peg$fail(peg$c14); }
                                                }
                                                if (s9 !== peg$FAILED) {
                                                    s10 = peg$parse_();
                                                    if (s10 !== peg$FAILED) {
                                                        s11 = peg$parseBody();
                                                        if (s11 !== peg$FAILED) {
                                                            s12 = peg$parse_();
                                                            if (s12 !== peg$FAILED) {
                                                                if (input.charCodeAt(peg$currPos) === 95) {
                                                                    s13 = peg$c19;
                                                                    peg$currPos++;
                                                                } else {
                                                                    s13 = peg$FAILED;
                                                                    if (peg$silentFails === 0) { peg$fail(peg$c20); }
                                                                }
                                                                if (s13 !== peg$FAILED) {
                                                                    peg$savedPos = s0;
                                                                    s1 = peg$c21(s3, s7, s11);
                                                                    s0 = s1;
                                                                } else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            } else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        } else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    } else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                } else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            } else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseGen() {
                var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

                s0 = peg$currPos;
                if (input.substr(peg$currPos, 3) === peg$c22) {
                    s1 = peg$c22;
                    peg$currPos += 3;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c23); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseName();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseBody();
                                if (s5 !== peg$FAILED) {
                                    s6 = peg$parse_();
                                    if (s6 !== peg$FAILED) {
                                        if (input.substr(peg$currPos, 4) === peg$c24) {
                                            s7 = peg$c24;
                                            peg$currPos += 4;
                                        } else {
                                            s7 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c25); }
                                        }
                                        if (s7 !== peg$FAILED) {
                                            s8 = peg$parse_();
                                            if (s8 !== peg$FAILED) {
                                                s9 = peg$parseBody();
                                                if (s9 !== peg$FAILED) {
                                                    s10 = peg$parse_();
                                                    if (s10 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 95) {
                                                            s11 = peg$c19;
                                                            peg$currPos++;
                                                        } else {
                                                            s11 = peg$FAILED;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c20); }
                                                        }
                                                        if (s11 !== peg$FAILED) {
                                                            peg$savedPos = s0;
                                                            s1 = peg$c26(s3, s5, s9);
                                                            s0 = s1;
                                                        } else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    } else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                } else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            } else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseReturn() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                if (input.substr(peg$currPos, 6) === peg$c27) {
                    s1 = peg$c27;
                    peg$currPos += 6;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c28); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseArgument();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c29(s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseIf() {
                var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c30) {
                    s1 = peg$c30;
                    peg$currPos += 2;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c31); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseArgument();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseBody();
                                if (s5 !== peg$FAILED) {
                                    s6 = peg$parse_();
                                    if (s6 !== peg$FAILED) {
                                        if (input.substr(peg$currPos, 4) === peg$c32) {
                                            s7 = peg$c32;
                                            peg$currPos += 4;
                                        } else {
                                            s7 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c33); }
                                        }
                                        if (s7 === peg$FAILED) {
                                            s7 = null;
                                        }
                                        if (s7 !== peg$FAILED) {
                                            s8 = peg$parse_();
                                            if (s8 !== peg$FAILED) {
                                                s9 = peg$parseBody();
                                                if (s9 === peg$FAILED) {
                                                    s9 = null;
                                                }
                                                if (s9 !== peg$FAILED) {
                                                    s10 = peg$parse_();
                                                    if (s10 === peg$FAILED) {
                                                        s10 = null;
                                                    }
                                                    if (s10 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 95) {
                                                            s11 = peg$c19;
                                                            peg$currPos++;
                                                        } else {
                                                            s11 = peg$FAILED;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c20); }
                                                        }
                                                        if (s11 !== peg$FAILED) {
                                                            peg$savedPos = s0;
                                                            s1 = peg$c34(s3, s5, s9);
                                                            s0 = s1;
                                                        } else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    } else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                } else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            } else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseFor() {
                var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

                s0 = peg$currPos;
                if (input.substr(peg$currPos, 3) === peg$c35) {
                    s1 = peg$c35;
                    peg$currPos += 3;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c36); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseName();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c37) {
                                    s5 = peg$c37;
                                    peg$currPos += 2;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c38); }
                                }
                                if (s5 !== peg$FAILED) {
                                    s6 = peg$parse_();
                                    if (s6 !== peg$FAILED) {
                                        s7 = peg$parseArgument();
                                        if (s7 !== peg$FAILED) {
                                            s8 = peg$parse_();
                                            if (s8 !== peg$FAILED) {
                                                s9 = peg$parseBody();
                                                if (s9 !== peg$FAILED) {
                                                    s10 = peg$parse_();
                                                    if (s10 !== peg$FAILED) {
                                                        if (input.charCodeAt(peg$currPos) === 95) {
                                                            s11 = peg$c19;
                                                            peg$currPos++;
                                                        } else {
                                                            s11 = peg$FAILED;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c20); }
                                                        }
                                                        if (s11 !== peg$FAILED) {
                                                            peg$savedPos = s0;
                                                            s1 = peg$c39(s3, s7, s9);
                                                            s0 = s1;
                                                        } else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    } else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                } else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            } else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseLoop() {
                var s0, s1, s2, s3, s4, s5, s6, s7;

                s0 = peg$currPos;
                if (input.substr(peg$currPos, 4) === peg$c40) {
                    s1 = peg$c40;
                    peg$currPos += 4;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c41); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseArgument();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseBody();
                                if (s5 !== peg$FAILED) {
                                    s6 = peg$parse_();
                                    if (s6 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 95) {
                                            s7 = peg$c19;
                                            peg$currPos++;
                                        } else {
                                            s7 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c20); }
                                        }
                                        if (s7 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c42(s3, s5);
                                            s0 = s1;
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseAssign() {
                var s0, s1, s2, s3, s4, s5, s6;

                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 === peg$FAILED) {
                    s1 = null;
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseName();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parse_();
                        if (s3 === peg$FAILED) {
                            s3 = null;
                        }
                        if (s3 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 61) {
                                s4 = peg$c43;
                                peg$currPos++;
                            } else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c44); }
                            }
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parse_();
                                if (s5 === peg$FAILED) {
                                    s5 = null;
                                }
                                if (s5 !== peg$FAILED) {
                                    s6 = peg$parseArgument();
                                    if (s6 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c45(s2, s6);
                                        s0 = s1;
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parse_();
                    if (s1 === peg$FAILED) {
                        s1 = null;
                    }
                    if (s1 !== peg$FAILED) {
                        s2 = peg$parseAttribute();
                        if (s2 !== peg$FAILED) {
                            s3 = peg$parse_();
                            if (s3 === peg$FAILED) {
                                s3 = null;
                            }
                            if (s3 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 61) {
                                    s4 = peg$c43;
                                    peg$currPos++;
                                } else {
                                    s4 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c44); }
                                }
                                if (s4 !== peg$FAILED) {
                                    s5 = peg$parse_();
                                    if (s5 === peg$FAILED) {
                                        s5 = null;
                                    }
                                    if (s5 !== peg$FAILED) {
                                        s6 = peg$parseArgument();
                                        if (s6 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c46(s2, s6);
                                            s0 = s1;
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }

                return s0;
            }

            function peg$parseList() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 91) {
                    s1 = peg$c47;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c48); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseOperands();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 93) {
                                    s5 = peg$c49;
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c50); }
                                }
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c51(s3);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 91) {
                        s1 = peg$c47;
                        peg$currPos++;
                    } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c48); }
                    }
                    if (s1 !== peg$FAILED) {
                        s2 = peg$parse_();
                        if (s2 !== peg$FAILED) {
                            s3 = [];
                            s4 = peg$parsePair();
                            while (s4 !== peg$FAILED) {
                                s3.push(s4);
                                s4 = peg$parsePair();
                            }
                            if (s3 !== peg$FAILED) {
                                s4 = peg$parse_();
                                if (s4 !== peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 93) {
                                        s5 = peg$c49;
                                        peg$currPos++;
                                    } else {
                                        s5 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c50); }
                                    }
                                    if (s5 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c52(s3);
                                        s0 = s1;
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.substr(peg$currPos, 3) === peg$c53) {
                            s1 = peg$c53;
                            peg$currPos += 3;
                        } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c54); }
                        }
                        if (s1 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c55();
                        }
                        s0 = s1;
                    }
                }

                return s0;
            }

            function peg$parsePair() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseWord();
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 58) {
                            s3 = peg$c56;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c57); }
                        }
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parseArgument();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parse_();
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c58(s2, s4);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseAttribute() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                s1 = peg$parseName();
                if (s1 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 46) {
                        s2 = peg$c59;
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c60); }
                    }
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseWord();
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c61(s1, s3);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseOperands() {
                var s0, s1;

                s0 = [];
                s1 = peg$parseArgument();
                while (s1 !== peg$FAILED) {
                    s0.push(s1);
                    s1 = peg$parseArgument();
                }

                return s0;
            }

            function peg$parseParams() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = [];
                s2 = peg$parseName();
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    s2 = peg$parseName();
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c62(s1);
                }
                s0 = s1;

                return s0;
            }

            function peg$parseBody() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = [];
                s2 = peg$parseStatement();
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    s2 = peg$parseStatement();
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c63(s1);
                }
                s0 = s1;

                return s0;
            }

            function peg$parseProcess() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 123) {
                    s1 = peg$c64;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c65); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseBody();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 125) {
                                    s5 = peg$c66;
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c67); }
                                }
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c68(s3);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseArgument() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 === peg$FAILED) {
                    s1 = null;
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseCall();
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c7(s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parse_();
                    if (s1 === peg$FAILED) {
                        s1 = null;
                    }
                    if (s1 !== peg$FAILED) {
                        s2 = peg$parseProcess();
                        if (s2 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c69(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                    if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = peg$parse_();
                        if (s1 === peg$FAILED) {
                            s1 = null;
                        }
                        if (s1 !== peg$FAILED) {
                            s2 = peg$parseList();
                            if (s2 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c6(s2);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            s1 = peg$parse_();
                            if (s1 === peg$FAILED) {
                                s1 = null;
                            }
                            if (s1 !== peg$FAILED) {
                                s2 = peg$parseString();
                                if (s2 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c70(s2);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                            if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                s1 = peg$parse_();
                                if (s1 === peg$FAILED) {
                                    s1 = null;
                                }
                                if (s1 !== peg$FAILED) {
                                    s2 = peg$parseAttribute();
                                    if (s2 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c1(s2);
                                        s0 = s1;
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                                if (s0 === peg$FAILED) {
                                    s0 = peg$currPos;
                                    s1 = peg$parse_();
                                    if (s1 === peg$FAILED) {
                                        s1 = null;
                                    }
                                    if (s1 !== peg$FAILED) {
                                        s2 = peg$parseWord();
                                        if (s2 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c1(s2);
                                            s0 = s1;
                                        } else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                            }
                        }
                    }
                }

                return s0;
            }

            function peg$parse_() {
                var s0, s1;

                peg$silentFails++;
                s0 = [];
                if (peg$c72.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c73); }
                }
                while (s1 !== peg$FAILED) {
                    s0.push(s1);
                    if (peg$c72.test(input.charAt(peg$currPos))) {
                        s1 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c73); }
                    }
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c71); }
                }

                return s0;
            }

            function peg$parseName() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 === peg$FAILED) {
                    s1 = null;
                }
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    if (peg$c74.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c75); }
                    }
                    if (s3 !== peg$FAILED) {
                        while (s3 !== peg$FAILED) {
                            s2.push(s3);
                            if (peg$c74.test(input.charAt(peg$currPos))) {
                                s3 = input.charAt(peg$currPos);
                                peg$currPos++;
                            } else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c75); }
                            }
                        }
                    } else {
                        s2 = peg$FAILED;
                    }
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c76(s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseWord() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = [];
                if (peg$c77.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c78); }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c77.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c78); }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c79(s1);
                }
                s0 = s1;

                return s0;
            }

            function peg$parseString() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 34) {
                    s1 = peg$c80;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c81); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    if (peg$c82.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c83); }
                    }
                    while (s3 !== peg$FAILED) {
                        s2.push(s3);
                        if (peg$c82.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c83); }
                        }
                    }
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 34) {
                            s3 = peg$c80;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c81); }
                        }
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c84(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            peg$result = peg$startRuleFunction();

            if (peg$result !== peg$FAILED && peg$currPos === input.length) {
                return peg$result;
            } else {
                if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                    peg$fail(peg$endExpectation());
                }

                throw peg$buildStructuredError(
                    peg$maxFailExpected,
                    peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
                    peg$maxFailPos < input.length
                        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
                        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
                );
            }
        }

        return {
            SyntaxError: peg$SyntaxError,
            parse:       peg$parse
        };
    })();

},{}],13:[function(require,module,exports){
"use strict";
var Maps_1 = require("../Comp/Maps");
var Colors;
(function (Colors) {
    //custom swatch maker for oblivion language
    Colors.colorDict = {};
    //converts a color function arg set to map
    Colors.colorToMap = function (env, args) {
        if (args.length !== 3)
            throw new Error("ArgumentError: Expected 3 argument but got " + args.length);
        return new Maps_1.Maps.OblMap({ r: env.callLib(env, args[0].node, args[0].args),
            g: env.callLib(env, args[1].node, args[1].args),
            b: env.callLib(env, args[2].node, args[2].args) });
    };
    //main color class for Oblivion
    var Color = (function () {
        function Color(r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            this.values = {
                r: r,
                g: g,
                b: b
            };
        }
        Color.prototype.strFormat = function () {
            return "rgb(" + this.values["r"] + "," + this.values["g"] + "," + this.values["b"] + ")";
        };
        Color.prototype.innerValue = function () {
            return this.values;
        };
        Color.prototype.getItem = function (index) {
            if (index in Color.altRGBNames)
                index = Color.altRGBNames[index];
            return this.values[index];
        };
        Color.prototype.setItem = function (index, value) {
            if (index in Color.altRGBNames)
                index = Color.altRGBNames[index];
            this.values[index] = value;
        };
        Color.prototype.hasItem = function (item) {
            if (item in Color.altRGBNames)
                item = Color.altRGBNames[item];
            return item in this.values;
        };
        Color.prototype.arrayValue = function () {
            return [this.values["r"], this.values["g"], this.values["b"]];
        };
        Color.prototype.size = function () {
            return 0;
        };
        Color.altRGBNames = { "red": "r", "green": "g", "blue": "b" };
        return Color;
    }());
    Colors.Color = Color;
    //old RGB class
    /*Saved for future version*/
    var RGB = (function () {
        function RGB(r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            this.red = r;
            this.green = g;
            this.blue = b;
        }
        RGB.prototype.strValue = function () {
            return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
        };
        return RGB;
    }());
    Colors.RGB = RGB;
    var HEX = (function () {
        function HEX(digits) {
            if (digits === void 0) { digits = '#FFFFFF'; }
            if (!(HEX.isHex(digits))) {
                throw "Error Hex Color invalid";
            }
            this.digits = digits;
        }
        HEX.prototype.strValue = function () {
            return "#" + this.digits;
        };
        //checks if a color is a valid 3 or 6 digit HEX color.
        HEX.isHex = function (input) {
            return HEX.hexRegex.test(input);
        };
        HEX.hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        return HEX;
    }());
    Colors.HEX = HEX;
    var Swatch = (function () {
        function Swatch(name) {
            if (name === void 0) { name = "black"; }
            this.name = name;
        }
        Swatch.prototype.strValue = function () {
            return this.name;
        };
        //checks if a color is a named SVG color.
        Swatch.isSwatch = function (input) {
            return input in Swatch.swatchSet;
        };
        Swatch.swatchSet = {
            black: true, white: true, gray: true,
            cyan: true, blue: true, red: true,
            yellow: true, turquoise: true, indigo: true,
            green: true, brown: true, lightpink: true,
            violet: true, tan: true, orange: true
        };
        Swatch.swatchList = [
            'black', 'white', 'gray', 'cyan', 'blue', 'red', 'yellow',
            'turquoise', 'indigo', 'green', 'brown', 'lightpink', 'violet',
            'tan', 'orange'
        ];
        return Swatch;
    }());
    Colors.Swatch = Swatch;
    //gets random swatch color
    Colors.randSwatch = function () {
        return new Swatch(Swatch.swatchList[Math.floor((Math.random() * Swatch.swatchList.length))]);
    };
})(Colors = exports.Colors || (exports.Colors = {}));

},{"../Comp/Maps":3}],14:[function(require,module,exports){
"use strict";
var IO_1 = require("../IO");
var Line;
(function (Line) {
    Line.makeLine = function (env, args) {
        switch (args.length) {
            case 0:
                throw new Error("ArgumentError: Expected at least 2 arguments but got " + args.length);
            case 1:
                var arg = env.callLib(env, args[0].node, args[0].args);
                if (typeof arg !== 'object')
                    throw new Error("TypeError: Expected list argument, got " + typeof arg);
                IO_1.IO.pushSVG("<polyline points=\"" + Line.polyLineString(arg.arrayValue()) + "\" stroke=\"black\" stroke-width=\"1\"/>");
                break;
            case 2:
                var arg = env.callLib(env, args[0].node, args[0].args);
                var color = env.callLib(env, args[1].node, args[1].args);
                if (typeof arg !== 'object')
                    throw new Error("TypeError: Expected list argument, got " + typeof arg);
                IO_1.IO.pushSVG("<polyline points=\"" + Line.polyLineString(arg.arrayValue()) + "\" stroke=\"rgb(" + color.getItem('r') + "," + color.getItem('g') + "," + color.getItem('b') + ")\" stroke-width=\"1\"/>");
                break;
            default:
                throw new Error("ArgumentError: Expected 1 or 2 args got " + args.length);
        }
    };
    //private method
    Line.polyLineString = function (points) {
        if (points.length % 2 !== 0)
            throw new Error("ArgCountError: A Line must have an even number of arguments");
        var str = "";
        for (var i = 0; i < points.length - 1; i += 2) {
            if (typeof points[i] !== 'number')
                throw new Error("TypeError: Only number accepted for line but got " + typeof points[i]);
            str += " " + points[i] + "," + points[i + 1];
        }
        return str;
    };
})(Line = exports.Line || (exports.Line = {}));

},{"../IO":9}],15:[function(require,module,exports){
"use strict";
var IO_1 = require("../IO");
var Polygon;
(function (Polygon) {
    Polygon.makePolygon = function (env, args) {
        switch (args.length) {
            case 0:
                throw new Error("ArgumentError: Expected at least 2 arguments but got " + args.length);
            case 1:
                var arg = env.callLib(env, args[0].node, args[0].args);
                if (typeof arg !== 'object')
                    throw new Error("TypeError: Expected list argument, got " + typeof arg);
                IO_1.IO.pushSVG("<polygon points=\"" + Polygon.polygonString(arg.arrayValue()) + "\" fill=\"black\" stroke-width=\"1\"/>");
                break;
            case 2:
                var arg = env.callLib(env, args[0].node, args[0].args);
                var color = env.callLib(env, args[1].node, args[1].args);
                if (typeof arg !== 'object')
                    throw new Error("TypeError: Expected list argument, got " + typeof arg);
                IO_1.IO.pushSVG("<polygon points=\"" + Polygon.polygonString(arg.arrayValue()) + "\" fill=\"rgb(" + color.getItem('r') + "," + color.getItem('g') + "," + color.getItem('b') + ")\" stroke-width=\"1\"/>");
                break;
            default:
                throw new Error("ArgumentError: Expected 1 or 2 args got " + args.length);
        }
    };
    //private method
    Polygon.polygonString = function (points) {
        if (points.length % 2 !== 0)
            throw new Error("ArgCountError: A Polygon must have an even number of arguments");
        var str = "";
        for (var i = 0; i < points.length - 1; i += 2) {
            if (typeof points[i] !== 'number')
                throw new Error("TypeError: Only number accepted for line but got " + typeof points[i]);
            str += " " + points[i] + "," + points[i + 1];
        }
        return str;
    };
})(Polygon = exports.Polygon || (exports.Polygon = {}));

},{"../IO":9}],16:[function(require,module,exports){
/**
 * Created by Josh on 2/20/17.
 * NameSpace that holds the size
 */
"use strict";
var SVGSize;
(function (SVGSize_1) {
    var SVGSize = (function () {
        function SVGSize(width, height) {
            if (width === void 0) { width = "100%"; }
            if (height === void 0) { height = "100%"; }
            this.width = width;
            this.height = height;
        }
        ;
        SVGSize.prototype.setWidth = function (newWidth) {
            this.width = newWidth;
        };
        SVGSize.prototype.setHeight = function (newHeight) {
            this.height = newHeight;
        };
        SVGSize.prototype.strFormat = function () {
            return "width =\"" + this.width + "\" height=\"" + this.height + "\"";
        };
        return SVGSize;
    }());
    SVGSize_1.SVGSize = SVGSize;
    SVGSize_1.init = function () {
        return new SVGSize();
    };
})(SVGSize = exports.SVGSize || (exports.SVGSize = {}));

},{}]},{},[11])(11)
});