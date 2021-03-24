import { BaseDevice } from "./devices/BaseDevice"
import { Esp32 } from "./devices/Esp32"
import { M5Atom } from "./devices/M5Atom"
import * as utils from "./utils"

export class Opniz {
	public static BaseDevice = BaseDevice
	public static Esp32 = Esp32
	public static M5Atom = M5Atom
	public static utils = utils
}
