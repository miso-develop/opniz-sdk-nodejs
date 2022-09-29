/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "events";
import net from "net";
export declare class PromiseTcpServer extends EventEmitter {
    server: net.Server;
    socket: net.Socket;
    port: number;
    onerror: ((error: Error) => void);
    ondata: ((data: Buffer) => string | Promise<string>);
    constructor(port: number);
    private _listen;
}
