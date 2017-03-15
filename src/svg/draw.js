"use strict";
var Line_1 = require("./Line");
var Synthesizer_1 = require("./Synthesizer");
/**
 * Created by Josh on 2/23/17.
 * Contains implementation for the draw: keyword and underlying function
 */
//namespace to contain drawing operators and functions
var Draw;
(function (Draw) {
    Draw.draw = function (env, args) {
        var root = env.callLib(env, args[0].node, args[0].args);
        var syn = new Synthesizer_1.Synthesizer();
        while (root.hasNext()) {
            syn.put(root);
            root = root.next;
        }
    };
    //connects SVG objects via a line
    Draw.lineConnect = function (env, args) {
        var left = env.callLib(env, args[0].node, args[0].args);
        var right = env.callLib(env, args[1].node, args[1].args);
        if (left.type() === 'point') {
            if (right.type() === 'point') {
                return new Line_1.Lines.Line(left, new Line_1.Lines.Line(right));
            }
            else if (right.type() === 'line') {
                return new Line_1.Lines.Line(left, right);
            }
            else
                throw new Error("-> Operator received wrong arguments");
        }
        else if (left.type() === 'line') {
            if (right.type() === 'point') {
                left.getLast().next = new Line_1.Lines.Line(right);
                return left;
            }
            else if (right.type() === 'line') {
                left.getLast().next = right;
            }
            else
                throw new Error("-> Operator received wrong arguments");
        }
        else
            throw new Error("-> Operator received wrong arguments");
    };
})(Draw = exports.Draw || (exports.Draw = {}));
//# sourceMappingURL=draw.js.map