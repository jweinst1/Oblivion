import {Environment} from "../Env";
import {IO} from "../IO";
/**
 * Created by Josh on 2/23/17.
 * Contains implementation for the draw: keyword and underlying function
 */

//namespace to contain drawing operators and functions
export namespace Draw {
    //connects SVG objects via a line
    export let lineConnect = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
    }
}
