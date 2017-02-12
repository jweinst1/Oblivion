/**
 * Created by Josh on 2/7/17.
 */
var ps = require('./src/parse/parser');

console.log(JSON.stringify(ps.parse("f = {(a) return(a, 3, 4)}, g = 4"), null, 3));