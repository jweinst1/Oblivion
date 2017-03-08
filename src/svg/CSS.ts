import {Collection, Printable} from "../Comp/interfaces";
/**
 * Created by Josh on 2/20/17.
 * File that is responsible for CSS styling for SVG components
 */

export namespace CSS {

    //all legal CSS attribute names for SVG
    let ATTRIBUTES = {
        "x":true, "y":true, "cx":true,
        "points":true, "cy":true,
        "stroke":true, "fill":true, "color":true,
        "stroke-linejoin":true, "stroke-opacity":true,
        "stroke-width":true, "class":true, "r":true,
        "fill-opacity":true
    };

    export let isAttribute = (input:string):boolean => {
        return input in ATTRIBUTES;
    };

    //main CSS class
    export class CSSClass implements Collection, Printable{
        getItem(index: any): any {
            return undefined;
        }

        setItem(index: any, value: any): void {
        }

        hasItem(item: any): boolean {
            return undefined;
        }

        arrayValue(): any[] {
            return undefined;
        }

        size(): number {
            return undefined;
        }

        strFormat(): string {
            return undefined;
        }

        innerValue(): any {
            return undefined;
        }

    }
}
