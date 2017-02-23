import {SVGSize} from "./svg/SVGSize";
/**
 * Created by Josh on 2/18/17.
 * Small file that handles StdOut
 */

//statically encapsulated IO
export namespace IO {
    let Out = "";
    let In = "";
    let svg = "";
    let css = "";
    let xmldat = 'version="1.1" xmlns="http://www.w3.org/2000/svg"';
    let size = SVGSize.init();

    /*SVG/CSS methods*/

    export let pushSVG = (input:string):void => {
        svg += input + "\n";
    };

    export let pushCSS = (input:string):void => {
        css += input + "\n";
    };

    //returns format string of svg + css
    export let getSVGDoc = (input:string):string => {
        return `<svg ${size.strFormat()} ${xmldat}>\n<style>${css}</style>\n${svg}</svg>`;
    };

    export let getflushSVGDoc = (input:string):string => {
        const str = `<svg ${size.strFormat()} ${xmldat}>\n<style>${css}</style>\n${svg}</svg>`;
        flushSVG();
        flushCSS();
        return str;
    };

    export let flushSVG = ():void => {
        svg = "";
    };

    export let flushCSS = ():void => {
        css = "";
    };

    /*StdIn-OUT methods*/
    export let pushOut = (input:string):void => {
        Out += input + '\n';
    };

    export let pushIn = (input:string):void => {
        In += input + '\n';
    };

    export let getOut = ():string => {
        return Out;
    };

    export let getIn = ():string => {
        return In;
    };

    export let flushOut = ():void => {
        Out = "";
    };

    export let flushIn = ():void => {
        In = "";
    };
}