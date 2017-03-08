"use strict";
var Line;
(function (Line) {
    Line.makeLine = function (env, args) {
        switch (args.length) {
            case 0:
                throw new Error("ArgumentError: Expected at least 2 arguments but got " + args.length);
            case 1:
                var arg = env.callLib(env, args[0].node, args[0].args);
                if (typeof arg !== 'object')
                    throw new Error("TypeError: Expected list argument, got " + typeof arg);
        }
    };
    //private method
    Line.polyLineString = function (points) {
        if (points.length % 2 !== 0)
            throw new Error("ArgCountError: A Line must have an even number of arguments");
        var str = "";
        return str;
    };
})(Line = exports.Line || (exports.Line = {}));
//# sourceMappingURL=Line.js.map