/// <reference types="node" />
import { EventEmitter } from "events";
export declare class PromiseWebSocketServer extends EventEmitter {
    private _server;
    private _socket;
    private _port;
    private _timer;
    onrequest: ((message: string) => Promise<string>);
    private _onrequest;
    constructor({ port }: {
        port: number;
    });
    private _listen;
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string, { timeout }?: {
        timeout?: number;
    }): Promise<string>;
    send(message: string, { timeout }?: {
        timeout?: number;
    }): Promise<void>;
    close({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
//# sourceMappingURL=PromiseWebSocketServer.d.ts.map