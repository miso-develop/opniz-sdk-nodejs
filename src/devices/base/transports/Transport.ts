export interface Transport {
	onconnect: () => void
	onclose: () => void
	onerror: (error: Error) => void
	onrpcRequest: (rpcRequests: RpcRequest[]) => void
	onrpcHandler?: (rpcRequests: RpcRequest[]) => void
	
	connect({ timeout }: { timeout?: number }): Promise<boolean>
	request(message: string): Promise<string>
	send(message: string): Promise<void>
	close(): Promise<void>
	isConnected(): boolean
	setTimeout(timeout: number): void
}

export interface RpcRequest {
	method: string
	params: any[]
}

export const Protocol = {
	WebSocketServer: "WebSocketServer",
	WebSocketClient: "WebSocketClient",
	TCP: "TCP",
}
export type Protocol = typeof Protocol[keyof typeof Protocol]

export type ConstructorParameter = {
	address?: string
	port: number
	id?: string
	serverPort?: number
	protocol?: Protocol
}

export type DeviceConstructorParameter =
{ address?: undefined;	port: number;	id?: undefined;	serverPort?: undefined;	protocol?: undefined } |	// WebSocketServer
{ address: string;		port: number;	id?: string;	serverPort?: undefined;	protocol?: Protocol } |	// WebSocketClient
{ address: string;		port: number;	id?: undefined;	serverPort?: number;	protocol?: Protocol }	// TCP
