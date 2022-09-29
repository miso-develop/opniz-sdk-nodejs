"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.BaseDevice = exports.isRpcTuple = void 0;
const BaseRpcHandler_1 = require("./BaseRpcHandler");
const utils = __importStar(require("../../utils"));
const isRpcTuple = (arg) => typeof arg !== "string" && typeof arg[0] === "string";
exports.isRpcTuple = isRpcTuple;
// MEMO: RPCメソッドからRPC文字列を取得する関数をFunctionから生やす
Function.prototype.rpc = function (...params) {
    const method = this.toString().match(/\.exec\("(.*)"/)[1]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    return [method, ...params];
};
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
    exec(arg1, ...arg2) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[exec]")
            let rpcRequest;
            if ((0, exports.isRpcTuple)(arg1))
                rpcRequest = this.createRpcRequest(arg1);
            if (typeof arg1 === "string")
                rpcRequest = this.createRpcRequest(arg1, ...arg2);
            if (!rpcRequest)
                return;
            const rpcResponse = (yield this.requestRpc(rpcRequest))[0];
            return rpcResponse !== "notmatch" ? rpcResponse : undefined;
        });
    }
    execs(rpcs) {
        return __awaiter(this, void 0, void 0, function* () {
            // dbg("[execs]")
            const rpcRequests = rpcs.map((rpc) => this.createRpcRequest(rpc));
            const rpcResponses = (yield this.requestRpc(rpcRequests)).map(rpcResponse => rpcResponse !== "notmatch" ? rpcResponse : undefined);
            return rpcResponses;
        });
    }
    createRpcRequest(arg1, ...arg2) {
        // dbg("[createRpc]")
        if ((0, exports.isRpcTuple)(arg1))
            return { method: arg1.shift(), params: arg1 };
        if (typeof arg1 === "string")
            return { method: arg1, params: arg2 };
    }
}
exports.BaseDevice = BaseDevice;
