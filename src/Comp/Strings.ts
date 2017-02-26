import {Printable} from "./interfaces";
/**
 * Created by Josh on 2/25/17.
 */

//contains OblString class and string util methods
export namespace Strings {

    export class OblString implements Printable {
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
    }
}