"use strict";
var IO_1 = require("../IO");
/**
 * Created by Josh on 3/14/17.
 * SVG Synthesizer
 */
var Synthesizer = (function () {
    function Synthesizer() {
        this.mode = "line";
        this.currentPoints = [];
        this.currentStyle = {};
    }
    Synthesizer.prototype.put = function (item) {
        if (item.type() === this.mode)
            this.currentPoints.push(item.getPoint().strFormat());
        else {
            this.releaseSVG();
            this.mode = item.type();
            this.currentPoints.push(item.getPoint().strFormat());
        }
    };
    Synthesizer.prototype.makestyleString = function () {
        var str = "";
        for (var key in this.currentStyle) {
            str += key + "=\"" + this.currentStyle[key] + "\"";
        }
        return str;
    };
    Synthesizer.prototype.makePointString = function () {
        return "points=\"" + this.currentPoints.join(" ") + "\"";
    };
    //resets the synthesizer to it's base state.
    Synthesizer.prototype.reset = function () {
        this.currentStyle = {};
        this.currentPoints = [];
    };
    Synthesizer.prototype.releaseSVG = function () {
        IO_1.IO.pushSVG("<" + this.mode + " " + this.makePointString() + " " + this.makestyleString());
        this.reset();
    };
    return Synthesizer;
}());
exports.Synthesizer = Synthesizer;
//# sourceMappingURL=Synthesizer.js.map