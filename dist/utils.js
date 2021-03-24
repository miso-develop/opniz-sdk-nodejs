"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomColorcodeClosure = exports.generateRandomColorcode = exports.zeroPadding = exports.wait = exports.sleep = exports.log = exports.getDateStr = exports.chalk = exports.dayjs = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
exports.dayjs = dayjs_1.default;
const chalk_1 = __importDefault(require("chalk"));
exports.chalk = chalk_1.default;
const getDateStr = () => dayjs_1.default().format("YYYY/MM/DD HH:mm:ss");
exports.getDateStr = getDateStr;
// export const log = (...v) => console.log(...v)
const log = (...v) => console.log(`${exports.getDateStr()} ${v.join(" ")}`);
exports.log = log;
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
exports.sleep = sleep;
exports.wait = exports.sleep;
const zeroPadding = (value, length) => ("0".repeat(length) + value).slice(-length);
exports.zeroPadding = zeroPadding;
const generateRandomColorcode = () => {
    const createRandomByte = () => exports.zeroPadding(Math.floor(Math.random() * 255).toString(16), 2);
    const createRandomBit = () => Math.round(Math.random());
    const getFF00 = (bit) => bit === 1 ? "ff" : "00";
    const randomColor = `${getFF00(createRandomBit())}${getFF00(createRandomBit())}${getFF00(createRandomBit())}`;
    return `#${randomColor === "000000" ? "ffffff" : randomColor}`;
};
exports.generateRandomColorcode = generateRandomColorcode;
const generateRandomColorcodeClosure = () => {
    let color;
    let preColor = color = "#ffffff";
    return () => {
        while (color === preColor)
            color = exports.generateRandomColorcode();
        preColor = color;
        return color;
    };
};
exports.generateRandomColorcodeClosure = generateRandomColorcodeClosure;
//# sourceMappingURL=utils.js.map