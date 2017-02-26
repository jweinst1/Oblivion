/**
 * Created by Josh on 2/24/17.
 */


//interface for getter and setter objects
export interface Collection {
    getItem(index:any):any;
    setItem(index:any, value:any):void;
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

export interface Array {
    
}