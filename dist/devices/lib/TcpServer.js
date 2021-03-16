"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpServer = exports.ListenTimeoutError = void 0;
const events_1 = require("events");
const net_1 = __importDefault(require("net"));
const PromiseTimer_1 = require("./PromiseTimer");
const utils_1 = require("../../utils"); // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgCyan(getDateStr(), "[TcpServer]", ...v)) // DEBUG:
class ListenTimeoutError extends PromiseTimer_1.TimeoutError {
    constructor(message = "Listen timeout.") {
        super(message);
    }
}
exports.ListenTimeoutError = ListenTimeoutError;
const defaultTimeout = 5000;
class TcpServer extends events_1.EventEmitter {
    constructor(port) {
        super();
        this.messageHandlers = [];
        this.onclose = () => { };
        this.onerror = (error) => { };
        this.onnotmatch = (message) => { };
        this._onclose = async () => await this.onclose();
        this._onerror = async (error) => {
            await this.onerror(error);
            await this.close();
        };
        this._ondata = data => {
            // MEMO: デバイスからのイベントを瞬間的に同時に受け取ることがあり、その場合`{...}{...}`のようなメッセージとなりJSON.parseでエラーとなる。
            // MEMO: それを回避するため必ずオブジェクト末尾に`,`を付与し`{...},`の形でデバイスからメッセージを送り、ここで`[]`で括り配列にする。
            // MEMO: 配列内の末尾が`,`で終わるとJSON.parseでエラーとなるため空オブジェクト`{}`を挿入し、JSON.parse後に削除している。
            const messages = JSON.parse(`[${data.toString()}{}]`).filter(value => value.name);
            for (const message of messages)
                this._handleMessage(message);
        };
        this.port = port;
        this._timer = new PromiseTimer_1.PromiseTimer();
        this._timer.timeout = defaultTimeout;
    }
    _handleMessage(message) {
        for (const messageHandler of this.messageHandlers) {
            if (messageHandler.name !== message.name)
                continue;
            // MEMO: emitせずにここで直接listener実行でいいのでは？ →emitなら同名で複数登録したMessageHandlerがすべて実装される
            this.emit(message.name, message.parameters);
            return;
        }
        this.onnotmatch(message);
    }
    listen({ timeout = this._timer.timeout } = {}) {
        return this._timer.timer(new Promise(async (res, rej) => {
            // dbg("listen")
            this.onMessageHandlers();
            if (this.isListening()) {
                res();
                for (;;)
                    await utils_1.sleep(100); // MEMO: これがないと`res()`されない…
            }
            this.server = net_1.default.createServer(socket => {
                // socket events
                socket.on("data", data => {
                    this._ondata(data);
                    socket.write("\0"); // MEMO: とりあえずの実装としてハンドラーごとにresponseは返さず、一律nullを返す
                });
                socket.on("close", this._onclose);
                socket.on("error", this._onerror);
            });
            // server events
            this.server.on("close", this._onclose);
            this.server.on("error", this._onerror);
            this.server.once("error", error => rej(error));
            this.server.once("listening", () => res());
            this.server.listen(this.port);
        }), { error: new ListenTimeoutError(), timeout });
    }
    onMessageHandlers() {
        // dbg("onMessageHandlers")
        this.removeAllListeners();
        this.messageHandlers.forEach(messageHandler => this.on(messageHandler.name, messageHandler.listener));
    }
    close({ timeout = this._timer.timeout } = {}) {
        // dbg("close")
        return this._timer.timer(new Promise((res, rej) => {
            var _a;
            if (!((_a = this.server) === null || _a === void 0 ? void 0 : _a.listening))
                res();
            this.server.once("close", () => res());
            this.server.close();
        }), { error: new PromiseTimer_1.TimeoutError(), timeout });
    }
    isListening() {
        var _a;
        return !!((_a = this.server) === null || _a === void 0 ? void 0 : _a.listening);
    }
}
exports.TcpServer = TcpServer;
//# sourceMappingURL=TcpServer.js.map