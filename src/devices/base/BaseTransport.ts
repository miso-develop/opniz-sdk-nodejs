import { EventEmitter } from "events"
import { Transport, RpcRequest, ConstructorParameter } from "./transports/Transport"
import { TransportCreator } from "./transports/TransportCreator"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseTransport]", ...v)) // DEBUG:

export abstract class BaseTransport extends EventEmitter implements Transport {
	protected _transport: Transport
	
	public onconnect: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onclose: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onerror: ((error: Error) => void | Promise<void>) = (error: Error): void | Promise<void> => {}
	
	public onrpcRequest: ((rpcRequests: RpcRequest[]) => void | Promise<void>) = (rpcRequests: RpcRequest[]): void | Promise<void> => {}
	public onnotmatch: ((rpcRequest: RpcRequest) => void | Promise<void>) = (rpcRequest: RpcRequest): void | Promise<void> => {}
	
	protected _onconnect: (() => Promise<void>) = async (): Promise<void> => { await this.onconnect() }
	protected _onclose: (() => Promise<void>) = async (): Promise<void> => { await this.onclose() }
	protected _onerror: ((error: Error) => Promise<void>) = async (error: Error): Promise<void> => { await this.onerror(error) }
	
	// @ts-ignore TODO:
	constructor({ address, port, id, serverPort, protocol }: ConstructorParameter) {
		super()
		
		this.on("connect", this._onconnect)
		this.on("close", this._onclose)
		this.on("error", this._onerror)
		
		this._transport = TransportCreator.create({ address, port, id, serverPort, protocol })
		this._transport.onconnect = this._onconnect
		this._transport.onclose = this._onclose
		this._transport.onerror = this._onerror
	}
	
	public async connectWait({ timeout }: { timeout?: number } = {}): Promise<boolean> { return await this._transport.connectWait({ timeout }) }
	public async request(message: string): Promise<string> { return await this._transport.request(message) }
	public async send(message: string): Promise<void> { return await this._transport.send(message) }
	public async close(): Promise<void> { await this._transport.close() }
	public isConnected(): boolean { return this._transport.isConnected() }
	public setTimeout(timeout: number): void { this._transport.setTimeout(timeout) }
}
