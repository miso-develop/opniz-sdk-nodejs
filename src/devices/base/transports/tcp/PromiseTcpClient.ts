import { EventEmitter } from "events"
import net from "net"
import { PromiseTimer, TimeoutOptions } from "../lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/TimeoutError"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseTcpClient]", ...v)) // DEBUG:

const defaultTimeout = 5000
const connectionTimeout = 3000

export class PromiseTcpClient extends EventEmitter {
	public socket: net.Socket
	
	private _address: string
	private _port: number
	
	private _timer: PromiseTimer = new PromiseTimer()
	
	public onerror: ((error: Error) => void) = (error: Error): void => {}
	
	constructor({ address, port }: { address: string; port: number }) {
		super()
		this._address = address
		this._port = port
		
		this._timer.timeout = defaultTimeout
	}
	
	public connect({ timeout = connectionTimeout }: { timeout?: number} = {}): Promise<boolean> {
		return this._timer.timer(new Promise<boolean>((resolve, reject) => {
			if (this.isConnected()) resolve(true)
			
			this.socket = net.connect(this._port, this._address, () => resolve(true))
			this.socket.on("error", this.onerror)
		}), { error: new ConnectionTimeoutError(), timeout })
	}
	
	public request(message: string, { timeout = this._timer.timeout }: TimeoutOptions = {}): Promise<string> {
		return this._timer.timer(new Promise((resolve, reject) => {
			if (!this.isConnected()) reject(new NotConnectedError())
			
			// TODO: ackでレスポンス保証入れたい
			this.socket.once("data", data => resolve(data.toString()))
			this.socket.write(message, error => error && reject(error))
		}), { error: new RequestTimeoutError(), timeout })
	}
	
	public send(message: string, { timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			if (!this.isConnected()) reject(new NotConnectedError())
			
			this.socket.write(message, error => error ? reject(error) : resolve())
		}), { error: new RequestTimeoutError(), timeout })
	}
	
	public async close({ timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			if (!this.isConnected() || !!this.socket?.destroyed) resolve()
			
			const onError = error => reject(error)
			this.socket.once("error", onError)
			this.socket.once("close", () => {
				this.socket.removeListener("error", onError)
				resolve()
			})
			this.socket.destroy()
		}), { error: new CloseTimeoutError(), timeout })
	}
	
	public isConnected(): boolean {
		return !!this.socket?.writable
	}
	
	public setTimeout(timeout: number): void {
		this._timer.timeout = timeout
	}
}
