/**
 * Created by Josh on 3/12/17.
 */


export namespace Points {
    export class Point {
        readonly x:number;
        readonly y:number;
        constructor(x:number = 0 ,y:number=0){
            this.x = x;
            this.y = y;
        }
    }
}
