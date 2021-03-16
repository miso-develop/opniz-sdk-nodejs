import { EventEmitter } from "events"
import net from "net"
import { PromiseTimer, TimeoutOptions, TimeoutError } from "./PromiseTimer"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[TcpClient]", ...v)) // DEBUG:



export class ConnectionTimeoutError extends TimeoutError {
	constructor(message = "Connection timeout.") {
		super(message)
	}
}

export class RequestTimeoutError extends TimeoutError {
	constructor(message = "Request timeout.") {
		super(message)
	}
}

export class NotConnectedError extends Error {
	constructor(message = "Not connected.") {
		super(message)
		this.name = new.target.name
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

const defaultTimeout = 5000
const connectionTimeout = 20000

export class TcpClient extends EventEmitter {
	public socket: net.Socket
	
	private _address: string
	private _port: number
	private _timer: PromiseTimer
	
	public onclose: (() => void) = (): void => {}
	public onerror: ((error: Error) => void) = (error: Error): void => {}
	
	private _onclose: (() => void) = async () => await this.onclose()
	private _onerror: ((error: Error) => void) = async (error: Error): Promise<void> => {
		await this.onerror(error)
		await this.close()
	}
	
	constructor({ address, port }: { address: string; port: number }) {
		super()
		this._address = address
		this._port = port
		
		this._timer = new PromiseTimer()
		this._timer.timeout = defaultTimeout
	}
	
	public connect({ timeout = connectionTimeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>(async (res, rej) => {
			// dbg("connect")
			
			if (this.isConnected()) {
				res()
				for (;;) await sleep(100) // MEMO: これがないと`res()`されない…
			}
			
			this.socket = net.connect(this._port, this._address)
			this.socket.once("connect", () => res())
			this.socket.once("error", (error) => rej(error))
			
			this.socket.on("close", this._onclose)
			this.socket.on("error", this._onerror)
			
		}), { error: new ConnectionTimeoutError(), timeout })
	}
	
	public request(message: string, {
		error = new RequestTimeoutError(),
		timeout = this._timer.timeout,
	}: TimeoutOptions = {}): Promise<string> {
		return this._timer.timer(new Promise((res, rej) => {
			// dbg("request")
			if (!this.isConnected()) rej(new NotConnectedError())
			this.socket.once("data", data => res(data.toString()))
			
			this.socket.write(message)
		}), { error, timeout })
	}
	
	public send(message: string, {
		error = new RequestTimeoutError(),
		timeout = this._timer.timeout,
	}: TimeoutOptions = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((res, rej) => {
			// dbg("send")
			if (!this.isConnected()) rej(new NotConnectedError())
			this.socket.write(message, error => error ? rej(error) : res())
		}), { error, timeout })
	}
	
	public async close({ timeout = defaultTimeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((res, rej) => {
			// dbg("close")
			if (!this.isConnected() || !!this.socket?.destroyed) res()
			
			this.socket.once("close", () => res())
			this.socket.destroy()
		}), { timeout })
	}
	
	public isConnected(): boolean {
		// dbg("isConnected", this.socket?.connecting)
		return !!this.socket?.writable
	}
	
	public setTimeout(timeout: number): void {
		this._timer.timeout = timeout
	}
}
