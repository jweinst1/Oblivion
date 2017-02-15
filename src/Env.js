"use strict";
var Lib_1 = require("./Lib");
/**
 * Created by Josh on 2/13/17.
 * File that implements the environment class
 */
var Environment;
(function (Environment) {
    var Env = (function () {
        function Env(parent) {
            if (parent === void 0) { parent = null; }
            this.variables = {};
            this.parent = parent;
            this.lib = Lib_1.Lib.defs;
        }
        Env.prototype.get = function (key) {
            if (this.contains(key))
                return this.variables[key];
            else if (this.parent) {
                //Checks if variable defined in parent environment
                return this.parent.get(key);
            }
            else
                throw "Key Error, variable " + key + " not found.";
        };
        //unnests from lib
        Env.prototype.callLib = function (env, ASTkey, args, flag) {
            return this.lib[ASTkey](env, args, flag);
        };
        ;
        Env.prototype.set = function (key, val) {
            this.variables[key] = val;
        };
        Env.prototype.contains = function (key) {
            return key in this.variables;
        };
        Env.prototype.del = function (key) {
            delete this.variables[key];
        };
        //creates child Env
        Env.prototype.createChild = function () {
            return new Env(this);
        };
        return Env;
    }());
    Environment.Env = Env;
})(Environment = exports.Environment || (exports.Environment = {}));
//# sourceMappingURL=Env.js.map