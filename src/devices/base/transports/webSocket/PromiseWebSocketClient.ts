import { EventEmitter } from "events"
import { io, Socket } from "socket.io-client"
import { PromiseTimer } from "../lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/Error"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseWebSocketClient]", ...v)) // DEBUG:

const defaultTimeout = 5000
const connectTimeout = 10000
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
		this._connect(this._address, this._port, this._id)
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
		
		this._connect(this._address, this._port, this._id)
	}
	
	private _connect(address: string, port: number, id = "___default___"): void {
		const uri = `ws://${address}:${port}`
		this._socket = io(uri, {
			query: { opnizId: id },
			timeout: connectTimeout,
		})
		
		this._socket.once("connect", () => {
			this.emit("connect")
			
			this._socket.once("error", async (error: Error) => await this._onerror(error))
			this._socket.once("disconnect", async (reason: Socket.DisconnectReason) => await this._onerror(new Error(reason)))
			this._socket.on("request", async (message: string, callback) => {
				const request = typeof message === "string" ? message : JSON.stringify(message)
				await callback(await this._onrequest(request))
			})
		})
	}
	
	public async connectWait({ timeout = connectTimeout }: PromiseTimer.TimeoutOptions = {}): Promise<boolean> {
		let rejected = false
		return this._promiseTimer.timer<boolean>(async (resolve, reject) => {
			while (!this.isConnected() && !rejected) { await sleep(100) }
			resolve(true)
		}, {
			callback: (result : PromiseTimer.PromiseResult) => rejected = result === "reject",
			error: new ConnectionTimeoutError(), timeout,
		})
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
			
			this.emit("close")
		}, { error: new CloseTimeoutError(), timeout })
	}
	
	public isConnected(): boolean {
		return !!this._socket?.connected
	}
	
	public setTimeout(timeout: number): void {
		this._promiseTimer.timeout = timeout
	}
}
