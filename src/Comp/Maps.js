/**
 * Created by Josh on 2/27/17.
 * File that stores the Maps namespace
 */
"use strict";
var Maps;
(function (Maps) {
    var OblMap = (function () {
        function OblMap(dict) {
            if (dict === void 0) { dict = {}; }
            this.pairs = dict;
        }
        return OblMap;
    }());
    Maps.OblMap = OblMap;
})(Maps = exports.Maps || (exports.Maps = {}));
//# sourceMappingURL=Maps.js.map