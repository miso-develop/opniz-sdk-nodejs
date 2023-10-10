import { dayjs, chalk, log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../utils" // DEBUG:

export class Speaker {
	constructor(private opniz) {}
	
	// MEMO: Overload
	public async config(cfg?: Speaker.SpeakerConfig): Promise<boolean | Speaker.SpeakerConfig | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.config(speaker_config_t&?):void|speaker_config_t", cfg)
		return result === undefined ? undefined :
			cfg ? Boolean(result) : <Speaker.SpeakerConfig>JSON.parse(result)
	}
	
	public async begin(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.begin(void):bool")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async end(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.end(void):void")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async isRunning(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.isRunning(void):bool")
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async isEnabled(): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.isEnabled(void):bool")
		return result === undefined ? undefined : Boolean(result)
	}
	
	// MEMO: Overload
	public async isPlaying(channel?: number): Promise<number | boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.isPlaying(uint8_t?):size_t|bool", channel)
		return result === undefined ? undefined :
			channel ? Number(result) : Boolean(result)
	}
	
	public async getPlayingChannels(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.getPlayingChannels(void):size_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async setVolume(masterVolume: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.setVolume(uint8_t):void", masterVolume)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getVolume(): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.getVolume(void):uint8_t")
		return result === undefined ? undefined : Number(result)
	}
	
	public async setAllChannelVolume(volume: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.setAllChannelVolume(uint8_t):void", volume)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async setChannelVolume(channel: number, volume: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.setChannelVolume(uint8_t,uint8_t):void", channel, volume)
		return result === undefined ? undefined : Boolean(result)
	}
	
	public async getChannelVolume(channel: number): Promise<number | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.getChannelVolume(uint8_t):uint8_t", channel)
		return result === undefined ? undefined : Number(result)
	}
	
	// MEMO: Overload
	public async stop(channel?: number): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.stop(uint8_t?):void", channel)
		return result === undefined ? undefined : Boolean(result)
	}
	
	// eslint-disable-next-lineno-inferrable-types
	public async tone(frequency: number, duration = 0, channel = -1, stopCurrentSound = true): Promise<boolean | undefined> {
		const result = await this.opniz.exec("_M5.Speaker.tone(float,uint32_t,int,bool):bool", frequency, duration, channel, stopCurrentSound)
		return result === undefined ? undefined : Boolean(result)
	}
	
	
}

export namespace Speaker {
	export type SpeakerConfig = {
		"pin_data_out"?: number
		"pin_bck"?: number
		"pin_ws"?: number
		"sample_rate"?: number
		"stereo"?: boolean
		"buzzer"?: boolean
		"use_dac"?: boolean
		"dac_zero_level"?: number
		"magnification"?: number
		"dma_buf_len"?: number
		"dma_buf_count"?: number
		"task_priority"?: number
		"task_pinned_core"?: number
		"i2s_port"?: number
	}
}
