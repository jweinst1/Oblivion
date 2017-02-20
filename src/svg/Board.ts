/**
 * Created by Josh on 2/19/17.
 * File that implements the SVG Board, which transform into the finished string project
 */


export namespace Board {
    class Board {

        public css:any[];
        public svg:any[];

        constructor(){
            this.css = [];
            this.svg = [];
        }
    }

    export let init = ():Board => {
        return new Board();
    }
}


