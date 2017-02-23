/**
 * Created by Josh on 2/20/17.
 * NameSpace that holds the size
 */

export namespace SVGSize {
    export class SVGSize {

        constructor(public width:string = "100%", public height:string = "100%"){};

        setWidth(newWidth:string):void {
            this.width = newWidth;
        }

        setHeight(newHeight:string):void {
            this.height = newHeight;
        }

        strFormat():string {
            return `width ="${this.width}" height="${this.height}"`;
        }
    }

    export let init = ():SVGSize => {
        return new SVGSize();
    }
}