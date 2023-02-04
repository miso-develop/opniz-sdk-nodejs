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
exports.M5Atom = exports.Esp32 = exports.BaseDevice = exports.Opniz = void 0;
const BaseDevice_1 = require("./devices/base/BaseDevice");
Object.defineProperty(exports, "BaseDevice", { enumerable: true, get: function () { return BaseDevice_1.BaseDevice; } });
const Esp32_1 = require("./devices/Esp32");
Object.defineProperty(exports, "Esp32", { enumerable: true, get: function () { return Esp32_1.Esp32; } });
const M5Atom_1 = require("./devices/M5Atom");
Object.defineProperty(exports, "M5Atom", { enumerable: true, get: function () { return M5Atom_1.M5Atom; } });
const utils = __importStar(require("./utils"));
const types = __importStar(require("./devices/base/transports/Transport"));
class Opniz {
}
exports.Opniz = Opniz;
Opniz.BaseDevice = BaseDevice_1.BaseDevice;
Opniz.Esp32 = Esp32_1.Esp32;
Opniz.M5Atom = M5Atom_1.M5Atom;
Opniz.utils = utils;
(function (Opniz) {
    Opniz.Protocol = types.Protocol;
})(Opniz = exports.Opniz || (exports.Opniz = {}));
