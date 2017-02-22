import {CSS} from "./CSS";
/**
 * Created by Josh on 2/19/17.
 * File that implements the SVG Board, which transform into the finished string project
 */

import{SVGSize} from "./SVGSize";

export namespace Board {
    class Board {

        public css:CSS.Container;
        public svg:any[];
        public size:SVGSize.SVGSize;

        constructor(){
            this.css = new CSS.Container();
            this.svg = [];
            this.size = SVGSize.init();
        }
    }

    export let init = ():Board => {
        return new Board();
    }
}


