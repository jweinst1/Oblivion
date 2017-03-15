"use strict";
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
        }
    };
    Synthesizer.prototype.makestyleString = function () {
        var str = "";
        for (var key in this.currentStyle) {
            str += key + "=\"" + this.currentStyle[key] + "\"";
        }
        return str;
    };
    return Synthesizer;
}());
//# sourceMappingURL=Synthesizer.js.map