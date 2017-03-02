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
        }
    }
}