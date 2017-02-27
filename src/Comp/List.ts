import {Collection} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */

export namespace Lists {

    export class OblList implements Collection {
        public items:any[];

        constructor(){
            this.items = [];
        }

        getItem(index: any): any {
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(index < 0 || index >= this.items.length) throw new Errors.IndexError(index+"");
            return this.items[index];
        }

        setItem(index: any, value: any): void {
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(index < 0 || index >= this.items.length) throw new Errors.IndexError(index+"");
            this.items[index] = value;
        }

        hasItem(item: any): boolean {
            for(let val of this.items){
                if(val === item) return true;
            }
            return false;
        }

        size(): number {
            return this.items.length;
        }
    }
}