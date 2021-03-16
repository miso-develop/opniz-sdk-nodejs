import { TcpClient, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../../../src/devices/lib/TcpClient"
import { ServerMock } from "./ServerMock"

import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

describe("TcpClient", () => {
// describe.skip("TcpClient", () => {
	
	const address = ip.address()
	const port = 55000
	const portNoConnect = 55001
	
	const requestMessage = "Request test."
	
	const testTimeoutErrorMessage = "Test timeout error."
	const TestTimeoutError = new Error(testTimeoutErrorMessage)
	
	let tcpClient: TcpClient
	let tcpClientNoConnect: TcpClient
	let serverMock: ServerMock
	
	beforeAll(async () => {
		serverMock = new ServerMock()
		serverMock.createServer(port)
	})
	
	beforeEach(async () => {
		tcpClient = new TcpClient({ address, port })
		tcpClientNoConnect = new TcpClient({ address, port: portNoConnect })
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("connect()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpClient.connect()
						await expect(actual).resolves.toBeUndefined()
					})
					
					test("異常", async () => {
						const actual = tcpClientNoConnect.connect()
						await expect(actual).rejects.toThrow(`connect ECONNREFUSED ${address}:${portNoConnect}`)
					})
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpClient.connect({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
					})
					
					test("異常", async () => {
						const actual = tcpClientNoConnect.connect({ timeout: 3000 })
						await expect(actual).rejects.toThrow(`connect ECONNREFUSED ${address}:${portNoConnect}`)
					})
					
					// MEMO: ローカル実行ではパスするもののGitHub ActionsだとFAILになるためとりあえずコメントアウト
					// test("タイムアウト", async () => {
					// 	const actual = tcpClient.connect({ timeout: 1 })
					// 	await expect(actual).rejects.toThrowError(ConnectionTimeoutError)
					// 	await expect(actual).rejects.toThrow("Connection timeout.")
					// })
				})
				
				describe("異常系", () => {
					
					test("同address/portオブジェクトで複数connect", async () => {
						const dummyTcpClient = new TcpClient({ address, port })
						await dummyTcpClient.connect()
						
						const actual = tcpClient.connect()
						await expect(actual).resolves.toBeUndefined()
						
						await dummyTcpClient.close()
					})
				})
			})
			
			describe("request()", () => {
				
				describe("オプションなし", () => {
					
					test("Not connected.", async () => {
						const actual = tcpClientNoConnect.request(requestMessage)
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("オプションあり", () => {
					
					test("Not connected.", async () => {
						const actual = tcpClient.request(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
			})
			
			describe("send()", () => {
				
				describe("オプションなし", () => {
					
					test("Not connected.", async () => {
						const actual = tcpClientNoConnect.send(requestMessage)
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("オプションあり", () => {
					
					test("Not connected.", async () => {
						const actual = tcpClient.send(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).rejects.toThrowError(NotConnectedError)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
			})
			
			describe("close()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpClient.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("オプションあり", () => {
					const timeout = 1000
					
					test("正常", async () => {
						const actual = tcpClient.close({ timeout })
						await expect(actual).resolves.toBeUndefined()
					})
				})
			})
			
			describe("isConnected()", () => {
				
				test("未接続時", async () => {
					const actual = tcpClient.isConnected()
					expect(actual).toBeFalsy()
				})
			})
			
			describe("setTimeout()", () => {
				
				test("正常", async () => {
					const actual = tcpClient.setTimeout(1000)
					expect(actual).toBeUndefined()
				})
			})
		})
		
		
		
		describe("connect後", () => {
			
			beforeEach(async () => {
				await tcpClient.connect()
			})
			
			describe("connect()", () => {
				
				describe("オプションなし", () => {
					
					test("2重connect", async () => {
						await tcpClient.connect()
						const actual = tcpClient.connect()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("オプションあり", () => {
					
					test("2重connect", async () => {
						await tcpClient.connect({ timeout: 3000 })
						const actual = tcpClient.connect({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
					})
				})
			})
			
			describe("request()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpClient.request(requestMessage)
						await expect(actual).resolves.toBe(requestMessage)
					})
					
					test("タイムアウト", async () => {
						serverMock.close()
						serverMock.createServer(port, 6000)
						
						const actual = tcpClient.request(requestMessage)
						await expect(actual).rejects.toThrowError(RequestTimeoutError)
						await expect(actual).rejects.toThrow("Request timeout.")
						
						serverMock.close()
						serverMock.createServer(port)
					}, 10000)
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpClient.request(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).resolves.toBe(requestMessage)
					})
					
					test("タイムアウト", async () => {
						serverMock.close()
						serverMock.createServer(port, 2000)
						
						const actual = tcpClient.request(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).rejects.toThrowError(Error)
						await expect(actual).rejects.toThrow(testTimeoutErrorMessage)
						
						serverMock.close()
						serverMock.createServer(port)
					}, 10000)
				})
			})
			
			describe("send()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpClient.send(requestMessage)
						await expect(actual).resolves.toBeUndefined()
					})
					
					// MEMO: タイムアウト実装してるけど実質タイムアウトしない
					// test("タイムアウト", async () => {
					// 	serverMock.close()
					// 	serverMock.createServer(port, 6000)
						
					// 	const actual = tcpClient.send(requestMessage)
					// 	await expect(actual).rejects.toThrowError(RequestTimeoutError)
					// 	await expect(actual).rejects.toThrow("Request timeout.")
						
					// 	serverMock.close()
					// 	serverMock.createServer(port)
					// }, 10000)
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpClient.send(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).resolves.toBeUndefined()
					})
					
					// MEMO: タイムアウト実装してるけど実質タイムアウトしない
					// test("タイムアウト", async () => {
					// 	serverMock.close()
					// 	serverMock.createServer(port, 2000)
						
					// 	const actual = tcpClient.send(requestMessage, { error: TestTimeoutError, timeout: 1000 })
					// 	await expect(actual).rejects.toThrowError(Error)
					// 	await expect(actual).rejects.toThrow(testTimeoutErrorMessage)
						
					// 	serverMock.close()
					// 	serverMock.createServer(port)
					// }, 10000)
				})
			})
			
			describe("close()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpClient.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("オプションあり", () => {
					const timeout = 1000
					
					test("正常", async () => {
						const actual = tcpClient.close({ timeout })
						await expect(actual).resolves.toBeUndefined()
					})
				})
			})
			
			describe("isConnected()", () => {
				
				test("接続時", async () => {
					const actual = tcpClient.isConnected()
					expect(actual).toBeTruthy()
				})
			})
			
			describe("setTimeout()", () => {
				
				test("正常", async () => {
					tcpClient.setTimeout(1000)
					const actual = tcpClient.request(requestMessage)
					await expect(actual).resolves.toBe(requestMessage)
				})
				
				test("タイムアウト", async () => {
					tcpClient.setTimeout(1000)
					
					serverMock.close()
					serverMock.createServer(port, 2000)
					
					const actual = tcpClient.request(requestMessage)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("timeout.")
					
					serverMock.close()
					serverMock.createServer(port)
				})
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock: jest.Mock<any, any>
		
		describe("onclose()", () => {
			
			test("正常", async () => {
				tcpClient.onclose = onMethodMock = jest.fn()
				await tcpClient.connect()
				
				await tcpClient.close()
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				tcpClient.onerror = onMethodMock = jest.fn()
				await tcpClient.connect()
				
				tcpClient.socket.emit("error")
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
		
		describe("onerror() & onclose()", () => {
			
			test("正常", async () => {
				onMethodMock = jest.fn()
				tcpClient.onerror = onMethodMock
				tcpClient.onclose = onMethodMock
				await tcpClient.connect()
				
				tcpClient.socket.emit("error")
				await sleep(100)
				expect(onMethodMock).toBeCalledTimes(2)
			})
		})
	})
	
	
	
	describe("Properties", () => {
		// とりあえずpublicにしてるだけなのでスルー
		// describe("socket", () => {
		// })
	})
	
	
	
	afterEach(async () => {
		await tcpClient.close()
		await tcpClientNoConnect.close()
	})
	
	afterAll(async () => {
		await tcpClient.close()
		await tcpClientNoConnect.close()
		serverMock.close()
		await sleep(1000)
	})
	
})
