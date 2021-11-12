import { PromiseTcpServer } from "../../../../../src/devices/base/transports/tcp/PromiseTcpServer"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../../src/utils"

export class PromiseTcpServerMock extends PromiseTcpServer {
	public wait = 0
	
	public setWait(wait) {
		this.wait = wait
	}
	
	public ondata: ((data: Buffer) => Promise<string>) = async (data: Buffer): Promise<string> => {
		await sleep(this.wait)
		return data.toString()
	}
}
