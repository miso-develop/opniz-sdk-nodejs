import { Opniz } from "../src/index"
import { env, getPort } from "./env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../src/utils"

describe("Opniz", () => {
// describe.skip("Opniz", () => {
	
	const _env = env.Opniz
	const address = env.common.address
	let port
	let serverPort
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
	})
	
	test("BaseDevice", async () => {
		class Device extends Opniz.BaseDevice {}
		const device = new Device({ address, port, serverPort })
		expect(device).toBeInstanceOf(Opniz.BaseDevice)
	})
	
	test("Esp32", async () => {
		const device = new Opniz.Esp32({ address, port, serverPort })
		expect(device).toBeInstanceOf(Opniz.Esp32)
	})
	
	test("M5Atom", async () => {
		const device = new Opniz.M5Atom({ address, port, serverPort })
		expect(device).toBeInstanceOf(Opniz.M5Atom)
	})
})
