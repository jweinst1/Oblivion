import {Collection, Printable} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/27/17.
 * File that stores the Maps namespace
 */


export namespace Maps {
    export class OblMap implements Collection, Printable {


        public pairs:Object;

        constructor(dict:Object = {}){
            this.pairs = dict
        }

        getItem(index: any): any {
            if(typeof index !== 'object'){
                if(index in this.pairs) return this.pairs[index];
                else throw new Errors.IndexError(index);
            }
            else {
                //uses string format for object wrapped valus.
                let str = index.strFormat();
                if(str in this.pairs) return this.pairs[str];
                else throw new Errors.IndexError(str);
            }
        }

        setItem(index: any, value: any): void {
            if(typeof index !== 'object') this.pairs[index] = value;
            else this.pairs[index.strFormat()] = value;
        }

        hasItem(item: any): boolean {
            if(typeof item !== 'object') return item in this.pairs;
            else return item.strFormat() in this.pairs;
        }

        size(): number {
            let total = 0;
            for(let key in this.pairs) total++;
            return total;
        }

        strFormat(): string {
            return JSON.stringify(this.pairs);
        }

        innerValue(): any {
            return this.pairs;
        }
    }
}