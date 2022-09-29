import { Transport, RpcRequest, Protocol, ConstructorParameter } from "./Transport"
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
	// @ts-ignore TODO:
	private static _defaultProtocol({ address, port, id, serverPort }: ConstructorParameter): Protocol {
		if (id !== "___default___" && serverPort !== port) throw new ConstructorParameterError()
		
		if (id !== "___default___") return Protocol.WebSocketClient
		if (serverPort !== port) return Protocol.TCP
		return Protocol.WebSocketServer
	}
	
	// @ts-ignore TODO:
	public static create({ address, port, id = "___default___", serverPort = port, protocol = this._defaultProtocol({ address, port, id, serverPort }) }: ConstructorParameter): Transport {
		switch (protocol) {
			default:
				return new WebSocketServerTransport({ port })
			case Protocol.WebSocketServer:
				return new WebSocketServerTransport({ port })
			case Protocol.WebSocketClient:
				if (!address) throw new ConstructorParameterError()
				return new WebSocketClientTransport({ address, port, id })
			case Protocol.TCP:
				if (!address) throw new ConstructorParameterError()
				return new TcpTransport({ address, port, serverPort })
		}
	}
}
