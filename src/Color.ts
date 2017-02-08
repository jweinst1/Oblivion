/**
 * Created by Josh on 2/7/17.
 * File for color classes
 */

export namespace Color {
    export class RGB {
        public red:number;
        public green:number;
        public blue:number;

        constructor(r:number=0, g:number=0, b:number=0) {
            this.red = r;
            this.green = g;
            this.blue = b;
        }

    }
}