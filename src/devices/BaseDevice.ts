import { TcpManager, MessageHandler, Message } from "./lib/TcpManager"
import * as utils from "../utils"

// import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[BaseDevice]", ...v)) // DEBUG:



export { MessageHandler, Message } from "./lib/TcpManager"

export abstract class BaseDevice extends TcpManager {
	// MEMO: 継承クラスにてデバイス名上書き
	protected abstract _name: string;
	
	// MEMO: 継承クラスにてこのメソッド内でmessageHandlersに独自メッセージイベントを追加していく
	protected abstract addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void
	
	public async requestJson(messageJson: Message | Message[]): Promise<string> {
		// dbg("[requestJson]")
		const message = JSON.stringify(Array.isArray(messageJson) ? messageJson : [messageJson])
		return JSON.parse(await this.request(message))
	}
	
	public async sendJson(messageJson: Message | Message[]): Promise<void> {
		// dbg("[sendJson]")
		const message = JSON.stringify(Array.isArray(messageJson) ? messageJson : [messageJson])
		await this.send(message)
	}
	
	public async exec(name: string, ...parameters: any): Promise<any> {
		// dbg("[exec]")
		return (await this.requestJson([{ name, parameters }]))[0]
	}
	
	public createMessage(name: string, ...parameters: any): Message {
		// dbg("[createMessage]")
		return { name, parameters }
	}
	
	get name(): string {
		return this._name
	}
	
	// utils
	public utils = utils
	public sleep = utils.sleep
	public wait = utils.wait
}
