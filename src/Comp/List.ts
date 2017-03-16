import {Collection, OrderedCollection, Printable} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */

export namespace Lists {

    export class List implements Collection, Printable {
        //used for iterators
        arrayValue(): any[] {
            return this.items;
        }

        public items:any[];

        constructor(lst:any[] = []){
            this.items = lst;
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
            if (this.items[index].constructor.name === 'List') return this.items[index].copy();
            return this.items[index];
        }

        setItem(index: any, value: any): List {
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(index < 0 || index >= this.items.length) throw new Errors.IndexError(index+"");
            this.items[index] = value;
            return this.copy();
        }

        hasItem(item: any): boolean {
            for(let val of this.items){
                if(JSON.stringify(val) === JSON.stringify(item)) return true;
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
            let size = this.items.length-1;
            if (this.items[size].constructor.name === 'List') return this.items[size].copy();
            return this.items[size];
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
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(index < 0 || index >= this.items.length) throw new Errors.IndexError(index+"");
            this.items.splice(index, 0, item);
        }

        extend(other: any): List {
            if(other.constructor.name === 'List'){
                for(let i=0;i<other.size();i++) this.items.push(other.items[i]);
                return this.copy();
            }
            else {
                this.items.push(other);
                return this.copy();
            }
        }

        find(item: any): any {
           let result = this.items.indexOf(item);
           return result !== -1 ? result : false;
        }


        //function that implements copying
        //also supports slicing
        public copy(start:any = 0, end:any =this.items.length):List {
            //may need error to prevent faulty copying
            let newArr = [];
            for(let i=start;i<end;i++){
                if(this.items[i].constructor.name === 'List'){
                    newArr.push(this.items[i].copy());
                }
                else newArr.push(this.items[i]);
            }
            return new List(newArr);
        }
    }
}