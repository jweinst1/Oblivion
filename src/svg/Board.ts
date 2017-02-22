import {CSS} from "./CSS";
/**
 * Created by Josh on 2/19/17.
 * File that implements the SVG Board, which transform into the finished string project
 */

import{SVGSize} from "./SVGSize";

export namespace Board {

    export class Board {

        public css:CSS.Container;
        public svg:string;
        public size:SVGSize.SVGSize;

        constructor(){
            this.css = new CSS.Container();
            this.svg = "";
            this.size = SVGSize.init();
        }

        drawSVG(SVGString:string):void {
            this.svg += SVGString;
        }
    }

    export let init = ():Board => {
        return new Board();
    }
}


