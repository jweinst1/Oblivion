import {Environment} from "../Env";
/**
 * Created by Josh on 2/13/17.
 */

//AST functions that deal with numbers and their operations
export namespace Arithmetic {

    export let add = (env:Environment.Env, args:any[], flag:number) => {
        switch (flag) {
            case 0:
                if(args.length === 0) return 0;
                let reduc = env.callLib(env, args[0].node, args[0].args, flag);
                for(let i=0;i<args.length;i++){
                    reduc += env.callLib(env, args[i].node, args[i].args, flag);
                }
                return reduc;
            case 1:
                //functional objct formation for flag 1.
                break;
        }
    };

    export let number = (env:Environment.Env, args:any[], flag:number) => {
        switch(flag){
            case 0:
                return Number(args[0]);
            case 1:
                break;
        }
    }
}