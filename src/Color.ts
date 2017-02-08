/**
 * Created by Josh on 2/7/17.
 * File for color classes
 */

export namespace Colors {

    interface Color {
        //returns a string representing the color's value.
        strValue():string;
    }

    export class RGB implements Color {
        public red:number;
        public green:number;
        public blue:number;

        constructor(r:number=0, g:number=0, b:number=0) {
            this.red = r;
            this.green = g;
            this.blue = b;
        }

        strValue():string {
            return `rgb(${this.red},${this.green},${this.blue})`;
        }

    }
}