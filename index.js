/**
 * Created by Josh on 2/7/17.
 */
var cmp = require('./src/Main');

console.log(JSON.stringify(cmp.Compile("f = {(a) return(@a.w, 3, 4)}, @$g = 4"), null, 3));