import { RpcHandler, RpcRequest } from "../src/devices/base/RpcHandlerExtension"

import ip from "ip"
import getPort from "get-port"

export { getPort }



const testHandler1: RpcHandler = {
	method: "testMethod1",
	process: (...params) => "testMethod1 response",
}
const testHandler2: RpcHandler = {
	method: "testMethod2",
	process: (...params) => "testMethod2 response",
}

const testRpcRequest1: RpcRequest = {
	method: "testMethod1",
	params: [],
}
const testRpcRequest2: RpcRequest = {
	method: "testMethod2",
	params: [],
}



export const env = {
	common: {
		address: ip.address(),
		notExistAddress: "192.168.254.254",
		
		testHandler1,
		testHandler2,
		testRpcRequest1,
		testRpcRequest2,
	},
	
	
	
	devices: {
		base: {
			transports: {
				lib: {
					
					PromiseTimer: {
					},
				},
				tcp: {
					
					PromiseTcpClient: {
						// port: 55011,
						// noConnectPort: 55012,
					},
					PromiseTcpServer: {
						// port: 55021,
					},
					TcpTransport: {
						// port: 55031, // Error
						// serverPort: 55032, // Error
						
						// port: 55021,
						// serverPort: 55022,
						// notExistPort: 55023,
					},
				},
				webSockets: {
					PromiseWebSocketClient: {},
					PromiseWebSocketServer: {},
					WebSocketClientTransport: {},
					WebSocketServerTransport: {},
				},
				
				TransportCreator: {
					// port: 55041,
					// serverPort: 55042,
				},
			},
			
			RpcHandlerExtension: {
			},
			BaseRpcHandler: {
			},
			BaseTransport: {
				// port: 55051,
				// serverPort: 55052,
			},
			BaseDevice: {
				// port: 55061,
				// serverPort: 55062,
				// notExistPort: 55063,
			},
		},
		
		Esp32: {
			// port: 55071,
			// serverPort: 55072,
		},
		M5Atom: {
			// port: 55081,
			// serverPort: 55082,
		},
	},
	Opniz: {
		// port: 55091,
		// serverPort: 55092,
	},
}
