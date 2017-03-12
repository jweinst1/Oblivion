import {SVGColor} from "./Color";
/**
 * Created by Josh on 2/22/17.
 */


//interface describing the most basic SVG object
export interface SVGObject {
    strFormat():string;
    type():string;
}

//describes SVG objects that are strokable;
export interface SVGStrokable {
    setStrokeWidth(width:number):void;
    getStrokeWidth():number;
    setStrokeColor(color:SVGColor):void;
    getStrokeColor():SVGColor;
}

export interface SVGImmutable {

}