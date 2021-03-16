"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpClient = exports.NotConnectedError = exports.RequestTimeoutError = exports.ConnectionTimeoutError = void 0;
const events_1 = require("events");
const net_1 = __importDefault(require("net"));
const PromiseTimer_1 = require("./PromiseTimer");
const utils_1 = require("../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[TcpClient]", ...v)) // DEBUG:
class ConnectionTimeoutError extends PromiseTimer_1.TimeoutError {
    constructor(message = "Connection timeout.") {
        super(message);
    }
}
exports.ConnectionTimeoutError = ConnectionTimeoutError;
class RequestTimeoutError extends PromiseTimer_1.TimeoutError {
    constructor(message = "Request timeout.") {
        super(message);
    }
}
exports.RequestTimeoutError = RequestTimeoutError;
class NotConnectedError extends Error {
    constructor(message = "Not connected.") {
        super(message);
        this.name = new.target.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NotConnectedError = NotConnectedError;
const defaultTimeout = 5000;
const connectionTimeout = 20000;
class TcpClient extends events_1.EventEmitter {
    constructor({ address, port }) {
        super();
        this.onclose = () => { };
        this.onerror = (error) => { };
        this._onclose = async () => await this.onclose();
        this._onerror = async (error) => {
            await this.onerror(error);
            await this.close();
        };
        this._address = address;
        this._port = port;
        this._timer = new PromiseTimer_1.PromiseTimer();
        this._timer.timeout = defaultTimeout;
    }
    connect({ timeout = connectionTimeout } = {}) {
        return this._timer.timer(new Promise(async (res, rej) => {
            // dbg("connect")
            if (this.isConnected()) {
                res();
                for (;;)
                    await utils_1.sleep(100); // MEMO: これがないと`res()`されない…
            }
            this.socket = net_1.default.connect(this._port, this._address);
            this.socket.once("connect", () => res());
            this.socket.once("error", (error) => rej(error));
            this.socket.on("close", this._onclose);
            this.socket.on("error", this._onerror);
        }), { error: new ConnectionTimeoutError(), timeout });
    }
    request(message, { error = new RequestTimeoutError(), timeout = this._timer.timeout, } = {}) {
        return this._timer.timer(new Promise((res, rej) => {
            // dbg("request")
            if (!this.isConnected())
                rej(new NotConnectedError());
            this.socket.once("data", data => res(data.toString()));
            this.socket.write(message);
        }), { error, timeout });
    }
    send(message, { error = new RequestTimeoutError(), timeout = this._timer.timeout, } = {}) {
        return this._timer.timer(new Promise((res, rej) => {
            // dbg("send")
            if (!this.isConnected())
                rej(new NotConnectedError());
            this.socket.write(message, error => error ? rej(error) : res());
        }), { error, timeout });
    }
    async close({ timeout = defaultTimeout } = {}) {
        return this._timer.timer(new Promise((res, rej) => {
            var _a;
            // dbg("close")
            if (!this.isConnected() || !!((_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroyed))
                res();
            this.socket.once("close", () => res());
            this.socket.destroy();
        }), { timeout });
    }
    isConnected() {
        var _a;
        // dbg("isConnected", this.socket?.connecting)
        return !!((_a = this.socket) === null || _a === void 0 ? void 0 : _a.writable);
    }
    setTimeout(timeout) {
        this._timer.timeout = timeout;
    }
}
exports.TcpClient = TcpClient;
//# sourceMappingURL=TcpClient.js.map