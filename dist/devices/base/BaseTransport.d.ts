/// <reference types="node" />
import { EventEmitter } from "events";
import { Transport, RpcRequest, Protocol } from "./transports/Transport";
export { Transport, RpcRequest, Protocol } from "./transports/Transport";
export declare class BaseTransport extends EventEmitter implements Transport {
    protected _transport: Transport;
    onconnect: (() => void | Promise<void>);
    onclose: (() => void | Promise<void>);
    onerror: ((error: Error) => void | Promise<void>);
    onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>);
    onnotmatch: ((rpcRequest: RpcRequest) => void | Promise<void>);
    protected _onconnect: (() => Promise<void>);
    protected _onclose: (() => Promise<void>);
    protected _onerror: ((error: Error) => Promise<void>);
    constructor({ address, port, serverPort, protocol }: {
        address?: string;
        port: number;
        serverPort?: number;
        protocol?: Protocol;
    });
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
//# sourceMappingURL=BaseTransport.d.ts.map