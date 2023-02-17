/* eslint @typescript-eslint/no-inferrable-types: "off" */
import { Esp32, ConstructorParameter } from "./Esp32"

import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../utils" // DEBUG:
import { LED } from "./m5unified/LED"
import { Button } from "./m5unified/Button"
import { IMU } from "./m5unified/IMU"
import { Display } from "./m5unified/Display"
// const dbg = (...v) => console.log(chalk.gray.bgYellowBright(getDateStr(), "[M5Unified]", ...v)) // DEBUG:

// MEMO: M5Unified@0.1.3
export class M5Unified extends Esp32 {
	
	public Led = new LED(this)
	public Btn = new Button(this)
	public Imu = new IMU(this)
	public Display = new Display(this)
	public Lcd = this.Display
	
	public BoardType = BoardType
	public BoardTypeList = BoardTypeList
	
	
	
	// @ts-ignore TODO:
	constructor(parameters: ConstructorParameter) {
		super(parameters)
		
		// Add rpc handler
		this.rpcHandler.add(
			...this.Btn.rpcHandlers,
		)
	}
	
	
	
	public async begin(cfg: M5Unified.Config): Promise<boolean | undefined> {
		const result = await this.exec("_M5.begin(const config_t&):void", cfg)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async config(cfg?: M5Unified.Config): Promise<M5Unified.Config | boolean | undefined> {
		const result = await this.exec("_M5.config(const config_t&):config_t|void", cfg)
		return cfg ? true : result === undefined ? undefined : this._parseConfig(result)
	}
	
	public async getBoard(): Promise<M5Unified.BoardTypeList | undefined> {
		const result = await this.exec("_M5.getBoard(void):board_t")
		return result === undefined ? undefined : BoardTypeList[Number(result)]
	}
	
	public async getUpdateMsec(): Promise<number | undefined> {
		const result = await this.exec("_M5.getUpdateMsec(void):std::uint32_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async update(): Promise<boolean | undefined> {
		const result = await this.exec("_M5.update(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	
	
	private _parseConfig(configStr: string): M5Unified.Config {
		const config = JSON.parse(configStr)
		return {
			"serial_baudrate": Number(config["serial_baudrate"]),
			"clear_display": Boolean(config["clear_display"]),
			"output_power": Boolean(config["output_power"]),
			"internal_imu": Boolean(config["internal_imu"]),
			"internal_rtc": Boolean(config["internal_rtc"]),
			"internal_spk": Boolean(config["internal_spk"]),
			"internal_mic": Boolean(config["internal_mic"]),
			"external_imu": Boolean(config["external_imu"]),
			"external_rtc": Boolean(config["external_rtc"]),
			"external_spk": Boolean(config["external_spk"]),
			"led_brightness": Number(config["led_brightness"]),
		}
	}
}

const BoardType = {
	"board_unknown": 0,
	"board_Non_Panel": 1,
	"board_M5Stack": 2,
	"board_M5StackCore2": 3,
	"board_M5StickC": 4,
	"board_M5StickCPlus": 5,
	"board_M5StackCoreInk": 6,
	"board_M5Paper": 7,
	"board_M5Tough": 8,
	"board_M5Station": 9,
	"board_M5StackCoreS3": 10,
	"board_M5AtomS3": 11,
	"board_M5Atom": 12,
	"board_M5AtomPsram": 13,
	"board_M5AtomU": 14,
	"board_M5Camera": 15,
	"board_M5TimerCam": 16,
	"board_M5StampPico": 17,
	"board_M5StampC3": 18,
	"board_M5StampC3U": 19,
	"board_M5StampS3": 20,
	"board_M5AtomS3Lite": 21,
	"board_M5AtomDisplay": 22,
	"board_M5UnitLCD": 23,
	"board_M5UnitOLED": 24,
	"board_M5UnitRCA": 25,
	"board_M5ModuleDisplay": 26,
	"board_M5ModuleRCA": 27,
} as const

const BoardTypeList: { [key: number]: string } = Object.entries(BoardType).reduce((obj, entry) => ({ ...obj, [entry[1]]: entry[0] }), {})

export namespace M5Unified {
	export type Config = {
		"serial_baudrate"?: number
		"clear_display"?: boolean
		"output_power"?: boolean
		"internal_imu"?: boolean
		"internal_rtc"?: boolean
		"internal_spk"?: boolean
		"internal_mic"?: boolean
		"external_imu"?: boolean
		"external_rtc"?: boolean
		"external_spk"?: boolean
		"led_brightness"?: number
	}
	
	export type BoardType = typeof BoardType[keyof typeof BoardType]
	export type BoardTypeList = typeof BoardTypeList[keyof typeof BoardTypeList]
}
