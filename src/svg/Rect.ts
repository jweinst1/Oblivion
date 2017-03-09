import {Environment} from "../Env";
import{IO} from "../IO";
/**
 * Created by Josh on 3/8/17.
 * File for creating rectangles
 */

export namespace Rect {
    //not in use yet
    export let makeRect = (env:Environment.Env, args:any[]) => {
        switch(args.length){
            case 4:
                IO.pushSVG(`<rect x="10" y="10" width="100" height="100"/>`);
                break;
            case 5:
                IO.pushSVG(`<rect x="10" y="10" width="100" height="100"/>`);
                break;
            default:
                throw new Error(`ArgumentError: Expected 4 or 5 args but got ${args.length}`);
        }
    };
}
