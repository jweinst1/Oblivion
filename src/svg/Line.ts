/**
 * Created by Josh on 3/7/17.
 * File that implements line functions
 */
import {Environment} from "../Env";
import{IO} from "../IO";
import {Points} from "./Point";
import {SVGObject} from "./Interfaces";

export namespace Lines {

    export class Line implements SVGObject {

        public point:Points.Point;
        public next:SVGObject;



        strFormat(): string {
            return undefined;
        }

        type(): string {
            return "line";
        }

    }
}