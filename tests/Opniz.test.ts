import { Opniz } from "../src/index"
import { env, getPort } from "./env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../src/utils"

// describe("Opniz", () => {
describe.skip("Opniz", () => {
	
	const _env = env.Opniz
	const address = env.common.address
	
	let port
	let serverPort
	let id = "test"
	let protocol
	
	let device
	
	
	
	beforeEach(async () => {
		port = await getPort()
		serverPort = await getPort()
	})
	
	
	
	test("BaseDevice", async () => {
		class Device extends Opniz.BaseDevice {}
		device = new Device({ port })
		expect(device).toBeInstanceOf(Opniz.BaseDevice)
	})
	
	test("Esp32", async () => {
		device = new Opniz.Esp32({ port })
		expect(device).toBeInstanceOf(Opniz.Esp32)
	})
	
	test("M5Atom", async () => {
		device = new Opniz.M5Atom({ port })
		expect(device).toBeInstanceOf(Opniz.M5Atom)
	})
	
	test("M5Unified", async () => {
		device = new Opniz.M5Unified({ port })
		expect(device).toBeInstanceOf(Opniz.M5Unified)
	})
	
})
