/* eslint @typescript-eslint/no-inferrable-types: "off" */
import { BaseDevice, ConstructorParameter } from "./base/BaseDevice"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:

export { ConstructorParameter }

export class Esp32 extends BaseDevice {
	public async getVersion(): Promise<string | undefined> {
		const result = await this.exec("_getVersion(void):String")
		return result === undefined ? undefined : result
	}
	
	public async getFreeHeap(): Promise<number | undefined> {
		const result = await this.exec("_esp_get_minimum_free_heap_size(void):uint32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async temperatureRead(): Promise<number | undefined> {
		const result = await this.exec("_temperatureRead():float")
		return result === undefined ? undefined : Number(result)
	}
	
	public async restart(): Promise<boolean | undefined> {
		// MEMO: デバイスがrestartされるとレスポンスが返ってこずエラーとなるため、catchしてtrueを返す
		try {
			await this.exec("_esp_restart(void):void")
		} catch {
			return true
		}
	}
	
	public async delay(ms: number): Promise<boolean | undefined> {
		const result = await this.exec("_delay(uint32_t):void", ms)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async analogRead(pin: number): Promise<number | undefined> {
		const result = await this.exec("_analogRead(uint8_t):uint16_t", pin)
		return result === undefined ? undefined : Number(result)
	}
	
	public async digitalRead(pin: number): Promise<number | undefined> {
		const result = await this.exec("_digitalRead(uint8_t):int", pin)
		return result === undefined ? undefined : Number(result)
	}
	
	public async digitalWrite(pin: number, val: number): Promise<boolean | undefined> {
		const result = await this.exec("_digitalWrite(uint8_t,uint8_t):void", pin, val)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async ledcWrite(pin: number, duty: number, channel: number = 0, freq: number = 12800, resolutionBits: number = 8): Promise<boolean | undefined> {
		const result = await this.exec("_ledcWrite(uint8_t,uint32_t):void", pin, duty, channel, freq, resolutionBits)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async pinMode(pin: number, mode: number): Promise<boolean | undefined> {
		const result = await this.exec("_pinMode(uint8_t,uint8_t):void", pin, mode)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async ledcSetup(chan: number, freq: number, bitNum: number): Promise<number | undefined> {
		const result = await this.exec("_ledcSetup(uint8_t,uint32_t,uint8_t):uint32_t", chan, freq, bitNum)
		return result === undefined ? undefined : Number(result)
	}
	
	public async ledcAttachPin(pin: number, chan: number): Promise<boolean | undefined> {
		const result = await this.exec("_ledcAttachPin(uint8_t,uint8_t):void", pin, chan)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async ledcDetachPin(pin: number): Promise<boolean | undefined> {
		const result = await this.exec("_ledcDetachPin(uint8_t):void", pin)
		return result === undefined ? undefined : Boolean(result)
	}
}
