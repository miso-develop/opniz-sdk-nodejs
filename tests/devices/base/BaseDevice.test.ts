import { BaseDevice } from "../../../src/devices/base/BaseDevice"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../../../src/devices/base/transports/lib/Error"
import { env, getPort } from "../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

class Device extends BaseDevice {
	protected _name = "device"
}

// describe("Device(BaseDevice)", () => {
describe.skip("Device(BaseDevice)", () => {
	
	let device: Device
	let deviceMock: Device
	
	const _env = env.devices.base.BaseDevice
	const address = env.common.address
	let port
	let serverPort
	
	const notExistAddress = env.common.notExistAddress
	let notExistPort
	
	const testMessage = {
		method: "testMethod",
		params: [
			"testParameter1",
			"testParameter2",
			"testParameter3",
		],
	}
	const testMessageArray = [testMessage]
	
	const testMessageOnlyName = { method: "testMethod", params: [] }
	const testMessageArrayOnlyName = [testMessageOnlyName]
	
	const notmatchStr = "notmatch"
	const responseNotmatch = [notmatchStr]
	const responseNotmatchStr = JSON.stringify(responseNotmatch)
	
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
		notExistPort = await getPort()
	})
	
	beforeEach(async () => {
		device = new Device({ address, port, serverPort })
		deviceMock = new Device({ address, port: serverPort, serverPort: port })
		device.setTimeout(3000)
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("requestRpc()", () => {
				
				test("Not connected.", async () => {
					const actual = device.requestRpc(testMessage)
					await expect(actual).rejects.toThrowError(NotConnectedError)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("sendRpc()", () => {
				
				test("Not connected.", async () => {
					const actual = device.sendRpc(testMessage)
					await expect(actual).rejects.toThrowError(NotConnectedError)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("exec()", () => {
				
				test("Not connected.", async () => {
					const actual = device.exec("testMethod", "testParameter1", "testParameter2", "testParameter3")
					await expect(actual).rejects.toThrowError(NotConnectedError)
					await expect(actual).rejects.toThrow("Not connected.")
				})
			})
			
			describe("createRpc()", () => {
				
				test("正常（nameのみ）", async () => {
					const actual = device.createRpcRequest("testMethod")
					expect(actual).toEqual(testMessageOnlyName)
				})
				
				test("正常（params含む）", async () => {
					const actual = device.createRpcRequest("testMethod", "testParameter1", "testParameter2", "testParameter3")
					expect(actual).toEqual(testMessage)
				})
			})
		})
		
		
		
		describe("connect以降", () => {
			
			beforeEach(async () => {
				await Promise.all([
					device.connect(),
					deviceMock.connect(),
				])
			})
			
			describe("requestRpc()", () => {
				
				test("正常（オブジェクト引数）", async () => {
					const actual = device.requestRpc(testMessage)
					await expect(actual).resolves.toEqual(responseNotmatch)
				})
				
				test("正常（オブジェクト配列引数）", async () => {
					const actual = device.requestRpc(testMessageArray)
					await expect(actual).resolves.toEqual(responseNotmatch)
				})
				
				test("異常（タイムアウト）", async () => {
					device.setTimeout(0)
					deviceMock.onrpcRequest = async () => await sleep(100)
					
					const actual = device.requestRpc(testMessage)
					await expect(actual).rejects.toThrowError(RequestTimeoutError)
					await expect(actual).rejects.toThrow("Request timeout.")
				})
			})
			
			describe("sendRpc()", () => {
				
				test("正常（オブジェクト引数）", async () => {
					const actual = device.sendRpc(testMessage)
					await expect(actual).resolves.toBeUndefined()
				})
				
				test("正常（オブジェクト配列引数）", async () => {
					const actual = device.sendRpc(testMessageArray)
					await expect(actual).resolves.toBeUndefined()
				})
				
				// MEMO: タイムアウトしないため除外
				// test("異常（タイムアウト）", async () => {
				// 	device.setTimeout(0)
					
				// 	const actual = device.sendRpc(testMessage)
				// 	await expect(actual).rejects.toThrowError(RequestTimeoutError)
				// 	await expect(actual).rejects.toThrow("Request timeout.")
				// })
			})
			
			describe("exec()", () => {
				
				test("正常（nameのみ）", async () => {
					const actual = device.exec("testMethod")
					await expect(actual).resolves.toBeUndefined()
				})
				
				test("正常（parameter含む）", async () => {
					const actual = device.exec("testMethod", "testParameter1", "testParameter2", "testParameter3")
					await expect(actual).resolves.toBeUndefined()
				})
				
				test("異常（タイムアウト）", async () => {
					device.setTimeout(0)
					deviceMock.onrpcRequest = async () => await sleep(100)
					
					const actual = device.exec("testMethod", "testParameter1", "testParameter2", "testParameter3")
					await expect(actual).rejects.toThrowError(RequestTimeoutError)
					await expect(actual).rejects.toThrow("Request timeout.")
				})
			})
			
			describe("createRpc()", () => {
				
				test("正常（nameのみ）", async () => {
					const actual = device.createRpcRequest("testMethod")
					await expect(actual).toEqual(testMessageOnlyName)
				})
				
				test("正常（parameter含む）", async () => {
					const actual = device.createRpcRequest("testMethod", "testParameter1", "testParameter2", "testParameter3")
					await expect(actual).toEqual(testMessage)
				})
			})
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
