import { PromiseWebSocketServer } from "./PromiseWebSocketServer";
import { Transport, RpcRequest } from "../Transport";
export declare class WebSocketServerTransport extends PromiseWebSocketServer implements Transport {
    onrequest: ((message: string) => string | Promise<string>);
    onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>);
    onrpcHandler: ((rpcRequests: RpcRequest[]) => string | Promise<string>);
    private _onrpcRequest;
    private _onrpcHandler;
    constructor({ port }: {
        port: number;
    });
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
}
