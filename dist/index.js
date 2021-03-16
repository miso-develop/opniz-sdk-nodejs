"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opniz = void 0;
const BaseDevice_1 = require("./devices/BaseDevice");
const Esp32Pico_1 = require("./devices/Esp32Pico");
const M5AtomLite_1 = require("./devices/M5AtomLite");
const utils = __importStar(require("./utils"));
class Opniz {
}
exports.Opniz = Opniz;
Opniz.BaseDevice = BaseDevice_1.BaseDevice;
Opniz.Esp32Pico = Esp32Pico_1.Esp32Pico;
Opniz.M5AtomLite = M5AtomLite_1.M5AtomLite;
Opniz.utils = utils;
Opniz.sleep = utils.sleep;
Opniz.wait = utils.wait;
Opniz.delay = utils.delay;
//# sourceMappingURL=index.js.map