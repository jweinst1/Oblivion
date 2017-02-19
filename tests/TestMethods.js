/**
 * Created by Josh on 2/18/17.
 * File that implements test methods
 */

var cmp = require('../src/Main');
var io = require('../src/IO');

//tests the StdOut
var StdOutTest = function (n, code, expected) {
    try {
        var result = cmp.Compile(code, 0);
        if (result === expected){
            console.log("Test "+n+" PASSED");
        }
        else {
            console.log("Test "+n+" FAILED, Expected: "+expected+" but got: "+result);
        }
    } catch(err) {
        console.log("Test "+n+" FAILED, Error: " + err.message);
    } finally {io.IO.flushOut()}
};

exports.StdOutTest = StdOutTest;