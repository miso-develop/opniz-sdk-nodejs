"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcpManager = void 0;
const events_1 = require("events");
const TcpClient_1 = require("./TcpClient");
const TcpServer_1 = require("./TcpServer");
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:
const connectionTimeout = 20000;
class TcpManager extends events_1.EventEmitter {
    constructor({ address, port, serverPort }) {
        super();
        this.onclose = () => { };
        this.onerror = (error) => { };
        this.onnotmatch = (message) => { };
        this._onclose = async () => await this.onclose();
        this._onerror = async (error) => {
            // dbg("[_onerror]")
            await this.onerror(error);
            await this.close();
        };
        this._client = new TcpClient_1.TcpClient({ address, port });
        this._server = new TcpServer_1.TcpServer(serverPort || port);
        this._server.onnotmatch = (message) => this.onnotmatch(message);
        this.on("close", this._onclose);
        this.on("error", this._onerror);
    }
    // 継承デバイスにてこのメソッド内でmessageHandlersに独自メッセージイベントを追加していく
    addDeviceMessageHandlers(messageHandlers) { }
    addCustomMessageHandlers(...messageHandlers) {
        this._server.messageHandlers.push(...messageHandlers);
        this._server.onMessageHandlers();
    }
    removeCustomMessageHandlers(...messageHandlers) {
        this._server.messageHandlers = this._server.messageHandlers.filter(messageHandler => !messageHandlers.some(_messageHandler => JSON.stringify(_messageHandler) === JSON.stringify(messageHandler)));
        this._server.onMessageHandlers();
    }
    getMessageHandlers() {
        return this._server.messageHandlers.map(messageHandler => messageHandler.name);
    }
    async connect({ timeout = connectionTimeout } = {}) {
        // dbg("[connect]")
        if (this.isConnected() || !this._isDisconnected())
            return true;
        try {
            // Create TCP Client
            await this._client.connect({ timeout });
            // Create TCP Server
            await this._server.listen({ timeout });
            // Add message handlers
            this.addDeviceMessageHandlers(this._server.messageHandlers);
            this.addCustomMessageHandlers();
        }
        catch (e) {
            // dbg("[connect catch]", e.message)
            // console.log("Connect error: ", e.message) // TODO: 稼働率検証中一時的にCO
            await this.close();
        }
        return this.isConnected();
    }
    async request(message) {
        // dbg("[request]")
        try {
            return await this._client.request(message);
        }
        catch (e) {
            // dbg("[request catch]", e.message)
            await this.close();
            await this.emit("error", e);
            throw e;
        }
    }
    async send(message) {
        // dbg("[send]")
        try {
            await this._client.send(message);
        }
        catch (e) {
            // dbg("[send catch]", e.message)
            await this.close();
            await this.emit("error", e);
            throw e;
        }
    }
    async close() {
        // dbg("[close]")
        if (!this._server.isListening() && !this._client.isConnected())
            return;
        try {
            await Promise.all([
                this._client.close(),
                this._server.close(),
            ]);
        }
        catch (e) {
            // dbg("[close catch]", e.message)
            // MEMO: closeのtimeoutはスルー
        }
        this.emit("close");
    }
    isConnected() {
        return this._server.isListening() && this._client.isConnected();
    }
    // MEMO: TCP ServerとClientが同居しているため、どちらか一方が接続された状態の場合がある
    // MEMO: TCP ServerとClientどちらも完全に切断されたかをチェックして返す
    _isDisconnected() {
        return !this._server.isListening() && !this._client.isConnected();
    }
    setTimeout(timeout) {
        this._client.setTimeout(timeout);
    }
}
exports.TcpManager = TcpManager;
//# sourceMappingURL=TcpManager.js.map