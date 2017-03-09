/**
 * Created by Josh on 3/7/17.
 * File that implements polygon functions
 */
import {Environment} from "../Env";
import{IO} from "../IO";

export namespace Polygon {

    export let  makePolygon = (env:Environment.Env, args:any[]) => {
        switch(args.length){
            case 0:
                throw new Error(`ArgumentError: Expected at least 2 arguments but got ${args.length}`);
            case 1:
                var arg = env.callLib(env, args[0].node, args[0].args);
                if(typeof arg !== 'object') throw new Error(`TypeError: Expected list argument, got ${typeof arg}`);
                IO.pushSVG(`<polygon points="${Polygon.polygonString(arg.arrayValue())}" fill="black" stroke-width="1"/>`);
                break;

            case 2:
                var arg = env.callLib(env, args[0].node, args[0].args);
                let color = env.callLib(env, args[1].node, args[1].args);
                if(typeof arg !== 'object') throw new Error(`TypeError: Expected list argument, got ${typeof arg}`);
                IO.pushSVG(`<polyline points="${Polygon.polygonString(arg.arrayValue())}" fill="rgb(${color.getItem('r')},${color.getItem('g')},${color.getItem('b')})" stroke-width="1"/>`);
                break;
            default:
                throw new Error(`ArgumentError: Expected 1 or 2 args got ${args.length}`);

        }
    };

    //private method
    export let polygonString = (points:any[]):string => {
        if(points.length % 2 !== 0) throw new Error("ArgCountError: A Polygon must have an even number of arguments");
        let str = "";
        for(let i=0;i<points.length-1;i+=2){
            if(typeof points[i] !== 'number') throw new Error(`TypeError: Only number accepted for line but got ${typeof points[i]}`);
            str += ` ${points[i]},${points[i+1]}`;
        }
        return str;
    };
}
