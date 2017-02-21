import {Errors} from "../Errors";
/**
 * Created by Josh on 2/20/17.
 * File that is responsible for CSS styling for SVG components
 */

export namespace CSS {

    //all legal CSS attribute names for SVG
    let ATTRIBUTES = {
        "x":true, "y":true, "cx":true,
        "points":true, "cy":true,
        "stroke":true, "fill":true, "color":true,
        "stroke-linejoin":true, "stroke-opacity":true,
        "stroke-width":true, "class":true, "r":true,
        "fill-opacity":true
    };

    //basic form of a cssClass
    export interface CssClass {
        setName(name:string):void;
        getName():string;
        setAttr(key:string, value:string):void;
        getAttr(key:string):string;
        strFormat():string;
    }

    //container of cssClasses's
    export interface classContainer {
        declareClass(name:string):void;
        getClass(name:string):CssClass;
        updateClass(name:string, dict:Object):void;
        createClass(name:string, dict:Object):void;
    }

    //basic css class
    export class Base implements CssClass {

        constructor(public name:string,
                    public attributes:Object = {}){};

        setName(name: string): void {
            this.name = name;
        }

        getName(): string {
            return this.name;
        }

        setAttr(key: string, value: string): void {
            this.attributes[key] = value;
        }
        //throws cssattribute error
        getAttr(key: string): string {
            if(key in this.attributes) return this.attributes[key];
            else throw new Errors.CssAttributeError(this.name, key);

        }

        strFormat(): string {
            let format = `.${this.name} {\n`;
            for(let key in this.attributes){
                format += `  ${key}:${this.attributes[key]};\n`
            }
            return format + "}";
        }

    }

    export class Container implements classContainer {

        constructor(public classes:Object = {}){};

        declareClass(name: string): void {
            this.classes[name] = new Base(name);
        }

        getClass(name: string): CSS.CssClass {
            if(name in this.classes) return this.classes[name];
            else throw new Errors.CssClassError(name);
        }

        updateClass(name: string, dict: Object): void {
            let targetClass = this.getClass(name);
            for(let key in dict){
                targetClass.setAttr(key, dict[key]);
            }
        }

        createClass(name: string, dict: Object): void {
            this.classes[name] = new Base(name, dict);
        }

    }
}
