import {Environment} from "../Env";
import {IO} from "../IO";
import {Errors} from "../Errors";
import {Strings} from "./Strings";
import {Lists} from "./List";
import {Maps} from "./Maps";
import {Iter} from "./Iter";
/**
 * Created by Josh on 2/13/17.
 */

//AST functions that implement standard library
export namespace STD {
    //produces a callable Oblivion function
    export let func = (env:Environment.Env, args:any[]) => {
        let paramList = env.callLib(env, args[0].node, args[0].args);
        let funcBody = args[1].args;
        return (env:Environment.Env, args:any[]) => {
            //functionally scoped environment
            let funcEnv = env.createChild();
            if(args.length !== paramList.length) throw `Argument Error, expected ${paramList.length} args but got ${args.length}`;
            for(let i=0;i<paramList.length;i++){
                //binds called arguments to new Env
                funcEnv.set(paramList[i], funcEnv.callLib(funcEnv, args[i].node, args[i].args));
            }
            //calls all statements in body
            for(let j=0;j<funcBody.length;j++){
                funcEnv.callLib(funcEnv, funcBody[j].node, funcBody[j].args)
            }
            return funcEnv.getReturnValue();
        };

    };
    //creates a generator object
    export let generator = (env:Environment.Env, args:any[]) => {
        let defBody = args[0].args;
        let genBody = args[1].args;
        let genEnv = env.createChild();
        //runs the def body only once, to set up generator
        for(let i=0;i<defBody.length;i++){
            genEnv.callLib(genEnv, defBody[i].node, defBody[i].args);
        }
        return (env:Environment.Env, args:any[]) => {
            if(args.length !== 0) throw new Errors.ArgumentError(args.length, 0);
            //calls all statements in the generator body
            for(let j=0;j<genBody.length;j++){
                genEnv.callLib(genEnv, genBody[j].node, genBody[j].args);
            }
            //This is preserved between generator calls, but functions the same as a return
            return genEnv.getReturnValue();
        };

    };

    //handles a process, no parameter bodies of statemnts evaluated in child scope
    export let process = (env:Environment.Env, args:any[]) => {
        let procBody = args[0].args;
        return (env:Environment.Env, args:any[]) => {
            let procEnv = env.createChild();
            if(args.length !== 0) throw new Errors.ArgumentError(args.length, 0);
            //calls all statements in the procBody
            for(let j=0;j<procBody.length;j++){
                procEnv.callLib(procEnv, procBody[j].node, procBody[j].args);
            }
            //returns localized return value
            return procEnv.getReturnValue()
        };

    };

    //handles variable assignment
    export let assign = (env:Environment.Env, args:any[]) => {
        env.set(env.callLib(env,args[0].node, args[0].args), env.callLib(env,args[1].node, args[1].args))
    };
    //handles Word rule, which retrieves variables
    export let wordVar = (env:Environment.Env, args:any[]) => {
        let varr = env.safeGet(args[0]);
        if(varr !== undefined) return varr;
        else return args[0];
    };

    //facilitates return function
    export let _return = (env:Environment.Env, args:any[]) => {
        if(args.length === 1) env.setReturnValue(env.callLib(env, args[0].node, args[0].args));
    };


    //handles parameters for a function
    export let params = (env:Environment.Env, args:any[]) => {
        for(let i=0;i<args.length;i++){
            args[i] = env.callLib(env, args[i].node, args[i].args);
        }
        return args;
    };
    //processes name nodes
    export let name = (env:Environment.Env, args:any[]) => {
        return args[0];
    };

    export let print = (env:Environment.Env, args:any[]) => {
        for(let i=0;i<args.length;i++){
            let printed = env.callLib(env, args[i].node, args[i].args);
            if(typeof printed === 'object') IO.pushOut(printed.strFormat());
            else if(typeof printed === 'function') IO.pushOut("{func}");
            else IO.pushOut(printed);
        }
    };

    //need to be changed to operator
    export let add = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Error(`+ only supports number type.`);
        return left + right;
    };

    export let sub = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Error(`- only supports number type.`);
        return left - right;
    };

    export let mul = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Error(`* only supports number type.`);
        return left * right;
    };

    export let div = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Error(`/ only supports number type.`);
        return left / right;
    };

    export let rem = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Error(`% only supports number type.`);
        return left % right;
    };

    export let c_number = (env:Environment.Env, args:any[]) => {
        return Number(args[0]);
    };

    //handles bool nodes
    export let c_bool = (env:Environment.Env, args:any[]) => {
        return args[0];
    };

    export let c_null = (env:Environment.Env, args:any[]) => {
        return null;
    };

    //eq logical op functions -------------
    export let eq = (env:Environment.Env, args:any[]) => {
        return env.callLib(env, args[0].node, args[0].args) === env.callLib(env, args[1].node, args[1].args);
    };


    export let ne = (env:Environment.Env, args:any[]) => {
        return env.callLib(env, args[0].node, args[0].args) !== env.callLib(env, args[1].node, args[1].args);
    };

    //only numbers can be compared with <, <=, >=, and >
    export let lt = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left < right;
    };

    export let gt = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left > right;
    };

    export let le = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left <= right;
    };

    export let ge = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left >= right;
    };

    //comparison that works on lists and maps
    export let same = (env:Environment.Env, args:any[]) => {
        return JSON.stringify(env.callLib(env, args[0].node, args[0].args)) === JSON.stringify(env.callLib(env, args[1].node, args[1].args));
    };

    //logical or operator
    export let _or = (env:Environment.Env, args:any[]) => {
        return Boolean(env.callLib(env, args[0].node, args[0].args) || env.callLib(env, args[1].node, args[1].args));
    };

    //logical and operator
    export let _and = (env:Environment.Env, args:any[]) => {
        return Boolean(env.callLib(env, args[0].node, args[0].args) && env.callLib(env, args[1].node, args[1].args));
    };

    /*Conditional StdLib funcs*/

    export let _if = (env:Environment.Env, args:any[]) => {
        if(args.length < 2) throw new Errors.ArgumentError(args.length, 2);
        let cond = env.callLib(env, args[0].node, args[0].args);
        let trueBody = args[1].args;
        let falseBody = args[2].args;
        //if condition is true, executes statements in the true body
        if(cond){
            for(let i=0;i<trueBody.length;i++){
                let statement = env.callLib(env, trueBody[i].node, trueBody[i].args);
                if(typeof statement === 'function') statement(env, []);
            }
        }
        //If condition is false, executes the statements in the false body
        else {
            for(let j=0;j<falseBody.length;j++){
                let state = env.callLib(env, falseBody[j].node, falseBody[j].args);
                if(typeof state === 'function') state(env, []);
            }
        }
    };

    export let loop = (env:Environment.Env, args:any[]) => {
        //must have at least a condition and statement/argument
        let loopBody = args[1].args;
        while(env.callLib(env, args[0].node, args[0].args)){
            for(let i=0;i<loopBody.length;i++){
                //treats function types genrated from AST as callable blocks
                let state = env.callLib(env, loopBody[i].node, loopBody[i].args);
                if(typeof state === 'function') state(env, []);
            }
        }
    };
    //repeat function useful for drawing and looping
    //only accepts 2 arguments
    export let repeat = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Error(`ArgumentError: Expected 2 arguments but got ${args.length}`);
        let times = env.callLib(env, args[0].node, args[0].args);
        let proc = env.callLib(env, args[1].node, args[1].args);
        if(typeof proc !== 'function' || typeof times !== 'number') throw new Error("repeat() must take one number and one process or function.");
        if(times < 1) throw new Error("Cannot call repeat less than 1 times, in valid argument: " +times);
        while(times--){
            proc(env, []);
        }
    };

    export let attribute = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let obj = env.get(env.callLib(env, args[0].node, args[0].args));
        let index = env.callLib(env, args[1].node, args[1].args);
        if(typeof obj === 'object' && obj !== null) {
            return obj.getItem(index); //collection interface
        }
        else throw new Errors.TypeError('Collection', typeof obj);
    };

    //handles any forms of a.b()
    export let methodCall = (env:Environment.Env, args:any[]) => {
        let method = env.callLib(env, args[0].node, args[0].args);
        if(typeof method !== 'function') throw new Errors.TypeError('callable', typeof args[0]);
        return method(env, args.slice(1));
    };

    //function for => operator
    export let attrAssign = (env:Environment.Env, args:any[]) => {
        let obj = env.get(args[0].args[0].args[0]);
        if(obj.constructor.name !== 'List') throw new Error('=> Operator can only be used on lists');
        let key = env.callLib(env, args[0].args[1].node, args[0].args[1].args);
        return obj.setItem(key, env.callLib(env, args[1].node, args[1].args));
    };

    //creates new list object
    export let c_list = (env:Environment.Env, args:any[]) => {
        let newlst = [];
        for(let i=0;i<args.length;i++){
            newlst.push(env.callLib(env, args[i].node, args[i].args));
        }
        return new Lists.List(newlst);
    };

    //creates new map object
    export let c_map = (env:Environment.Env, args:any[]) => {
        let map = new Maps.OblMap();
        for(let pair of args){
            map.setItem(env.callLib(env, pair.args[0].node, pair.args[0].args), env.callLib(env, pair.args[1].node, pair.args[1].args))
        }
        return map;
    };

    //produces lists in a range
    export let range = (env:Environment.Env, args:any[]) => {
        switch(args.length){
            case 0:
                return new Lists.List();
            case 1:
                var lst = [];
                let limit = env.callLib(env, args[0].node, args[0].args);
                if(typeof limit !== 'number') throw new Error(`TypeError: Got type ${typeof limit} but needs number.`);
                for(let i=0;i<limit;i++) lst.push(i);
                return new Lists.List(lst);
            case 2:
                var lst = [];
                let start = env.callLib(env, args[0].node, args[0].args);
                let end = env.callLib(env, args[1].node, args[1].args);
                if(typeof start !== 'number' || typeof end !== 'number') throw new Error(`TypeError: Needs type number.`);
                for(let i=start;i<end;i++) lst.push(i);
                return new Lists.List(lst);
        }
    };


    export let _for = (env:Environment.Env, args:any[]) => {
        let varName = env.callLib(env, args[0].node, args[0].args);
        let iterable = Iter.makeIter(env.callLib(env, args[1].node, args[1].args));
        let forBody = args[2].args;
        //calls for body continously for each in the iterator
        while(!iterable.done){
            env.set(varName, iterable.next());
            for(let i=0;i<forBody.length;i++) env.callLib(env, forBody[i].node, forBody[i].args);
        }

    };

    /*Generic get and set functions*/


    /*Generic Collection functions*/


    export let len = (env:Environment.Env, args:any[]) => {
        let obj = env.callLib(env, args[0].node, args[0].args);
        switch(typeof obj){
            case 'number': return obj;
            case 'object': return obj.size();
            default: return 1;
        }
    };

    export let _in = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let obj = env.callLib(env, args[0].node, args[0].args);
        if(typeof obj !== 'object' || obj === null) throw new Error('TypeError: Argument not of collection type');
        return obj.hasItem(env.callLib(env, args[1].node, args[1].args));
    };

    export let pop = (env:Environment.Env, args:any[]) => {
        if(args.length !== 1) throw new Errors.ArgumentError(args.length, 1);
        let obj = env.callLib(env, args[0].node, args[0].args);
        if(obj.constructor.name !== 'List') throw new Error(`Cannot call pop on type ${typeof obj}`);
        return obj.pop();
    };


    export let insert = (env:Environment.Env, args:any[]) => {
        if(args.length < 3) throw new Errors.ArgumentError(args.length, 3);
        let obj = env.callLib(env, args[0].node, args[0].args);
        if(obj.constructor.name !== 'List') throw new Error('TypeError: Argument not of List type');
        return obj.insert(env.callLib(env, args[1].node, args[1].args), env.callLib(env, args[2].node, args[2].args));
    };

    //operator implementation of &
    export let extend = (env:Environment.Env, args:any[]) => {
        let obj = env.callLib(env, args[0].node, args[0].args);
        if(obj.constructor.name !== 'List') throw new Error('TypeError: Argument not of collection type');
        return obj.extend(env.callLib(env, args[1].node, args[1].args));
    };

    export let find = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let obj = env.callLib(env, args[0].node, args[0].args);
        if(obj.constructor.name !== 'List') throw new Error('TypeError: Argument not of List type');
        return obj.find(env.callLib(env, args[1].node, args[1].args));
    };

    export let slice = (env:Environment.Env, args:any[]) => {
        if(args.length < 2 || args.length > 3) throw new Error("slice() takes either 2 or 3 arguments only");
        let lst = env.callLib(env, args[0].node, args[0].args);
        switch(args.length){
            case 2:
                var start = env.callLib(env, args[1].node, args[1].args);
                if(typeof start !== 'number') throw new Error("slice() indexes must be a number");
                return lst.copy(start);
            case 3:
                var start = env.callLib(env, args[1].node, args[1].args);
                let end = env.callLib(env, args[2].node, args[2].args);
                if(typeof start !== 'number' || typeof end !== 'number') throw new Error("slice() indexes must be a number");
                return lst.copy(start, end);
        }
    };
    //can call a function or process arbitrarily
    export let call = (env:Environment.Env, args:any[]) => {
        if(args.length === 0) throw new Error("call() must take 1 or more arguments");
        let fnc = env.callLib(env, args[0].node, args[0].args);
        if(typeof fnc !== 'function') throw new Error("Cannot call non-function type");
        return fnc(env, args.slice(1));
    };

    //random number operator
    export let rand = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return Math.floor(Math.random() * (Math.floor(right) - Math.ceil(left))) + Math.ceil(left);
    };
}