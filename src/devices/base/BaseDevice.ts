import { BaseRpcHandler } from "./BaseRpcHandler"
import { RpcRequest } from "./transports/Transport"
import * as utils from "../../utils"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:

declare global {
	interface Function {
		rpc: (...params: any[]) => [string, ...any]
	}
}

// MEMO: RPCメソッドからRPC文字列を取得する関数をFunctionから生やす
Function.prototype.rpc = function(...params: any) {
	const method = this.toString().match(/\.exec\("(.*)"/)![1] // eslint-disable-line @typescript-eslint/no-non-null-assertion
	return [method, ...params]
}

export abstract class BaseDevice extends BaseRpcHandler {
	
	public async requestRpc(rpcRequest: RpcRequest |RpcRequest[]): Promise<any[]> {
		// dbg("[requestRpc]")
		const rpcRequestString = JSON.stringify(Array.isArray(rpcRequest) ? rpcRequest : [rpcRequest])
		return JSON.parse(await this.request(rpcRequestString))
	}
	
	public async sendRpc(rpcRequest: RpcRequest |RpcRequest[]): Promise<void> {
		// dbg("[sendRpc]")
		const rpcRequestString = JSON.stringify(Array.isArray(rpcRequest) ? rpcRequest : [rpcRequest])
		await this.send(rpcRequestString)
	}
	
	public async exec(method: string, ...params: any): Promise<string | undefined> {
		// dbg("[exec]")
		const rpcRequest: RpcRequest = this.createRpcRequest(method, ...params)
		const rpcResponse = (await this.requestRpc(rpcRequest))[0]
		return rpcResponse !== "notmatch" ? rpcResponse : undefined
	}
	
	public async execs(rpcs: any[][]): Promise<(string | undefined)[]> {
		// dbg("[execs]")
		const rpcRequests: RpcRequest[] = rpcs.map((rpc: any[]): RpcRequest => this.createRpcRequest(rpc.shift(), ...rpc))
		const rpcResponses = (await this.requestRpc(rpcRequests)).map(rpcResponse => rpcResponse !== "notmatch" ? rpcResponse : undefined)
		return rpcResponses
	}
	
	public createRpcRequest(method: string, ...params: any): RpcRequest {
		// dbg("[createRpc]")
		return { method, params }
	}
	
	// utils
	public utils = utils
	public sleep = utils.sleep
	public wait = utils.wait
}
