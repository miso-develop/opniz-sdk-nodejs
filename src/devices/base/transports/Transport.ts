type PartiallyRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Transport = {
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

export type RpcRequest = {
	method: string
	params: any[]
}

export const Protocol = {
	WebSocketServer: "WebSocketServer",
	WebSocketClient: "WebSocketClient",
	TCP: "TCP",
}
export type Protocol = typeof Protocol[keyof typeof Protocol]

export type WebSocketServerConstructorParameter =	{ 						port: number;	id?: string;							protocol?: "WebSocketServer" }
export type WebSocketClientConstructorParameter =	{ address: string;		port: number;	id?: string;							protocol: "WebSocketClient" }
export type TCPConstructorParameter = 				{ address: string;		port: number;					serverPort?: number;	protocol: "TCP" }
export type ConstructorParameter = WebSocketServerConstructorParameter | WebSocketClientConstructorParameter | TCPConstructorParameter
