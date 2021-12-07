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
exports.WebSocketServerTransport = void 0;
const PromiseWebSocketServer_1 = require("./PromiseWebSocketServer");
const utils_1 = require("../../../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[WebSocketServerTransport]", ...v)) // DEBUG:
class WebSocketServerTransport extends PromiseWebSocketServer_1.PromiseWebSocketServer {
    constructor({ port }) {
        super({ port });
        this.onrequest = (message) => __awaiter(this, void 0, void 0, function* () { return this._onrpcHandler(message); });
        this.onrpcRequest = (rpcRequests) => { };
        this.onrpcHandler = (rpcRequests) => __awaiter(this, void 0, void 0, function* () {
            yield this._onrpcRequest(rpcRequests);
            return JSON.stringify(rpcRequests);
        });
        this._onrpcRequest = (rpcRequests) => __awaiter(this, void 0, void 0, function* () { yield this.onrpcRequest(rpcRequests); });
        this._onrpcHandler = (message) => __awaiter(this, void 0, void 0, function* () {
            const rpcRequests = JSON.parse(message);
            return yield this.onrpcHandler(rpcRequests);
        });
    }
    connect({ timeout } = {}) {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connect.call(this, { timeout });
                yield this._onconnect();
                return this.isConnected();
            }
            catch (e) {
                yield this._onerror(e);
                // throw e
                console.log("Opniz Error:", e.message);
                yield utils_1.sleep(500);
                return false;
            }
        });
    }
    request(message) {
        const _super = Object.create(null, {
            request: { get: () => super.request }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _super.request.call(this, message);
            }
            catch (e) {
                yield this._onerror(e);
                throw e;
            }
        });
    }
    send(message) {
        const _super = Object.create(null, {
            send: { get: () => super.send }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.send.call(this, message);
            }
            catch (e) {
                yield this._onerror(e);
                throw e;
            }
        });
    }
    close() {
        const _super = Object.create(null, {
            close: { get: () => super.close }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.close.call(this);
                yield this._onclose();
            }
            catch (e) {
                // throw e
                console.log("Opniz Error:", e.message);
            }
        });
    }
}
exports.WebSocketServerTransport = WebSocketServerTransport;
