/**
 * Created by Josh on 3/21/17.
 */
//implementation of Oblivion repl

var prs= require("./src/parse/parser");
var env = require("./src/Env");
var io = require('./src/IO');
var readline = require('readline');



//function that starts the REPL
var OblRepl = function(){

    var rl = readline.createInterface(process.stdin, process.stdout);
    var saved = "";
    var notBalanced = false;
    var ENV = new env.Environment.Env();
    rl.setPrompt('Obl> ');
    rl.prompt();
    rl.on('line', function(line) {
        if (line === "exit") rl.close();
        else {
            console.log(interpret(line.trim()));
            rl.prompt();
        }
    }).on('close',function(){
        process.exit(0);
    });


    var interpret = function(code){
        if(notBalanced){
            saved += code;
            var tParsed = isBalanced(saved);
            if(tParsed){
                rl.setPrompt('Obl> ');
                notBalanced = false;
                saved = "";
                if(tParsed["node"] === '?program') {
                    for(var i=0;i<tParsed['args'].length;i++){
                        ENV.callLib(ENV, tParsed['args'][i].node, tParsed['args'][i].args);
                    }
                }
                //returns only the StdOut of the IO
                return io.IO.getFlushOut();
            }
            else {
                return "";
            }
        }
        var parsed = isBalanced(code);
        if(parsed){
            if(parsed["node"] === '?program') {
                for(var i=0;i<parsed['args'].length;i++){
                    ENV.callLib(ENV, parsed['args'][i].node, parsed['args'][i].args);
                }
            }
            //returns only the StdOut of the IO
            return io.IO.getFlushOut();
        }
        else {
            notBalanced = true;
            rl.setPrompt('...> ');
            saved += code;
            return io.IO.getFlushOut();
        }
    };

    var isBalanced = function(code){
        try{
            return prs.parse(code);
        } catch(err){
            return false;
        }
    };
};

exports.OblRepl = OblRepl;