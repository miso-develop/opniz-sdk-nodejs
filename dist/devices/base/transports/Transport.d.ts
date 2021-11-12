export interface Transport {
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
}
export interface RpcRequest {
    method: string;
    params: any[];
}
export declare const Protocol: {
    WebSocketServer: string;
    WebSocketClient: string;
    TCP: string;
};
export declare type Protocol = typeof Protocol[keyof typeof Protocol];
//# sourceMappingURL=Transport.d.ts.map