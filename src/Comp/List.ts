import {Collection} from "./interfaces";
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
            return undefined;
        }

        setItem(index: any, value: any): void {
        }

        hasItem(item: any): boolean {
            return undefined;
        }

        size(): number {
            return this.items.length;
        }
    }
}