/// <reference types="node" />
import { EventEmitter } from "events";
import net from "net";
import { PromiseTimer } from "../lib/PromiseTimer";
export declare class PromiseTcpClient extends EventEmitter {
    socket: net.Socket;
    private _address;
    private _port;
    private _promiseTimer;
    onerror: ((error: Error) => void);
    constructor({ address, port }: {
        address: string;
        port: number;
    });
    connect({ timeout }?: PromiseTimer.TimeoutOptions): Promise<boolean>;
    request(message: string, { timeout }?: PromiseTimer.TimeoutOptions): Promise<string>;
    send(message: string, { timeout }?: PromiseTimer.TimeoutOptions): Promise<void>;
    close({ timeout }?: PromiseTimer.TimeoutOptions): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
