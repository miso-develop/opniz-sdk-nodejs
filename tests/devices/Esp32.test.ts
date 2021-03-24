import { Esp32 } from "../../src/devices/Esp32"
import { Esp32Mock } from "./Esp32Mock"
import { ClientMock } from "./lib/ClientMock"

import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../src/utils"

describe("Esp32", () => {
// describe.skip("Esp32", () => {
	
	const address = ip.address()
	const port = 55040
	const serverPort = 55041
	
	let device: Esp32
	
	let clientMock: ClientMock
	let serverMock: Esp32Mock
	
	
	
	beforeAll(async () => {
		clientMock = new ClientMock(address, serverPort)
		serverMock = new Esp32Mock()
		serverMock.createServer(port)
	})
	
	beforeEach(async () => {
		device = new Esp32({ address, port, serverPort })
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
				await device.connect()
			})
			
			describe("getFreeHeap()", () => {
				
				test("正常", async () => {
					const actual = device.getFreeHeap()
					await expect(actual).resolves.toBe(1)
				})
			})
			
			describe("temperatureRead()", () => {
				
				test("正常", async () => {
					const actual = device.temperatureRead()
					await expect(actual).resolves.toBe(1)
				})
			})
			
			describe("restart()", () => {
				
				test("正常", async () => {
					const actual = device.restart()
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("delay()", () => {
				
				test("正常", async () => {
					const actual = device.delay(1000)
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("analogRead", () => {
				
				test("正常", async () => {
					const actual = device.analogRead(1)
					await expect(actual).resolves.toBe(1)
				})
				
				describe("異常", () => {
					
					// TODO: おいおい実装
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
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("digitalRead()", () => {
				
				test("正常", async () => {
					const actual = device.digitalRead(1)
					await expect(actual).resolves.toBe(1)
				})
			})
			
			describe("digitalWrite()", () => {
				
				test("正常", async () => {
					const actual = device.digitalWrite(1, 2)
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("ledcWrite()", () => {
				
				test("正常（引数最小限）", async () => {
					const actual = device.ledcWrite(1, 2)
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("正常（引数全て）", async () => {
					const actual = device.ledcWrite(1, 2, 3, 4, 5)
					await expect(actual).resolves.toBeTruthy()
				})
			})
		})
	})
	
	
	
	describe("Properties", () => {
		
		test("name", async () => {
			expect(device.name).toBe("esp32")
		})
	})
	
	
	
	describe("Extend", () => {
		
		class Esp32Extend extends Esp32 {
			protected _name = "esp32-extend"
			protected addDeviceMessageHandlers(messageHandler): void {}
		}
		
		test("name", async () => {
			await device.close()
			device = new Esp32Extend({ address, port, serverPort })
			expect(device.name).toBe("esp32-extend")
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
