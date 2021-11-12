import { PromiseWebSocketClient } from "./PromiseWebSocketClient";
import { Transport, RpcRequest } from "../Transport";
export { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../lib/TimeoutError";
export declare class WebSocketClientTransport extends PromiseWebSocketClient implements Transport {
    onconnect: (() => void | Promise<void>);
    onclose: (() => void | Promise<void>);
    onerror: ((error: Error) => void | Promise<void>);
    onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>);
    onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>);
    onrequest: ((message: string) => Promise<string>);
    private _onconnect;
    private _onclose;
    private _onerror;
    private _onrpcRequest;
    private _onrpcHandler;
    constructor({ address, port }: {
        address: string;
        port: number;
    });
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=WebSocketClientTransport.d.ts.map