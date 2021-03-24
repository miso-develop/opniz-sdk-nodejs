import net from "net"
import { ServerMock } from "./lib/ServerMock"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../src/utils"

export class Esp32Mock extends ServerMock {
	public ondata = async (data, socket: net.Socket) => {
		await sleep(this.wait)
		await sleep(100)
		
		// log("[ServerMock] [ondata] ", data.toString())
		if (!socket?.writable) return
		let response = data.toString()
		
		const request = JSON.parse(data.toString())[0]
		
		// return number
		if (request.name === "getFreeHeap" ||
			request.name === "temperatureRead" ||
			request.name === "analogRead" ||
			request.name === "digitalRead" ||
		false) response = JSON.stringify([1])
		
		// return boolean
		if (request.name === "restart" ||
			request.name === "delay" ||
			request.name === "dacWrite" ||
			request.name === "digitalWrite" ||
			request.name === "ledcWrite" ||
		false) response = JSON.stringify([true])
		
		socket.write(response)
	}
}
