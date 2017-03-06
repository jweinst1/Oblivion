"use strict";
/**
 * Created by Josh on 3/2/17.
 * File to keep track of Iterator objct
 */
var Iter;
(function (Iter) {
    var Iterator = (function () {
        function Iterator(lst) {
            this.items = lst;
            this.index = 0;
            this.done = false;
        }
        Iterator.prototype.next = function () {
            if (this.index < this.items.length) {
                var item = this.items[this.index];
                this.index++;
                if (this.index === this.items.length)
                    this.done = true;
                return item;
            }
        };
        return Iterator;
    }());
    Iter.Iterator = Iterator;
    Iter.makeIter = function (obj) {
        if (typeof obj !== 'object')
            throw new Error('IterError: Argument does not conform to Iter Format');
        return new Iterator(obj.arrayValue());
    };
})(Iter = exports.Iter || (exports.Iter = {}));
//# sourceMappingURL=Iter.js.map