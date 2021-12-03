import { RpcRequest } from "./transports/Transport"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[RpcHandlerExtension]", ...v)) // DEBUG:

export interface RpcHandler {
	name: string
	procedure: (...params: any[]) => string | Promise<string>
}

export class RpcHandlerExtension {
	// TODO: privateにしたいけどtestがめんどくなる →あとで考える
	public handlers: { [key: string]: RpcHandler } = {}
	
	public add(...handlers: RpcHandler[]): void {
		handlers.forEach(handler => {
			// MEMO: 同名ハンドラ登録時はエラー
			if (this.exists(handler)) throw new Error(`A handler with the same name has already been registered: ${handler.name}`)
			this.handlers[handler.name] = handler
		})
	}
	
	public remove(...handlers: RpcHandler[]): void {
		handlers.forEach(handler => delete this.handlers[handler.name])
	}
	
	public exists(rpcHandler: RpcHandler): boolean {
		return !!this.handlers[rpcHandler?.name]
	}
	
	public async execs(rpcRequests: RpcRequest[], onnotmatch: (rpcRequest: RpcRequest) => Promise<void>): Promise<string[]> {
		const rpcResponses: string[] = []
		for (const rpcRequest of rpcRequests) {
			const rpcResponse = await this.exec(rpcRequest)
			if (rpcResponse === "notmatch") await onnotmatch(rpcRequest)
			rpcResponses.push(rpcResponse)
		}
		return rpcResponses
	}
	
	public async exec(rpcRequest: RpcRequest): Promise<string> {
		return this.exists(this.handlers[rpcRequest.method]) ?
			await this.handlers[rpcRequest.method].procedure(rpcRequest.params) :
			"notmatch"
	}
	
	public print(): string[] {
		return Object.keys(this.handlers)
	}
}
