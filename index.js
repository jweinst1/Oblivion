#! /usr/bin/env node

/**
 * Created by Josh on 2/7/17.
 */
var cmp = require('./src/Main');
var fs = require('fs');

var userArgs = process.argv.slice(2);
if(userArgs.length !== 1) throw new Error("Invalid Command Line Arguments");

//reads string from file
fs.readFile(userArgs[0], 'utf-8', function (err, data) {
    if (err) throw err;
    var output = cmp.Compile(data, 2);
    console.log(output[0]);
     fs.writeFile(convertFileName(userArgs[0]), output[1], function (err) {
        if (err) throw err;
    });
});


function convertFileName(string){
    if(!/(.+)\.obl/.test(string)) throw new Error("Only Oblivion files with a .obl extension can be compiled");
    return string.match(/(.+)\.obl/)[1] + ".svg";
}