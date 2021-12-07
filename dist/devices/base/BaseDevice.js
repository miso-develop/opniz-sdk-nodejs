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
exports.BaseDevice = void 0;
const BaseRpcHandler_1 = require("./BaseRpcHandler");
const utils = __importStar(require("../../utils"));
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:
class BaseDevice extends BaseRpcHandler_1.BaseRpcHandler {
    constructor() {
        super(...arguments);
        // utils
        this.utils = utils;
        this.sleep = utils.sleep;
        this.wait = utils.wait;
    }
    requestRpc(rpcRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[requestRpc]")
            const rpcRequestString = JSON.stringify(Array.isArray(rpcRequest) ? rpcRequest : [rpcRequest]);
            return JSON.parse(yield this.request(rpcRequestString));
        });
    }
    sendRpc(rpcRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[sendRpc]")
            const rpcRequestString = JSON.stringify(Array.isArray(rpcRequest) ? rpcRequest : [rpcRequest]);
            yield this.send(rpcRequestString);
        });
    }
    exec(method, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[exec]")
            const rpcRequest = this.createRpcRequest(method, ...params);
            const rpcResponse = (yield this.requestRpc(rpcRequest))[0];
            return rpcResponse !== "notmatch" ? rpcResponse : undefined;
        });
    }
    execs(rpcs) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[execs]")
            const rpcRequests = rpcs.map((rpc) => this.createRpcRequest(rpc.shift(), ...rpc));
            const rpcResponses = (yield this.requestRpc(rpcRequests)).map(rpcResponse => rpcResponse !== "notmatch" ? rpcResponse : undefined);
            return rpcResponses;
        });
    }
    createRpcRequest(method, ...params) {
        // dbg("[createRpc]")
        return { method, params };
    }
}
exports.BaseDevice = BaseDevice;
