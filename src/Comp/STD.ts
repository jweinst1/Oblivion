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
        return args[0] == "true";
    };

    export let c_null = (env:Environment.Env, args:any[]) => {
        return null;
    };

    //eq logical op
    export let eq = (env:Environment.Env, args:any[]) => {
        if(args.length !== 2) throw new Errors.ArgumentError(args.length, 2);
        return env.callLib(env, args[0].node, args[0].args) === env.callLib(env, args[1].node, args[1].args);
    };
}