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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseWebSocketServer = void 0;
const events_1 = require("events");
const socket_io_1 = require("socket.io");
const PromiseTimer_1 = require("../lib/PromiseTimer");
const Error_1 = require("../lib/Error");
const utils_1 = require("../../../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseWebSocketServer]", ...v)) // DEBUG:
const defaultTimeout = 5000;
const connectTimeout = 10000;
const closeTimeout = 10000;
const pingTimeout = 5000;
const pingInterval = 10000;
class PromiseWebSocketServer extends events_1.EventEmitter {
    constructor({ port }) {
        super();
        this._promiseTimer = new PromiseTimer_1.PromiseTimer();
        this.onconnect = () => { };
        this.onclose = () => { };
        this.onerror = (error) => { };
        this.onrequest = (message) => __awaiter(this, void 0, void 0, function* () { return message; });
        this._onconnect = () => __awaiter(this, void 0, void 0, function* () { yield this.onconnect(); });
        this._onclose = () => __awaiter(this, void 0, void 0, function* () { yield this.onclose(); });
        this._onerror = (error) => __awaiter(this, void 0, void 0, function* () {
            yield this.onerror(error);
            yield this.close();
        });
        this._onrequest = (message) => __awaiter(this, void 0, void 0, function* () { return yield this.onrequest(message); });
        this._port = port;
        this._promiseTimer.timeout = defaultTimeout;
        this.on("connect", this._onconnect);
        this.on("close", this._onclose);
        this.on("error", this._onerror);
        this._listen(this._port);
    }
    _listen(port) {
        this._server = new socket_io_1.Server(port, {
            cors: { origin: "*" },
            connectTimeout,
            pingTimeout,
            pingInterval,
        });
        this._server.on("error", (error) => __awaiter(this, void 0, void 0, function* () { return yield this._onerror(error); }));
        this._server.on("connection", (socket) => {
            this.emit("connect");
            this._socket = socket;
            this._socket.on("error", (error) => __awaiter(this, void 0, void 0, function* () { return yield this._onerror(error); }));
            this._socket.on("disconnect", (reason) => __awaiter(this, void 0, void 0, function* () {
                yield this._onerror(new Error(reason));
            }));
            this._socket.on("request", (message, callback) => __awaiter(this, void 0, void 0, function* () {
                const request = typeof message === "string" ? message : JSON.stringify(message);
                yield callback(yield this._onrequest(request));
            }));
        });
    }
    connectWait({ timeout = connectTimeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let rejected = false;
            return this._promiseTimer.timer((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                while (!this.isConnected() && !rejected) {
                    yield (0, utils_1.sleep)(100);
                }
                resolve(true);
            }), {
                callback: (result) => rejected = result === "reject",
                error: new Error_1.ConnectionTimeoutError(), timeout,
            });
        });
    }
    request(message, { timeout = this._promiseTimer.timeout } = {}) {
        return this._promiseTimer.timer((resolve, reject) => {
            if (!this.isConnected())
                reject(new Error_1.NotConnectedError());
            this._socket.once("error", reject);
            this._socket.emit("request", message, (response) => {
                this._socket.removeListener("error", reject);
                resolve(typeof response === "string" ? response : JSON.stringify(response));
            });
        }, { error: new Error_1.RequestTimeoutError(), timeout });
    }
    send(message, { timeout = this._promiseTimer.timeout } = {}) {
        return this._promiseTimer.timer((resolve, reject) => {
            if (!this.isConnected())
                reject(new Error_1.NotConnectedError());
            this._socket.once("error", reject);
            this._socket.emit("request", message, () => {
                this._socket.removeListener("error", reject);
                resolve();
            });
        }, { error: new Error_1.RequestTimeoutError(), timeout });
    }
    close({ timeout = closeTimeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._promiseTimer.timer((resolve, reject) => {
                if (!this.isConnected())
                    resolve();
                this._socket.once("error", reject);
                this._socket.once("disconnect", () => {
                    this._socket.removeListener("error", reject);
                    resolve();
                });
                this._socket.disconnect(true);
                this.emit("close");
            }, { error: new Error_1.CloseTimeoutError(), timeout });
        });
    }
    isConnected() {
        var _a;
        return !!((_a = this._socket) === null || _a === void 0 ? void 0 : _a.connected);
    }
    setTimeout(timeout) {
        this._promiseTimer.timeout = timeout;
    }
}
exports.PromiseWebSocketServer = PromiseWebSocketServer;
