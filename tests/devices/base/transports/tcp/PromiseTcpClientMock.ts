import { PromiseTcpClient } from "../../../../../src/devices/base/transports/tcp/PromiseTcpClient"
import { PromiseTimer, TimeoutOptions } from "../../../../../src/devices/base/transports/lib/PromiseTimer"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../../../../../src/devices/base/transports/lib/Error"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../../src/utils"

const connectionTimeout = 20000

export class PromiseTcpClientMock extends PromiseTcpClient {
	public wait = 0
	
	public setWait(wait) {
		this.wait = wait
	}
	
	public async connect({ timeout = connectionTimeout }: { timeout?: number} = {}): Promise<void> {
		await sleep(this.wait)
		return super.connect({timeout})
	}
	
	public async request(message: string, { error = new RequestTimeoutError(), timeout = 5000 }: TimeoutOptions = {}): Promise<string> {
		await sleep(this.wait)
		return super.request(message, { error, timeout })
	}
}
