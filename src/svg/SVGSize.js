"use strict";
/**
 * Created by Josh on 3/14/17.
 */
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
        SVGSize.prototype.setWidth = function (newWidth) {
            this.width = newWidth;
        };
        SVGSize.prototype.setHeight = function (newHeight) {
            this.height = newHeight;
        };
        SVGSize.prototype.strFormat = function () {
            return "width =\"" + this.width + "\" height=\"" + this.height + "\"";
        };
        return SVGSize;
    }());
    SVGSize_1.SVGSize = SVGSize;
    SVGSize_1.init = function () {
        return new SVGSize();
    };
})(SVGSize = exports.SVGSize || (exports.SVGSize = {}));
//# sourceMappingURL=SVGSize.js.map