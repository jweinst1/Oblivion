/**
 * Created by Josh on 2/18/17.
 * File contains primitive tests
 */


var test = require("./TestMethods");

test.StdOutTest(1, 'print(3 + 3 + 6)', '12\n');
test.StdOutTest(2, 'print((1,2) -> (5,6))', '1,2 -> 5,6\n');
test.SVGTest(3, 'draw (1,2) -> (10, 10)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line points="1,2" fill="transparent" stroke="black" stroke-width="1" />\n</svg>');
test.StdOutTest(4, 'print((1,2) *> (5,6) *> (77,77))', '1,2 *> 5,6 *> 77,77\n');
test.StdOutTest(5, 'print((1,2) -> (5,6) *> (77,77))', '1,2 -> 5,6 *> 77,77\n');