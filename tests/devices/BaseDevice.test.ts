import { BaseDevice } from "../../src/devices/BaseDevice"
import { ServerMock } from "./lib/ServerMock"
import { ClientMock } from "./lib/ClientMock"

import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../src/utils"

class Device extends BaseDevice {
	protected _name = "device"
	protected addDeviceMessageHandlers(messageHandler): void {}
}

describe("Device(BaseDevice)", () => {
// describe.skip("Device(BaseDevice)", () => {
	
	const address = ip.address()
	const port = 55030
	const serverPort = 55031
	
	const notExistAddress = "192.168.254.1"
	const notExistPort = 55032
	
	let device: Device
	
	let clientMock: ClientMock
	let serverMock: ServerMock
	
	const testMessage = {
		name: "TestMessage",
		parameters: [
			"TestParameter1",
			"TestParameter2",
			"TestParameter3",
		],
	}
	const testMessageArray = [testMessage]
	
	const testMessageOnlyName = { name: "TestMessage", parameters: [] }
	const testMessageArrayOnlyName = [testMessageOnlyName]
	
	
	beforeAll(async () => {
		clientMock = new ClientMock(address, serverPort)
		serverMock = new ServerMock()
		serverMock.createServer(port)
	})
	
	beforeEach(async () => {
		device = new Device({ address, port, serverPort })
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("requestJson()", () => {
				
				test("Not connected.", async () => {
					const actual = device.requestJson(testMessage)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("sendJson()", () => {
				
				test("Not connected.", async () => {
					const actual = device.sendJson(testMessage)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("exec()", () => {
				
				test("Not connected.", async () => {
					const actual = device.exec("TestMessage", "TestParameter1", "TestParameter2", "TestParameter3")
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("createMessage()", () => {
				
				test("正常（nameのみ）", async () => {
					const actual = device.createMessage("TestMessage")
					expect(actual).toEqual(testMessageOnlyName)
				})
				
				test("正常（parameters含む）", async () => {
					const actual = device.createMessage("TestMessage", "TestParameter1", "TestParameter2", "TestParameter3")
					expect(actual).toEqual(testMessage)
				})
			})
		})
		
		
		
		describe("connect以降", () => {
			
			beforeEach(async () => {
				await device.connect()
			})
			
			describe("requestJson()", () => {
				
				test("正常（オブジェクト引数）", async () => {
					const actual = device.requestJson(testMessage)
					await expect(actual).resolves.toEqual(testMessageArray)
				})
				
				test("正常（オブジェクト配列引数）", async () => {
					const actual = device.requestJson(testMessageArray)
					await expect(actual).resolves.toEqual(testMessageArray)
				})
				
				test("異常（タイムアウト）", async () => {
					await device.close()
					serverMock.close()
					
					serverMock.createServer(port, 6000)
					await device.connect()
					
					const actual = device.requestJson(testMessage)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Request timeout.")
					
					serverMock.close()
					serverMock.createServer(port)
				}, 10000)
			})
			
			describe("sendJson()", () => {
				
				test("正常（オブジェクト引数）", async () => {
					const actual = device.sendJson(testMessage)
					await expect(actual).resolves.toBeUndefined()
				})
				
				test("正常（オブジェクト配列引数）", async () => {
					const actual = device.sendJson(testMessageArray)
					await expect(actual).resolves.toBeUndefined()
				})
				
				// MEMO: タイムアウト実装してるけど実質タイムアウトしない
				// test("異常（タイムアウト）", async () => {
				// 	await device.close()
				// 	serverMock.close()
					
				// 	serverMock.createServer(port, 6000)
				// 	await device.connect()
					
				// 	const actual = device.sendJson(testMessage)
				// 	await expect(actual).rejects.toThrowError(Error)
				// 	await expect(actual).rejects.toThrow("Request timeout.")
					
				// 	serverMock.close()
				// 	serverMock.createServer(port)
				// }, 10000)
			})
			
			describe("exec()", () => {
				
				test("正常（nameのみ）", async () => {
					const actual = device.exec("TestMessage")
					await expect(actual).resolves.toEqual(testMessageOnlyName)
				})
				
				test("正常（parameter含む）", async () => {
					const actual = device.exec("TestMessage", "TestParameter1", "TestParameter2", "TestParameter3")
					await expect(actual).resolves.toEqual(testMessage)
				})
				
				test("異常（タイムアウト）", async () => {
					await device.close()
					serverMock.close()
					
					serverMock.createServer(port, 6000)
					await device.connect()
					
					const actual = device.exec("TestMessage", "TestParameter1", "TestParameter2", "TestParameter3")
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Request timeout.")
					
					serverMock.close()
					serverMock.createServer(port)
				}, 10000)
			})
			
			describe("createMessage()", () => {
				
				test("正常（nameのみ）", async () => {
					const actual = device.createMessage("TestMessage")
					expect(actual).toEqual(testMessageOnlyName)
				})
				
				test("正常（parameter含む）", async () => {
					const actual = device.createMessage("TestMessage", "TestParameter1", "TestParameter2", "TestParameter3")
					expect(actual).toEqual(testMessage)
				})
			})
		})
	})
	
	
	
	describe("Properties", () => {
		
		describe("name", () => {
			
			test("name", async () => {
				const actual = device.name
				expect(actual).toBe("device")
			})
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
