"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Esp32 = exports.Protocol = void 0;
/* eslint @typescript-eslint/no-inferrable-types: "off" */
var BaseDevice_1 = require("./base/BaseDevice");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
var BaseDevice_2 = require("./base/BaseDevice");
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return BaseDevice_2.Protocol; } });
var Esp32 = /** @class */ (function (_super) {
    __extends(Esp32, _super);
    function Esp32() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Esp32.prototype.getDeviceName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec("_getDeviceName():String")];
                    case 1: return [2 /*return*/, ((_a.sent()) || "")];
                }
            });
        });
    };
    Esp32.prototype.getFreeHeap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.exec("getFreeHeap")];
                    case 1: 
                    // dbg("[getFreeHeap]")
                    return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Esp32.prototype.temperatureRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.exec("temperatureRead")];
                    case 1: 
                    // dbg("[temperatureRead]")
                    return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Esp32.prototype.restart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.exec("restart")];
                    case 1: 
                    // dbg("[restart]")
                    return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Esp32.prototype.delay = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.exec("delay", ms)];
                    case 1: 
                    // dbg("[delay]")
                    return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Esp32.prototype.analogRead = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.exec("analogRead", pin)];
                    case 1: 
                    // dbg("[analogRead]")
                    return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Esp32.prototype.dacWrite = function (pin, value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.exec("dacWrite", pin, value)];
                    case 1: 
                    // dbg("[dacWrite]")
                    return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Esp32.prototype.digitalRead = function (pin) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.exec("digitalRead", pin)];
                    case 1: 
                    // dbg("[digitalRead]")
                    return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Esp32.prototype.digitalWrite = function (pin, val) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.exec("digitalWrite", pin, val)];
                    case 1: 
                    // dbg("[digitalWrite]")
                    return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Esp32.prototype.ledcWrite = function (pin, duty, channel, freq, resolutionBits) {
        if (channel === void 0) { channel = 0; }
        if (freq === void 0) { freq = 12800; }
        if (resolutionBits === void 0) { resolutionBits = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.exec("ledcWrite", pin, duty, channel, freq, resolutionBits)];
                    case 1: 
                    // dbg("[ledcWrite]")
                    return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    return Esp32;
}(BaseDevice_1.BaseDevice));
exports.Esp32 = Esp32;
//# sourceMappingURL=Esp32.js.map