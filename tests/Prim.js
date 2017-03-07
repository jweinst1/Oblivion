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
test.StdOutTest(5, "gen e \n b=3 call b= +(b,3), return b  _ print(e()), print(e())", "6\n9\n");
test.StdOutTest(7, "if false print(3) else print(4), print(7) _", "4\n7\n");
test.StdOutTest(8, 'b = "hello" print(b.4)', "o\n");
test.StdOutTest(9, 'b = [1, 2, 3] print(b.0)', "1\n");
test.StdOutTest(10, 'b = [1, 2, 3], b.0 = "hello", print(b.0)', '"hello"\n');
test.StdOutTest(11, 'b = {print(3)} b()', '3\n');
test.StdOutTest(12, 'b = [{print(3)}] b.0()', '3\n');
test.StdOutTest(13, 'b = [f:{print(3)}] b.f()', '3\n');
test.StdOutTest(14, 'a = 0, b = 3, print(b)', '3\n');
test.StdOutTest(16, 'print(!range(9))', '[0,1,2,3,4,5,6,7,8]\n');
test.StdOutTest(17, 'b = {print(3)}, !repeat(2, b)', '3\n3\n');
test.StdOutTest(18, 'fn = {return 1} i = 0, loop !=(i, 1) print(2) print(6) i = fn() _', '2\n6\n');
test.StdOutTest(19, 'print(!type([]))', '"List"\n');
test.StdOutTest(20, 'for elem in !range(8)\nprint(elem) _', '0\n1\n2\n3\n4\n5\n6\n7\n');
test.StdOutTest(21, 'print(!in([1, 2, 3], 3))', 'true\n');
test.StdOutTest(22, 'f = [1, 2, 3], !append(f, 4), print(f)', '[1,2,3,4]\n');
test.StdOutTest(23, 'f = [1, 2, 3], !insert(f, 1, 4), print(f)', '[1,4,2,3]\n');