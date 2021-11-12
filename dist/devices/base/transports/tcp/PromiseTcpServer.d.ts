/// <reference types="node" />
import { EventEmitter } from "events";
import net from "net";
export declare class PromiseTcpServer extends EventEmitter {
    server: net.Server;
    socket: net.Socket;
    port: number;
    private _timer;
    onerror: ((error: Error) => void);
    ondata: ((data: Buffer) => Promise<string>);
    constructor(port: number);
    listen({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    close({ timeout }?: {
        timeout?: number;
    }): Promise<void>;
    isListening(): boolean;
}
//# sourceMappingURL=PromiseTcpServer.d.ts.map