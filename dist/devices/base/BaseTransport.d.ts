/// <reference types="node" />
import { EventEmitter } from "events";
import { Transport, RpcRequest, ConstructorParameter } from "./transports/Transport";
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
    constructor({ address, port, id, serverPort, protocol }: ConstructorParameter);
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
