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
exports.BaseRpcHandler = void 0;
const BaseTransport_1 = require("./BaseTransport");
const RpcHandlerExtension_1 = require("./RpcHandlerExtension");
class BaseRpcHandler extends BaseTransport_1.BaseTransport {
    // @ts-ignore TODO:
    constructor({ address, port, id, serverPort, protocol }) {
        super({ address, port, id, serverPort, protocol });
        this.rpcHandler = new RpcHandlerExtension_1.RpcHandlerExtension();
        this._onrpcRequest = (rpcRequests) => __awaiter(this, void 0, void 0, function* () { yield this.onrpcRequest(rpcRequests); });
        this._onnotmatch = (rpcRequest) => __awaiter(this, void 0, void 0, function* () { yield this.onnotmatch(rpcRequest); });
        this._onrpcHandler = (rpcRequests) => __awaiter(this, void 0, void 0, function* () {
            yield this._onrpcRequest(rpcRequests);
            const rpcResponses = yield this.rpcHandler.execs(rpcRequests, this._onnotmatch);
            return JSON.stringify(rpcResponses);
        });
        this.on("rpcRequest", this._onrpcRequest);
        this.on("notmatch", this._onnotmatch);
        this._transport.onrpcRequest = this._onrpcRequest;
        this._transport.onrpcHandler = this._onrpcHandler;
    }
    _overrideOnmethods(obj) {
        Object.keys(obj)
            .filter(prop => prop.match(/^on.*/) && typeof obj[prop] === "function")
            .forEach(onmethod => obj[onmethod] = (...params) => this[onmethod](...params));
        // .forEach(onmethod => log(onmethod)) // DEBUG:
    }
}
exports.BaseRpcHandler = BaseRpcHandler;
