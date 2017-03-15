"use strict";
var Maps_1 = require("../Comp/Maps");
var Colors;
(function (Colors) {
    //custom swatch maker for oblivion language
    Colors.swatchSet = {
        black: true, white: true, gray: true,
        cyan: true, blue: true, red: true,
        yellow: true, turquoise: true, indigo: true,
        green: true, brown: true, lightpink: true,
        violet: true, tan: true, orange: true
    };
    //embedded into lib and makes color from #<> syntax
    Colors.makeColor = function (env, args) {
        var color = args[0];
        if (/^#[0-9a-f]{6}|[0-9a-f]{3}$/i.test(color))
            return color;
        else if (color.slice(1) in Colors.swatchSet)
            return color.slice(1);
    };
    //converts a color function arg set to map
    Colors.colorToMap = function (env, args) {
        if (args.length !== 3)
            throw new Error("ArgumentError: Expected 3 argument but got " + args.length);
        return new Maps_1.Maps.OblMap({ r: env.callLib(env, args[0].node, args[0].args),
            g: env.callLib(env, args[1].node, args[1].args),
            b: env.callLib(env, args[2].node, args[2].args) });
    };
    //main color class for Oblivion
    var Color = (function () {
        function Color(r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            this.values = {
                r: r,
                g: g,
                b: b
            };
        }
        Color.prototype.strFormat = function () {
            return "rgb(" + this.values["r"] + "," + this.values["g"] + "," + this.values["b"] + ")";
        };
        Color.prototype.innerValue = function () {
            return this.values;
        };
        Color.prototype.getItem = function (index) {
            if (index in Color.altRGBNames)
                index = Color.altRGBNames[index];
            return this.values[index];
        };
        Color.prototype.setItem = function (index, value) {
            if (index in Color.altRGBNames)
                index = Color.altRGBNames[index];
            this.values[index] = value;
        };
        Color.prototype.hasItem = function (item) {
            if (item in Color.altRGBNames)
                item = Color.altRGBNames[item];
            return item in this.values;
        };
        Color.prototype.arrayValue = function () {
            return [this.values["r"], this.values["g"], this.values["b"]];
        };
        Color.prototype.size = function () {
            return 0;
        };
        Color.altRGBNames = { "red": "r", "green": "g", "blue": "b" };
        return Color;
    }());
    Colors.Color = Color;
    //old RGB class
    /*Saved for future version*/
    var RGB = (function () {
        function RGB(r, g, b) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            this.red = r;
            this.green = g;
            this.blue = b;
        }
        RGB.prototype.strValue = function () {
            return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
        };
        return RGB;
    }());
    Colors.RGB = RGB;
    var HEX = (function () {
        function HEX(digits) {
            if (digits === void 0) { digits = '#FFFFFF'; }
            if (!(HEX.isHex(digits))) {
                throw "Error Hex Color invalid";
            }
            this.digits = digits;
        }
        HEX.prototype.strValue = function () {
            return "#" + this.digits;
        };
        //checks if a color is a valid 3 or 6 digit HEX color.
        HEX.isHex = function (input) {
            return HEX.hexRegex.test(input);
        };
        HEX.hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
        return HEX;
    }());
    Colors.HEX = HEX;
    var Swatch = (function () {
        function Swatch(name) {
            if (name === void 0) { name = "black"; }
            this.name = name;
        }
        Swatch.prototype.strValue = function () {
            return this.name;
        };
        //checks if a color is a named SVG color.
        Swatch.isSwatch = function (input) {
            return input in Swatch.swatchSet;
        };
        Swatch.swatchSet = {
            black: true, white: true, gray: true,
            cyan: true, blue: true, red: true,
            yellow: true, turquoise: true, indigo: true,
            green: true, brown: true, lightpink: true,
            violet: true, tan: true, orange: true
        };
        Swatch.swatchList = [
            'black', 'white', 'gray', 'cyan', 'blue', 'red', 'yellow',
            'turquoise', 'indigo', 'green', 'brown', 'lightpink', 'violet',
            'tan', 'orange'
        ];
        return Swatch;
    }());
    Colors.Swatch = Swatch;
    //gets random swatch color
    Colors.randSwatch = function () {
        return new Swatch(Swatch.swatchList[Math.floor((Math.random() * Swatch.swatchList.length))]);
    };
})(Colors = exports.Colors || (exports.Colors = {}));
//# sourceMappingURL=Color.js.map