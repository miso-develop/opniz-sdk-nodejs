import { PromiseWebSocketServer } from "./PromiseWebSocketServer"
import { Transport, RpcRequest } from "../Transport"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[WebSocketServerTransport]", ...v)) // DEBUG:

export class WebSocketServerTransport extends PromiseWebSocketServer implements Transport {
	
	public onconnect: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onclose: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onerror: ((error: Error) => void | Promise<void>) = (error: Error): void | Promise<void> => {}
	
	public onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>) = (rpcRequests: RpcRequest[]): void | Promise<void> => {}
	public onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>) = async (rpcRequests: RpcRequest[]): Promise<string> => {
		await this._onrpcRequest(rpcRequests)
		return JSON.stringify(rpcRequests)
	}
	
	public onrequest: ((message: string) => Promise<string>) = async (message: string): Promise<string> => { return this._onrpcHandler(message) }
	
	private _onconnect: (() => Promise<void>) = async (): Promise<void> => { await this.onconnect() }
	private _onclose: (() => Promise<void>) = async (): Promise<void> => { await this.onclose() }
	private _onerror: ((error: Error) => Promise<void>) = async (error: Error): Promise<void> => {
		await this.onerror(error)
		await this.close()
	}
	
	private _onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>) = async (rpcRequests: RpcRequest[]): Promise<void> => { await this.onrpcRequest(rpcRequests) }
	private _onrpcHandler: ((message: string) => Promise<string>) = async (message: string): Promise<string> => {
		const rpcRequests: RpcRequest[] = JSON.parse(message)
		return await this.onrpcHandler(rpcRequests)
	}
	
	constructor({ port }: { port: number }) {
		super({ port })
		this.on("connect", this._onconnect)
		this.on("close", this._onclose)
		this.on("error", this._onerror)
	}
	
	public async connect({ timeout }: { timeout?: number } = {}): Promise<boolean> {
		try {
			await super.connect({ timeout })
			await this._onconnect()
			return this.isConnected()
		} catch (e) {
			await this._onerror(e)
			// throw e
			console.log("Opniz Error:", e.message)
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
			await this._onclose()
		} catch (e) {
			// throw e
			console.log("Opniz Error:", e.message)
		}
	}
}
