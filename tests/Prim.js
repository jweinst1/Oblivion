/**
 * Created by Josh on 2/18/17.
 * File contains primitive tests
 */


var test = require("./TestMethods");

test.StdOutTest(1, "print(44)", "44\n");
test.StdOutTest(2, "print(+(3,3))", "6\n");
test.StdOutTest(3, "print(==(3, 3))", "true\n");
test.StdOutTest(4, "print(==(true, false))", "false\n");
//generator test
test.StdOutTest(5, "a = |b=3;b= +(b,3), return(b)|, print(a()), print(a())", "6\n9\n");
test.SVGTest(6, " draw: line(0, 2, +(3, 3, 3), 9)", '<svg width ="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n<style></style>\n<line x1="0" x2="9" y1="2" y2="9" stroke="black" stroke-width="1" />\n</svg>');
test.StdOutTest(7, "if(false, print(3), print(4), print(7))", "4\n7\n");
test.StdOutTest(8, 'b = "hello" print(b.4)', "o\n");
test.StdOutTest(9, 'b = [1, 2, 3] print(b.0)', "1\n");
test.StdOutTest(10, 'b = [1, 2, 3], b.0 = "hello", print(b.0)', '"hello"\n');
test.StdOutTest(11, 'b = ~{print(3)} b()', '3\n');
test.StdOutTest(12, 'b = [~{print(3)}] b.0()', '3\n');
test.StdOutTest(13, 'b = [f:~{print(3)}] b.f()', '3\n');