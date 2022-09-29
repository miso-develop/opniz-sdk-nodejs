import { PromiseWebSocketServer } from "./PromiseWebSocketServer"
import { Transport, RpcRequest } from "../Transport"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[WebSocketServerTransport]", ...v)) // DEBUG:

export class WebSocketServerTransport extends PromiseWebSocketServer implements Transport {
	
	public onrequest: ((message: string) => string | Promise<string>) = async (message: string): Promise<string> => { return this._onrpcHandler(message) }
	
	public onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>) = (rpcRequests: RpcRequest[]): void | Promise<void> => {}
	public onrpcHandler: ((rpcRequests: RpcRequest[]) => string | Promise<string>) = async (rpcRequests: RpcRequest[]): Promise<string> => {
		await this._onrpcRequest(rpcRequests)
		return JSON.stringify(rpcRequests)
	}
	
	private _onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>) = async (rpcRequests: RpcRequest[]): Promise<void> => { await this.onrpcRequest(rpcRequests) }
	private _onrpcHandler: ((message: string) => Promise<string>) = async (message: string): Promise<string> => {
		const rpcRequests: RpcRequest[] = JSON.parse(message)
		return await this.onrpcHandler(rpcRequests)
	}
	
	constructor({ port }: { port: number }) {
		super({ port })
	}
	
	public async connectWait({ timeout }: { timeout?: number } = {}): Promise<boolean> {
		try {
			return await super.connectWait({ timeout })
		} catch (e) {
			await this._onerror(e)
			// throw e
			console.log("Opniz Error:", e.message)
			await sleep(500)
			return false
		}
	}
	
	public async request(message: string): Promise<string> {
		try {
			return await super.request(message)
		} catch (e) {
			await this._onerror(e)
			throw e
		}
	}
	
	public async send(message: string): Promise<void> {
		try {
			await super.send(message)
		} catch (e) {
			await this._onerror(e)
			throw e
		}
	}
	
	public async close(): Promise<void> {
		try {
			await super.close()
		} catch (e) {
			// throw e
			console.log("Opniz Error:", e.message)
		}
	}
}
