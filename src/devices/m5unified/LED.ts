import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:

export class LED {
	constructor(private opniz) {}
	
	public async init(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_led.init():void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setBrightness(brightness: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_led.setBrightness(uint8_t):void", brightness)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async drawpix(Number: number, Color: LED.Color): Promise<boolean | undefined>
	public async drawpix(xpos: number, ypos: number, Color: LED.Color): Promise<boolean | undefined>
	public async drawpix(xposOrNumber: number, yposOrColor: LED.Color | number, ColorOrUndefined?: LED.Color): Promise<boolean | undefined> {
		if (ColorOrUndefined === undefined) {
			const Number = xposOrNumber
			let Color = yposOrColor
			if (typeof Color === "string") Color = parseInt(Color.replace("#", ""), 16)
			const result = await this.opniz.exec("_led.drawpix(uint8_t,uint8_t|CRGB,CRGB|undefined):void", Number, Color)
			return result === undefined ? undefined : Boolean(result)
			
		} else {
			const xpos = xposOrNumber
			const ypos = yposOrColor
			let Color = ColorOrUndefined
			if (typeof Color === "string") Color = parseInt(Color.replace("#", ""), 16)
			const result = await this.opniz.exec("_led.drawpix(uint8_t,uint8_t|CRGB,CRGB|undefined):void", xpos, ypos, Color)
			return result === undefined ? undefined : Boolean(result)
		}
	}
	
	public async fillpix(Color: LED.Color): Promise<boolean | undefined> {
		if (typeof Color === "string") Color = parseInt(Color.replace("#", ""), 16)
		const result = await this.opniz.exec("_led.fillpix(CRGB):void", Color)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async clear(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_led.clear():void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setWidthHeight(xColumns: number, yRows: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_led.setWidthHeight(uint16_t,uint16_t):void", xColumns, yRows)
		return result === undefined ? undefined : Boolean(result)
	}
}

export namespace LED {
	export type Color = string | number // TODO: とりあえずこれで。もっといい感じにしたい
}
