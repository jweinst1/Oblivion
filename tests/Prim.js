/**
 * Created by Josh on 2/18/17.
 * File contains primitive tests
 */


var test = require("./TestMethods");

test.StdOutTest(1, 'print(3 + 3 + 6)', '12\n');
test.StdOutTest(2, 'print((1,2) -> (5,6))', '1,2 -> 5,6\n');
test.SVGTest(3, 'draw (1,2) -> (10, 10)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="black" stroke-width="1" />\n</svg>');
test.StdOutTest(4, 'print((1,2) *> (5,6) *> (77,77))', '1,2 *> 5,6 *> 77,77\n');
test.StdOutTest(5, 'print((1,2) -> (5,6) *> (77,77))', '1,2 -> 5,6 *> 77,77\n');
test.SVGTest(6, 'draw #red |= (1,2) -> (10, 10)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n</svg>');
test.SVGTest(7, 'draw #red |= (1,2) -> (10, 10) *> (20, 20)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(8, 'draw #red |= (1,2) -> (10, 10), draw #yellow |= (0,0) *> (20, 20)', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="0,0 20,20" fill="yellow" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(9, 'g = #red |= (1,2) -> (10, 10) *> (20, 20)\ndraw g', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.StdOutTest(10, 'print((1,2) -> (5,6+3) *> (77,77))', '1,2 -> 5,9 *> 77,77\n');
test.StdOutTest(11, 'print((1,2) -> (5,6%3) *> (77,77))', '1,2 -> 5,0 *> 77,77\n');
test.StdOutTest(12, 'print(3 == 4)', 'false\n');
test.StdOutTest(13, 'print(3 ~= 4 - 1)', 'true\n');
test.StdOutTest(14, 'if 3 ~= 4\nprint(2) else print(true) _', 'true\n');
test.StdOutTest(15, 'g = [1, 2]\n\nprint(g.1)', '2\n');
test.StdOutTest(16, 'g = [1, 2]\n\nprint(find(g, 2))', '1\n');
test.StdOutTest(16, 'g = [1, 2]\n\nprint(in(g, 2))', 'true\n');
test.StdOutTest(17, 'g = [1, 2]\n\nprint(g.0 => 6)', '[6,2]\n');
test.StdOutTest(18, 'g = [1, 2]\n\nprint(g.0 => 6)', '[6,2]\n');
test.StdOutTest(19, 'g = [1, 2, 3]\n\nprint(insert(g, 1, 44))', '[1,44,2,3]\n');
test.StdOutTest(20, 'g = {print([1])}\nrepeat(4, g)', '[1]\n[1]\n[1]\n[1]\n');
test.StdOutTest(21, 'g = [{print([1])}]\ng.0()', '[1]\n');
test.StdOutTest(22, 'def foo(e)' +
    '\n if e == 0\n' +
    'return e' +
    '\nelse return e + foo(e - 1) _ _\n\nprint(foo(4))', '10\n');
test.StdOutTest(23, 'print(slice([1, 2, 3, 4], 2))', '[3,4]\n');
test.SVGTest(24, 'g = [#red |= (1,2) -> (10, 10) *> (20, 20)]\ndraw g.0', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(25, 'g = (1,2) -> (10, 10) *> (20, 20)\ng = #red |= g\ndraw g', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(26, 'g = [(1,2) -> (10, 10) *> (20, 20)]\ng = g.0 => #red |= g.0\ndraw g.0', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.SVGTest(27, 'h = 10, g = [(1,2) -> (h, h) *> (h + h, 20)]\ng = g.0 => #red |= g.0\ndraw g.0', '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<polyline points="1,2 10,10" fill="transparent" stroke="red" stroke-width="1" />\n<polygon points="10,10 20,20" fill="red" stroke="transparent" stroke-width="1" />\n</svg>');
test.StdOutTest(28, 'print(call({return (1 +1, 4) *> (3, 5)}))', '2,4 *> 3,5\n');
