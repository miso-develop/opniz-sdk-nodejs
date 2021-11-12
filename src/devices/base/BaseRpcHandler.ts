import { BaseTransport, RpcRequest, Protocol } from "./BaseTransport"
import { RpcHandlerExtension } from "./RpcHandlerExtension"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseRpcHandler]", ...v)) // DEBUG:

export { RpcRequest, Protocol } from "./BaseTransport"

export class BaseRpcHandler extends BaseTransport {
	public rpcHandler: RpcHandlerExtension = new RpcHandlerExtension()
	
	protected _onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>) = async (rpcRequests: RpcRequest[]): Promise<void> => { await this.onrpcRequest(rpcRequests) }
	protected _onnotmatch: ((rpcRequest: RpcRequest) => Promise<void>) = async (rpcRequest: RpcRequest): Promise<void> => { await this.onnotmatch(rpcRequest) }
	
	protected _onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>) = async (rpcRequests: RpcRequest[]): Promise<string> => {
		await this._onrpcRequest(rpcRequests)
		const rpcResponses = await this.rpcHandler.execs(rpcRequests, this._onnotmatch)
		return JSON.stringify(rpcResponses)
	}
	
	constructor({ address, port, serverPort, protocol }: { address?: string; port: number; serverPort?: number; protocol?: Protocol}) {
		super({ address, port, serverPort, protocol })
		
		this.on("rpcRequest", this._onrpcRequest)
		this.on("notmatch", this._onnotmatch)
		
		this._transport.onrpcRequest = this._onrpcRequest
		this._transport.onrpcHandler = this._onrpcHandler
	}
	
}
