import net from "net"
import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

export class ClientMock {
	public address = ip.address()
	public port = 62000
	
	public socket: net.Socket
	
	constructor(address, port) {
		this.address = address
		this.port = port
	}
	
	public send(messageEventJson, wait = 0): Promise<void> {
		return new Promise((res, rej) => {
			this.socket = net.connect(this.port, this.address, async () => {
				await sleep(wait)
				
				// console.log(`request: ${JSON.stringify(messageEventJson)}`)
				this.socket.write(JSON.stringify(messageEventJson) + ",")
			})
			
			// response
			this.socket.on("data", async data => {
				// console.log(`response: ${data}`)
				this.socket.destroy()
				while (!this.socket.destroyed) { await sleep(10) }
				res()
			})
		})
	}
}
