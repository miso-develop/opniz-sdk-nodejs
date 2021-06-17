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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTimer = exports.TimeoutError = void 0;
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message) {
        var _newTarget = this.constructor;
        if (message === void 0) { message = "timeout."; }
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
var PromiseTimer = /** @class */ (function () {
    function PromiseTimer() {
        this.timeout = 5000;
    }
    PromiseTimer.prototype.timer = function (func, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.error, error = _c === void 0 ? new TimeoutError() : _c, _d = _b.timeout, timeout = _d === void 0 ? this.timeout : _d;
        return this.timers([func], { error: error, timeout: timeout });
    };
    PromiseTimer.prototype.timers = function (functions, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.error, error = _c === void 0 ? new TimeoutError() : _c, _d = _b.timeout, timeout = _d === void 0 ? this.timeout : _d;
        return Promise.race(__spreadArray(__spreadArray([], functions), [
            this._causeTimeout({ error: error, timeout: timeout }),
        ]));
    };
    PromiseTimer.prototype._causeTimeout = function (_a) {
        var _b = _a.error, error = _b === void 0 ? new TimeoutError() : _b, _c = _a.timeout, timeout = _c === void 0 ? this.timeout : _c;
        return new Promise(function (res, rej) { return setTimeout(function () { return rej(error); }, timeout); });
    };
    return PromiseTimer;
}());
exports.PromiseTimer = PromiseTimer;
//# sourceMappingURL=PromiseTimer.js.map