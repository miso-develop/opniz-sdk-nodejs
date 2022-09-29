export declare type Transport = {
    onconnect: () => void;
    onclose: () => void;
    onerror: (error: Error) => void;
    onrpcRequest: (rpcRequests: RpcRequest[]) => void;
    onrpcHandler?: (rpcRequests: RpcRequest[]) => void;
    connect({ timeout }: {
        timeout?: number;
    }): Promise<boolean>;
    request(message: string): Promise<string>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    setTimeout(timeout: number): void;
};
export declare type RpcRequest = {
    method: string;
    params: any[];
};
export declare const Protocol: {
    WebSocketServer: string;
    WebSocketClient: string;
    TCP: string;
};
export declare type Protocol = typeof Protocol[keyof typeof Protocol];
export declare type WebSocketServerConstructorParameter = {
    port: number;
    id?: string;
    protocol?: "WebSocketServer";
};
export declare type WebSocketClientConstructorParameter = {
    address: string;
    port: number;
    id?: string;
    protocol: "WebSocketClient";
};
export declare type TCPConstructorParameter = {
    address: string;
    port: number;
    serverPort?: number;
    protocol: "TCP";
};
export declare type ConstructorParameter = WebSocketServerConstructorParameter | WebSocketClientConstructorParameter | TCPConstructorParameter;
