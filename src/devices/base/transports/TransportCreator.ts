import { Transport, RpcRequest, Protocol } from "./Transport"
import { TcpTransport } from "./tcp/TcpTransport"
import { WebSocketServerTransport } from "./webSocket/WebSocketServerTransport"
import { WebSocketClientTransport } from "./webSocket/WebSocketClientTransport"

export class ConstructorParameterError extends Error {
	constructor(message = "Constructor parameter invalid.") {
		super(message)
		this.name = new.target.name
		Object.setPrototypeOf(this, new.target.prototype)
	}
}

export class TransportCreator {
	public static create({ address, port, serverPort, protocol = Protocol.WebSocketServer }: { address?: string; port: number; serverPort?: number; protocol?: Protocol }): Transport {
		switch (protocol) {
			case Protocol.WebSocketServer:
				return new WebSocketServerTransport({ port })
			case Protocol.WebSocketClient:
				if (!address) throw new ConstructorParameterError()
				return new WebSocketClientTransport({ address, port })
			case Protocol.TCP:
				if (!address) throw new ConstructorParameterError()
				return new TcpTransport({ address, port, serverPort })
			default:
				return new WebSocketServerTransport({ port })
		}
	}
}
