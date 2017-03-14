import {Environment} from "../Env";
import {IO} from "../IO";
import {Lines} from "./Line";
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
        if(left.type() === 'point'){
            if(right.type() === 'point') {
                return new Lines.Line(left, new Lines.Line(right));
            }
            else if(right.type() === 'line'){
                return new Lines.Line(left, right);
            }
            else throw new Error(`-> Operator received wrong arguments`);
        }
        else if(left.type() === 'line'){
            if(right.type() === 'point'){
                left.getLast().next = new Lines.Line(right);
                return left;
            }
            else if(right.type() === 'line'){
                left.getLast().next = right;
            }
            else throw new Error(`-> Operator received wrong arguments`);
        }
        else throw new Error(`-> Operator received wrong arguments`);
    }
}
