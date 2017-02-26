import {Printable, Collection} from "./interfaces";
import {Errors} from "../Errors";
/**
 * Created by Josh on 2/25/17.
 */

//contains OblString class and string util methods
export namespace Strings {

    export class OblString implements Printable, Collection {
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

        hasItem(item: any): boolean {
            return undefined;
        }

        size(): number {
            return undefined;
        }
    }
}