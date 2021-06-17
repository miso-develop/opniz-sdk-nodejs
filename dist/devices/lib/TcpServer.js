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
exports.TcpServer = exports.ListenTimeoutError = void 0;
var events_1 = require("events");
var net_1 = __importDefault(require("net"));
var PromiseTimer_1 = require("./PromiseTimer");
var utils_1 = require("../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgCyan(getDateStr(), "[TcpServer]", ...v)) // DEBUG:
var ListenTimeoutError = /** @class */ (function (_super) {
    __extends(ListenTimeoutError, _super);
    function ListenTimeoutError(message) {
        if (message === void 0) { message = "Listen timeout."; }
        return _super.call(this, message) || this;
    }
    return ListenTimeoutError;
}(PromiseTimer_1.TimeoutError));
exports.ListenTimeoutError = ListenTimeoutError;
var defaultTimeout = 5000;
var TcpServer = /** @class */ (function (_super) {
    __extends(TcpServer, _super);
    function TcpServer(port) {
        var _this = _super.call(this) || this;
        _this.messageHandlers = [];
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
        _this._ondata = function (data) {
            // MEMO: デバイスからのイベントを瞬間的に同時に受け取ることがあり、その場合`{...}{...}`のようなメッセージとなりJSON.parseでエラーとなる。
            // MEMO: それを回避するため必ずオブジェクト末尾に`,`を付与し`{...},`の形でデバイスからメッセージを送り、ここで`[]`で括り配列にする。
            // MEMO: 配列内の末尾が`,`で終わるとJSON.parseでエラーとなるため空オブジェクト`{}`を挿入し、JSON.parse後に削除している。
            var messages = JSON.parse("[" + data.toString() + "{}]").filter(function (value) { return value.name; });
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                _this._handleMessage(message);
            }
        };
        _this.port = port;
        _this._timer = new PromiseTimer_1.PromiseTimer();
        _this._timer.timeout = defaultTimeout;
        return _this;
    }
    TcpServer.prototype._handleMessage = function (message) {
        for (var _i = 0, _a = this.messageHandlers; _i < _a.length; _i++) {
            var messageHandler = _a[_i];
            if (messageHandler.name !== message.name)
                continue;
            // MEMO: emitせずにここで直接listener実行でいいのでは？ →emitなら同名で複数登録したMessageHandlerがすべて実装される
            this.emit(message.name, message.parameters);
            return;
        }
        this.onnotmatch(message);
    };
    TcpServer.prototype.listen = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? this._timer.timeout : _c;
        return this._timer.timer(new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // dbg("listen")
                        this.onMessageHandlers();
                        if (!this.isListening()) return [3 /*break*/, 4];
                        res();
                        _a.label = 1;
                    case 1: return [4 /*yield*/, utils_1.sleep(100)]; // MEMO: これがないと`res()`されない…
                    case 2:
                        _a.sent(); // MEMO: これがないと`res()`されない…
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        this.server = net_1.default.createServer(function (socket) {
                            // socket events
                            socket.on("data", function (data) {
                                _this._ondata(data);
                                socket.write("\0"); // MEMO: とりあえずの実装としてハンドラーごとにresponseは返さず、一律nullを返す
                            });
                            socket.on("close", _this._onclose);
                            socket.on("error", _this._onerror);
                        });
                        // server events
                        this.server.on("close", this._onclose);
                        this.server.on("error", this._onerror);
                        this.server.once("error", function (error) { return rej(error); });
                        this.server.once("listening", function () { return res(); });
                        this.server.listen(this.port);
                        return [2 /*return*/];
                }
            });
        }); }), { error: new ListenTimeoutError(), timeout: timeout });
    };
    TcpServer.prototype.onMessageHandlers = function () {
        var _this = this;
        // dbg("onMessageHandlers")
        this.removeAllListeners();
        this.messageHandlers.forEach(function (messageHandler) {
            return _this.on(messageHandler.name, messageHandler.listener);
        });
    };
    TcpServer.prototype.close = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.timeout, timeout = _c === void 0 ? this._timer.timeout : _c;
        // dbg("close")
        return this._timer.timer(new Promise(function (res, rej) {
            var _a;
            if (!((_a = _this.server) === null || _a === void 0 ? void 0 : _a.listening))
                res();
            _this.server.once("close", function () { return res(); });
            _this.server.close();
        }), { error: new PromiseTimer_1.TimeoutError(), timeout: timeout });
    };
    TcpServer.prototype.isListening = function () {
        var _a;
        return !!((_a = this.server) === null || _a === void 0 ? void 0 : _a.listening);
    };
    return TcpServer;
}(events_1.EventEmitter));
exports.TcpServer = TcpServer;
//# sourceMappingURL=TcpServer.js.map