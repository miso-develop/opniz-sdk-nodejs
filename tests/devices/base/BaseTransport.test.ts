import { BaseTransport } from "../../../src/devices/base/BaseTransport"
import { BaseTransportMock } from "./BaseTransportMock"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../../../src/devices/base/transports/lib/TimeoutError"
import { env, getPort } from "../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

// describe("BaseTransport", () => {
describe.skip("BaseTransport", () => {
	
	let baseTransport: BaseTransport
	let baseTransportMock: BaseTransportMock
	
	const _env = env.devices.base.BaseTransport
	const address = env.common.address
	let port
	let serverPort
	
	const notExistAddress = env.common.notExistAddress
	let notExistPort
	
	const rpcStr = JSON.stringify([
		{
			method: "testMethod1",
			params: ["testParameter1-1", "testParameter1-2", "testParameter1-3"],
		},
	])
	
	const notmatchStr = "notmatch"
	const responseNotmatch = [notmatchStr]
	const responseNotmatchStr = JSON.stringify(responseNotmatch)
	
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
		notExistPort = await getPort()
	})
	
	beforeEach(async () => {
		baseTransport = new BaseTransport({ address, port, serverPort })
		baseTransportMock = new BaseTransportMock({ address, port: serverPort, serverPort: port })
		baseTransport.setTimeout(3000)
		baseTransportMock.setWait(0)
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("connect()", () => {
				
				describe("正常", () => {
					
					test("引数なし", async () => {
						const actual = baseTransport.connect()
						const actualMock = baseTransportMock.connect()
						
						await Promise.all([
							expect(actual).resolves.toBeTruthy(),
							expect(actualMock).resolves.toBeTruthy(),
						])
					})
					
					test("timeout指定", async () => {
						const actual = baseTransport.connect({ timeout: 3000 })
						const actualMock = baseTransportMock.connect({ timeout: 3000 })
						
						await Promise.all([
							expect(actual).resolves.toBeTruthy(),
							expect(actualMock).resolves.toBeTruthy(),
						])
					})
				})
				
				describe("異常", () => {
					
					test("timeout早すぎ", async () => {
						const actual = baseTransport.connect({ timeout: 0})
						const actualMock = baseTransportMock.connect({ timeout: 0 })
						
						await Promise.all([
							expect(actual).resolves.toBeFalsy(),
							expect(actualMock).resolves.toBeFalsy(),
						])
					})
					
					test("接続先addressなし", async () => {
						baseTransport = new BaseTransport({ address: notExistAddress, port, serverPort })
						
						const actual = baseTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("接続先portなし", async () => {
						baseTransport = new BaseTransport({ address, port: notExistPort, serverPort })
						
						const actual = baseTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("接続先address、portなし", async () => {
						baseTransport = new BaseTransport({ address: notExistAddress, port: notExistPort, serverPort })
						
						const actual = baseTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("address, port, serverPort重複", async () => {
						const dummyBaseTransport = new BaseTransport({ address, port, serverPort })
						await dummyBaseTransport.connect()
						
						const actual = baseTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
						
						await dummyBaseTransport.close()
					})
				})
			})
			
			describe("connect以降に使うメソッド", () => {
				
				describe("request()", () => {
					
					test("Not connected.", async () => {
						const actual = baseTransport.request(rpcStr)
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("send()", () => {
					
					test("Not connected.", async () => {
						const actual = baseTransport.send(rpcStr)
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("close()", () => {
					
					test("未接続状態でclose", async () => {
						const actual = baseTransport.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("isConnected()", () => {
					
					test("false", async () => {
						const actual = baseTransport.isConnected()
						expect(actual).toBeFalsy()
					})
				})
				
				describe("setTimeout()", () => {
					
					test("設定のみ", async () => {
						const actual = baseTransport.setTimeout(1000)
						expect(actual).toBeUndefined()
					})
				})
			})
		})
		
		
		
		describe("connect以降", () => {
			
			beforeEach(async () => {
				await Promise.all([
					baseTransport.connect(),
					baseTransportMock.connect(),
				])
			})
			
			describe("connect()", () => {
				
				test("2重connect", async () => {
					const actual = baseTransport.connect()
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("request()", () => {
				
				test("正常", async () => {
					const actual = baseTransport.request(rpcStr)
					await expect(actual).resolves.toBe(responseNotmatchStr)
				})
				
				test("異常（タイムアウト）", async () => {
					baseTransport.setTimeout(0)
					baseTransportMock.onrpcRequest = async () => await sleep(100)
					
					const actual = baseTransport.request(rpcStr)
					await expect(actual).rejects.toThrowError(RequestTimeoutError)
					await expect(actual).rejects.toThrow("Request timeout.")
				})
			})
			
			describe("send()", () => {
				
				test("正常", async () => {
					const actual = baseTransport.send(rpcStr)
					await expect(actual).resolves.toBeUndefined()
				})
				
				// MEMO: タイムアウトしないため除外
				// test("異常（タイムアウト）", async () => {
				// 	baseTransport.setTimeout(0)
				
					
				// 	const actual = baseTransport.send(rpcStr)
				// 	await expect(actual).rejects.toThrowError(RequestTimeoutError)
				// 	await expect(actual).rejects.toThrow("Request timeout.")
				// })
			})
			
			describe("close()", () => {
				
				test("正常", async () => {
					const actual = baseTransport.close()
					const actualMock = baseTransportMock.close()
					await Promise.all([
						expect(actual).resolves.toBeUndefined(),
						expect(actualMock).resolves.toBeUndefined(),
					])
				})
				
				test("二重close", async () => {
					const actual = baseTransport.close()
					const actualMock = baseTransportMock.close()
					await Promise.all([
						expect(actual).resolves.toBeUndefined(),
						expect(actualMock).resolves.toBeUndefined(),
						expect(actual).resolves.toBeUndefined(),
						expect(actualMock).resolves.toBeUndefined(),
					])
				})
			})
			
			describe("isConnected()", () => {
				
				test("true", async () => {
					const actual = baseTransport.isConnected()
					expect(actual).toBeTruthy()
				})
			})
			
			describe("setTimeout()", () => {
				
				test("正常", async () => {
					baseTransport.setTimeout(4000)
					const actual = baseTransport.request(rpcStr)
					await expect(actual).resolves.toBe(responseNotmatchStr)
				})
				
				test("正常（タイムアウト）", async () => {
					baseTransport.setTimeout(0)
					baseTransportMock.onrpcRequest = async () => await sleep(100)
					
					const actual = baseTransport.request(rpcStr)
					await expect(actual).rejects.toThrowError(RequestTimeoutError)
					await expect(actual).rejects.toThrow("Request timeout.")
				})
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock: jest.Mock<any, any>
		
		beforeEach(async () => {
			await Promise.all([
				baseTransport.connect(),
				baseTransportMock.connect(),
			])
		})
		
		describe("onclose()", () => {
			
			test("正常", async () => {
				baseTransport.onclose = onMethodMock = jest.fn()
				
				await Promise.all([
					baseTransport.close(),
					baseTransportMock.close(),
				])
				expect(onMethodMock).toBeCalledTimes(1)
			})
			
			test("不発（既にcloseされた状態で実行）", async () => {
				await Promise.all([
					baseTransport.close(),
					baseTransportMock.close(),
				])
				
				baseTransport.onclose = onMethodMock = jest.fn()
				
				await Promise.all([
					baseTransport.close(),
					baseTransportMock.close(),
				])
				expect(onMethodMock).toBeCalledTimes(0)
			})
		})
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				baseTransport.setTimeout(0)
				
				baseTransport.onerror = onMethodMock = jest.fn()
				
				try {
					await baseTransport.request(rpcStr)
				} catch (e) {
					expect(onMethodMock).toBeCalledTimes(1)
				}
			})
		})
	})
	
	
	
	afterEach(async () => {
		await Promise.all([
			baseTransport.close(),
			baseTransportMock.close(),
		])
	})
	
	afterAll(async () => {
		// await sleep(100)
	})
	
})
