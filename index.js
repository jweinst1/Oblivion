#! /usr/bin/env node

/**
 * Created by Josh on 2/7/17.
 */
var cmp = require('./src/Main');
var fs = require('fs');
var pkg = require('./package.json');

var userArgs = process.argv.slice(2);

var help = "Commands:" +
    "\n--version : gives the current version" +
    "\n--help : opens help menu" +
    "\n ||filename|.obl| runs your Oblivion file, and prints out the StdOut.";

var cmds = {"--help":function(){console.log(help);}, "--version":function(){console.log(pkg.version)}};

if(userArgs.length === 0) cmds["--help"]();
else if(userArgs.length ===1){
    if(userArgs[0] in cmds) {
        cmds[userArgs[0]]();
    } else {
        //reads string from file
        fs.readFile(userArgs[0], 'utf-8', function (err, data) {
            if (err) throw err;
            var output = cmp.Compile(data, 2);
            console.log(output[0]);
            fs.writeFile(convertFileName(userArgs[0]), output[1], function (err) {
                if (err) throw err;
            });
        });
    }
}




function convertFileName(string){
    if(!/(.+)\.obl/.test(string)) throw new Error("Only Oblivion files with a .obl extension can be compiled");
    return string.match(/(.+)\.obl/)[1] + ".svg";
}

