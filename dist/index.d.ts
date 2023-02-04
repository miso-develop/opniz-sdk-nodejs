import { BaseDevice } from "./devices/base/BaseDevice";
import { Esp32 } from "./devices/Esp32";
import { M5Atom } from "./devices/M5Atom";
import * as utils from "./utils";
import * as types from "./devices/base/transports/Transport";
export declare class Opniz {
    static BaseDevice: typeof BaseDevice;
    static Esp32: typeof Esp32;
    static M5Atom: typeof M5Atom;
    static utils: typeof utils;
}
export declare namespace Opniz {
    const Protocol: {
        WebSocketServer: string;
        WebSocketClient: string;
        TCP: string;
    };
    type Protocol = types.Protocol;
    type ConstructorParameter = types.ConstructorParameter;
}
export { BaseDevice, Esp32, M5Atom };
