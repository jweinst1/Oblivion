"use strict";
var IO_1 = require("../IO");
/**
 * Created by Josh on 3/14/17.
 * SVG Synthesizer
 */
var Synthesizer = (function () {
    function Synthesizer() {
        this.mode = "start";
        this.currentPoints = [];
        this.currentStyle = { fill: "transparent", stroke: "black", "stroke-width": 1 };
    }
    Synthesizer.prototype.put = function (item) {
        if (this.mode === "start") {
            this.mode = item.type();
            this.currentStyle = this.startStyle(item.type());
            this.put(item);
        }
        else if (item.type() === this.mode) {
            this.currentPoints.push(item.getPoint().strFormat());
            this.colorCheck(item);
        }
        else {
            this.currentPoints.push(item.getPoint().strFormat());
            this.releaseSVG();
            this.mode = item.type();
            if (this.mode === 'polygon')
                this.currentStyle = { fill: "black", stroke: "transparent", "stroke-width": 1 };
            this.colorCheck(item);
            this.currentPoints.push(item.getPoint().strFormat());
        }
    };
    Synthesizer.prototype.makestyleString = function () {
        var str = "";
        for (var key in this.currentStyle) {
            str += key + "=\"" + this.currentStyle[key] + "\" ";
        }
        return str;
    };
    Synthesizer.prototype.makePointString = function () {
        return "points=\"" + this.currentPoints.join(" ") + "\"";
    };
    //resets the synthesizer to it's base state.
    Synthesizer.prototype.reset = function () {
        this.currentStyle = { fill: "transparent", stroke: "black", "stroke-width": 1 };
        this.currentPoints = [];
    };
    Synthesizer.prototype.releaseSVG = function () {
        IO_1.IO.pushSVG("<" + this.prepMode() + " " + this.makePointString() + " " + this.makestyleString() + "/>");
        this.reset();
    };
    Synthesizer.prototype.prepMode = function () {
        if (this.mode === 'line')
            return 'polyline';
        else
            return this.mode;
    };
    Synthesizer.prototype.colorCheck = function (item) {
        switch (this.mode) {
            case "line":
                if (item.color !== this.currentStyle["stroke"])
                    this.currentStyle["stroke"] = item.color;
                break;
            case "polygon":
                if (item.color !== this.currentStyle["fill"])
                    this.currentStyle["fill"] = item.color;
                break;
        }
    };
    Synthesizer.prototype.startStyle = function (mode) {
        if (mode === 'line')
            return { fill: "transparent", stroke: "black", "stroke-width": 1 };
        else if (mode === 'polygon')
            return { fill: "black", stroke: "transparent", "stroke-width": 1 };
    };
    return Synthesizer;
}());
exports.Synthesizer = Synthesizer;
//# sourceMappingURL=Synthesizer.js.map