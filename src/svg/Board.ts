import {CSS} from "./CSS";
/**
 * Created by Josh on 2/19/17.
 * File that implements the SVG Board, which transform into the finished string project
 */


export namespace Board {
    class Board {

        public css:CSS.Container;
        public svg:any[];

        constructor(){
            this.css = new CSS.Container();
            this.svg = [];
        }
    }

    export let init = ():Board => {
        return new Board();
    }
}


