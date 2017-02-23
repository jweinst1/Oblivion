import {SVGObject} from "./Interfaces";
import {Colors} from "./Color";
/**
 * Created by Josh on 2/22/17.
 * File for the Line svg object
 */

export namespace Line {

    //two point, basic line
    export class Line implements SVGObject {

        public x1:number;
        public y1:number;
        public x2:number;
        public y2:number;
        public style:Object;

        constructor(x1:number, y1:number, x2:number, y2:number){
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.style = {};
        }

        strForamt(): string {
            return undefined;
        }

        type(): string {
            return undefined;
        }

    }
}
