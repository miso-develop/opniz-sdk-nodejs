import { TcpTransport } from "../../../../../src/devices/base/transports/tcp/TcpTransport"
import { Transport, RpcRequest } from "../../../../../src/devices/base/Transport"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../../src/utils"

const defaultTimeout = 5000
const connectionTimeout = 20000

export class TcpTransportMock extends TcpTransport {
	public wait = 0
	
	public setWait(wait) {
		this.wait = wait
	}
	
	public onrpcRequest: ((rpcRequests: RpcRequest[]) => Promise<void>) = async (rpcRequests: RpcRequest[]): Promise<void> => {
		await sleep(this.wait)
	}
	
	constructor({ address, port, serverPort }: { address: string; port: number; serverPort?: number}) {
		super({ address, port, serverPort })
	}
	
	public async connect({ timeout = connectionTimeout }: { timeout?: number } = {}): Promise<boolean> {
		await sleep(this.wait)
		return await super.connect({ timeout })
	}
	
	public async request(rpcRequest: string): Promise<string> {
		await sleep(this.wait)
		return await super.request(rpcRequest)
	}
	
	public async send(rpcRequest: string): Promise<void> {
		await sleep(this.wait)
		return await super.send(rpcRequest)
	}
	
	public async close(): Promise<void> {
		await sleep(this.wait)
		return await super.close()
	}
}
