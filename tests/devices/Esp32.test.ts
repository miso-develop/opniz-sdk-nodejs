import { Esp32 } from "../../src/devices/Esp32"
import { BaseTransportMock } from "./base/BaseTransportMock"
import { env, getPort } from "../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../src/utils"

describe("Esp32", () => {
// describe.skip("Esp32", () => {
	
	let device: Esp32
	let deviceMock: Esp32
	
	const _env = env.devices.Esp32
	const address = env.common.address
	let port
	let serverPort
	
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
	})
	
	beforeEach(async () => {
		device = new Esp32({ address, port, serverPort })
		deviceMock = new Esp32({ address, port: serverPort, serverPort: port })
		device.setTimeout(3000)
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("freeHeap", () => {
				
				test("Not connected.", async () => {
					const actual = device.getFreeHeap()
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("analogRead", () => {
				
				test("Not connected.", async () => {
					const actual = device.analogRead(1)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			// MEMO: 以下メソッド省略
		})
		
		
		
		describe("connect後", () => {
			
			beforeEach(async () => {
				await Promise.all([
					device.connect(),
					deviceMock.connect(),
				])
			})
			
			describe("getFreeHeap()", () => {
				
				test("正常", async () => {
					const actual = device.getFreeHeap()
					await expect(actual).resolves.toBe(-1)
				})
			})
			
			describe("temperatureRead()", () => {
				
				test("正常", async () => {
					const actual = device.temperatureRead()
					await expect(actual).resolves.toBe(-1)
				})
			})
			
			describe("restart()", () => {
				
				test("正常", async () => {
					const actual = device.restart()
					await expect(actual).resolves.toBeFalsy()
				})
			})
			
			describe("delay()", () => {
				
				test("正常", async () => {
					const actual = device.delay(100)
					await expect(actual).resolves.toBeFalsy()
				})
			})
			
			describe("analogRead", () => {
				
				test("正常", async () => {
					const actual = device.analogRead(1)
					await expect(actual).resolves.toBe(-1)
				})
				
				describe("異常", () => {
					
					// TODO: いずれ実装
					// test("ピン番号マイナス値", async () => {
					// 	const actual = device.analogRead(-1)
					// 	await expect(actual).rejects.toThrowError(Error)
					// 	await expect(actual).rejects.toThrow("TODO: ピン番号マイナスに関するエラーメッセージ")
					// })
				})
			})
			
			describe("dacWrite()", () => {
				
				test("正常", async () => {
					const actual = device.dacWrite(1, 2)
					await expect(actual).resolves.toBeFalsy()
				})
			})
			
			describe("digitalRead()", () => {
				
				test("正常", async () => {
					const actual = device.digitalRead(1)
					await expect(actual).resolves.toBe(-1)
				})
			})
			
			describe("digitalWrite()", () => {
				
				test("正常", async () => {
					const actual = device.digitalWrite(1, 2)
					await expect(actual).resolves.toBeFalsy()
				})
			})
			
			describe("ledcWrite()", () => {
				
				test("正常（引数最小限）", async () => {
					const actual = device.ledcWrite(1, 2)
					await expect(actual).resolves.toBeFalsy()
				})
				
				test("正常（引数全て）", async () => {
					const actual = device.ledcWrite(1, 2, 3, 4, 5)
					await expect(actual).resolves.toBeFalsy()
				})
			})
		})
	})
	
	
	
	describe("Extend", () => {
		
		class Esp32Extend extends Esp32 {}
		
		test("name", async () => {
			await device.close()
			device = new Esp32Extend({ address, port, serverPort })
			expect(device).toBeInstanceOf(Esp32Extend)
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
