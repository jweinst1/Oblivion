/**
 * Created by Josh on 3/14/17.
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