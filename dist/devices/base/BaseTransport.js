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
exports.BaseTransport = void 0;
const events_1 = require("events");
const TransportCreator_1 = require("./transports/TransportCreator");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseTransport]", ...v)) // DEBUG:
class BaseTransport extends events_1.EventEmitter {
    constructor({ address, port, id, serverPort, protocol }) {
        super();
        this.onconnect = () => { };
        this.onclose = () => { };
        this.onerror = (error) => { };
        this.onrpcRequest = (rpcRequests) => { };
        this.onnotmatch = (rpcRequest) => { };
        this._onconnect = () => __awaiter(this, void 0, void 0, function* () { yield this.onconnect(); });
        this._onclose = () => __awaiter(this, void 0, void 0, function* () { yield this.onclose(); });
        this._onerror = (error) => __awaiter(this, void 0, void 0, function* () { yield this.onerror(error); });
        this.on("connect", this._onconnect);
        this.on("close", this._onclose);
        this.on("error", this._onerror);
        this._transport = TransportCreator_1.TransportCreator.create({ address, port, id, serverPort, protocol });
        this._transport.onconnect = this._onconnect;
        this._transport.onclose = this._onclose;
        this._transport.onerror = this._onerror;
    }
    connect({ timeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () { return yield this._transport.connect({ timeout }); });
    }
    request(message) {
        return __awaiter(this, void 0, void 0, function* () { return yield this._transport.request(message); });
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () { return yield this._transport.send(message); });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () { yield this._transport.close(); });
    }
    isConnected() { return this._transport.isConnected(); }
    setTimeout(timeout) { this._transport.setTimeout(timeout); }
}
exports.BaseTransport = BaseTransport;
