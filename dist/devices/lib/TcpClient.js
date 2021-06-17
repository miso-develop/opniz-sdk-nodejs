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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpClient = exports.NotConnectedError = exports.RequestTimeoutError = exports.ConnectionTimeoutError = void 0;
var events_1 = require("events");
var net_1 = __importDefault(require("net"));
var PromiseTimer_1 = require("./PromiseTimer");
var utils_1 = require("../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[TcpClient]", ...v)) // DEBUG:
var ConnectionTimeoutError = /** @class */ (function (_super) {
    __extends(ConnectionTimeoutError, _super);
    function ConnectionTimeoutError(message) {
        if (message === void 0) { message = "Connection timeout."; }
        return _super.call(this, message) || this;
    }
    return ConnectionTimeoutError;
}(PromiseTimer_1.TimeoutError));
exports.ConnectionTimeoutError = ConnectionTimeoutError;
var RequestTimeoutError = /** @class */ (function (_super) {
    __extends(RequestTimeoutError, _super);
    function RequestTimeoutError(message) {
        if (message === void 0) { message = "Request timeout."; }
        return _super.call(this, message) || this;
    }
    return RequestTimeoutError;
}(PromiseTimer_1.TimeoutError));
exports.RequestTimeoutError = RequestTimeoutError;
var NotConnectedError = /** @class */ (function (_super) {
    __extends(NotConnectedError, _super);
    function NotConnectedError(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = "Not connected."; }
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return NotConnectedError;
}(Error));
exports.NotConnectedError = NotConnectedError;
var defaultTimeout = 5000;
var connectionTimeout = 20000;
var TcpClient = /** @class */ (function (_super) {
    __extends(TcpClient, _super);
    function TcpClient(_a) {
        var address = _a.address, port = _a.port;
        var _this = _super.call(this) || this;
        _this.onclose = function () { };
        _this.onerror = function (error) { };
        _this._onclose = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.onclose()];
                case 1: return [2 /*return*/, _a.sent()];
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
        _this._address = address;
        _this._port = port;
        _this._timer = new PromiseTimer_1.PromiseTimer();
        _this._timer.timeout = defaultTimeout;
        return _this;
    }
    TcpClient.prototype.connect = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? connectionTimeout : _c;
        return this._timer.timer(new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isConnected()) return [3 /*break*/, 4];
                        res();
                        _a.label = 1;
                    case 1: return [4 /*yield*/, utils_1.sleep(100)]; // MEMO: これがないと`res()`されない…
                    case 2:
                        _a.sent(); // MEMO: これがないと`res()`されない…
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        this.socket = net_1.default.connect(this._port, this._address);
                        this.socket.once("connect", function () { return res(); });
                        this.socket.once("error", function (error) { return rej(error); });
                        this.socket.on("close", this._onclose);
                        this.socket.on("error", this._onerror);
                        return [2 /*return*/];
                }
            });
        }); }), { error: new ConnectionTimeoutError(), timeout: timeout });
    };
    TcpClient.prototype.request = function (message, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.error, error = _c === void 0 ? new RequestTimeoutError() : _c, _d = _b.timeout, timeout = _d === void 0 ? this._timer.timeout : _d;
        return this._timer.timer(new Promise(function (res, rej) {
            // dbg("request")
            if (!_this.isConnected())
                rej(new NotConnectedError());
            _this.socket.once("data", function (data) { return res(data.toString()); });
            _this.socket.write(message);
        }), { error: error, timeout: timeout });
    };
    TcpClient.prototype.send = function (message, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.error, error = _c === void 0 ? new RequestTimeoutError() : _c, _d = _b.timeout, timeout = _d === void 0 ? this._timer.timeout : _d;
        return this._timer.timer(new Promise(function (res, rej) {
            // dbg("send")
            if (!_this.isConnected())
                rej(new NotConnectedError());
            _this.socket.write(message, function (error) { return error ? rej(error) : res(); });
        }), { error: error, timeout: timeout });
    };
    TcpClient.prototype.close = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? defaultTimeout : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_d) {
                return [2 /*return*/, this._timer.timer(new Promise(function (res, rej) {
                        var _a;
                        // dbg("close")
                        if (!_this.isConnected() || !!((_a = _this.socket) === null || _a === void 0 ? void 0 : _a.destroyed))
                            res();
                        _this.socket.once("close", function () { return res(); });
                        _this.socket.destroy();
                    }), { timeout: timeout })];
            });
        });
    };
    TcpClient.prototype.isConnected = function () {
        var _a;
        // dbg("isConnected", this.socket?.connecting)
        return !!((_a = this.socket) === null || _a === void 0 ? void 0 : _a.writable);
    };
    TcpClient.prototype.setTimeout = function (timeout) {
        this._timer.timeout = timeout;
    };
    return TcpClient;
}(events_1.EventEmitter));
exports.TcpClient = TcpClient;
//# sourceMappingURL=TcpClient.js.map