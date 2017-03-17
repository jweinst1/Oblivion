/**
 * Created by Josh on 2/12/17.
 * Main file for Compiler
 */
var prs = require('./parse/parser');
var gen = require('./Gen');
var io = require('./IO');

//option determines output
var Compile = function(code, option){
    if (option === void 0) { option = 1; }
    try {
        var ast = prs.parse(code);
        gen.Gen.gen(ast);
    } catch(err){
        switch(option){
            case 2:
                return [err, err];
            default:
                throw err;
        }
    }
    switch(option){
        case 0:
            return io.IO.getFlushOut();
        case 1:
            return io.IO.getflushSVGDoc();
        case 2:
            return [io.IO.getFlushOut(), io.IO.getflushSVGDoc()];
    }
};

exports.Compile = Compile;


