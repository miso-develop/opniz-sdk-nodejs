/* eslint @typescript-eslint/no-inferrable-types: "off" */
import { Esp32, Protocol } from "./Esp32"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../utils" // DEBUG:
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Atom]", ...v)) // DEBUG:

export { RpcRequest, Protocol } from "./Esp32"

export class M5Atom extends Esp32 {
	
	public dis: Dis = new Dis(this)
	public Btn: Btn = new Btn(this)
	public IMU: Imu = new Imu(this)
	
	private _checkColorCode = (colorCode): void => {
		// const regexp = /^#([0-9a-fA-F]{3}|[0-9a-fA-number: numberF]{6})$/ // TODO: おいおい実装したら↓と切り替え
		const regexp = /^#([0-9a-fA-F]{6})$/
		if (!regexp.test(colorCode)) throw new Error("Invalid color code format.")
	}
	
	// add onmethod event
	// public onbutton: ((params: string[]) => void | Promise<void>) = (params: string[]): void | Promise<void> => {}
	public onbutton: ((params?: string[]) => void | Promise<void>) = (params?: string[]): void | Promise<void> => {}
	
	constructor({ address, port, serverPort, protocol }: { address?: string; port: number; serverPort?: number; protocol?: Protocol }) {
		super({ address, port, serverPort, protocol })
		
		// add rpc handler
		this.rpcHandler.add({
			name: "button",
			procedure: async (params?: string[]) => {
				await this.onbutton(params)
				return params ? JSON.stringify(params) : "true"
			},
		})
	}
	
	// public async drawpix(number: number, color: string): Promise<boolean> {
	// 	checkColorCode(color)
	// 	return Boolean(await super.exec("drawpix", number, color))
	// }
	
	// public async drawpix(xpos: number, ypos: number, Color: string): Promise<boolean> {
	// 	return Boolean(await super.exec("_M5.dis.drawpix(uint8_t,uint8_t,CRGB):void", xpos, ypos, Color))
	// }
	
	public async begin(SerialEnable: boolean = true, I2CEnable: boolean = true, DisplayEnable: boolean = false): Promise<boolean> {
		return Boolean(await super.exec("_M5.begin(bool,bool,bool):void", SerialEnable, I2CEnable, DisplayEnable))
	}
	
	public async update(): Promise<boolean> {
		return Boolean(await super.exec("_M5.update():void"))
	}
	
}

class Dis {
	private opniz: Esp32
	
	constructor(opniz: Esp32) {
		this.opniz = opniz
	}
	
	// public async run(*data: undefined): Promise<boolean> {
	// 	return Boolean(!!await this.opniz.exec("_M5.dis.run(void):void", *data))
	// }
	
	public async setBrightness(brightness: number): Promise<boolean> {
		return Boolean(await this.opniz.exec("_M5.dis.setBrightness(uint8_t):void", brightness))
	}
	
	// TODO: TypeScriptだとオーバーロード実装さくっとできない…
	// public async drawpix(xpos: number, ypos: number, Color: string): Promise<boolean> {
	// 	return Boolean(!!await this.opniz.exec("_M5.dis.drawpix(uint8_t,uint8_t,CRGB):void", xpos, ypos, Color))
	// }
	
	public async drawpix(Number: number, Color: string): Promise<boolean> {
		return Boolean(await this.opniz.exec("_M5.dis.drawpix(uint8_t,CRGB):void", Number, Color))
	}
	
	public async clear(): Promise<boolean> {
		return Boolean(await this.opniz.exec("_M5.dis.clear():void"))
	}
}

class Btn {
	private opniz: Esp32
	
	constructor(opniz: Esp32) {
		this.opniz = opniz
	}
	
	public async read(): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.read():uint8_t") || -1)
	}
	
	public async isPressed(): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.isPressed():uint8_t") || -1)
	}
	
	public async isReleased(): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.isReleased():uint8_t") || -1)
	}
	
	public async wasPressed(): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.wasPressed():uint8_t") || -1)
	}
	
	public async wasReleased(): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.wasReleased():uint8_t") || -1)
	}
	
	public async pressedFor(ms: number): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.pressedFor(uint32_t):uint8_t", ms) || -1)
	}
	
	public async releasedFor(ms: number): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.releasedFor(uint32_t):uint8_t", ms) || -1)
	}
	
	public async wasReleasefor(ms: number): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.wasReleasefor(uint32_t):uint8_t", ms) || -1)
	}
	
	public async lastChange(): Promise<number> {
		return Number(await this.opniz.exec("_M5.Btn.lastChange():uint32_t") || -1)
	}
}

class Imu {
	private opniz: Esp32
	
	constructor(opniz: Esp32) {
		this.opniz = opniz
	}
	
	public async init(): Promise<number> {
		return Number(await this.opniz.exec("_M5.IMU.Init():int") || -1)
	}
	
	public async getAccelAdc(): Promise<number[]> {
		return JSON.parse(await this.opniz.exec("_M5.IMU.getAccelAdc(int16_t*,int16_t*,int16_t*):void") || "[-1,-1,-1]")
	}
}
