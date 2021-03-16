import { TcpServer, ListenTimeoutError } from "../../../src/devices/lib/TcpServer"
import { ClientMock } from "./ClientMock"

import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

describe("TcpServer", () => {
// describe.skip("TcpServer", () => {
	
	const address = ip.address()
	const port = 55010
	
	let tcpServer: TcpServer
	let clientMock: ClientMock
	
	beforeAll(async () => {
		clientMock = new ClientMock(address, port)
	})
	
	beforeEach(async () => {
		tcpServer = new TcpServer(port)
	})
	
	
	
	describe("Methods", () => {
		
		describe("listen前", () => {
			
			describe("listen()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpServer.listen()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpServer.listen({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
					})
					
					// MEMO: タイムアウト実装してるけど、timeout: 0 でもタイムアウトしない…
					// test("タイムアウト", async () => {
					// 	const actual = tcpServer.listen({ timeout: 0 })
					// 	await expect(actual).rejects.toThrowError(ListenTimeoutError)
					// 	await expect(actual).rejects.toThrow("Listen timeout.")
					// })
				})
			})
			
			describe("close()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpServer.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
			})
			
			describe("isListening()", () => {
				
				test("false", async () => {
					const actual = tcpServer.isListening()
					expect(actual).toBeFalsy()
				})
			})
			
			// MEMO: listenしないと確認不可
			// describe.skip("onMessageEvents()", () => {})
		})
		
		describe("listen後", () => {
			
			beforeEach(async () => {
				await tcpServer.listen()
			})
			
			describe("listen()", () => {
				
				describe("オプションなし", () => {
				
					test("2重listen", async () => {
						const actual = tcpServer.listen()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("オプションあり", () => {
				
					test("2重listen", async () => {
						const actual = tcpServer.listen({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				test("再接続", async () => {
					const actual = new Promise(async (res, rej) => {
						await tcpServer.close()
						await tcpServer.listen()
						res(true)
					})
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("二重listen", async () => {
					const actual = tcpServer.listen()
					await expect(actual).resolves.toBeUndefined()
				})
				
				test("同portで複数listen", async () => {
					const dummyTcpServer = new TcpServer(port)
					
					const actual = dummyTcpServer.listen()
					// await expect(actual).rejects.toThrowError(Error) // MEMO: Error型が返ってきてるけど、普通のError型じゃないなにかっぽい…（error.codeとかあるし…）
					await expect(actual).rejects.toThrow(`listen EADDRINUSE: address already in use :::${port}`)
					
					await dummyTcpServer.close()
					await sleep(100)
				})
			})
			
			describe("close()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpServer.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("オプションあり", () => {
					
					test("正常", async () => {
						const actual = tcpServer.close({ timeout: 3000 })
						await expect(actual).resolves.toBeUndefined()
					})
					
					// MEMO: タイムアウト実装してるけど、timeout: 0 でもタイムアウトしない…
					// test("タイムアウト", async () => {
					// 	const actual = tcpServer.close({ timeout: 0 })
					// 	await expect(actual).rejects.toThrowError(Error)
					// 	await expect(actual).rejects.toThrow("timeout.")
					// })
				})
				
				test("二重close", async () => {
					const actual = new Promise(async (res, rej) => {
						await tcpServer.close()
						await tcpServer.close()
						res(true)
					})
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("isListening()", () => {
				
				test("true", async () => {
					const actual = tcpServer.isListening()
					expect(actual).toBeTruthy()
				})
			})
			
			describe("onMessageHandlers()", () => {
				
				test("MessageHandler登録、発火", async () => {
					const actual = new Promise(async (res, rej) => {
						tcpServer.messageHandlers.push({
							name: "test",
							listener: () => res(true),
						})
						tcpServer.onMessageHandlers()
						tcpServer.onnotmatch = message => res(message.name)
						
						const messageEventJson = { name: "test" }
						await clientMock.send(messageEventJson)
					})
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("未登録MessageEvent発火（notmatch）", async () => {
					const actual = new Promise(async (res, rej) => {
						tcpServer.onnotmatch = message => res(message.name)
						
						const messageEventJson = { name: "notmatch" }
						await clientMock.send(messageEventJson)
					})
					await expect(actual).resolves.toBe("notmatch")
				})
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock: jest.Mock<any, any>
		
		describe("onclose()", () => {
			
			test("正常", async () => {
				tcpServer.onclose = onMethodMock = jest.fn()
				await tcpServer.listen()
				
				await tcpServer.close()
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				tcpServer.onerror = onMethodMock = jest.fn()
				await tcpServer.listen()
				
				tcpServer.server.emit("error")
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
		
		describe("onclose() & onerror()", () => {
			
			test("正常", async () => {
				onMethodMock = jest.fn()
				tcpServer.onclose = onMethodMock
				tcpServer.onerror = onMethodMock
				await tcpServer.listen()
				
				tcpServer.server.emit("error")
				await sleep(100)
				expect(onMethodMock).toBeCalledTimes(2)
			})
		})
		
		describe("onnotmatch()", () => {
			
			test("正常", async () => {
				tcpServer.onnotmatch = onMethodMock = jest.fn()
				await tcpServer.listen()
				
				const messageEventJson = { name: "test" }
				await clientMock.send(messageEventJson)
				expect(onMethodMock).toBeCalledTimes(1)
				expect(onMethodMock.mock.calls[0][0]).toEqual(messageEventJson)
			})
			
			test("正常（parametersあり）", async () => {
				tcpServer.onnotmatch = onMethodMock = jest.fn()
				await tcpServer.listen()
				
				const messageEventJson = { name: "test", parameters: [ "parameter1", "parameter2" ] }
				await clientMock.send(messageEventJson)
				expect(onMethodMock).toBeCalledTimes(1)
				expect(onMethodMock.mock.calls[0][0]).toEqual(messageEventJson)
			})
			
			test("デフォルト（何も起こらずエラーも発生しないこと）", async () => {
				await tcpServer.listen()
				
				const messageEventJson = { name: "test" }
				const actual = clientMock.send(messageEventJson)
				await expect(actual).resolves.toBeUndefined()
			})
		})
	})
	
	
	
	afterEach(async () => {
		await tcpServer.close()
	})
	
	afterAll(async () => {
		await tcpServer.close()
		await sleep(1000)
	})
	
})
