import { BaseDevice } from "./devices/BaseDevice";
import { Esp32 } from "./devices/Esp32";
import { M5Atom } from "./devices/M5Atom";
import * as utils from "./utils";
export declare class Opniz {
    static BaseDevice: typeof BaseDevice;
    static Esp32: typeof Esp32;
    static M5Atom: typeof M5Atom;
    static utils: typeof utils;
}
