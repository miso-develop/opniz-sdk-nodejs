import { Opniz } from "../src/index"

import ip from "ip"

describe("Opniz", () => {
// describe.skip("Opniz", () => {
	
	const address = ip.address()
	const port = 55070
	const serverPort = 55071
	
	test("BaseDevice", async () => {
		class Device extends Opniz.BaseDevice {
			public _name = "device"
			protected addDeviceMessageHandlers(messageHandler): void {}
		}
		
		const device = new Device({ address, port, serverPort })
		expect(device.name).toBe("device")
	})
	
	test("Esp32", async () => {
		const device = new Opniz.Esp32({ address, port, serverPort })
		expect(device.name).toBe("esp32")
	})
	
	test("M5Atom", async () => {
		const device = new Opniz.M5Atom({ address, port, serverPort })
		expect(device.name).toBe("m5atom")
	})
})
