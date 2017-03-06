import{STD} from "./Comp/STD";
import{Line} from "./svg/Line";
import{drawSVG} from "./svg/draw";
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
        "?=":STD.assign,
        "?func":STD.func,
        "?params":STD.params,
        "?name":STD.name,
        "?gen":STD.generator,
        "?process":STD.process,
        "?method":STD.methodCall,
        "?.":STD.attribute,
        "?=>":STD.attrAssign,
        "+":STD.add,
        "-":STD.sub,
        "*":STD.mul,
        "/":STD.div,
        "%":STD.rem,
        "==":STD.eq,
        "===":STD.same,
        "!=":STD.ne,
        "<":STD.lt,
        ">":STD.gt,
        "<=":STD.le,
        ">=":STD.ge,
        "?if":STD._if,
        "?loop":STD.loop,
        "?for":STD._for,
        "print":STD.print,
        "?number":STD.c_number,
        "?string":STD.c_string,
        "?list":STD.c_list,
        "?map":STD.c_map,
        "?bool":STD.c_bool,
        "?null":STD.c_null,
        "?word":STD.wordVar,
        "?return":STD._return,
        /*Lib functons with !*/
        "!range":STD.range,
        "!repeat":STD.repeat,
        "!type":STD.type,
        "!get":STD.get,
        "!set":STD.set,
        /*SVG*/
        "?draw":drawSVG.draw,
        "line":Line.initLine
    };
}