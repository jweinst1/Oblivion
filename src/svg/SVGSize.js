/**
 * Created by Josh on 2/20/17.
 * NameSpace that holds the size
 */
"use strict";
var SVGSize;
(function (SVGSize_1) {
    var SVGSize = (function () {
        function SVGSize(width, height) {
            if (width === void 0) { width = "100%"; }
            if (height === void 0) { height = "100%"; }
            this.width = width;
            this.height = height;
        }
        ;
        SVGSize.prototype.strFormat = function () {
            return "width =\"" + this.width + " height=\"" + this.height + "\"";
        };
        return SVGSize;
    }());
    SVGSize_1.init = function (width, height) {
        return new SVGSize(width, height);
    };
})(SVGSize = exports.SVGSize || (exports.SVGSize = {}));
//# sourceMappingURL=SVGSize.js.map