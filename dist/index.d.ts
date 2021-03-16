import { BaseDevice } from "./devices/BaseDevice";
import { Esp32Pico } from "./devices/Esp32Pico";
import { M5AtomLite } from "./devices/M5AtomLite";
import * as utils from "./utils";
export declare class Opniz {
    static BaseDevice: typeof BaseDevice;
    static Esp32Pico: typeof Esp32Pico;
    static M5AtomLite: typeof M5AtomLite;
    static utils: typeof utils;
    static sleep: (ms: number) => Promise<void>;
    static wait: (ms: number) => Promise<void>;
    static delay: (ms: number) => Promise<void>;
}
