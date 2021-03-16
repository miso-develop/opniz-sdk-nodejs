/// <reference types="node" />
import { EventEmitter } from "events";
import net from "net";
import { TimeoutOptions, TimeoutError } from "./PromiseTimer";
export declare class ConnectionTimeoutError extends TimeoutError {
    constructor(message?: string);
}
export declare class RequestTimeoutError extends TimeoutError {
    constructor(message?: string);
}
export declare class NotConnectedError extends Error {
    constructor(message?: string);
}
export declare class TcpClient extends EventEmitter {
    socket: net.Socket;
    private _address;
    private _port;
    private _timer;
    onclose: (() => void);
    onerror: ((error: Error) => void);
    private _onclose;
    private _onerror;
    constructor({ address, port }: {
        address: string;
        port: number;
    });
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    request(message: string, { error, timeout, }?: TimeoutOptions): Promise<string>;
    send(message: string, { error, timeout, }?: TimeoutOptions): Promise<void>;
    close({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
