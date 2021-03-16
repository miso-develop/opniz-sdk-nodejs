import { EventEmitter } from "events"
import { TcpClient } from "./TcpClient"
import { TcpServer, MessageHandler, Message } from "./TcpServer"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:



const connectionTimeout = 20000

export { MessageHandler, Message } from "./TcpServer"

export class TcpManager extends EventEmitter {
	private _client: TcpClient
	private _server: TcpServer
	
	public onclose: (() => void) = (): void => {}
	public onerror: ((error: Error) => void) = (error: Error): void => {}
	public onnotmatch: ((message: Message) => void) = (message: Message) => {}
	
	private _onclose: (() => void) = async () => await this.onclose()
	private _onerror: ((error: Error) => void) = async (error: Error): Promise<void> => {
		// dbg("[_onerror]")
		await this.onerror(error)
		await this.close()
	}
	
	constructor({ address, port, serverPort }: { address: string; port: number; serverPort?: number}) {
		super()
		this._client = new TcpClient({ address, port })
		this._server = new TcpServer(serverPort || port)
		this._server.onnotmatch = (message: Message) => this.onnotmatch(message)
		
		this.on("close", this._onclose)
		this.on("error", this._onerror)
	}
	
	// 継承デバイスにてこのメソッド内でmessageHandlersに独自メッセージイベントを追加していく
	protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void {}
	
	public addCustomMessageHandlers(...messageHandlers: MessageHandler[]): void {
		this._server.messageHandlers.push(...messageHandlers)
		this._server.onMessageHandlers()
	}
	
	public removeCustomMessageHandlers(...messageHandlers: MessageHandler[]): void {
		this._server.messageHandlers = this._server.messageHandlers.filter(messageHandler =>
			!messageHandlers.some(_messageHandler => JSON.stringify(_messageHandler) === JSON.stringify(messageHandler)))
		this._server.onMessageHandlers()
	}
	
	public getMessageHandlers(): string[] {
		return this._server.messageHandlers.map(messageHandler => messageHandler.name)
	}
	
	public async connect({ timeout = connectionTimeout }: { timeout?: number } = {}): Promise<boolean> {
		// dbg("[connect]")
		if (this.isConnected() || !this._isDisconnected()) return true
		
		try {
			// Create TCP Client
			await this._client.connect({ timeout })
			
			// Create TCP Server
			await this._server.listen({ timeout })
		
			// Add message handlers
			this.addDeviceMessageHandlers(this._server.messageHandlers)
			this.addCustomMessageHandlers()
			
		} catch (e) {
			// dbg("[connect catch]", e.message)
			// console.log("Connect error: ", e.message) // TODO: 稼働率検証中一時的にCO
			await this.close()
		}
		
		return this.isConnected()
	}
	
	public async request(message: string): Promise<string> {
		// dbg("[request]")
		try {
			return await this._client.request(message)
		} catch (e) {
			// dbg("[request catch]", e.message)
			await this.close()
			await this.emit("error", e)
			throw e
		}
	}
	
	public async send(message: string): Promise<void> {
		// dbg("[send]")
		try {
			await this._client.send(message)
		} catch (e) {
			// dbg("[send catch]", e.message)
			await this.close()
			await this.emit("error", e)
			throw e
		}
	}
	
	public async close(): Promise<void> {
		// dbg("[close]")
		if (!this._server.isListening() && !this._client.isConnected()) return
		
		try {
			await Promise.all([
				this._client.close(),
				this._server.close(),
			])
		} catch (e) {
			// dbg("[close catch]", e.message)
			// MEMO: closeのtimeoutはスルー
		}
		
		this.emit("close")
	}
	
	public isConnected(): boolean {
		return this._server.isListening() && this._client.isConnected()
	}
	
	// MEMO: TCP ServerとClientが同居しているため、どちらか一方が接続された状態の場合がある
	// MEMO: TCP ServerとClientどちらも完全に切断されたかをチェックして返す
	private _isDisconnected(): boolean {
		return !this._server.isListening() && !this._client.isConnected()
	}
	
	public setTimeout(timeout: number): void {
		this._client.setTimeout(timeout)
	}
}
