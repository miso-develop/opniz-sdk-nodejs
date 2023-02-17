import { BaseDevice } from "./devices/base/BaseDevice"
import { Esp32 } from "./devices/Esp32"
import { M5Atom } from "./devices/M5Atom"
import { M5Unified } from "./devices/M5Unified"
import * as types from "./devices/base/transports/Transport"

export * as utils from "./utils"

export class Opniz {
	public static BaseDevice = BaseDevice
	public static Esp32 = Esp32
	public static M5Atom = M5Atom
	public static M5Unified = M5Unified
	public static Protocol = types.Protocol
}

export namespace Opniz {
	export type BaseDevice = typeof BaseDevice[keyof typeof BaseDevice]
	export type Esp32 = typeof Esp32[keyof typeof Esp32]
	export type M5Atom = typeof M5Atom[keyof typeof M5Atom]
	export type M5Unified = typeof M5Unified[keyof typeof M5Unified]
	
	export type RpcRequest = types.RpcRequest
	export type Protocol = types.Protocol
	export type ConstructorParameter = types.ConstructorParameter
}
