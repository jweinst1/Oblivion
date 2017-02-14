import {Caller} from "../Callable";
import {Environment} from "../Env";
/**
 * Created by Josh on 2/13/17.
 */

export namespace Arithmetic {
    export class Add implements Caller.Callable {
        args:string | Caller.Callable[];

        constructor(args:string | Caller.Callable[]) {
            this.args = args;
        }

        call(env: Environment.Env): any {

            return undefined;
        }

        getBody(): Caller.Callable[] {
            return [];
        }
    }
}