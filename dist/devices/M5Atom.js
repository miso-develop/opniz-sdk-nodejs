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
exports.M5Atom = exports.Protocol = void 0;
/* eslint @typescript-eslint/no-inferrable-types: "off" */
var Esp32_1 = require("./Esp32");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:
var Esp32_2 = require("./Esp32");
Object.defineProperty(exports, "Protocol", { enumerable: true, get: function () { return Esp32_2.Protocol; } });
var M5Atom = /** @class */ (function (_super) {
    __extends(M5Atom, _super);
    function M5Atom(_a) {
        var address = _a.address, port = _a.port, serverPort = _a.serverPort, protocol = _a.protocol;
        var _this = _super.call(this, { address: address, port: port, serverPort: serverPort, protocol: protocol }) || this;
        _this.dis = new Dis(_this);
        _this.Btn = new Btn(_this);
        _this.IMU = new Imu(_this);
        _this._checkColorCode = function (colorCode) {
            // const regexp = /^#([0-9a-fA-F]{3}|[0-9a-fA-number: numberF]{6})$/ // TODO: おいおい実装したら↓と切り替え
            var regexp = /^#([0-9a-fA-F]{6})$/;
            if (!regexp.test(colorCode))
                throw new Error("Invalid color code format.");
        };
        // add onmethod event
        // public onbutton: ((params: string[]) => void | Promise<void>) = (params: string[]): void | Promise<void> => {}
        _this.onbutton = function (params) { };
        // add rpc handler
        _this.rpcHandler.add({
            name: "button",
            procedure: function (params) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.onbutton(params)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, params ? JSON.stringify(params) : "true"];
                    }
                });
            }); },
        });
        return _this;
    }
    // public async drawpix(number: number, color: string): Promise<boolean> {
    // 	checkColorCode(color)
    // 	return Boolean(await super.exec("drawpix", number, color))
    // }
    // public async drawpix(xpos: number, ypos: number, Color: string): Promise<boolean> {
    // 	return Boolean(await super.exec("_M5.dis.drawpix(uint8_t,uint8_t,CRGB):void", xpos, ypos, Color))
    // }
    M5Atom.prototype.begin = function (SerialEnable, I2CEnable, DisplayEnable) {
        if (SerialEnable === void 0) { SerialEnable = true; }
        if (I2CEnable === void 0) { I2CEnable = true; }
        if (DisplayEnable === void 0) { DisplayEnable = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, _super.prototype.exec.call(this, "_M5.begin(bool,bool,bool):void", SerialEnable, I2CEnable, DisplayEnable)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    M5Atom.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, _super.prototype.exec.call(this, "_M5.update():void")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    return M5Atom;
}(Esp32_1.Esp32));
exports.M5Atom = M5Atom;
var Dis = /** @class */ (function () {
    function Dis(opniz) {
        this.opniz = opniz;
    }
    // public async run(*data: undefined): Promise<boolean> {
    // 	return Boolean(!!await this.opniz.exec("_M5.dis.run(void):void", *data))
    // }
    Dis.prototype.setBrightness = function (brightness) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.opniz.exec("_M5.dis.setBrightness(uint8_t):void", brightness)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    // TODO: TypeScriptだとオーバーロード実装さくっとできない…
    // public async drawpix(xpos: number, ypos: number, Color: string): Promise<boolean> {
    // 	return Boolean(!!await this.opniz.exec("_M5.dis.drawpix(uint8_t,uint8_t,CRGB):void", xpos, ypos, Color))
    // }
    Dis.prototype.drawpix = function (Number, Color) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.opniz.exec("_M5.dis.drawpix(uint8_t,CRGB):void", Number, Color)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Dis.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Boolean;
                        return [4 /*yield*/, this.opniz.exec("_M5.dis.clear():void")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    return Dis;
}());
var Btn = /** @class */ (function () {
    function Btn(opniz) {
        this.opniz = opniz;
    }
    Btn.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.read():uint8_t")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.isPressed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.isPressed():uint8_t")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.isReleased = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.isReleased():uint8_t")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.wasPressed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.wasPressed():uint8_t")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.wasReleased = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.wasReleased():uint8_t")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.pressedFor = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.pressedFor(uint32_t):uint8_t", ms)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.releasedFor = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.releasedFor(uint32_t):uint8_t", ms)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.wasReleasefor = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.wasReleasefor(uint32_t):uint8_t", ms)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Btn.prototype.lastChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.Btn.lastChange():uint32_t")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    return Btn;
}());
var Imu = /** @class */ (function () {
    function Imu(opniz) {
        this.opniz = opniz;
    }
    Imu.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Number;
                        return [4 /*yield*/, this.opniz.exec("_M5.IMU.Init():int")];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()) || -1])];
                }
            });
        });
    };
    Imu.prototype.getAccelAdc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.opniz.exec("_M5.IMU.getAccelAdc(int16_t*,int16_t*,int16_t*):void")];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()) || "[-1,-1,-1]"])];
                }
            });
        });
    };
    return Imu;
}());
//# sourceMappingURL=M5Atom.js.map