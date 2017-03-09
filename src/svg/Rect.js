"use strict";
var IO_1 = require("../IO");
/**
 * Created by Josh on 3/8/17.
 * File for creating rectangles
 */
var Rect;
(function (Rect) {
    //not in use yet
    Rect.makeRect = function (env, args) {
        switch (args.length) {
            case 4:
                IO_1.IO.pushSVG("<rect x=\"10\" y=\"10\" width=\"100\" height=\"100\"/>");
                break;
            case 5:
                IO_1.IO.pushSVG("<rect x=\"10\" y=\"10\" width=\"100\" height=\"100\"/>");
                break;
            default:
                throw new Error("ArgumentError: Expected 4 or 5 args but got " + args.length);
        }
    };
})(Rect = exports.Rect || (exports.Rect = {}));
//# sourceMappingURL=Rect.js.map