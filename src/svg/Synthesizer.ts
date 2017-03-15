import {SVGPolyObject} from "./Interfaces";
import {IO} from "../IO";
/**
 * Created by Josh on 3/14/17.
 * SVG Synthesizer
 */

export class Synthesizer {
    public mode:string;
    private currentPoints:string[];
    private currentStyle:Object;

    constructor(){
        this.mode = "line";
        this.currentPoints = [];
        this.currentStyle = {fill:"transparent", stroke:"black", "stroke-width":1};
    }

    public put(item:SVGPolyObject):void {
        if(item.type() === this.mode) this.currentPoints.push(item.getPoint().strFormat());
        else {
            this.releaseSVG();
            this.mode = item.type();
            if(this.mode === 'polygon') this.currentStyle = {fill:"black", stroke:"transparent", "stroke-width":1};
            this.currentPoints.push(item.getPoint().strFormat());
        }
    }

    private makestyleString():string {
        let str = "";
        for(let key in this.currentStyle){
            str += `${key}="${this.currentStyle[key]}" `;
        }
        return str;
    }

    private makePointString():string {
        return `points="${this.currentPoints.join(" ")}"`;
    }

    //resets the synthesizer to it's base state.
    private reset():void {
        this.currentStyle = {fill:"transparent", stroke:"black", "stroke-width":1};
        this.currentPoints = [];
    }

    public releaseSVG():void {
        IO.pushSVG(`<${this.mode} ${this.makePointString()} ${this.makestyleString()}/>`);
        this.reset();
    }

    public setStroke(input:string):void {
        this.currentStyle["stroke"] = input;
    }

    public setFill(input:string):void {
        this.currentStyle["fill"] = input;
    }
}