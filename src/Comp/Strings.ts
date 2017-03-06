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
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(index < 0 || index >= this.str.length) throw new Errors.IndexError(String(index));
            else return this.str[index];
        }

        setItem(index: any, value: any): void {
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(index < 0 || index >= this.str.length) throw new Errors.IndexError(String(index));
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
            if(this.str) {
                let popped = this.str[0];
                this.str = this.str.slice(1);
                return popped;
            }
            else {
                throw new Error(`LengthError: String cannot be popped when empty.`);
            }
        }

        remove(item: any): void {
            this.str = this.str.replace(item, "");
        }

        insert(index: number, item: any): void {
            if(typeof index !== 'number') throw new Errors.TypeError('number', typeof index);
            if(typeof item === 'object') item = item.strValue();
            this.str = this.str.slice(0, index) + item + this.str.slice(index);
        }

        extend(other: any): void {
            if(typeof other === 'object') other = other.strValue();
            this.str += other;
        }

        find(item: any): any {
            let result = this.str.search(item);
            return result !== -1 ? result : false;
        }
    }
}