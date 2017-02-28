import {Collection} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/27/17.
 * File that stores the Maps namespace
 */


export namespace Maps {
    export class OblMap implements Collection {
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
                if(index.innerValue() in this.pairs) return this.pairs[index.innerValue()];
                else throw new Errors.IndexError(index.innerValue());
            }
        }

        setItem(index: any, value: any): void {

        }

        hasItem(item: any): boolean {
            return undefined;
        }

        size(): number {
            return undefined;
        }
    }
}