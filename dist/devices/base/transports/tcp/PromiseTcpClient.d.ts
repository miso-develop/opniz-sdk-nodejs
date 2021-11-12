/// <reference types="node" />
import { EventEmitter } from "events";
import net from "net";
import { TimeoutOptions } from "../lib/PromiseTimer";
export declare class PromiseTcpClient extends EventEmitter {
    socket: net.Socket;
    private _address;
    private _port;
    private _timer;
    onerror: ((error: Error) => void);
    constructor({ address, port }: {
        address: string;
        port: number;
    });
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string, { timeout }?: TimeoutOptions): Promise<string>;
    send(message: string, { timeout }?: {
        timeout?: number;
    }): Promise<void>;
    close({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
//# sourceMappingURL=PromiseTcpClient.d.ts.map