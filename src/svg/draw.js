"use strict";
var IO_1 = require("../IO");
/**
 * Created by Josh on 2/23/17.
 * Contains implementation for the draw: keyword and underlying function
 */
var drawSVG;
(function (drawSVG) {
    //Functions that writes to SVG output
    drawSVG.draw = function (env, args) {
        for (var i = 0; i < args.length; i++) {
            IO_1.IO.pushSVG(env.callLib(env, args[i].node, args[i].args).strFormat());
        }
    };
})(drawSVG = exports.drawSVG || (exports.drawSVG = {}));
//# sourceMappingURL=draw.js.map