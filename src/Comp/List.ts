import {Collection, OrderedCollection, Printable} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */

export namespace Lists {

    export class OblList implements Collection, OrderedCollection, Printable {

        public items:any[];

        constructor(){
            this.items = [];
        }

        strFormat(): string {
            return JSON.stringify(this.items);
        }

        innerValue(): any {
            return this.items;
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

        append(item: any): void {
            this.items.push(item);
        }

        appendLeft(item: any): void {
            this.items.unshift(item);
        }

        pop(): any {
            if(this.items.length === 0) throw new Error("Pop Error: Pop method requires list not have length 0");
            return this.items.pop();
        }

        popLeft(): any {
            if(this.items.length === 0) throw new Error("Pop Error: Pop method requires list not have length 0");
            return this.items.shift();
        }

        //wont do anything if item not in list
        remove(item: any): void {
            for(let i=0;i<this.items.length;i++){
                if(item === this.items[i]){
                    this.items.splice(i, 1);
                }
            }
        }

        insert(index: number, item: any): void {

        }

        extend(other: Collection): void {
            //not implmented
        }

        find(item: any): any {
            return undefined;
        }
    }
}