/**
 * Created by Josh on 2/18/17.
 * File contains primitive tests
 */


var test = require("./TestMethods");

test.StdOutTest(1, 'print(3 + 3 + 6)', '12\n');
test.StdOutTest(2, 'print((1,2) -> (5,6))', '1,2 -> 5,6\n');
test.SVGTest(3, 'draw (1,2) -> (10, 10)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line points="1,2 10,10" fill="transparent" stroke="black" stroke-width="1" />\n</svg>');
test.StdOutTest(4, 'print((1,2) *> (5,6) *> (77,77))', '1,2 *> 5,6 *> 77,77\n');
test.StdOutTest(5, 'print((1,2) -> (5,6) *> (77,77))', '1,2 -> 5,6 *> 77,77\n');
test.SVGTest(6, 'draw #red |= (1,2) -> (10, 10)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n</svg>');
test.SVGTest(7, 'draw #red |= (1,2) -> (10, 10) *> (20, 20)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(8, 'draw #red |= (1,2) -> (10, 10), draw #yellow |= (0,0) *> (20, 20)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="0,0 20,20" fill="yellow" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(9, 'g = #red |= (1,2) -> (10, 10) *> (20, 20)\ndraw g', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.StdOutTest(10, 'print((1,2) -> (5,6+3) *> (77,77))', '1,2 -> 5,9 *> 77,77\n');
test.StdOutTest(11, 'print((1,2) -> (5,6%3) *> (77,77))', '1,2 -> 5,0 *> 77,77\n');
test.StdOutTest(12, 'print(3 == 4)', 'false\n');