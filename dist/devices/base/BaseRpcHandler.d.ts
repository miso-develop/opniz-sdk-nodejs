import { BaseTransport } from "./BaseTransport";
import { RpcRequest, ConstructorParameter } from "./transports/Transport";
import { RpcHandlerExtension } from "./RpcHandlerExtension";
export declare abstract class BaseRpcHandler extends BaseTransport {
    rpcHandler: RpcHandlerExtension;
    protected _onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>);
    protected _onnotmatch: ((rpcRequest: RpcRequest) => Promise<void>);
    protected _onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>);
    constructor({ address, port, id, serverPort, protocol }: ConstructorParameter);
    protected init(): void;
}
