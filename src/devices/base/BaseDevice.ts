import { BaseRpcHandler } from "./BaseRpcHandler"
import { RpcRequest } from "./transports/Transport"
import * as utils from "../../utils"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:

export type RpcTuple = [method: string, ...params: any]
export const isRpcTuple = (arg: any): arg is RpcTuple => typeof arg !== "string" && typeof arg[0] === "string"

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
	
	public async exec(rpcTuple: RpcTuple): Promise<string | undefined>
	public async exec(...rpcTuple: RpcTuple): Promise<string | undefined>
	public async exec(arg1: string | RpcTuple, ...arg2: any): Promise<string | undefined> {
		// dbg("[exec]")
		let rpcRequest: RpcRequest | undefined
		if (isRpcTuple(arg1)) rpcRequest = this.createRpcRequest(arg1)
		if (typeof arg1 === "string") rpcRequest = this.createRpcRequest(arg1, ...arg2)
		if (!rpcRequest) return
		
		const rpcResponse = (await this.requestRpc(rpcRequest))[0]
		return rpcResponse !== "notmatch" ? rpcResponse : undefined
	}
	
	public async execs(rpcs: RpcTuple[]): Promise<(string | undefined)[]> {
		// dbg("[execs]")
		const rpcRequests: RpcRequest[] = rpcs.map((rpc: RpcTuple): RpcRequest => this.createRpcRequest(rpc))
		const rpcResponses = (await this.requestRpc(rpcRequests)).map(rpcResponse => rpcResponse !== "notmatch" ? rpcResponse : undefined)
		return rpcResponses
	}
	
	public createRpcRequest(rpcTuple: RpcTuple): RpcRequest
	public createRpcRequest(...rpcTuple: RpcTuple): RpcRequest
	public createRpcRequest(arg1: string | RpcTuple, ...arg2: any): RpcRequest | undefined {
		// dbg("[createRpc]")
		if (isRpcTuple(arg1)) return { method: arg1.shift(), params: arg1 }
		if (typeof arg1 === "string") return { method: arg1, params: arg2 }
	}
	
	// utils
	public utils = utils
	public sleep = utils.sleep
	public wait = utils.wait
}
