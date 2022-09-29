import { BaseRpcHandler } from "./BaseRpcHandler";
import { RpcRequest } from "./transports/Transport";
import * as utils from "../../utils";
export declare type RpcTuple = [method: string, ...params: any];
export declare const isRpcTuple: (arg: any) => arg is [method: string, ...params: any[]];
declare global {
    interface Function {
        rpc: (...params: any[]) => [string, ...any];
    }
}
export declare abstract class BaseDevice extends BaseRpcHandler {
    requestRpc(rpcRequest: RpcRequest | RpcRequest[]): Promise<any[]>;
    sendRpc(rpcRequest: RpcRequest | RpcRequest[]): Promise<void>;
    exec(rpcTuple: RpcTuple): Promise<string | undefined>;
    exec(...rpcTuple: RpcTuple): Promise<string | undefined>;
    execs(rpcs: RpcTuple[]): Promise<(string | undefined)[]>;
    createRpcRequest(rpcTuple: RpcTuple): RpcRequest;
    createRpcRequest(...rpcTuple: RpcTuple): RpcRequest;
    utils: typeof utils;
    sleep: (ms: number) => Promise<void>;
    wait: (ms: number) => Promise<void>;
}
