import {Collection} from "./interfaces";
/**
 * Created by Josh on 3/2/17.
 * File to keep track of Iterator objct
 */

export namespace Iter {

    export class Iterator {
        private items:any[];
        private index:number;
        public done:boolean;

        constructor(lst:any[]){
            this.items = lst;
            this.index = 0;
            this.done = false;
        }

        public next():any {
            if(this.index < this.items.length){
                const item = this.items[this.index];
                this.index++;
                if(this.index === this.items.length) this.done = true;
                return item;
            }
        }
    }

    export let makeIter = (obj:Collection):Iter.Iterator => {
        return new Iterator(obj.arrayValue());
    };
}