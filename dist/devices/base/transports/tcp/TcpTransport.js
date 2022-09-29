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
exports.TcpTransport = void 0;
const events_1 = require("events");
const PromiseTcpClient_1 = require("./PromiseTcpClient");
const PromiseTcpServer_1 = require("./PromiseTcpServer");
const utils_1 = require("../../../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[TcpTransport]", ...v)) // DEBUG:
class TcpTransport extends events_1.EventEmitter {
    constructor({ address, port, serverPort = port }) {
        super();
        // TODO: Promise側にもっていきたい
        this.onconnect = () => { };
        this.onclose = () => { };
        this.onerror = (error) => { };
        this.onrpcRequest = (rpcRequests) => { };
        this.onrpcHandler = (rpcRequests) => __awaiter(this, void 0, void 0, function* () {
            yield this._onrpcRequest(rpcRequests);
            return JSON.stringify(rpcRequests);
        });
        this.ondata = (data) => __awaiter(this, void 0, void 0, function* () { return this._onrpcHandler(data); });
        // TODO: Promise側にもっていきたい
        this._onconnect = () => __awaiter(this, void 0, void 0, function* () { yield this.onconnect(); });
        this._onclose = () => __awaiter(this, void 0, void 0, function* () { yield this.onclose(); });
        this._onerror = (error) => __awaiter(this, void 0, void 0, function* () {
            yield this.onerror(error);
            yield this.close();
        });
        // MEMO: サブクラスで発生するエラーを集約、必要に応じてここでハンドリング
        this._onsuberror = (error) => __awaiter(this, void 0, void 0, function* () { });
        this._onrpcRequest = (rpcRequests) => __awaiter(this, void 0, void 0, function* () { yield this.onrpcRequest(rpcRequests); });
        this._onrpcHandler = (data) => __awaiter(this, void 0, void 0, function* () {
            // MEMO: デバイスからのイベントを瞬間的に同時に受け取ることがあり、その場合`{...}{...}`のようなメッセージとなりJSON.parseでエラーとなる。
            // MEMO: それを回避するため必ずオブジェクト末尾に`,`を付与し`{...},`の形でデバイスからメッセージを送り、ここで`[]`で括り配列にする。
            // MEMO: 配列内の末尾が`,`で終わるとJSON.parseでエラーとなるため空オブジェクト`{}`を挿入し、JSON.parse後に削除している。
            const dataStr = `[${data.toString().replace(/,$/, ",[]")}]`;
            const rpcRequests = JSON.parse(dataStr).flat();
            return yield this.onrpcHandler(rpcRequests);
        });
        this.on("connect", this._onconnect);
        this.on("close", this._onclose);
        this.on("error", this._onerror);
        this._client = new PromiseTcpClient_1.PromiseTcpClient({ address, port });
        this._client.onerror = this._onsuberror;
        this._server = new PromiseTcpServer_1.PromiseTcpServer(serverPort);
        this._server.onerror = this._onsuberror;
        this._server.ondata = this.ondata;
    }
    connectWait({ timeout } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.connectWait({ timeout });
                yield this._onconnect(); // TODO: Promise側にもっていきたい
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._client.request(message);
            }
            catch (e) {
                yield this._onerror(e);
                throw e;
            }
        });
    }
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.send(message);
            }
            catch (e) {
                yield this._onerror(e);
                throw e;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.close();
                yield this._onclose(); // TODO: Promise側にもっていきたい
            }
            catch (e) {
                // throw e
                console.log("Opniz Error:", e.message);
            }
        });
    }
    isConnected() {
        return this._client.isConnected();
    }
    setTimeout(timeout) {
        this._client.setTimeout(timeout);
    }
}
exports.TcpTransport = TcpTransport;
