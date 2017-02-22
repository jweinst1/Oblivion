/**
 * Created by Josh on 2/21/17.
 * File that implements pair object and related features
 */


export namespace Pair {
    class Pair {
        public first:any;
        public second:any;

        constructor(first:any, second:any){
            this.first = first;
            this.second = second;
        }

        strFormat():string {
            return `${this.first},${this.second}`;
        }
    }

    export let init = (first:any, second:any):Pair => {
        return new Pair(first, second);
    };
}