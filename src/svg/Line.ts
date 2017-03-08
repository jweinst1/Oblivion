/**
 * Created by Josh on 3/7/17.
 * File that implements line functions
 */
import {Environment} from "../Env";

export namespace Line {

    export let  makeLine = (env:Environment.Env, args:any[]) => {
        switch(args.length){
            case 0:
                throw new Error(`ArgumentError: Expected at least 2 arguments but got ${args.length}`);
            case 1:
                let arg = env.callLib(env, args[0].node, args[0].args);
                if(typeof arg !== 'object') throw new Error(`TypeError: Expected list argument, got ${typeof arg}`);

        }
    };

    //private method
    export let polyLineString = (points:any[]):string => {
        if(points.length % 2 !== 0) throw new Error("ArgCountError: A Line must have an even number of arguments");
        let str = "";
        return str;
    };
}