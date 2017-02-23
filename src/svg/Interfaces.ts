/**
 * Created by Josh on 2/22/17.
 */


//interface describing the most basic SVG object
export interface SVGObject {
    strForamt():string;
    type():string;
}

export interface SVGStrokable {
    setStrokeWidth(width:number):void;
    getStrokeWidth():number;
    setStrokeColor()
}