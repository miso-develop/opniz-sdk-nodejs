import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:
import { RpcHandler } from "../base/RpcHandlerExtension"

export class Button {
	public ButtonType = ButtonType
	public ButtonTypeList = ButtonTypeList
	
	public onClicked: ((button: Button.ButtonTypeList, count: number) => void | Promise<void>) = () => {}
	public onDeciedClickCount: ((button: Button.ButtonTypeList, count: number) => void | Promise<void>) = () => {}
	public onSingleClicked: ((button: Button.ButtonTypeList) => void | Promise<void>) = () => {}
	public onDoubleClicked: ((button: Button.ButtonTypeList) => void | Promise<void>) = () => {}
	public onHold: ((button: Button.ButtonTypeList) => void | Promise<void>) = () => {}
	
	public rpcHandlers: RpcHandler[] = [
		{
			name: "_M5.Btn.wasClicked(void):bool",
			procedure: async (params: [string, string]) => {
				const button = this._convertButtonType(params[0])
				const count = Number(params[1])
				await this.onClicked(button, count)
				return params ? JSON.stringify(params) : "true"
			},
		}, {
			name: "_M5.Btn.wasDeciedClickCount(void):bool",
			procedure: async (params: string[]) => {
				const button = this._convertButtonType(params[0])
				const count = Number(params[1])
				
				switch (count) {
					case 1: await this.onSingleClicked(button); break
					case 2: await this.onDoubleClicked(button); break
					default: await this.onDeciedClickCount(button, count)
				}
				
				return params ? JSON.stringify(params) : "true"
			},
		}, {
			name: "_M5.Btn.wasHold(void):bool",
			procedure: async (params: [string]) => {
				const button = this._convertButtonType(params[0])
				await this.onHold(button)
				return params ? JSON.stringify(params) : "true"
			},
		},
	]
	
	constructor(private opniz) {}
	
	private _convertButtonType(bitStr: string): Button.ButtonTypeList {
		const bit = Number(bitStr)
		return ButtonTypeList[bit]
	}
	
	
	
	public async setDebounceThresh(msec: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Btn.setDebounceThresh(uint32_t):void", msec)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setHoldThresh(msec: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Btn.setHoldThresh(uint32_t):void", msec)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getDebounceThresh(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Btn.getDebounceThresh(void):uint32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async getHoldThresh(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Btn.getHoldThresh(void):uint32_t")
		return result === undefined ? undefined : Number(result)
	}
}

const ButtonType = {
	"BtnA": 1,
	"BtnB": 2,
	"BtnC": 4,
	"BtnPWR": 8,
	"BtnExt": 16,
} as const

const ButtonTypeList: { [key: number]: string } = Object.entries(ButtonType).reduce((obj, entry) => ({ ...obj, [entry[1]]: entry[0] }), {})

export namespace Button {
	export type ButtonType = typeof ButtonType[keyof typeof ButtonType]
	export type ButtonTypeList = typeof ButtonTypeList[keyof typeof ButtonTypeList]
}
