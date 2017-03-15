import {SVGPolyObject} from "./Interfaces";
/**
 * Created by Josh on 3/14/17.
 * SVG Synthesizer
 */

class Synthesizer {
    public mode:string;
    private currentPoints:string[];
    private currentStyle:Object;

    constructor(){
        this.mode = "line";
        this.currentPoints = [];
        this.currentStyle = {};
    }

    public put(item:SVGPolyObject):void {
        if(item.type() === this.mode) this.currentPoints.push(item.getPoint().strFormat());
        else {

        }
    }

    private makestyleString():string {
        let str = "";
        for(let key in this.currentStyle){
            str += `${key}="${this.currentStyle[key]}"`;
        }
        return str;
    }

    private makePointString():string {
        return this.currentPoints.join(" ");
    }

    //resets the synthesizer to it's base state.
    private reset():void {
        this.currentStyle = {};
        this.currentPoints = [];
    }
}