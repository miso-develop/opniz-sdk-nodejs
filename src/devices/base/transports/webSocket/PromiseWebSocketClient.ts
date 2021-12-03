import { EventEmitter } from "events"
import { io, Socket } from "socket.io-client"
import { PromiseTimer } from "../lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/TimeoutError"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseWebSocketClient]", ...v)) // DEBUG:

const defaultTimeout = 5000
const connectionTimeout = 10000
const closeTimeout = 10000

export class PromiseWebSocketClient extends EventEmitter {
	private _socket: Socket
	
	private _address: string
	private _port: number
	private _id: string
	
	private _promiseTimer: PromiseTimer = new PromiseTimer()
	
	public onconnect: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onclose: (() => void | Promise<void>) = (): void | Promise<void> => {}
	public onerror: ((error: Error) => void | Promise<void>) = (error: Error): void | Promise<void> => {}
	public onrequest: ((message: string) => string | Promise<string>) = async (message: string): Promise<string> => { return message }
	
	protected _onconnect: (() => Promise<void>) = async (): Promise<void> => { await this.onconnect() }
	protected _onclose: (() => Promise<void>) = async (): Promise<void> => { await this.onclose() }
	protected _onerror: ((error: Error) => Promise<void>) = async (error: Error): Promise<void> => {
		await this.onerror(error)
		await this.close()
	}
	protected _onrequest: ((message: string) => Promise<string>) = async (message: string): Promise<string> => { return await this.onrequest(message) }
	
	constructor({ address, port, id = "" }: { address: string; port: number; id?: string }) {
		super()
		this._address = address
		this._port = port
		this._id = id
		
		this._promiseTimer.timeout = defaultTimeout
		
		this.on("connect", this._onconnect)
		this.on("close", this._onclose)
		this.on("error", this._onerror)
	}
	
	public connect({ timeout = connectionTimeout }: PromiseTimer.TimeoutOptions = {}): Promise<boolean> {
		return this._promiseTimer.timer((resolve, reject) => {
			if (this.isConnected()) resolve(true)
			
			const uri = `ws://${this._address}:${this._port}`
			this._socket = io(uri, {
				query: { opnizId: this._id },
				timeout: connectionTimeout,
			})
			
			const onDisconnectError = (reason) => reject(new Error(reason))
			this._socket.once("disconnect", onDisconnectError)
			this._socket.once("connect_error", reject)
			this._socket.once("connect", () => {
				
				this._socket.on("request", async (message: string, callback) => {
					const request = typeof message === "string" ? message : JSON.stringify(message)
					await callback(await this._onrequest(request))
				})
				
				this._socket.on("error", async (error: Error) => {
					await this._onerror(error)
				})
				
				this._socket.on("disconnect", async (reason) => {
					await this._onerror(new Error(reason))
				})
				
				this._socket.removeListener("disconnect", onDisconnectError)
				this._socket.removeListener("connect_error", reject)
				resolve(true)
			})
		}, { error: new ConnectionTimeoutError(), timeout })
	}
	
	public request(message: string, { timeout = this._promiseTimer.timeout }: PromiseTimer.TimeoutOptions = {}): Promise<string> {
		return this._promiseTimer.timer((resolve, reject) => {
			if (!this.isConnected()) reject(new NotConnectedError())
			
			this._socket.once("error", reject)
			this._socket.emit("request", message, (response: string | object) => {
				this._socket.removeListener("error", reject)
				resolve(typeof response === "string" ? response : JSON.stringify(response))
			})
		}, { error: new RequestTimeoutError(), timeout })
	}
	
	public send(message: string, { timeout = this._promiseTimer.timeout }: PromiseTimer.TimeoutOptions = {}): Promise<void> {
		return this._promiseTimer.timer((resolve, reject) => {
			if (!this.isConnected()) reject(new NotConnectedError())
			
			this._socket.once("error", reject)
			this._socket.emit("request", message, () => {
				this._socket.removeListener("error", reject)
				resolve()
			})
		}, { error: new RequestTimeoutError(), timeout })
	}
	
	public async close({ timeout = closeTimeout }: PromiseTimer.TimeoutOptions = {}): Promise<void> {
		return this._promiseTimer.timer((resolve, reject) => {
			if (!this.isConnected()) resolve()
			
			this._socket.once("error", reject)
			this._socket.once("disconnect", () => {
				this._socket.removeListener("error", reject)
				resolve()
			})
			this._socket.disconnect()
		}, { error: new CloseTimeoutError(), timeout })
	}
	
	public isConnected(): boolean {
		return !!this._socket?.connected
	}
	
	public setTimeout(timeout: number): void {
		this._promiseTimer.timeout = timeout
	}
}
