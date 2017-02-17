/**
 * Created by Josh on 2/17/17.
 * Implements the primitive List Type in Oblivion
 */
"use strict";
var Lists;
(function (Lists) {
    var List = (function () {
        function List() {
            this.array = [];
            this.dict = {};
        }
        return List;
    }());
    Lists.List = List;
})(Lists = exports.Lists || (exports.Lists = {}));
//# sourceMappingURL=List.js.map