import { BaseDevice, MessageHandler, Message } from "./BaseDevice"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:



export class Esp32Pico extends BaseDevice {
	protected _name = "esp32pico"
	
	protected addDeviceMessageHandlers(messageHandlers: MessageHandler[]): void {}
	
	public async getFreeHeap(): Promise<number> {
		// dbg("[getFreeHeap]")
		return Number(await this.exec("getFreeHeap"))
	}
	
	public async temperatureRead(): Promise<number> {
		// dbg("[temperatureRead]")
		return Number(await this.exec("temperatureRead"))
	}
	
	public async restart(): Promise<boolean> {
		// dbg("[restart]")
		return Boolean(await this.exec("restart"))
	}
	
	public async delay(ms: number): Promise<boolean> {
		// dbg("[delay]")
		return Boolean(await this.exec("delay", ms))
	}
	
	public async analogRead(pin: number): Promise<number> {
		// dbg("[analogRead]")
		return Number(await this.exec("analogRead", pin))
	}
	
	public async dacWrite(pin: number, value: number): Promise<boolean> {
		// dbg("[dacWrite]")
		return Boolean(await this.exec("dacWrite", pin, value))
	}
	
	public async digitalRead(pin: number): Promise<number> {
		// dbg("[digitalRead]")
		return Number(await this.exec("digitalRead", pin))
	}
	
	public async digitalWrite(pin: number, val: number): Promise<boolean> {
		// dbg("[digitalWrite]")
		return Boolean(await this.exec("digitalWrite", pin, val))
	}
	
	public async ledcWrite(pin: number, duty: number, channel: number = 0, freq: number = 12800, resolutionBits: number = 8): Promise<boolean> {
		// dbg("[ledcWrite]")
		return Boolean(await this.exec("ledcWrite", pin, duty, channel, freq, resolutionBits))
	}
}
