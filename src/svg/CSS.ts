/**
 * Created by Josh on 2/20/17.
 * File that is responsible for CSS styling for SVG components
 */

export namespace CSS {

    //basic form of a cssClass
    export interface cssClass {
        setName(name:string):void;
        getName():string;
        setAttr(key:string, value:string):void;
        getAttr(key:string):string;
        strFormat():string;
    }
}
