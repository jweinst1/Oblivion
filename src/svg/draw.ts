import {Environment} from "../Env";
import {IO} from "../IO";
/**
 * Created by Josh on 2/23/17.
 * Contains implementation for the draw: keyword and underlying function
 */

export namespace drawSVG {

    //Functions that writes to SVG output
    export let draw = (env:Environment.Env, args:any[]) => {
        for(let i=0;i<args.length;i++){
            IO.pushSVG(env.callLib(env, args[i].node, args[i].args).strFormat());
        }
    };
}
