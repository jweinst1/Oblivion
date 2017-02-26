/**
 * Created by Josh on 2/24/17.
 */


//interface for getter and setter objects
export interface Collection {
    getItem(index:any):any;
    setItem(index:any, value:any):void;
    hasItem(item:any):boolean;
    size():number;
}

//interface for formatting for printing
export interface Printable {
    strFormat():string;
    //gives inner javascript value of Oblivion object
    innerValue():any;
}


export interface Comparable {
    isEqualTo(other:Comparable):boolean;
    notEqualTo(other:Comparable):boolean;
}

//interface for array-like objects
export interface OrderedCollection {
    append(item:any):void;
    appendLeft(item:any):void;
    pop():any;
    popLeft():any;
    remove(item:any):void;
    insert(index:number, item:any):void;
    extend(other:Collection):void;
    find(item:any):any;
}