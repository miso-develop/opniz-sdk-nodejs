import { BaseDevice } from "./devices/base/BaseDevice";
import { Esp32 } from "./devices/Esp32";
import { M5Atom } from "./devices/M5Atom";
import { M5Unified } from "./devices/M5Unified";
import * as types from "./devices/base/transports/Transport";
export * as utils from "./utils";
export declare class Opniz {
    static BaseDevice: typeof BaseDevice;
    static Esp32: typeof Esp32;
    static M5Atom: typeof M5Atom;
    static M5Unified: typeof M5Unified;
    static Protocol: {
        WebSocketServer: string;
        WebSocketClient: string;
        TCP: string;
    };
}
export declare namespace Opniz {
    type BaseDevice = typeof BaseDevice[keyof typeof BaseDevice];
    type Esp32 = typeof Esp32[keyof typeof Esp32];
    type M5Atom = typeof M5Atom[keyof typeof M5Atom];
    type M5Unified = typeof M5Unified[keyof typeof M5Unified];
    type RpcRequest = types.RpcRequest;
    type Protocol = types.Protocol;
    type ConstructorParameter = types.ConstructorParameter;
}
