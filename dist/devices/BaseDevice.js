"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDevice = void 0;
const TcpManager_1 = require("./lib/TcpManager");
class BaseDevice extends TcpManager_1.TcpManager {
    async requestJson(messageJson) {
        // dbg("[requestJson]")
        const message = JSON.stringify(Array.isArray(messageJson) ? messageJson : [messageJson]);
        return JSON.parse(await this.request(message));
    }
    async sendJson(messageJson) {
        // dbg("[sendJson]")
        const message = JSON.stringify(Array.isArray(messageJson) ? messageJson : [messageJson]);
        await this.send(message);
    }
    async exec(name, ...parameters) {
        // dbg("[exec]")
        return (await this.requestJson([{ name, parameters }]))[0];
    }
    createMessage(name, ...parameters) {
        // dbg("[createMessage]")
        return { name, parameters };
    }
    get name() {
        return this._name;
    }
}
exports.BaseDevice = BaseDevice;
//# sourceMappingURL=BaseDevice.js.map