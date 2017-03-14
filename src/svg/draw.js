"use strict";
/**
 * Created by Josh on 2/23/17.
 * Contains implementation for the draw: keyword and underlying function
 */
//namespace to contain drawing operators and functions
var Draw;
(function (Draw) {
    //connects SVG objects via a line
    Draw.lineConnect = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
    };
})(Draw = exports.Draw || (exports.Draw = {}));
//# sourceMappingURL=draw.js.map