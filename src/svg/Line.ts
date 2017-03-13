/**
 * Created by Josh on 3/7/17.
 * File that implements line functions
 */
import {Environment} from "../Env";
import{IO} from "../IO";
import {Points} from "./Point";
import {SVGObject, SVGPolyObject} from "./Interfaces";

export namespace Lines {

    export class Line implements SVGObject, SVGPolyObject {

        public point:Points.Point;
        public next:SVGPolyObject;

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
            return undefined;
        }

        type(): string {
            return "line";
        }

    }
}