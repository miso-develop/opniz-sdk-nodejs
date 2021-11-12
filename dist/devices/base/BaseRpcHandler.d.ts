import { BaseTransport, RpcRequest, Protocol } from "./BaseTransport";
import { RpcHandlerExtension } from "./RpcHandlerExtension";
export { RpcRequest, Protocol } from "./BaseTransport";
export declare class BaseRpcHandler extends BaseTransport {
    rpcHandler: RpcHandlerExtension;
    protected _onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>);
    protected _onnotmatch: ((rpcRequest: RpcRequest) => Promise<void>);
    protected _onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>);
    constructor({ address, port, serverPort, protocol }: {
        address?: string;
        port: number;
        serverPort?: number;
        protocol?: Protocol;
    });
}
//# sourceMappingURL=BaseRpcHandler.d.ts.map