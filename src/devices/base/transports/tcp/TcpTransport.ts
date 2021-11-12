import { EventEmitter } from "events"
import { PromiseTcpClient } from "./PromiseTcpClient"
import { PromiseTcpServer } from "./PromiseTcpServer"
import { Transport, RpcRequest } from "../Transport"

import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/TimeoutError"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[TcpTransport]", ...v)) // DEBUG:

export class TcpTransport extends EventEmitter implements Transport {
	private _client: PromiseTcpClient
	private _server: PromiseTcpServer
	
	public onconnect: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onclose: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onerror: ((error: Error) => void | Promise<void>) = (error: Error): void | Promise<void> => {}
	
	public onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>) = (rpcRequests: RpcRequest[]): void | Promise<void> => {}
	public onrpcHandler: ((rpcRequests: RpcRequest[]) => Promise<string>) = async (rpcRequests: RpcRequest[]): Promise<string> => {
		await this._onrpcRequest(rpcRequests)
		return JSON.stringify(rpcRequests)
	}
	
	public ondata: ((data: Buffer) => Promise<string>) = async (data: Buffer): Promise<string> => { return this._onrpcHandler(data) }
	
	private _onconnect: (() => Promise<void>) = async (): Promise<void> => { await this.onconnect() }
	private _onclose: (() => Promise<void>) = async (): Promise<void> => { await this.onclose() }
	private _onerror: ((error: Error) => Promise<void>) = async (error: Error): Promise<void> => {
		await this.onerror(error)
		await this.close()
	}
	
	// MEMO: サブクラスで発生するエラーを集約、必要に応じてここでハンドリング
	private _onsuberror: ((error: Error) => Promise<void>) = async (error: Error): Promise<void> => {}
	
	private _onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>) = async (rpcRequests: RpcRequest[]): Promise<void> => { await this.onrpcRequest(rpcRequests) }
	private _onrpcHandler: ((data: Buffer) => Promise<string>) = async (data: Buffer): Promise<string> => {
		// MEMO: デバイスからのイベントを瞬間的に同時に受け取ることがあり、その場合`{...}{...}`のようなメッセージとなりJSON.parseでエラーとなる。
		// MEMO: それを回避するため必ずオブジェクト末尾に`,`を付与し`{...},`の形でデバイスからメッセージを送り、ここで`[]`で括り配列にする。
		// MEMO: 配列内の末尾が`,`で終わるとJSON.parseでエラーとなるため空オブジェクト`{}`を挿入し、JSON.parse後に削除している。
		const dataStr = `[${data.toString().replace(/,$/, ",[]")}]`
		const rpcRequests: RpcRequest[] = JSON.parse(dataStr).flat()
		return await this.onrpcHandler(rpcRequests)
	}
	
	constructor({ address, port, serverPort = port }: { address: string; port: number; serverPort?: number}) {
		super()
		this.on("connect", this._onconnect)
		this.on("close", this._onclose)
		this.on("error", this._onerror)
		
		this._client = new PromiseTcpClient({ address, port })
		this._client.onerror = this._onsuberror
		
		this._server = new PromiseTcpServer(serverPort)
		this._server.onerror = this._onsuberror
		this._server.ondata = this.ondata
	}
	
	public async connect({ timeout }: { timeout?: number } = {}): Promise<boolean> {
		try {
			await this._server.listen()
			
			if (this.isConnected()) return true
			
			await this._client.connect({ timeout })
			await this._onconnect()
			return this.isConnected()
		} catch (e) {
			await this._onerror(e)
			// throw e
			console.log("Opniz Error:", e.message)
			await sleep(100)
			return false
		}
	}
	
	public async request(message: string): Promise<string> {
		try {
			return await this._client.request(message)
		} catch (e) {
			await this._onerror(e)
			throw e
		}
	}
	
	public async send(message: string): Promise<void> {
		try {
			await this._client.send(message)
		} catch (e) {
			await this._onerror(e)
			throw e
		}
	}
	
	public async close(): Promise<void> {
		try {
			await Promise.all([
				this._server.close(),
				this._client.close(),
			])
			
			await this._onclose()
		} catch (e) {
			// throw e
			console.log("Opniz Error:", e.message)
		}
	}
	
	public isConnected(): boolean {
		return this._client.isConnected()
	}
	
	public setTimeout(timeout: number): void {
		this._client.setTimeout(timeout)
	}
}
