import {Environment} from "../Env";
import {IO} from "../IO";
import {Lines} from "./Line";
import {Synthesizer} from "./Synthesizer";
import {Polygons} from "./Polygon";
/**
 * Created by Josh on 2/23/17.
 * Contains implementation for the draw: keyword and underlying function
 */

//namespace to contain drawing operators and functions
export namespace Draw {

    //name dictionary to check if an SVG type is connectable
    export let connects = {"line":true, "polygon":true};

    export let draw = (env:Environment.Env, args:any[]) => {
        let root = env.callLib(env, args[0].node, args[0].args);
        let syn = new Synthesizer();
        while(root.hasNext()){
            syn.put(root);
            root = root.next;
        }
        syn.releaseSVG();
    };

    //connects SVG objects via a line
    export let lineConnect = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(left.type() === 'point'){
            if(right.type() === 'point') {
                return new Lines.Line(left, new Lines.Line(right));
            }
            else if(right.type() in Draw.connects){
                return new Lines.Line(left, right);
            }
            else throw new Error(`-> Operator received wrong arguments`);
        }
        else if(left.type() in Draw.connects){
            if(right.type() === 'point'){
                left.getLast().next = new Lines.Line(right);
                return left;
            }
            else if(right.type() in Draw.connects){
                left.getLast().next = right;
            }
            else throw new Error(`-> Operator received wrong arguments`);
        }
        else throw new Error(`-> Operator received wrong arguments`);
    };

    //connects two points via a filled
    export let shapeConnect = (env:Environment.Env, args:any[]) => {
        let left = env.callLib(env, args[0].node, args[0].args);
        let right = env.callLib(env, args[1].node, args[1].args);
        if(left.type() === 'point'){
            if(right.type() === 'point') {
                return new Polygons.Polygon(left, new Polygons.Polygon(right));
            }
            else if(right.type() in Draw.connects){
                return new Polygons.Polygon(left, right);
            }
            else throw new Error(`*> Operator received wrong arguments`);
        }
        else if(left.type() in Draw.connects){
            if(right.type() === 'point'){
                left.getLast().next = new Polygons.Polygon(right);
                return left;
            }
            else if(right.type() in Draw.connects){
                left.getLast().next = right;
            }
            else throw new Error(`*> Operator received wrong arguments`);
        }
        else throw new Error(`*> Operator received wrong arguments`);
    }
}
