import { Esp32Pico } from "./Esp32Pico"
import { MessageHandler, Message } from "./BaseDevice"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:



export class M5AtomLite extends Esp32Pico {
	protected _name = "m5atom-lite"
	
	// add device events onmethod
	public onbutton: () => void = () => {}
	
	protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void {
		messageHandlers.push(
			{ name: "button", listener: () => this.onbutton() },
		)
	}
	
	public async drawpix(number: number, color: string): Promise<boolean> {
		// const regexp = /^#([0-9a-fA-F]{3}|[0-9a-fA-number: numberF]{6})$/ // TODO: おいおい実装したら↓と切り替え
		const regexp = /^#([0-9a-fA-F]{6})$/
		if (!regexp.test(color)) return false
		return Boolean(await super.exec("drawpix", number, color))
	}
}
