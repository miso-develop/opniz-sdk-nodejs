export declare class Speaker {
    private opniz;
    constructor(opniz: any);
    config(cfg?: Speaker.SpeakerConfig): Promise<boolean | Speaker.SpeakerConfig | undefined>;
    begin(): Promise<boolean | undefined>;
    end(): Promise<boolean | undefined>;
    isRunning(): Promise<boolean | undefined>;
    isEnabled(): Promise<boolean | undefined>;
    isPlaying(channel?: number): Promise<number | boolean | undefined>;
    getPlayingChannels(): Promise<number | undefined>;
    setVolume(masterVolume: number): Promise<boolean | undefined>;
    getVolume(): Promise<number | undefined>;
    setAllChannelVolume(volume: number): Promise<boolean | undefined>;
    setChannelVolume(channel: number, volume: number): Promise<boolean | undefined>;
    getChannelVolume(channel: number): Promise<number | undefined>;
    stop(channel?: number): Promise<boolean | undefined>;
    tone(frequency: number, duration?: number, channel?: number, stopCurrentSound?: boolean): Promise<boolean | undefined>;
}
export declare namespace Speaker {
    type SpeakerConfig = {
        "pin_data_out"?: number;
        "pin_bck"?: number;
        "pin_ws"?: number;
        "sample_rate"?: number;
        "stereo"?: boolean;
        "buzzer"?: boolean;
        "use_dac"?: boolean;
        "dac_zero_level"?: number;
        "magnification"?: number;
        "dma_buf_len"?: number;
        "dma_buf_count"?: number;
        "task_priority"?: number;
        "task_pinned_core"?: number;
        "i2s_port"?: number;
    };
}
