/**
 * Created by Josh on 2/17/17.
 * File which implements Errors
 * All Errors follow an interface
 */

export namespace Errors {
    //interface to structure Errors
    interface Error {
        type():string;
        message():string;
    }

    export class NameError implements Error {

        public name:string;

        constructor(name:string) {
            this.name = name;
        }

        type(): string {
            return "NameError";
        }

        message(): string {
            return `Name ${this.name} not defined`;
        }
    }
}
