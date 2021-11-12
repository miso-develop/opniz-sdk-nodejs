/// <reference types="node" />
import { EventEmitter } from "events";
export declare class PromiseWebSocketClient extends EventEmitter {
    private _socket;
    private _address;
    private _port;
    private _timer;
    onrequest: ((message: string) => Promise<string>);
    private _onrequest;
    constructor({ address, port }: {
        address: string;
        port: number;
    });
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
//# sourceMappingURL=PromiseWebSocketClient.d.ts.map