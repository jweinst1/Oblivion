/**
 * Created by Josh on 2/12/17.
 * Main file for Compiler
 */
var prs = require('./parse/parser');
var gen = require('./Gen');
var io = require('./IO');

//option determines output
var Compile = function(code, option){
    var ast = prs.parse(code);
    gen.Gen.gen(ast);
    switch(option){
        case 0:
            return io.IO.getOut();
        case 1:
            return io.IO.getflushSVGDoc();
    }
};

exports.Compile = Compile;


