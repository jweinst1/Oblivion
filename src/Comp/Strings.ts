import {Printable, Collection, OrderedCollection} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/25/17.
 */

//contains OblString class and string util methods
export namespace Strings {

    export class OblString implements Printable, Collection, OrderedCollection {
        //used for iterators
        arrayValue(): any[] {
            return this.str.split("");
        }

        public str:string;

        constructor(str:string = ""){
            this.str = str;
        }

        strFormat(): string {
            return `"${this.str}"`;
        }

        innerValue(): any {
            return this.str;
        }

        getItem(index: any): string {
            //might need type check
            if(index < 0 || index >= this.str.length) throw new Errors.IndexError(index);
            else return this.str[index];
        }

        setItem(index: any, value: any): void {
            if(index < 0 || index >= this.str.length) throw new Errors.IndexError(index);
            this.str = this.str.replace(this.str.charAt(index), value);
        }

        //checks if string contains substring
        hasItem(item: OblString): boolean {
            return this.str.search(item.innerValue()) !== -1;
        }

        size(): number {
            return this.str.length;
        }

        append(item: any): void {
            this.str += item;
        }

        appendLeft(item: any): void {
            this.str = item + this.str;
        }

        pop(): any {
            if(this.str) {
                let popped = this.str[this.str.length];
                this.str = this.str.slice(0, -1);
                return popped;
            }
            else {
                throw new Error(`LengthError: String cannot be popped when empty.`);
            }
        }

        popLeft(): any {
            return undefined;
        }

        remove(item: any): void {
        }

        insert(index: number, item: any): void {
        }

        extend(other: Collection): void {
        }

        find(item: any): any {
            return undefined;
        }
    }
}