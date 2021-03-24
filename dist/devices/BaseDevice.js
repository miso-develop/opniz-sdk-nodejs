"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDevice = void 0;
const TcpManager_1 = require("./lib/TcpManager");
const utils = __importStar(require("../utils"));
class BaseDevice extends TcpManager_1.TcpManager {
    constructor() {
        super(...arguments);
        // utils
        this.utils = utils;
        this.sleep = utils.sleep;
        this.wait = utils.wait;
    }
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