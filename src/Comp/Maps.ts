/**
 * Created by Josh on 2/27/17.
 * File that stores the Maps namespace
 */


export namespace Maps {
    export class OblMap {
        public pairs:Object;

        constructor(dict:Object = {}){
            this.pairs = dict
        }
    }
}