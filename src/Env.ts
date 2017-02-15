import {Lib} from "./Lib";
/**
 * Created by Josh on 2/13/17.
 * File that implements the environment class
 */

export namespace Environment {

    /*An interface describing a object that can store variabls*/
    interface VarStorage {
        get(key:string):any;
        set(key:string, val:any):void;
        contains(key:string):boolean;
        del(key:string):void;
    }


    export class Env implements VarStorage {

        variables:Object;
        lib:Object;
        parent:Env;

        constructor(parent:Env = null){
            this.variables = {};
            this.parent = parent;
            this.lib = Lib.defs;
        }
        get(key: string): any {
            if(this.contains(key))  return this.variables[key];
            else if(this.parent) {
                //Checks if variable defined in parent environment
                return this.parent.get(key);
            }
            else throw `Key Error, variable ${key} not found.`;
        }
        //retreives lib function
        getlib(key: string): Function {
            if(key in this.lib) return this.lib[key];
            else throw `Call Error, Function ${key} is not defined.`;
        }

        set(key: string, val: any): void {
            this.variables[key] = val;
        }

        contains(key: string): boolean {
            return key in this.variables;
        }

        del(key: string): void {
            delete this.variables[key];
        }

        //creates child Env
        createChild():Env {
            return new Env(this);
        }
    }
}
