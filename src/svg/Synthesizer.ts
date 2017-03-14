import {SVGPolyObject} from "./Interfaces";
/**
 * Created by Josh on 3/14/17.
 * SVG Synthesizer
 */

class Synthesizer {
    public mode:string;
    public SVGStrings:string[];
    private currentPoints:string[];
    private currentStyle:Object;

    constructor(){
        this.mode = "line";
        this.SVGStrings = [];
        this.currentPoints = [];
        this.currentStyle = {};
    }

    put(item:SVGPolyObject) {
        switch
    }
}