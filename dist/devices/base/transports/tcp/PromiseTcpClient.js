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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseTcpClient = void 0;
const events_1 = require("events");
const net_1 = __importDefault(require("net"));
const PromiseTimer_1 = require("../lib/PromiseTimer");
const TimeoutError_1 = require("../lib/TimeoutError");
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseTcpClient]", ...v)) // DEBUG:
const defaultTimeout = 5000;
const connectionTimeout = 3000;
class PromiseTcpClient extends events_1.EventEmitter {
    constructor({ address, port }) {
        super();
        this._promiseTimer = new PromiseTimer_1.PromiseTimer();
        this.onerror = (error) => { };
        this._address = address;
        this._port = port;
        this._promiseTimer.timeout = defaultTimeout;
    }
    connectWait({ timeout = connectionTimeout } = {}) {
        return this._promiseTimer.timer((resolve, reject) => {
            if (this.isConnected())
                resolve(true);
            this.socket = net_1.default.connect(this._port, this._address, () => resolve(true));
            this.socket.on("error", this.onerror);
        }, { error: new TimeoutError_1.ConnectionTimeoutError(), timeout });
    }
    request(message, { timeout = this._promiseTimer.timeout } = {}) {
        return this._promiseTimer.timer((resolve, reject) => {
            if (!this.isConnected())
                reject(new TimeoutError_1.NotConnectedError());
            // TODO: ackでレスポンス保証入れたい
            this.socket.once("data", data => resolve(data.toString()));
            this.socket.write(message, (error) => error && reject(error));
        }, { error: new TimeoutError_1.RequestTimeoutError(), timeout });
    }
    send(message, { timeout = this._promiseTimer.timeout } = {}) {
        return this._promiseTimer.timer((resolve, reject) => {
            if (!this.isConnected())
                reject(new TimeoutError_1.NotConnectedError());
            this.socket.write(message, (error) => error ? reject(error) : resolve());
        }, { error: new TimeoutError_1.RequestTimeoutError(), timeout });
    }
    close({ timeout = this._promiseTimer.timeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._promiseTimer.timer((resolve, reject) => {
                var _a;
                if (!this.isConnected() || !!((_a = this.socket) === null || _a === void 0 ? void 0 : _a.destroyed))
                    resolve();
                this.socket.once("error", reject);
                this.socket.once("close", () => {
                    this.socket.removeListener("error", reject);
                    resolve();
                });
                this.socket.destroy();
            }, { error: new TimeoutError_1.CloseTimeoutError(), timeout });
        });
    }
    isConnected() {
        var _a;
        return !!((_a = this.socket) === null || _a === void 0 ? void 0 : _a.writable);
    }
    setTimeout(timeout) {
        this._promiseTimer.timeout = timeout;
    }
}
exports.PromiseTcpClient = PromiseTcpClient;
