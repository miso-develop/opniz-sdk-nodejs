/// <reference types="node" />
import { EventEmitter } from "events";
import { MessageHandler, Message } from "./TcpServer";
export { MessageHandler, Message } from "./TcpServer";
export declare class TcpManager extends EventEmitter {
    private _client;
    private _server;
    onclose: (() => void);
    onerror: ((error: Error) => void);
    onnotmatch: ((message: Message) => void);
    private _onclose;
    private _onerror;
    constructor({ address, port, serverPort }: {
        address: string;
        port: number;
        serverPort?: number;
    });
    protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void;
    addCustomMessageHandlers(...messageHandlers: MessageHandler[]): void;
    removeCustomMessageHandlers(...messageHandlers: MessageHandler[]): void;
    getMessageHandlers(): string[];
    connect({ timeout }?: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    private _isDisconnected;
    setTimeout(timeout: number): void;
}
