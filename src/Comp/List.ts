/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */

export namespace Lists {
    export class List {
        array:any[];
        dict:Object;

        constructor(){
            this.array = [];
            this.dict = {};
        }
        //takes one argument
        append(item:any):void {
            this.array.push(item)
        }

        //takes arbitrary amount of arguments
        appendAll(...items:any[]):void {
            Array.prototype.push.apply(this.array, items);
        }

        appendLeft(item:any):void {
            this.array.unshift(item);
        }

        pop():any {
            if(this.array.length > 0) return this.array.pop();
            //needs custom error
            else throw "Length Error: No items in list.";
        }

        popLeft():any {
            if(this.array.length > 0) return this.array.shift();
            //needs custom error
            else throw "Length Error: No items in list.";
        }

        extend(other:List):void {
            this.array = this.array.concat(other.array);
        }
    }
}