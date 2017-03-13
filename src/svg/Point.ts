import {Collection, Printable} from "../Comp/interfaces";
/**
 * Created by Josh on 3/12/17.
 */


export namespace Points {
    export class Point implements Collection, Printable {

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
