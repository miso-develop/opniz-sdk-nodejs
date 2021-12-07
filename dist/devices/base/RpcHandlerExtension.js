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
exports.RpcHandlerExtension = void 0;
class RpcHandlerExtension {
    constructor() {
        // TODO: privateにしたいけどtestがめんどくなる →あとで考える
        this.handlers = {};
    }
    add(...handlers) {
        handlers.forEach(handler => {
            // MEMO: 同名ハンドラ登録時はエラー
            if (this.exists(handler))
                throw new Error(`A handler with the same name has already been registered: ${handler.name}`);
            this.handlers[handler.name] = handler;
        });
    }
    remove(...handlers) {
        handlers.forEach(handler => delete this.handlers[handler.name]);
    }
    exists(rpcHandler) {
        return !!this.handlers[rpcHandler === null || rpcHandler === void 0 ? void 0 : rpcHandler.name];
    }
    execs(rpcRequests, onnotmatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcResponses = [];
            for (const rpcRequest of rpcRequests) {
                const rpcResponse = yield this.exec(rpcRequest);
                if (rpcResponse === "notmatch")
                    yield onnotmatch(rpcRequest);
                rpcResponses.push(rpcResponse);
            }
            return rpcResponses;
        });
    }
    exec(rpcRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exists(this.handlers[rpcRequest.method]) ?
                yield this.handlers[rpcRequest.method].procedure(rpcRequest.params) :
                "notmatch";
        });
    }
    print() {
        return Object.keys(this.handlers);
    }
}
exports.RpcHandlerExtension = RpcHandlerExtension;
