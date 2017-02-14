import {Environment} from "../Env";
/**
 * Created by Josh on 2/13/17.
 */


export namespace interfaces {
    export interface Callable {
        call(env:Environment.Env):any;
    }
}