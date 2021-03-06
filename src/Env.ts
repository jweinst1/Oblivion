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
            else throw `Key Error, variable ${key} not defined.`;
        }
        //safe version of get which does not throw and returns default value
        //used for recursive calls
        safeGet(key: string): any {
            if(this.contains(key))  return this.variables[key];
            else if(this.parent) {
                //Checks if variable defined in parent environment
                return this.parent.get(key);
            }
            else return undefined;
        }
        //unnests from lib
        callLib(env:Environment.Env, ASTkey:string, args:any[]):any{
            if(ASTkey in this.lib)return this.lib[ASTkey](env, args);
            else return this.get(ASTkey)(env, args);
        };

        set(key: string, val: any): void {
            if(val.constructor.name === 'List') this.variables[key] = val.copy();
            else this.variables[key] = val;
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
