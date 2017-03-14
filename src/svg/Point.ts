import {Collection, Printable} from "../Comp/interfaces";
import {SVGObject} from "./Interfaces";
import {Environment} from "../Env";
/**
 * Created by Josh on 3/12/17.
 */


export namespace Points {

    export let makePoint = (env:Environment.Env, args:any[]) => {
        let x = env.callLib(env, args[0].node, args[0].args);
        let y = env.callLib(env, args[1].node, args[1].args);
        if(typeof x !== 'number' || typeof y !== 'number') throw new Error(`Points must have numbers as coordinates`);
        return new Point(x, y);
    };

    export class Point implements Collection, Printable, SVGObject {

        type(): string {
            return "point";
        }

        readonly x:number;
        readonly y:number;
        constructor(x:number = 0 ,y:number=0){
            this.x = x;
            this.y = y;
        }
        strFormat(): string {
            return `${this.x},${this.y}`;
        }

        innerValue(): any {
            return [this.x, this.y];
        }

        setItem(index: any, value: any): any {
            if(index in this){
                if(typeof value !== 'number') throw new Error(`Points can only hold numbers.`);
                this[index] = value;
                return new Point(this.x, this.y);
            }
            else throw new Error(`Index ${index} not supported by Point.`);
        }

        hasItem(item: any): boolean {
            return false;
        }

        getItem(index: any): any {
            if(index in this) return this[index];
            else throw new Error(`Index ${index} not supported by Point.`)
        }

        arrayValue(): any[] {
            return [this.x, this.y];
        }

        size(): number {
            return 2;
        }
    }
}
