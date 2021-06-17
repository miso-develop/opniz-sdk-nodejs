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
exports.TcpManager = void 0;
var events_1 = require("events");
var TcpClient_1 = require("./TcpClient");
var TcpServer_1 = require("./TcpServer");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:
var connectionTimeout = 20000;
var TcpManager = /** @class */ (function (_super) {
    __extends(TcpManager, _super);
    function TcpManager(_a) {
        var address = _a.address, port = _a.port, serverPort = _a.serverPort;
        var _this = _super.call(this) || this;
        _this.onclose = function () { };
        _this.onerror = function (error) { };
        _this.onnotmatch = function (message) { };
        _this._onclose = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.onclose()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        _this._onerror = function (error) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // dbg("[_onerror]")
                    return [4 /*yield*/, this.onerror(error)];
                    case 1:
                        // dbg("[_onerror]")
                        _a.sent();
                        return [4 /*yield*/, this.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this._client = new TcpClient_1.TcpClient({ address: address, port: port });
        _this._server = new TcpServer_1.TcpServer(serverPort || port);
        _this._server.onnotmatch = function (message) { return _this.onnotmatch(message); };
        _this.on("close", _this._onclose);
        _this.on("error", _this._onerror);
        return _this;
    }
    // 継承デバイスにてこのメソッド内でmessageHandlersに独自メッセージイベントを追加していく
    TcpManager.prototype.addDeviceMessageHandlers = function (messageHandlers) { };
    TcpManager.prototype.addCustomMessageHandlers = function () {
        var _a;
        var messageHandlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messageHandlers[_i] = arguments[_i];
        }
        (_a = this._server.messageHandlers).push.apply(_a, messageHandlers);
        this._server.onMessageHandlers();
    };
    TcpManager.prototype.removeCustomMessageHandlers = function () {
        var messageHandlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messageHandlers[_i] = arguments[_i];
        }
        this._server.messageHandlers = this._server.messageHandlers.filter(function (messageHandler) {
            return !messageHandlers.some(function (_messageHandler) { return JSON.stringify(_messageHandler) === JSON.stringify(messageHandler); });
        });
        this._server.onMessageHandlers();
    };
    TcpManager.prototype.getMessageHandlers = function () {
        return this._server.messageHandlers.map(function (messageHandler) { return messageHandler.name; });
    };
    TcpManager.prototype.connect = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? connectionTimeout : _c;
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        // dbg("[connect]")
                        if (this.isConnected() || !this._isDisconnected())
                            return [2 /*return*/, true];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 6]);
                        // Create TCP Client
                        return [4 /*yield*/, this._client.connect({ timeout: timeout })
                            // Create TCP Server
                        ];
                    case 2:
                        // Create TCP Client
                        _d.sent();
                        // Create TCP Server
                        return [4 /*yield*/, this._server.listen({ timeout: timeout })
                            // Add message handlers
                        ];
                    case 3:
                        // Create TCP Server
                        _d.sent();
                        // Add message handlers
                        this.addDeviceMessageHandlers(this._server.messageHandlers);
                        this.addCustomMessageHandlers();
                        return [3 /*break*/, 6];
                    case 4:
                        e_1 = _d.sent();
                        // dbg("[connect catch]", e.message)
                        // console.log("Connect error: ", e.message) // TODO: 稼働率検証中一時的にCO
                        return [4 /*yield*/, this.close()];
                    case 5:
                        // dbg("[connect catch]", e.message)
                        // console.log("Connect error: ", e.message) // TODO: 稼働率検証中一時的にCO
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, this.isConnected()];
                }
            });
        });
    };
    TcpManager.prototype.request = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, this._client.request(message)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        // dbg("[request catch]", e.message)
                        return [4 /*yield*/, this.close()];
                    case 3:
                        // dbg("[request catch]", e.message)
                        _a.sent();
                        return [4 /*yield*/, this.emit("error", e_2)];
                    case 4:
                        _a.sent();
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TcpManager.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, this._client.send(message)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        e_3 = _a.sent();
                        // dbg("[send catch]", e.message)
                        return [4 /*yield*/, this.close()];
                    case 3:
                        // dbg("[send catch]", e.message)
                        _a.sent();
                        return [4 /*yield*/, this.emit("error", e_3)];
                    case 4:
                        _a.sent();
                        throw e_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TcpManager.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // dbg("[close]")
                        if (!this._server.isListening() && !this._client.isConnected())
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this._client.close(),
                                this._server.close(),
                            ])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.emit("close");
                        return [2 /*return*/];
                }
            });
        });
    };
    TcpManager.prototype.isConnected = function () {
        return this._server.isListening() && this._client.isConnected();
    };
    // MEMO: TCP ServerとClientが同居しているため、どちらか一方が接続された状態の場合がある
    // MEMO: TCP ServerとClientどちらも完全に切断されたかをチェックして返す
    TcpManager.prototype._isDisconnected = function () {
        return !this._server.isListening() && !this._client.isConnected();
    };
    TcpManager.prototype.setTimeout = function (timeout) {
        this._client.setTimeout(timeout);
    };
    return TcpManager;
}(events_1.EventEmitter));
exports.TcpManager = TcpManager;
//# sourceMappingURL=TcpManager.js.map