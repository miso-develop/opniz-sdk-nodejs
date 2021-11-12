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
exports.TcpTransport = void 0;
var events_1 = require("events");
var PromiseTcpClient_1 = require("./PromiseTcpClient");
var PromiseTcpServer_1 = require("./PromiseTcpServer");
var utils_1 = require("../../../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[TcpTransport]", ...v)) // DEBUG:
var TcpTransport = /** @class */ (function (_super) {
    __extends(TcpTransport, _super);
    function TcpTransport(_a) {
        var address = _a.address, port = _a.port, _b = _a.serverPort, serverPort = _b === void 0 ? port : _b;
        var _this = _super.call(this) || this;
        _this.onconnect = function () { };
        _this.onclose = function () { };
        _this.onerror = function (error) { };
        _this.onrpcRequest = function (rpcRequests) { };
        _this.onrpcHandler = function (rpcRequests) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._onrpcRequest(rpcRequests)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, JSON.stringify(rpcRequests)];
                }
            });
        }); };
        _this.ondata = function (data) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, this._onrpcHandler(data)];
        }); }); };
        _this._onconnect = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.onconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        }); }); };
        _this._onclose = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.onclose()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        }); }); };
        _this._onerror = function (error) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.onerror(error)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        // MEMO: サブクラスで発生するエラーを集約、必要に応じてここでハンドリング
        _this._onsuberror = function (error) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        _this._onrpcRequest = function (rpcRequests) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.onrpcRequest(rpcRequests)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        }); }); };
        _this._onrpcHandler = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var dataStr, rpcRequests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataStr = "[" + data.toString().replace(/,$/, ",[]") + "]";
                        rpcRequests = JSON.parse(dataStr).flat();
                        return [4 /*yield*/, this.onrpcHandler(rpcRequests)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.on("connect", _this._onconnect);
        _this.on("close", _this._onclose);
        _this.on("error", _this._onerror);
        _this._client = new PromiseTcpClient_1.PromiseTcpClient({ address: address, port: port });
        _this._client.onerror = _this._onsuberror;
        _this._server = new PromiseTcpServer_1.PromiseTcpServer(serverPort);
        _this._server.onerror = _this._onsuberror;
        _this._server.ondata = _this.ondata;
        return _this;
    }
    TcpTransport.prototype.connect = function (_a) {
        var _b = _a === void 0 ? {} : _a, timeout = _b.timeout;
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 7]);
                        return [4 /*yield*/, this._server.listen()];
                    case 1:
                        _c.sent();
                        if (this.isConnected())
                            return [2 /*return*/, true];
                        return [4 /*yield*/, this._client.connect({ timeout: timeout })];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this._onconnect()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, this.isConnected()];
                    case 4:
                        e_1 = _c.sent();
                        return [4 /*yield*/, this._onerror(e_1)
                            // throw e
                        ];
                    case 5:
                        _c.sent();
                        // throw e
                        console.log("Opniz Error:", e_1.message);
                        return [4 /*yield*/, utils_1.sleep(100)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TcpTransport.prototype.request = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this._client.request(message)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        return [4 /*yield*/, this._onerror(e_2)];
                    case 3:
                        _a.sent();
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TcpTransport.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this._client.send(message)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_3 = _a.sent();
                        return [4 /*yield*/, this._onerror(e_3)];
                    case 3:
                        _a.sent();
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TcpTransport.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this._server.close(),
                                this._client.close(),
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._onclose()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _a.sent();
                        // throw e
                        console.log("Opniz Error:", e_4.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TcpTransport.prototype.isConnected = function () {
        return this._client.isConnected();
    };
    TcpTransport.prototype.setTimeout = function (timeout) {
        this._client.setTimeout(timeout);
    };
    return TcpTransport;
}(events_1.EventEmitter));
exports.TcpTransport = TcpTransport;
//# sourceMappingURL=TcpTransport.js.map