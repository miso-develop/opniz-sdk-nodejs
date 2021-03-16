"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTimer = exports.TimeoutError = void 0;
class TimeoutError extends Error {
    constructor(message = "timeout.") {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.TimeoutError = TimeoutError;
class PromiseTimer {
    constructor() {
        this.timeout = 5000;
    }
    timer(func, { error = new TimeoutError(), timeout = this.timeout, } = {}) {
        return this.timers([func], { error, timeout });
    }
    timers(functions, { error = new TimeoutError(), timeout = this.timeout, } = {}) {
        return Promise.race([
            ...functions,
            this._causeTimeout({ error, timeout }),
        ]);
    }
    _causeTimeout({ error = new TimeoutError(), timeout = this.timeout, }) {
        return new Promise((res, rej) => setTimeout(() => rej(error), timeout));
    }
}
exports.PromiseTimer = PromiseTimer;
//# sourceMappingURL=PromiseTimer.js.map