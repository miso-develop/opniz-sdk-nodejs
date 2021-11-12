import { EventEmitter } from "events"
import { io, Socket } from "socket.io-client"
import { PromiseTimer, TimeoutOptions } from "../lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/TimeoutError"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseWebSocketClient]", ...v)) // DEBUG:

const defaultTimeout = 5000
const connectionTimeout = 10000

export class PromiseWebSocketClient extends EventEmitter {
	private _socket: Socket
	
	private _address: string
	private _port: number
	
	private _timer: PromiseTimer = new PromiseTimer()
	
	public onrequest: ((message: string) => Promise<string>) = async (message: string): Promise<string> => { return message }
	private _onrequest: ((message: string) => Promise<string>) = async (message: string): Promise<string> => { return await this.onrequest(message) }
	
	constructor({ address, port }: { address: string; port: number }) {
		super()
		this._address = address
		this._port = port
		
		this._timer.timeout = defaultTimeout
	}
	
	public connect({ timeout = connectionTimeout }: { timeout?: number} = {}): Promise<boolean> {
		return this._timer.timer(new Promise<boolean>((resolve, reject) => {
			if (this.isConnected()) return true
			
			const uri = `ws://${this._address}:${this._port}`
			this._socket = io(uri)
			this._socket.on("request", async (message: string, callback) => {
				const request = typeof message === "string" ? message : JSON.stringify(message)
				await callback(await this._onrequest(request))
			})
			
			const onError = error => reject(error)
			this._socket.once("error", onError)
			this._socket.once("connect", () => {
				this._socket.removeListener("error", onError)
				resolve(true)
			})
		}), { error: new ConnectionTimeoutError(), timeout })
	}
	
	public request(message: string, { timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<string> {
		return this._timer.timer(new Promise<string>((resolve, reject) => {
			if (!this.isConnected()) reject(new NotConnectedError())
			
			const onError = error => reject(error)
			this._socket.once("error", onError)
			
			this._socket.emit("request", message, (response: string | object) => {
				this._socket.removeListener("error", onError)
				resolve(typeof response === "string" ? response : JSON.stringify(response))
			})
		}), { error: new RequestTimeoutError(), timeout })
	}
	
	public send(message: string, { timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			if (!this.isConnected()) reject(new NotConnectedError())
			
			const onError = error => reject(error)
			this._socket.once("error", onError)
			
			this._socket.emit("request", message, () => {
				this._socket.removeListener("error", onError)
				resolve()
			})
		}), { error: new RequestTimeoutError(), timeout })
	}
	
	public async close({ timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			if (!this.isConnected()) resolve()
			
			const onError = error => reject(error)
			this._socket.once("error", onError)
			this._socket.once("close", () => {
				this._socket.removeListener("error", onError)
				resolve()
			})
			
			this._socket.close()
		}), { error: new CloseTimeoutError(), timeout })
	}
	
	public isConnected(): boolean {
		return !!this._socket?.connected
	}
	
	public setTimeout(timeout: number): void {
		this._timer.timeout = timeout
	}
}
