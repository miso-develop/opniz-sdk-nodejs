export type Transport = {
    onconnect: () => void;
    onclose: () => void;
    onerror: (error: Error) => void;
    onrpcRequest: (rpcRequests: RpcRequest[]) => void;
    onrpcHandler?: (rpcRequests: RpcRequest[]) => void;
    connectWait({ timeout }: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
};
export type RpcRequest = {
    method: string;
    params: any[];
};
export declare const Protocol: {
    WebSocketServer: string;
    WebSocketClient: string;
    TCP: string;
};
export type Protocol = typeof Protocol[keyof typeof Protocol];
export type WebSocketServerConstructorParameter = {
    port: number;
    id?: string;
    protocol?: "WebSocketServer";
};
export type WebSocketClientConstructorParameter = {
    address: string;
    port: number;
    id?: string;
    protocol: "WebSocketClient";
};
export type TCPConstructorParameter = {
    address: string;
    port: number;
    serverPort?: number;
    protocol: "TCP";
};
export type ConstructorParameter = WebSocketServerConstructorParameter | WebSocketClientConstructorParameter | TCPConstructorParameter;
