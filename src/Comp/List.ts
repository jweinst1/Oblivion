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
    }
}