import { EventEmitter } from "events"
import { Server, Socket } from "socket.io"
import { PromiseTimer, TimeoutOptions } from "../lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/TimeoutError"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgBlueBright(getDateStr(), "[PromiseWebSocketServer]", ...v)) // DEBUG:

const defaultTimeout = 5000
const connectionTimeout = 10000
const closeTimeout = 10000

export class PromiseWebSocketServer extends EventEmitter {
	private _server: Server
	private _socket: Socket
	
	private _port: number
	
	private _timer: PromiseTimer = new PromiseTimer()
	
	public onrequest: ((message: string) => Promise<string>) = async (message: string): Promise<string> => { return message }
	private _onrequest: ((message: string) => Promise<string>) = async (message: string): Promise<string> => { return await this.onrequest(message) }
	
	constructor({ port }: { port: number }) {
		super()
		this._port = port
		
		this._timer.timeout = defaultTimeout
	}
	
	private _listen(port: number): void {
		this._server = new Server(port, {
			connectTimeout: connectionTimeout,
			pingTimeout: connectionTimeout,
		})
	}
	
	public async connect({ timeout = connectionTimeout }: { timeout?: number} = {}): Promise<boolean> {
		return this._timer.timer(new Promise<any>((resolve, reject) => {
			if (this.isConnected()) return true
			
			this._listen(this._port)
			
			const onError = error => reject(error)
			this._server.once("error", onError)
			
			this._server.once("connection", (socket: Socket) => {
				this._socket = socket
				this._socket.on("request", async (message: string, callback) => {
					const request = typeof message === "string" ? message : JSON.stringify(message)
					await callback(await this._onrequest(request))
				})
				
				this._server.removeListener("error", onError)
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
	
	public async close({ timeout = closeTimeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			const onError = error => reject(error)
			this._server.once("error", onError)
			this._server.once("close", () => {
				this._server.removeListener("error", onError)
				resolve()
			})
			
			this._server.disconnectSockets(true)
			this._server.close(error => {
				this._server.removeListener("error", onError)
				error ? reject(error) : resolve()
			})
		}), { error: new CloseTimeoutError(), timeout })
	}
	
	public isConnected(): boolean {
		return !!this._socket?.connected
	}
	
	public setTimeout(timeout: number): void {
		this._timer.timeout = timeout
	}
}
