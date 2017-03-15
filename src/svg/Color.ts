import {Printable, Collection} from "../Comp/interfaces";
import {Environment} from "../Env";
import {Maps} from "../Comp/Maps";
/**
 * Created by Josh on 2/7/17.
 * File for color classes
 */


export interface SVGColor {
    //returns a string representing the color's value.
    strValue():string;
}

export namespace Colors {

    //custom swatch maker for oblivion language
    export let swatchSet = {
        black:true, white:true, gray:true,
        cyan:true, blue:true, red:true,
        yellow:true, turquoise:true, indigo:true,
        green:true, brown:true, lightpink:true,
        violet:true, tan:true, orange:true
    };

    export let colorfFunc = (env:Environment.Env, args:any[]) => {
        let item = env.callLib(env, args[1].node, args[1].args);
        let col = env.callLib(env, args[0].node, args[0].args);
        if(!item.type) throw new Error("Coloring Operator must be used on line or shape");
        let curr = item;
        while(curr !== null){
            curr.color = col;
            curr = curr.next
        }
        return item;
    };

    //embedded into lib and makes color from #<> syntax
    export let makeColor = (env:Environment.Env, args:any[]) => {
        let color = args[0];
        if(/^#[0-9a-f]{6}|[0-9a-f]{3}$/i.test(color)) return color;
        else if(color.slice(1) in swatchSet) return color.slice(1);
    };

    //converts a color function arg set to map
    export let colorToMap = (env:Environment.Env, args:any[]) => {
        if(args.length !== 3) throw new Error(`ArgumentError: Expected 3 argument but got ${args.length}`);
        return new Maps.OblMap({r:env.callLib(env, args[0].node, args[0].args),
            g:env.callLib(env, args[1].node, args[1].args),
            b:env.callLib(env, args[2].node, args[2].args)})
    };

    //main color class for Oblivion
    export class Color implements Printable, Collection {

        public values:Object;
        public static altRGBNames = {"red":"r", "green":"g", "blue":"b"};

        constructor(r:number=0, g:number=0, b:number=0){
            this.values = {
                r:r,
                g:g,
                b:b
            };
        }

        strFormat(): string {
            return `rgb(${this.values["r"]},${this.values["g"]},${this.values["b"]})`;
        }

        innerValue(): any {
            return this.values;
        }

        getItem(index: any): any {
            if(index in Color.altRGBNames) index = Color.altRGBNames[index];
            return this.values[index];
        }

        setItem(index: any, value: any): void {
            if(index in Color.altRGBNames) index = Color.altRGBNames[index];
            this.values[index] = value;
        }

        hasItem(item: any): boolean {
            if(item in Color.altRGBNames) item = Color.altRGBNames[item];
            return item in this.values;
        }

        arrayValue(): any[] {
            return [this.values["r"], this.values["g"], this.values["b"]];
        }

        size(): number {
            return 0;
        }

    }

//old RGB class
    /*Saved for future version*/
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

        public static swatchList = [
            'black', 'white', 'gray', 'cyan', 'blue', 'red', 'yellow',
            'turquoise', 'indigo', 'green', 'brown', 'lightpink', 'violet',
            'tan', 'orange'
        ];

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

    //gets random swatch color
    export let randSwatch = ():Swatch => {
        return new Swatch(Swatch.swatchList[Math.floor((Math.random() * Swatch.swatchList.length))]);
    };
}