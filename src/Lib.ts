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
        "+":STD.add,
        "-":STD.sub,
        "*":STD.mul,
        "/":STD.div,
        "%":STD.rem,
        "==":STD.eq,
        "!=":STD.ne,
        "<":STD.lt,
        ">":STD.gt,
        "<=":STD.le,
        ">=":STD.ge,
        "if":STD._if,
        "print":STD.print,
        "?number":STD.c_number,
        "?bool":STD.c_bool,
        "?null":STD.c_null,
        "?word":STD.wordVar,
        "return":STD._return,

        /*SVG*/
        "?draw":drawSVG.draw,
        "line":Line.initLine
    };
}