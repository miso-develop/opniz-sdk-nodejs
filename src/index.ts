import { BaseDevice } from "./devices/BaseDevice"
import { Esp32Pico } from "./devices/Esp32Pico"
import { M5AtomLite } from "./devices/M5AtomLite"

import * as utils from "./utils"

export class Opniz {
	public static BaseDevice = BaseDevice
	public static Esp32Pico = Esp32Pico
	public static M5AtomLite = M5AtomLite
	
	public static utils = utils
	public static sleep = utils.sleep
	public static wait = utils.wait
	public static delay = utils.delay
}
