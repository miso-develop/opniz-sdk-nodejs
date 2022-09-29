"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTimer = exports.NotConnectedError = exports.RequestTimeoutError = exports.ConnectionTimeoutError = exports.TimeoutError = void 0;
const TimeoutError_1 = require("./TimeoutError");
Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function () { return TimeoutError_1.TimeoutError; } });
Object.defineProperty(exports, "ConnectionTimeoutError", { enumerable: true, get: function () { return TimeoutError_1.ConnectionTimeoutError; } });
Object.defineProperty(exports, "RequestTimeoutError", { enumerable: true, get: function () { return TimeoutError_1.RequestTimeoutError; } });
Object.defineProperty(exports, "NotConnectedError", { enumerable: true, get: function () { return TimeoutError_1.NotConnectedError; } });
class PromiseTimer {
    constructor() {
        this.timeout = 5000;
    }
    timer(func, { error = new TimeoutError_1.TimeoutError(), timeout = this.timeout, callback = () => { }, } = {}) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => _reject(error), timeout);
            const _resolve = (returnValue) => {
                clearTimeout(timeoutId);
                callback("resolve");
                resolve(returnValue);
            };
            const _reject = (error) => {
                clearTimeout(timeoutId);
                callback("reject");
                reject(error);
            };
            func(_resolve, _reject);
        });
    }
}
exports.PromiseTimer = PromiseTimer;
