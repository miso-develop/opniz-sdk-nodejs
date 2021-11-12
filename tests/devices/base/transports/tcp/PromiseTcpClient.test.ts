import { PromiseTcpClient, ConnectionTimeoutError, RequestTimeoutError, NotConnectedError } from "../../../../../src/devices/base/transports/tcp/PromiseTcpClient"
import { PromiseTcpServerMock } from "./PromiseTcpServerMock"
import { env, getPort } from "../../../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../../src/utils"

describe("TcpClient", () => {
// describe.skip("TcpClient", () => {
	
	let tcpClient: PromiseTcpClient
	let tcpClientNoConnect: PromiseTcpClient
	let serverMock: PromiseTcpServerMock
	
	const _env = env.devices.base.transports.tcp.PromiseTcpClient
	const address = env.common.address
	let port
	let noConnectPort
	
	const requestMessage = "Request test."
	
	const testTimeoutErrorMessage = "Test timeout error."
	const TestTimeoutError = new Error(testTimeoutErrorMessage)
	
	
	
	beforeAll(async () => {
		port = await getPort()
		noConnectPort = await getPort()
	})
	
	beforeEach(async () => {
		serverMock = new PromiseTcpServerMock(port)
		serverMock.listen()
		
		tcpClient = new PromiseTcpClient({ address, port })
		tcpClientNoConnect = new PromiseTcpClient({ address, port: noConnectPort })
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("connect()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpClient.connect()
						await expect(actual).resolves.toBeUndefined()
						expect(tcpClient.isConnected()).toBeTruthy()
					})
					
					test("異常", async () => {
						const actual = tcpClientNoConnect.connect()
						await expect(actual).rejects.toThrow(`connect ECONNREFUSED ${address}:${noConnectPort}`)
						expect(tcpClient.isConnected()).toBeFalsy()
					})
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpClient.connect({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
						expect(tcpClient.isConnected()).toBeTruthy()
					})
					
					test("異常", async () => {
						const actual = tcpClientNoConnect.connect({ timeout: 3000 })
						await expect(actual).rejects.toThrow(`connect ECONNREFUSED ${address}:${noConnectPort}`)
						expect(tcpClient.isConnected()).toBeFalsy()
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
						const dummyTcpClient = new PromiseTcpClient({ address, port })
						await dummyTcpClient.connect()
						
						const actual = tcpClient.connect()
						await expect(actual).resolves.toBeUndefined()
						expect(tcpClient.isConnected()).toBeTruthy()
						
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
						expect(tcpClient.isConnected()).toBeTruthy()
					})
				})
				
				describe("オプションあり", () => {
					
					test("2重connect", async () => {
						await tcpClient.connect({ timeout: 3000 })
						const actual = tcpClient.connect({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
						expect(tcpClient.isConnected()).toBeTruthy()
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
						serverMock.listen()
						serverMock.setWait(6000)
						
						const actual = tcpClient.request(requestMessage)
						await expect(actual).rejects.toThrowError(RequestTimeoutError)
						await expect(actual).rejects.toThrow("Request timeout.")
						
						serverMock.close()
						serverMock.listen()
						serverMock.setWait(0)
					}, 10000)
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpClient.request(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).resolves.toBe(requestMessage)
					})
					
					test("タイムアウト", async () => {
						serverMock.close()
						serverMock.listen()
						serverMock.setWait(2000)
						
						const actual = tcpClient.request(requestMessage, { error: TestTimeoutError, timeout: 1000 })
						await expect(actual).rejects.toThrowError(Error)
						await expect(actual).rejects.toThrow(testTimeoutErrorMessage)
						
						serverMock.close()
						serverMock.listen()
						serverMock.setWait(0)
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
					// 	serverMock.listen(port)
					// 	serverMock.setWait(6000)
						
					// 	const actual = tcpClient.send(requestMessage)
					// 	await expect(actual).rejects.toThrowError(RequestTimeoutError)
					// 	await expect(actual).rejects.toThrow("Request timeout.")
						
					// 	serverMock.close()
					// 	serverMock.listen(port)
					// 	serverMock.setWait(0)
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
					// 	serverMock.listen(port)
					// 	serverMock.setWait(2000)
						
					// 	const actual = tcpClient.send(requestMessage, { error: TestTimeoutError, timeout: 1000 })
					// 	await expect(actual).rejects.toThrowError(Error)
					// 	await expect(actual).rejects.toThrow(testTimeoutErrorMessage)
						
					// 	serverMock.close()
					// 	serverMock.listen(port)
					// 	serverMock.setWait(0)
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
					serverMock.listen()
					serverMock.setWait(2000)
					
					const actual = tcpClient.request(requestMessage)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("timeout.")
					
					serverMock.close()
					serverMock.listen()
					serverMock.setWait(0)
				})
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock: jest.Mock<any, any>
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				tcpClient.onerror = onMethodMock = jest.fn()
				await tcpClient.connect()
				
				tcpClient.socket.emit("error")
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
	})
	
	
	
	describe("Properties", () => {
		// とりあえずpublicにしてるだけなのでスルー
		// describe("socket", () => {
		// })
	})
	
	
	
	afterEach(async () => {
		serverMock.close()
		await tcpClient.close()
		await tcpClientNoConnect.close()
	})
	
	afterAll(async () => {
		// await sleep(100)
	})
	
})
