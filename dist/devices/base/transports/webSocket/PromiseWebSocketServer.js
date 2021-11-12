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
exports.PromiseWebSocketServer = void 0;
var events_1 = require("events");
var socket_io_1 = require("socket.io");
var PromiseTimer_1 = require("../lib/PromiseTimer");
var TimeoutError_1 = require("../lib/TimeoutError");
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseWebSocketServer]", ...v)) // DEBUG:
var defaultTimeout = 5000;
var connectionTimeout = 10000;
var closeTimeout = 10000;
var PromiseWebSocketServer = /** @class */ (function (_super) {
    __extends(PromiseWebSocketServer, _super);
    function PromiseWebSocketServer(_a) {
        var port = _a.port;
        var _this = _super.call(this) || this;
        _this._timer = new PromiseTimer_1.PromiseTimer();
        _this.onrequest = function (message) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, message];
        }); }); };
        _this._onrequest = function (message) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.onrequest(message)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        _this._port = port;
        _this._timer.timeout = defaultTimeout;
        return _this;
    }
    PromiseWebSocketServer.prototype._listen = function (port) {
        this._server = new socket_io_1.Server(port, {
            connectTimeout: connectionTimeout,
            pingTimeout: connectionTimeout,
        });
    };
    PromiseWebSocketServer.prototype.connect = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? connectionTimeout : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_d) {
                return [2 /*return*/, this._timer.timer(new Promise(function (resolve, reject) {
                        if (_this.isConnected())
                            return true;
                        _this._listen(_this._port);
                        var onError = function (error) { return reject(error); };
                        _this._server.once("error", onError);
                        _this._server.once("connection", function (socket) {
                            _this._socket = socket;
                            _this._socket.on("request", function (message, callback) { return __awaiter(_this, void 0, void 0, function () {
                                var request, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            request = typeof message === "string" ? message : JSON.stringify(message);
                                            _a = callback;
                                            return [4 /*yield*/, this._onrequest(request)];
                                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            _this._server.removeListener("error", onError);
                            resolve(true);
                        });
                    }), { error: new TimeoutError_1.ConnectionTimeoutError(), timeout: timeout })];
            });
        });
    };
    PromiseWebSocketServer.prototype.request = function (message, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? this._timer.timeout : _c;
        return this._timer.timer(new Promise(function (resolve, reject) {
            if (!_this.isConnected())
                reject(new TimeoutError_1.NotConnectedError());
            var onError = function (error) { return reject(error); };
            _this._socket.once("error", onError);
            _this._socket.emit("request", message, function (response) {
                _this._socket.removeListener("error", onError);
                resolve(typeof response === "string" ? response : JSON.stringify(response));
            });
        }), { error: new TimeoutError_1.RequestTimeoutError(), timeout: timeout });
    };
    PromiseWebSocketServer.prototype.send = function (message, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? this._timer.timeout : _c;
        return this._timer.timer(new Promise(function (resolve, reject) {
            if (!_this.isConnected())
                reject(new TimeoutError_1.NotConnectedError());
            var onError = function (error) { return reject(error); };
            _this._socket.once("error", onError);
            _this._socket.emit("request", message, function () {
                _this._socket.removeListener("error", onError);
                resolve();
            });
        }), { error: new TimeoutError_1.RequestTimeoutError(), timeout: timeout });
    };
    PromiseWebSocketServer.prototype.close = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? closeTimeout : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_d) {
                return [2 /*return*/, this._timer.timer(new Promise(function (resolve, reject) {
                        var onError = function (error) { return reject(error); };
                        _this._server.once("error", onError);
                        _this._server.once("close", function () {
                            _this._server.removeListener("error", onError);
                            resolve();
                        });
                        _this._server.disconnectSockets(true);
                        _this._server.close(function (error) {
                            _this._server.removeListener("error", onError);
                            error ? reject(error) : resolve();
                        });
                    }), { error: new TimeoutError_1.CloseTimeoutError(), timeout: timeout })];
            });
        });
    };
    PromiseWebSocketServer.prototype.isConnected = function () {
        var _a;
        return !!((_a = this._socket) === null || _a === void 0 ? void 0 : _a.connected);
    };
    PromiseWebSocketServer.prototype.setTimeout = function (timeout) {
        this._timer.timeout = timeout;
    };
    return PromiseWebSocketServer;
}(events_1.EventEmitter));
exports.PromiseWebSocketServer = PromiseWebSocketServer;
//# sourceMappingURL=PromiseWebSocketServer.js.map