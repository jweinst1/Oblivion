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
        returnValue:any;

        constructor(parent:Env = null){
            this.variables = {};
            this.parent = parent;
            this.lib = Lib.defs;
            this.returnValue = void 0;
        }
        get(key: string): any {
            if(this.contains(key))  return this.variables[key];
            else if(this.parent) {
                //Checks if variable defined in parent environment
                return this.parent.get(key);
            }
            else throw `Key Error, variable ${key} not found.`;
        }
        //unnests from lib
        callLib(env:Environment.Env, ASTkey:string, args:any[]):any{
            //needs changing
            if(ASTkey in this.lib)return this.lib[ASTkey](env, args);
            else if(ASTkey in this.variables) return this.variables[ASTkey](env, args);
            else throw `Call Error, func ${ASTkey} not found.`;
        };

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

        setReturnValue(value:any):void {
            this.returnValue = value;
        }

        getReturnValue():any {
            return this.returnValue;
        }
    }
}
