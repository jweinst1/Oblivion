import {Environment} from "../Env";
import {IO} from "../IO";
import {Errors} from "../Errors";
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

    //handles a process, no parameter bodies of statemnts evaluated in the same scope
    export let process = (env:Environment.Env, args:any[]) => {
        let procBody = args[0].args;
        return (env:Environment.Env, args:any[]) => {
            if(args.length !== 0) throw new Errors.ArgumentError(args.length, 0);
            //calls all statements in the procBody
            for(let j=0;j<procBody.length;j++){
                env.callLib(env, procBody[j].node, procBody[j].args);
            }
        };

    };

    //handles variable assignment
    export let assign = (env:Environment.Env, args:any[]) => {
        env.set(env.callLib(env,args[0].node, args[0].args), env.callLib(env,args[1].node, args[1].args))
    };
    //handles Word rule, which retrieves variables
    export let wordVar = (env:Environment.Env, args:any[]) => {
        return env.get(args[0]);
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
            IO.pushOut(env.callLib(env, args[i].node, args[i].args));
        }
    };

    export let add = (env:Environment.Env, args:any[]) => {
        if(args.length === 0) return 0;
        let reduc = env.callLib(env, args[0].node, args[0].args);
        for(let i=1;i<args.length;i++){
            reduc += env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };

    export let sub = (env:Environment.Env, args:any[]) => {
        if(args.length === 0) return 0;
        let reduc = env.callLib(env, args[0].node, args[0].args);
        for(let i=1;i<args.length;i++){
            reduc -= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };

    export let mul = (env:Environment.Env, args:any[]) => {
        if(args.length === 0) return 0;
        let reduc = env.callLib(env, args[0].node, args[0].args);
        for(let i=1;i<args.length;i++){
            reduc *= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };

    export let div = (env:Environment.Env, args:any[]) => {
        if(args.length === 0) return 0;
        let reduc = env.callLib(env, args[0].node, args[0].args);
        for(let i=1;i<args.length;i++){
            reduc /= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
    };

    export let rem = (env:Environment.Env, args:any[]) => {
        if(args.length === 0) return 0;
        let reduc = env.callLib(env, args[0].node, args[0].args);
        for(let i=1;i<args.length;i++){
            reduc %= env.callLib(env, args[i].node, args[i].args);
        }
        return reduc;
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
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        return env.callLib(env, args[0].node, args[0].args) === env.callLib(env, args[1].node, args[1].args);
    };


    export let ne = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        return env.callLib(env, args[0].node, args[0].args) !== env.callLib(env, args[1].node, args[1].args);
    };

    //only numbers can be compared with <, <=, >=, and >
    export let lt = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left < right;
    };

    export let gt = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left > right;
    };

    export let le = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left <= right;
    };

    export let ge = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(typeof left !== 'number' || typeof right !== 'number') throw new Errors.TypeError('number', `${typeof left} and ${typeof right}`);
        return left >= right;
    };

    //comparison that works on lists and maps
    export let same = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        return JSON.stringify(env.callLib(env, args[0].node, args[0].args)) === JSON.stringify(env.callLib(env, args[1].node, args[1].args));
    };

    /*Conditional StdLib funcs*/

    export let _if = (env:Environment.Env, args:any[]) => {
        if(args.length < 2) throw new Errors.ArgumentError(args.length, 2);
        let cond = env.callLib(env, args[0].node, args[0].args);
        //if condition is true, only executes first statement
        if(cond){
            //calls if function is present in if statemnt
            let statement = env.callLib(env, args[1].node, args[1].args);
            if(typeof statement === 'function') statement();
        }
        //If condition is false, executes the remaining statements after the first.
        else if(args.length > 2) {
            for(let i=2;i<args.length;i++){
                let state = env.callLib(env, args[i].node, args[i].args);
                if(typeof state === 'function') state();
            }
        }
    };

    export let loop = (env:Environment.Env, args:any[]) => {
        //must have at least a condition and statement/argument
        if(args.length < 2) throw new Errors.ArgumentError(args.length, 2);
        while(env.callLib(env, args[0].node, args[0].args)){
            for(let i=1;i<args.length;i++){
                let state = env.callLib(env, args[i].node, args[i].args);
                if(typeof state === 'function') state();
            }
        }
    };
}