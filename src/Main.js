/**
 * Created by Josh on 2/12/17.
 * Main file for Compiler
 */
var prs = require('./parse/parser');


var Compile = function(code){
    var ast = prs.parse(code);
    //SVG generator not implemented yet
    return ast;
};

exports.Compile = Compile;