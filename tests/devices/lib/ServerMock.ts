import net from "net"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

export class ServerMock {
	public server: net.Server
	public wait: number
	
	public ondata = async (data, socket: net.Socket) => {
		await sleep(this.wait)
		await sleep(100)
		
		// log("[ServerMock] [ondata] ", data.toString())
		if (socket?.writable) socket.write(data.toString())
	}
	
	// public onclose = hadError => log("[ServerMock] [onclose] ", hadError)
	// public onerror = error => log("[ServerMock] [onerror] ", error.message)
	// public onconnect = () => log("[ServerMock] [onconnect]"
	
	public createServer(port, wait = 0) {
		this.wait = wait
		
		this.server = net.createServer(socket => {
			socket.on("data", data => this.ondata(data, socket))
			// socket.on("close", this.onclose)
			// socket.on("error", this.onerror)
			// socket.on("connect", this.onconnect)
		}).listen(port)
	}
	
	public close() {
		this.server.close()
		return this
	}
}
