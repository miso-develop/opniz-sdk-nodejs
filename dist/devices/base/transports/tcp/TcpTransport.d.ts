/// <reference types="node" />
import { EventEmitter } from "events";
import { Transport, RpcRequest } from "../Transport";
export declare class TcpTransport extends EventEmitter implements Transport {
    private _client;
    private _server;
    onconnect: (() => void | Promise<void>);
    onclose: (() => void | Promise<void>);
    onerror: ((error: Error) => void | Promise<void>);
    onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>);
    onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>);
    ondata: ((data: Buffer) => Promise<string>);
    private _onconnect;
    private _onclose;
    private _onerror;
    private _onsuberror;
    private _onrpcRequest;
    private _onrpcHandler;
    constructor({ address, port, serverPort }: {
        address: string;
        port: number;
        serverPort?: number;
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
//# sourceMappingURL=TcpTransport.d.ts.map