/**
 * Created by Josh on 2/18/17.
 * Small file that handles StdOut
 */

//statically encapsulated IO
export namespace IO {
    let Out = "";
    let In = "";
    let svg = "";
    let css = "";

    export let pushOut = (input:string):void => {
        Out += input + '\n';
    };

    export let pushIn = (input:string):void => {
        In += input + '\n';
    };

    export let getOut = ():string => {
        return Out;
    };

    export let getIn = ():string => {
        return In;
    };

    export let flushOut = ():void => {
        Out = "";
    };

    export let flushIn = ():void => {
        In = "";
    };
}