"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTimer = exports.NotConnectedError = exports.RequestTimeoutError = exports.ConnectionTimeoutError = exports.TimeoutError = void 0;
var cjs_ponyfill_1 = require("abortcontroller-polyfill/dist/cjs-ponyfill");
var TimeoutError_1 = require("./TimeoutError");
var TimeoutError_2 = require("./TimeoutError");
Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return TimeoutError_2.TimeoutError; } });
Object.defineProperty(exports, "ConnectionTimeoutError", { enumerable: true, get: function () { return TimeoutError_2.ConnectionTimeoutError; } });
Object.defineProperty(exports, "RequestTimeoutError", { enumerable: true, get: function () { return TimeoutError_2.RequestTimeoutError; } });
Object.defineProperty(exports, "NotConnectedError", { enumerable: true, get: function () { return TimeoutError_2.NotConnectedError; } });
var PromiseTimer = /** @class */ (function () {
    function PromiseTimer() {
        this.timeout = 5000;
    }
    PromiseTimer.prototype.timer = function (promise, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.error, error = _c === void 0 ? new TimeoutError_1.TimeoutError() : _c, _d = _b.timeout, timeout = _d === void 0 ? this.timeout : _d;
        return this.timers([promise], { error: error, timeout: timeout });
    };
    PromiseTimer.prototype.timers = function (promises, _a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.error, error = _c === void 0 ? new TimeoutError_1.TimeoutError() : _c, _d = _b.timeout, timeout = _d === void 0 ? this.timeout : _d;
        var abortController = new cjs_ponyfill_1.AbortController();
        return Promise.race(__spreadArray(__spreadArray([], (promises.map(function (promise) { return _this._abortable(promise, abortController); }))), [
            this._causeTimeout({ error: error, timeout: timeout, abortController: abortController }),
        ]));
    };
    PromiseTimer.prototype._abortable = function (promise, abortController) {
        var _this = this;
        // MEMO: Promiseラップしない代替コードを考えたものの、エラー発生後にabort叩くにはこの形にしないとだめだった
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = resolve;
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        abortController.abort();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        reject(e_1);
                        abortController.abort();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseTimer.prototype._causeTimeout = function (_a) {
        var _b = _a.error, error = _b === void 0 ? new TimeoutError_1.TimeoutError() : _b, _c = _a.timeout, timeout = _c === void 0 ? this.timeout : _c, _d = _a.abortController, abortController = _d === void 0 ? new cjs_ponyfill_1.AbortController() : _d;
        return this._abortableSleep({ error: error, timeout: timeout, abortController: abortController });
    };
    PromiseTimer.prototype._abortableSleep = function (_a) {
        var _b = _a.error, error = _b === void 0 ? new TimeoutError_1.TimeoutError() : _b, _c = _a.timeout, timeout = _c === void 0 ? this.timeout : _c, _d = _a.abortController, abortController = _d === void 0 ? new cjs_ponyfill_1.AbortController() : _d;
        var signal = abortController.signal;
        return new Promise(function (resolve, reject) {
            var onAbort = function () {
                clearTimeout(timeoutHandle);
                resolve();
            };
            var timeoutHandle = setTimeout(function () {
                signal === null || signal === void 0 ? void 0 : signal.removeEventListener("abort", onAbort);
                reject(error);
            }, timeout);
            signal === null || signal === void 0 ? void 0 : signal.addEventListener("abort", onAbort, { once: true });
        });
    };
    return PromiseTimer;
}());
exports.PromiseTimer = PromiseTimer;
//# sourceMappingURL=PromiseTimer.js.map