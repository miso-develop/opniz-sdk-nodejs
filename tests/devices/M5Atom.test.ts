import { M5Atom } from "../../src/devices/M5Atom"
import { env, getPort } from "../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../src/utils"

describe("M5Atom", () => {
// describe.skip("M5Atom", () => {
	
	let device: M5Atom
	let deviceMock: M5Atom
	
	const _env = env.devices.M5Atom
	const address = env.common.address
	let port
	let serverPort
	
	const testEmitRpc = JSON.stringify([{ method: "button" }])
	
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
	})
	
	beforeEach(async () => {
		device = new M5Atom({ address, port, serverPort })
		deviceMock = new M5Atom({ address, port: serverPort, serverPort: port })
		device.setTimeout(3000)
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock
		
		beforeEach(async () => {
			await Promise.all([
				device.connect(),
				deviceMock.connect(),
			])
		})
		
		describe("onbutton()", () => {
			
			test("正常", async () => {
				device.onbutton = onMethodMock = jest.fn()
				
				await deviceMock.request(testEmitRpc)
				
				expect(true).toBeTruthy()
			})
		})
	})
	
	
	
	describe("Extend", () => {
		
		class M5AtomExtend extends M5Atom {}
		
		test("name", async () => {
			await device.close()
			device = new M5AtomExtend({ address, port, serverPort })
			expect(device).toBeInstanceOf(M5AtomExtend)
		})
	})
	
	
	
	afterEach(async () => {
		await Promise.all([
			device.close(),
			deviceMock.close(),
		])
	})
	
	afterAll(async () => {
		// await sleep(100)
	})
	
})
