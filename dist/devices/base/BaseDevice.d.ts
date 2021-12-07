import { BaseRpcHandler } from "./BaseRpcHandler";
import { RpcRequest } from "./transports/Transport";
import * as utils from "../../utils";
export declare abstract class BaseDevice extends BaseRpcHandler {
    requestRpc(rpcRequest: RpcRequest | RpcRequest[]): Promise<any[]>;
    sendRpc(rpcRequest: RpcRequest | RpcRequest[]): Promise<void>;
    exec(method: string, ...params: any): Promise<string | undefined>;
    execs(rpcs: any[][]): Promise<(string | undefined)[]>;
    createRpcRequest(method: string, ...params: any): RpcRequest;
    utils: typeof utils;
    sleep: (ms: number) => Promise<void>;
    wait: (ms: number) => Promise<void>;
}
