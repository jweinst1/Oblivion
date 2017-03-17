/**
 * Created by Josh on 2/7/17.
 */
var cmp = require('./src/Main');
var fs = require('fs');

var userArgs = process.argv.slice(2);

//reads string from file
fs.readFile(userArgs[0], 'utf-8', function (err, data) {
    if (err) throw err;
    if(userArgs.length === 2) {
        fs.writeFile(userArgs[1], cmp.Compile(data, 0), function (err) {
            if (err) throw err;
        });
    }
    else fs.writeFile(convertFileName(userArgs[0]), cmp.Compile(data), function (err) {
        if (err) throw err;
    });
});


function convertFileName(string){
    return string.match(/(.+)\.obl/)[1] + ".svg"
}