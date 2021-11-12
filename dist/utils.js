"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomColorcodeClosure = exports.generateRandomColorcode = exports.zeroPadding = exports.wait = exports.sleep = exports.log = exports.getDateStr = exports.chalk = exports.dayjs = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
exports.dayjs = dayjs_1.default;
var chalk_1 = __importDefault(require("chalk"));
exports.chalk = chalk_1.default;
var getDateStr = function () { return dayjs_1.default().format("YYYY/MM/DD HH:mm:ss"); };
exports.getDateStr = getDateStr;
// export const log = (...v) => console.log(...v)
var log = function () {
    var v = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        v[_i] = arguments[_i];
    }
    return console.log.apply(console, __spreadArray([exports.getDateStr()], v));
};
exports.log = log;
var sleep = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
exports.sleep = sleep;
exports.wait = exports.sleep;
var zeroPadding = function (value, length) { return ("0".repeat(length) + value).slice(-length); };
exports.zeroPadding = zeroPadding;
var generateRandomColorcode = function () {
    var createRandomByte = function () { return exports.zeroPadding(Math.floor(Math.random() * 255).toString(16), 2); };
    var createRandomBit = function () { return Math.round(Math.random()); };
    var getFF00 = function (bit) { return bit === 1 ? "ff" : "00"; };
    var randomColor = "" + getFF00(createRandomBit()) + getFF00(createRandomBit()) + getFF00(createRandomBit());
    return "#" + (randomColor === "000000" ? "ffffff" : randomColor);
};
exports.generateRandomColorcode = generateRandomColorcode;
var generateRandomColorcodeClosure = function () {
    var color;
    var preColor = color = "#ffffff";
    return function () {
        while (color === preColor)
            color = exports.generateRandomColorcode();
        preColor = color;
        return color;
    };
};
exports.generateRandomColorcodeClosure = generateRandomColorcodeClosure;
//# sourceMappingURL=utils.js.map