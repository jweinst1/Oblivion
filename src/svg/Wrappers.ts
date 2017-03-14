import {SVGWrapper} from "./Interfaces";
import {SVGPolyObject} from "./Interfaces";
/**
 * Created by Josh on 3/13/17.
 * File to contain objects that assist in SVG string synthesis.
 */

export namespace Wrappers {
    export class Line implements SVGWrapper {
        public pointStr:string;
        public stroke:string;
        public strokeWidth:number;

        constructor(){
            this.pointStr = "";
            this.stroke = "black";
            this.strokeWidth = 1;
        }

        put(item: SVGPolyObject): void {

        }

        getSVGString(): string {
            return undefined;
        }
    }
}
