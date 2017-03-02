/**
 * Created by Josh on 3/2/17.
 * File to keep track of Iterator objct
 */
"use strict";
var Iter;
(function (Iter) {
    var Iterator = (function () {
        function Iterator(lst) {
            this.items = lst;
            this.index = 0;
        }
        return Iterator;
    }());
    Iter.Iterator = Iterator;
})(Iter = exports.Iter || (exports.Iter = {}));
//# sourceMappingURL=Iter.js.map