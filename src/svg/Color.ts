/**
 * Created by Josh on 2/7/17.
 * File for color classes
 */


export interface SVGColor {
    //returns a string representing the color's value.
    strValue():string;
}

export namespace Colors {


    export class RGB implements SVGColor {
        public red:number;
        public green:number;
        public blue:number;

        constructor(r:number=0, g:number=0, b:number=0) {
            this.red = r;
            this.green = g;
            this.blue = b;
        }

        public strValue():string {
            return `rgb(${this.red},${this.green},${this.blue})`;
        }

    }

    export class HEX implements SVGColor {

        public static hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

        public digits:string;

        constructor(digits:string = '#FFFFFF'){
            if(!(HEX.isHex(digits))) {
                throw "Error Hex Color invalid";
            }
            this.digits = digits;
        }

        public strValue():string {
            return `#${this.digits}`;
        }
        //checks if a color is a valid 3 or 6 digit HEX color.
        public static isHex(input:string):boolean {
            return HEX.hexRegex.test(input);
        }
    }

    export class Swatch implements SVGColor {

        public name:string;

        public static swatchSet = {
            black:true, white:true, gray:true,
            cyan:true, blue:true, red:true,
            yellow:true, turquoise:true, indigo:true,
            green:true, brown:true, lightpink:true,
            violet:true, tan:true, orange:true
        };

        constructor(name:string = "black") {
            this.name = name;
        }

        public strValue():string {
            return this.name;
        }
        //checks if a color is a named SVG color.
        public static isSwatch(input:string):boolean {
            return input in Swatch.swatchSet;
        }
    }
}