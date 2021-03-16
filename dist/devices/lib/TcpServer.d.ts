/// <reference types="node" />
import { EventEmitter } from "events";
import net from "net";
import { TimeoutError } from "./PromiseTimer";
export declare class ListenTimeoutError extends TimeoutError {
    constructor(message?: string);
}
export interface MessageHandler {
    name: string;
    listener: (...parameters: any[]) => void;
}
export interface Message {
    name: string;
    parameters: any[];
}
export declare class TcpServer extends EventEmitter {
    port: number;
    server: net.Server;
    messageHandlers: MessageHandler[];
    private _timer;
    onclose: (() => void);
    onerror: ((error: Error) => void);
    onnotmatch: ((message: Message) => void);
    private _onclose;
    private _onerror;
    private _ondata;
    private _handleMessage;
    constructor(port: number);
    listen({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    onMessageHandlers(): void;
    close({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    isListening(): boolean;
}
