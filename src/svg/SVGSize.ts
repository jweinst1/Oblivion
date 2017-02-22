/**
 * Created by Josh on 2/20/17.
 * NameSpace that holds the size
 */

export namespace SVGSize {
    class SVGSize {

        constructor(public width:string = "100%", public height:string = "100%"){};

        strFormat():string {
            return `width ="${this.width} height="${this.height}"`;
        }
    }

    export let init = (width:string, height:string):SVGSize => {
        return new SVGSize(width, height);
    }
}