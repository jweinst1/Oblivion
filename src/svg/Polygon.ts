/**
 * Created by Josh on 3/7/17.
 * File that implements polygon functions
 */
import {Environment} from "../Env";
import{IO} from "../IO";
import {Points} from "./Point";
import {SVGObject, SVGPolyObject} from "./Interfaces";

export namespace Polygons {

    export class Polygon implements SVGObject, SVGPolyObject{

        getLast(): SVGPolyObject {
            if(this.hasNext()) {
                return this.next.getLast();
            } else return this;
        }

        public point:Points.Point;
        public next:SVGPolyObject;
        public color:string;

        constructor(point:Points.Point, next:SVGPolyObject = null){
            this.point = point;
            this.next = next;
        }


        getPoint(): Points.Point {
            return this.point;
        }

        getNext(): SVGPolyObject {
            return this.next;
        }

        hasNext():boolean {
            return this.next !== null;
        }

        setNext(other:SVGPolyObject):void {
            this.next = other;
        }

        strFormat(): string {
            if(this.hasNext()) return `${this.point.strFormat()} *> ${this.next.strFormat()}`;
            else return `${this.point.strFormat()}`;
        }

        type(): string {
            return "polygon";
        }

    }
}
