import { EventEmitter } from "events"
import net from "net"
import { PromiseTimer, TimeoutOptions, TimeoutError } from "./PromiseTimer"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.black.bgCyan(getDateStr(), "[TcpServer]", ...v)) // DEBUG:



export class ListenTimeoutError extends TimeoutError {
	constructor(message = "Listen timeout.") {
		super(message)
	}
}

const defaultTimeout = 5000

export interface MessageHandler {
	name: string
	listener: (...parameters: any[]) => void
}

export interface Message {
	name: string
	parameters: any[]
}

export class TcpServer extends EventEmitter {
	public port: number
	public server: net.Server
	public messageHandlers: MessageHandler[] = []
	
	private _timer: PromiseTimer
	
	public onclose: (() => void) = (): void => {}
	public onerror: ((error: Error) => void) = (error: Error): void => {}
	public onnotmatch: ((message: Message) => void) = (message: Message) => {}
	
	private _onclose: (() => void) = async () => await this.onclose()
	private _onerror: ((error: Error) => void) = async (error: Error): Promise<void> => {
		await this.onerror(error)
		await this.close()
	}
	private _ondata: ((data: Buffer) => void) = data => {
		// MEMO: デバイスからのイベントを瞬間的に同時に受け取ることがあり、その場合`{...}{...}`のようなメッセージとなりJSON.parseでエラーとなる。
		// MEMO: それを回避するため必ずオブジェクト末尾に`,`を付与し`{...},`の形でデバイスからメッセージを送り、ここで`[]`で括り配列にする。
		// MEMO: 配列内の末尾が`,`で終わるとJSON.parseでエラーとなるため空オブジェクト`{}`を挿入し、JSON.parse後に削除している。
		const messages: Message[] = JSON.parse(`[${data.toString()}{}]`).filter(value => value.name)
		for (const message of messages) this._handleMessage(message)
	}
	
	private _handleMessage(message: Message): void {
		for (const messageHandler of this.messageHandlers) {
			if (messageHandler.name !== message.name) continue
			
			// MEMO: emitせずにここで直接listener実行でいいのでは？ →emitなら同名で複数登録したMessageHandlerがすべて実装される
			this.emit(message.name, message.parameters)
			return
		}
		this.onnotmatch(message)
	}
	
	constructor(port: number) {
		super()
		this.port = port
		
		this._timer = new PromiseTimer()
		this._timer.timeout = defaultTimeout
	}
	
	public listen({ timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		return this._timer.timer(new Promise<void>(async (res, rej) => {
			// dbg("listen")
			this.onMessageHandlers()
			
			if (this.isListening()) {
				res()
				for (;;) await sleep(100) // MEMO: これがないと`res()`されない…
			}
			
			this.server = net.createServer(socket => {
				// socket events
				socket.on("data", data => {
					this._ondata(data)
					socket.write("\0") // MEMO: とりあえずの実装としてハンドラーごとにresponseは返さず、一律nullを返す
				})
				socket.on("close", this._onclose)
				socket.on("error", this._onerror)
			})
			
			// server events
			this.server.on("close", this._onclose)
			this.server.on("error", this._onerror)
			
			this.server.once("error", error => rej(error))
			this.server.once("listening", () => res())
			this.server.listen(this.port)
			
		}), { error: new ListenTimeoutError(), timeout })
	}
	
	public onMessageHandlers(): void {
		// dbg("onMessageHandlers")
		this.removeAllListeners()
		this.messageHandlers.forEach(messageHandler =>
			this.on(messageHandler.name, messageHandler.listener))
	}
	
	public close({ timeout = this._timer.timeout }: { timeout?: number} = {}): Promise<void> {
		// dbg("close")
		return this._timer.timer(new Promise<void>((res, rej) => {
			if (!this.server?.listening) res()
			this.server.once("close", () => res())
			this.server.close()
		}), { error: new TimeoutError(), timeout })
	}
	
	public isListening(): boolean {
		return !!this.server?.listening
	}
}
