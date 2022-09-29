import { PromiseWebSocketClient } from "./PromiseWebSocketClient";
import { Transport, RpcRequest } from "../Transport";
export declare class WebSocketClientTransport extends PromiseWebSocketClient implements Transport {
    onrequest: ((message: string) => string | Promise<string>);
    onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>);
    onrpcHandler: ((rpcRequests: RpcRequest[]) => string | Promise<string>);
    private _onrpcRequest;
    private _onrpcHandler;
    constructor({ address, port, id }: {
        address: string;
        port: number;
        id?: string;
    });
    connectWait({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
}
