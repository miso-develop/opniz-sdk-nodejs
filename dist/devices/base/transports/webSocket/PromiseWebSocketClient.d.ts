/// <reference types="node" />
import { EventEmitter } from "events";
import { PromiseTimer } from "../lib/PromiseTimer";
export declare class PromiseWebSocketClient extends EventEmitter {
    private _socket;
    private _address;
    private _port;
    private _id;
    private _promiseTimer;
    onconnect: (() => void | Promise<void>);
    onclose: (() => void | Promise<void>);
    onerror: ((error: Error) => void | Promise<void>);
    onrequest: ((message: string) => string | Promise<string>);
    protected _onconnect: (() => Promise<void>);
    protected _onclose: (() => Promise<void>);
    protected _onerror: ((error: Error) => Promise<void>);
    protected _onrequest: ((message: string) => Promise<string>);
    constructor({ address, port, id }: {
        address: string;
        port: number;
        id?: string;
    });
    connect({ timeout }?: PromiseTimer.TimeoutOptions): Promise<boolean>;
    request(message: string, { timeout }?: PromiseTimer.TimeoutOptions): Promise<string>;
    send(message: string, { timeout }?: PromiseTimer.TimeoutOptions): Promise<void>;
    close({ timeout }?: PromiseTimer.TimeoutOptions): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
}
