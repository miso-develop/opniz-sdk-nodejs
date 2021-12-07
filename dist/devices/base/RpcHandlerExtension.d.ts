import { RpcRequest } from "./transports/Transport";
export interface RpcHandler {
    name: string;
    procedure: (...params: any[]) => string | Promise<string>;
}
export declare class RpcHandlerExtension {
    handlers: {
        [key: string]: RpcHandler;
    };
    add(...handlers: RpcHandler[]): void;
    remove(...handlers: RpcHandler[]): void;
    exists(rpcHandler: RpcHandler): boolean;
    execs(rpcRequests: RpcRequest[], onnotmatch: (rpcRequest: RpcRequest) => Promise<void>): Promise<string[]>;
    exec(rpcRequest: RpcRequest): Promise<string>;
    print(): string[];
}
