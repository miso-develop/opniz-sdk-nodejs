import { EventEmitter } from "events"
import net from "net"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgCyan(getDateStr(), "[PromiseTcpServer]", ...v)) // DEBUG:

export class PromiseTcpServer extends EventEmitter {
	public server: net.Server
	public socket: net.Socket
	
	public port: number
	
	public onerror: ((error: Error) => void) = (error: Error): void => {}
	public ondata: ((data: Buffer) => string | Promise<string>) = async (data: Buffer): Promise<string> => { return data.toString() }
	
	constructor(port: number) {
		super()
		this.port = port
		this._listen(this.port)
	}
	
	private _listen(port: number): void {
		this.server = net.createServer(socket => {
			this.socket = socket
			this.socket.on("data", async (data: Buffer) => socket.write(await this.ondata(data)))
			this.socket.on("error", this.onerror)
		})
		this.server.on("error", this.onerror)
		this.server.listen(port)
	}
}
