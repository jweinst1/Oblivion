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

    export class IndexError implements Error {

        public index:string;

        constructor(index:string) {
            this.index = index;
        }

        type(): string {
            return "IndexError";
        }

        message(): string {
            return `Index ${this.index} not defined on list.`;
        }
    }

    export class ArgumentError implements Error {

        public expected:number;
        public got:number;

        constructor(got:number, expected:number){
            this.got = got;
            this.expected = expected;
        }

        type(): string {
            return "ArgumentError";
        }

        message(): string {
            return `Got ${this.got} arguments but expected: ${this.expected}`;
        }

    }

    export class CssAttributeError implements Error {

        public name:string;
        public key:string;

        constructor(classname:string, key:string) {
            this.name = classname;
            this.key = key;
        }

        type(): string {
            return "CssAttributeError";
        }

        message(): string {
            return `Attribute ${this.key} not defined on style ${this.name}`;
        }

    }
}
