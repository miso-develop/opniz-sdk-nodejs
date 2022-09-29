import { TcpTransport } from "../../../../../src/devices/base/transports/tcp/TcpTransport"
import { TcpTransportMock } from "./TcpTransportMock"
import { TimeoutError, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../../../../../src/devices/base/transports/lib/Error"
import { env, getPort } from "../../../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../../src/utils"

// describe("TcpTransport", () => {
describe.skip("TcpTransport", () => {
	
	let tcpTransport: TcpTransport
	let tcpTransportMock: TcpTransportMock
	
	const _env = env.devices.base.transports.tcp.TcpTransport
	const address = env.common.address
	let port
	let serverPort
	
	const notExistAddress = env.common.notExistAddress
	let notExistPort
	
	const testRpcRequest = [
		{
			method: "testMethod1",
			params: ["parameter1-1", "parameter1-2", "parameter1-3"],
		},
	]
	const testRpcRequestStr = JSON.stringify(testRpcRequest)
	
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
		notExistPort = await getPort()
	})
	
	beforeEach(async () => {
		tcpTransport = new TcpTransport({ address, port, serverPort })
		tcpTransportMock = new TcpTransportMock({ address, port: serverPort, serverPort: port })
		tcpTransport.setTimeout(3000)
		tcpTransportMock.setWait(0)
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("connect()", () => {
				
				describe("正常", () => {
					
					test("引数なし", async () => {
						const actual = tcpTransport.connect()
						const actualMock = tcpTransportMock.connect()
						
						await Promise.all([
							expect(actual).resolves.toBeTruthy(),
							expect(actualMock).resolves.toBeTruthy(),
						])
					})
					
					test("timeout指定", async () => {
						const actual = tcpTransport.connect({ timeout: 3000 })
						const actualMock = tcpTransportMock.connect({ timeout: 3000 })
						
						await Promise.all([
							expect(actual).resolves.toBeTruthy(),
							expect(actualMock).resolves.toBeTruthy(),
						])
					})
				})
				
				describe("異常", () => {
					
					test("timeout早すぎ", async () => {
						const actual = tcpTransport.connect({ timeout: 0})
						const actualMock = tcpTransportMock.connect({ timeout: 0 })
						
						await Promise.all([
							expect(actual).resolves.toBeFalsy(),
							expect(actualMock).resolves.toBeFalsy(),
						])
					})
					
					test("接続先addressなし", async () => {
						tcpTransport = new TcpTransport({ address: notExistAddress, port, serverPort })
						
						const actual = tcpTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("接続先portなし", async () => {
						tcpTransport = new TcpTransport({ address, port: notExistPort, serverPort })
						
						const actual = tcpTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("接続先address、portなし", async () => {
						tcpTransport = new TcpTransport({ address: notExistAddress, port: notExistPort, serverPort })
						
						const actual = tcpTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("address, port, serverPort重複", async () => {
						const dummyTcpTransport = new TcpTransport({ address, port, serverPort })
						await dummyTcpTransport.connect()
						
						const actual = tcpTransport.connect({ timeout: 100 })
						await expect(actual).resolves.toBeFalsy()
						
						await dummyTcpTransport.close()
					})
				})
			})
			
			describe("connect以降に使うメソッド", () => {
				
				describe("request()", () => {
					
					test("Not connected.", async () => {
						const actual = tcpTransport.request(testRpcRequestStr)
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("send()", () => {
					
					test("Not connected.", async () => {
						const actual = tcpTransport.send(testRpcRequestStr)
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("close()", () => {
					
					test("未接続状態でclose", async () => {
						const actual = tcpTransport.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("isConnected()", () => {
					
					test("false", async () => {
						const actual = tcpTransport.isConnected()
						expect(actual).toBeFalsy()
					})
				})
				
				describe("setTimeout()", () => {
					
					test("設定のみ", async () => {
						const actual = tcpTransport.setTimeout(1000)
						expect(actual).toBeUndefined()
					})
				})
			})
		})
		
		
		
		describe("connect以降", () => {
			
			beforeEach(async () => {
				await Promise.all([
					tcpTransport.connect(),
					tcpTransportMock.connect(),
				])
			})
			
			describe("connect()", () => {
				
				test("2重connect", async () => {
					const actual = tcpTransport.connect()
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("request()", () => {
				
				test("正常", async () => {
					const actual = tcpTransport.request(testRpcRequestStr)
					await expect(actual).resolves.toBe(testRpcRequestStr)
				})
				
				test("異常（タイムアウト）", async () => {
					tcpTransport.setTimeout(0)
					
					const actual = tcpTransport.request(testRpcRequestStr)
					await expect(actual).rejects.toThrowError(RequestTimeoutError)
					await expect(actual).rejects.toThrow("Request timeout.")
				})
			})
			
			describe("send()", () => {
				
				test("正常", async () => {
					const actual = tcpTransport.send(testRpcRequestStr)
					await expect(actual).resolves.toBeUndefined()
				})
				
				// MEMO: タイムアウトしないため除外
				// test("異常（タイムアウト）", async () => {
				// 	tcpTransport.setTimeout(0)
					
				// 	const actual = tcpTransport.send(testRpcRequestStr)
				// 	await expect(actual).rejects.toThrowError(RequestTimeoutError)
				// 	await expect(actual).rejects.toThrow("Request timeout.")
				// })
			})
			
			describe("close()", () => {
				
				test("正常", async () => {
					const actual = tcpTransport.close()
					const actualMock = tcpTransportMock.close()
					await Promise.all([
						expect(actual).resolves.toBeUndefined(),
						expect(actualMock).resolves.toBeUndefined(),
					])
				})
				
				test("二重close", async () => {
					const actual = tcpTransport.close()
					const actualMock = tcpTransportMock.close()
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
					const actual = tcpTransport.isConnected()
					expect(actual).toBeTruthy()
				})
			})
			
			describe("setTimeout()", () => {
				
				test("正常", async () => {
					tcpTransport.setTimeout(4000)
					const actual = tcpTransport.request(testRpcRequestStr)
					await expect(actual).resolves.toBe(testRpcRequestStr)
				})
				
				test("正常（タイムアウト）", async () => {
					tcpTransport.setTimeout(0)
					
					const actual = tcpTransport.request(testRpcRequestStr)
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
				tcpTransport.connect(),
				tcpTransportMock.connect(),
			])
		})
		
		describe("onclose()", () => {
			
			test("正常", async () => {
				tcpTransport.onclose = onMethodMock = jest.fn()
				
				await Promise.all([
					tcpTransport.close(),
					tcpTransportMock.close(),
				])
				expect(onMethodMock).toBeCalledTimes(1)
			})
			
			test("不発（既にcloseされた状態で実行）", async () => {
				await Promise.all([
					tcpTransport.close(),
					tcpTransportMock.close(),
				])
				
				tcpTransport.onclose = onMethodMock = jest.fn()
				
				await Promise.all([
					tcpTransport.close(),
					tcpTransportMock.close(),
				])
				expect(onMethodMock).toBeCalledTimes(0)
			})
		})
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				tcpTransport.setTimeout(0)
				
				tcpTransport.onerror = onMethodMock = jest.fn()
				
				try {
					await tcpTransport.request(testRpcRequestStr)
				} catch (e) {
					expect(onMethodMock).toBeCalledTimes(1)
				}
			})
		})
	})
	
	
	
	afterEach(async () => {
		await Promise.all([
			tcpTransport.close(),
			tcpTransportMock.close(),
		])
	})
	
	afterAll(async () => {
		// await sleep(100)
	})
	
})
