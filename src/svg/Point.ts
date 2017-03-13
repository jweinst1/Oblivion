import {ImmutableCollecton, Printable} from "../Comp/interfaces";
/**
 * Created by Josh on 3/12/17.
 */


export namespace Points {
    export class Point implements ImmutableCollecton, Printable {

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
