"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.Opniz = exports.utils = void 0;
const BaseDevice_1 = require("./devices/base/BaseDevice");
const Esp32_1 = require("./devices/Esp32");
const M5Atom_1 = require("./devices/M5Atom");
const M5Unified_1 = require("./devices/M5Unified");
const types = __importStar(require("./devices/base/transports/Transport"));
exports.utils = __importStar(require("./utils"));
class Opniz {
}
exports.Opniz = Opniz;
Opniz.BaseDevice = BaseDevice_1.BaseDevice;
Opniz.Esp32 = Esp32_1.Esp32;
Opniz.M5Atom = M5Atom_1.M5Atom;
Opniz.M5Unified = M5Unified_1.M5Unified;
Opniz.Protocol = types.Protocol;
