/**
 * Created by Josh on 3/21/17.
 */
//implementation of Oblivion repl

var prs= require("./src/parse/parser");
var env = require("./src/Env");
var io = require('./src/IO');



var OblRepl = (function(){
    function OblRepl(){
        this.saved = "";
        this.env = new env.Environment.Env();
    }

    OblRepl.prototype.interpret = function(code){
        var parsed = this.isBalanced(code);
        if(parsed){

        }
    };

    OblRepl.prototype.isBalanced = function(code){
        try{
            return prs.parse(code);
        } catch(err){
            return false;
        }
    };
    return OblRepl;
})();

exports.OblRepl = OblRepl;


/*        if(AST["node"] === '?program') {
 for(let i=0;i<AST['args'].length;i++){
 env.callLib(env, AST['args'][i].node, AST['args'][i].args);
 }
 }*/