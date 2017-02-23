import {SVGObject, SVGStrokable} from "./Interfaces";
import {SVGColor} from "./Color";
/**
 * Created by Josh on 2/22/17.
 * File for the Line svg object
 */

export namespace Line {

    //two point, basic line
    export class Line implements SVGObject, SVGStrokable {

        public x1:number;
        public y1:number;
        public x2:number;
        public y2:number;
        public style:Object;
        public id?:string;

        constructor(x1:number, y1:number, x2:number, y2:number){
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.style = {stroke:"black", 'stroke-width':1};
        }

        private styleStrFormat():string {
            let str = '';
            for(let key in this.style){
                str += `${key}="${this.style[key]}"`;
            }
            return str;
        }

        strFormat(): string {
            return `<line x1="${this.x1}" x2="${this.x2}" y1="${this.y1}" y2="${this.y2}" ${this.styleStrFormat()}/>`;
        }

        type(): string {
            return "Line";
        }

        setStrokeWidth(width: number): void {
            this.style['stroke-width'] = width;
        }

        getStrokeWidth(): number {
            return this.style['stroke-width'];
        }

        setStrokeColor(color: SVGColor): void {
        }

        getStrokeColor(): SVGColor {
            return undefined;
        }
    }
}
