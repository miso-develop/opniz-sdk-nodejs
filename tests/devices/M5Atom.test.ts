import { M5Atom } from "../../src/devices/M5Atom"
import { ServerMock } from "./lib/ServerMock"
import { ClientMock } from "./lib/ClientMock"

import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../src/utils"

describe("M5Atom", () => {
// describe.skip("M5Atom", () => {
	
	const address = ip.address()
	const port = 55050
	const serverPort = 55051
	
	let device: M5Atom
	
	let clientMock: ClientMock
	let serverMock: ServerMock
	
	
	
	beforeAll(async () => {
		clientMock = new ClientMock(address, serverPort)
		serverMock = new ServerMock()
		serverMock.createServer(port)
	})
	
	beforeEach(async () => {
		device = new M5Atom({ address, port, serverPort })
	})
	
	
	
	describe("Methods", () => {
		
		describe("drawpix", () => {
			
			test("正常", async () => {
				await device.connect()
				await expect(device.drawpix(0, "#000000")).resolves.toBeTruthy()
				await expect(device.drawpix(0, "#ffffff")).resolves.toBeTruthy()
				await expect(device.drawpix(0, "#f0f0f0")).resolves.toBeTruthy()
				
				// TODO: おいおい実装
				// await expect(device.drawpix(0, "#000")).resolves.toBeTruthy()
				// await expect(device.drawpix(0, "#fff")).resolves.toBeTruthy()
				// await expect(device.drawpix(0, "#08f")).resolves.toBeTruthy()
			})
			
			describe("異常", () => {
				
				test("引数不正", async () => {
					await device.connect()
					await expect(device.drawpix(0, "")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "xxx")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "123")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "123456")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "#12345")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "#1234567")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "#ggg")).resolves.toBeFalsy()
					
					// TODO: おいおい実装したら消す
					await expect(device.drawpix(0, "#000")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "#fff")).resolves.toBeFalsy()
					await expect(device.drawpix(0, "#08f")).resolves.toBeFalsy()
				})
				
				test("connect前", async () => {
					const actual = device.drawpix(0, "#ffffff")
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock
		
		describe("onbutton()", () => {
			
			test("正常", async () => {
				device.onbutton = onMethodMock = jest.fn()
				await device.connect()
				
				await clientMock.send({ name: "button" })
				expect(onMethodMock).toBeCalledTimes(1)
				
				await clientMock.send({ name: "button" })
				expect(onMethodMock).toBeCalledTimes(2)
			})
			
			test("デフォルト（何も起こらずエラーも発生しないこと）", async () => {
				await device.connect()
				
				const actual = clientMock.send({ name: "button" })
				await expect(actual).resolves.toBeUndefined()
			})
		})
	})
	
	
	
	describe("Properties", () => {
		
		test("name", async () => {
			expect(device.name).toBe("m5atom")
		})
	})
	
	
	
	describe("Extend", () => {
		
		class M5AtomExtend extends M5Atom {
			protected _name = "m5atom-extend"
			protected addDeviceMessageHandlers(messageHandler): void {}
		}
		
		test("name", async () => {
			await device.close()
			device = new M5AtomExtend({ address, port, serverPort })
			expect(device.name).toBe("m5atom-extend")
		})
	})
	
	
	
	afterEach(async () => {
		await device.close()
	})
	
	afterAll(async () => {
		await device.close()
		serverMock.close()
		await sleep(1000)
	})
	
})
