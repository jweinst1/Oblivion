import {Environment} from "./Env";
/**
 * Created by Josh on 2/13/17.
 */


export namespace Caller {

    //interface describing the basic form of a callable object
    export interface Callable {
        call(env:Environment.Env):any;
        getBody():Callable[];
    }
}