import { EventEmitter } from "events"
import net from "net"
import { PromiseTimer, TimeoutOptions } from "../lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, CloseTimeoutError, NotConnectedError, ListenTimeoutError } from "../lib/TimeoutError"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgCyan(getDateStr(), "[PromiseTcpServer]", ...v)) // DEBUG:

const defaultTimeout = 5000

export class PromiseTcpServer extends EventEmitter {
	public server: net.Server
	public socket: net.Socket
	
	public port: number
	
	private _timer: PromiseTimer = new PromiseTimer()
	
	public onerror: ((error: Error) => void) = (error: Error): void => {}
	public ondata: ((data: Buffer) => Promise<string>) = async (data: Buffer): Promise<string> => { return data.toString() }
	
	constructor(port: number) {
		super()
		this.port = port
		
		this._timer.timeout = defaultTimeout
	}
	
	public async listen({ timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			if (this.isListening()) resolve()
			
			this.server = net.createServer(socket => {
				this.socket = socket
				this.socket.on("data", async (data: Buffer) => socket.write(await this.ondata(data)))
				this.socket.on("error", this.onerror)
			})
			this.server.on("error", this.onerror)
			this.server.listen(this.port, resolve)
			
		}), { error: new ListenTimeoutError(), timeout })
	}
	
	public async close({ timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>((resolve, reject) => {
			if (!this.isListening()) resolve()
			
			this.socket?.destroy()
			this.server.close(error => error ? reject(error) : resolve())
		}), { error: new CloseTimeoutError(), timeout })
	}
	
	public isListening(): boolean {
		return !!this.server?.listening
	}
}
