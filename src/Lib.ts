import{STD} from "./CompObjects/STD";
/**
 * Created by Josh on 2/13/17.
 * File that holds the standard library
 */

//processes AST nodes
export namespace Lib {
    //retrieves a library function
    export let get = (AST:Object) => {
        if(contains(AST)) return defs[AST["node"]];
    };

    export let contains = (AST:Object) => {
        return AST["node"] in defs;
    };

    //optimized function for calling AST against the active library

    export let defs = {
        "=":STD.assign,
        "/func":STD.func,
        "/params":STD.params,
        "/name":STD.name,
        "add":STD.add,
        "sub":STD.sub,
        "print":STD.print,
        "/number":STD.c_number,
        "/bool":STD.c_bool,
        "/null":STD.c_null,
        "return":STD._return
    };
}