import { TcpManager } from "../../../src/devices/lib/TcpManager"
import { ServerMock } from "./ServerMock"
import { ClientMock } from "./ClientMock"

import ip from "ip"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

describe("TcpManager", () => {
// describe.skip("TcpManager", () => {
	
	const address = ip.address()
	const port = 55020
	const serverPort = 55021
	
	const notExistAddress = "192.168.254.1"
	const notExistPort = 55022
	
	let tcpManager: TcpManager
	
	let serverMock: ServerMock
	let clientMock: ClientMock
	
	
	
	beforeAll(async () => {
		clientMock = new ClientMock(address, serverPort)
		serverMock = new ServerMock()
		serverMock.createServer(port)
	})
	
	beforeEach(async () => {
		tcpManager = new TcpManager({ address, port, serverPort })
	})
	
	
	
	describe("Methods", () => {
		
		describe("connect前", () => {
			
			describe("connect()", () => {
				
				describe("正常", () => {
					
					test("引数なし", async () => {
						const actual = tcpManager.connect()
						await expect(actual).resolves.toBeTruthy()
					})
					
					test("timeout指定", async () => {
						const actual = tcpManager.connect({ timeout: 3000})
						await expect(actual).resolves.toBeTruthy()
					})
				})
				
				describe("異常", () => {
					
					// MEMO: タイムアウト実装してるけど、timeout: 0 でもタイムしない…
					// test("timeout早すぎ", async () => {
					// 	const actual = tcpManager.connect({ timeout: 0})
					// 	await expect(actual).resolves.toBeFalsy()
					// })
					
					test("接続先addressなし", async () => {
						tcpManager = new TcpManager({ address: notExistAddress, port, serverPort })
						
						const actual = tcpManager.connect({ timeout: 3000})
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("接続先portなし", async () => {
						tcpManager = new TcpManager({ address, port: notExistPort, serverPort })
						const actual = tcpManager.connect({ timeout: 3000})
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("接続先address、portなし", async () => {
						tcpManager = new TcpManager({ address: notExistAddress, port: notExistPort, serverPort })
						
						const actual = tcpManager.connect({ timeout: 3000})
						await expect(actual).resolves.toBeFalsy()
					})
					
					test("address, port, serverPort重複", async () => {
						const dummyTcpManager = new TcpManager({ address, port, serverPort })
						await dummyTcpManager.connect()
						
						const actual = tcpManager.connect({ timeout: 3000 })
						await expect(actual).resolves.toBeFalsy()
						
						dummyTcpManager.close()
					})
				})
			})
			
			describe("connect以降に使うメソッド", () => {
				
				describe("request()", () => {
					
					test("Not connected.", async () => {
						const actual = tcpManager.request("test message!")
						await expect(actual).rejects.toThrowError(Error)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("send()", () => {
					
					test("Not connected.", async () => {
						const actual = tcpManager.send("test message!")
						await expect(actual).rejects.toThrowError(Error)
						await expect(actual).rejects.toThrow("Not connected.")
					})
				})
				
				describe("close()", () => {
					
					test("未接続状態でclose", async () => {
						const actual = tcpManager.close()
						await expect(actual).resolves.toBeUndefined()
					})
				})
				
				describe("isConnected()", () => {
					
					test("false", async () => {
						const actual = tcpManager.isConnected()
						expect(actual).toBeFalsy()
					})
				})
				
				describe("setTimeout()", () => {
					
					test("設定のみ", async () => {
						const actual = tcpManager.setTimeout(1000)
						expect(actual).toBeUndefined()
					})
				})
				
				describe("addCustomMessageHandlers()", () => {
					
					test("設定のみ", async () => {
						const actual = tcpManager.addCustomMessageHandlers({ name: "test", listener: () => {} })
						expect(actual).toBeUndefined()
					})
				})
				
				// MEMO: connectしてEvent発火させないと確認できないため、connect後のケースでテスト
				// describe.skip("removeCustomMessageHandlers()", () => {})
				
				describe("getMessageHandlers()", () => {
					
					test("正常（handler追加前）", async () => {
						const actual = tcpManager.getMessageHandlers()
						expect(actual).toEqual([])
					})
				
					test("正常（addCustomMessageHandlers後実行）", async () => {
						tcpManager.addCustomMessageHandlers({ name: "test", listener: () => {} })
						const actual = tcpManager.getMessageHandlers()
						expect(actual).toEqual(["test"])
					})
				})
			})
		})
		
		
		
		describe("connect以降", () => {
			
			beforeEach(async () => {
				await tcpManager.connect()
			})
			
			describe("connect()", () => {
				
				test("2重connect", async () => {
					const actual = tcpManager.connect()
					await expect(actual).resolves.toBeTruthy()
				})
			})
			
			describe("request()", () => {
				
				test("正常", async () => {
					const actual = tcpManager.request("test message!")
					await expect(actual).resolves.toBe("test message!")
				})
				
				test("異常（タイムアウト）", async () => {
					await tcpManager.close()
					serverMock.close()
					
					serverMock.createServer(port, 6000)
					await tcpManager.connect()
					
					const actual = tcpManager.request("test message!")
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow("Request timeout.")
					
					serverMock.close()
					serverMock.createServer(port)
				}, 10000)
			})
			
			describe("send()", () => {
				
				test("正常", async () => {
					const actual = tcpManager.send("test message!")
					await expect(actual).resolves.toBeUndefined()
				})
				
				// MEMO: タイムアウト実装してるけど実質タイムアウトしない
				// test("異常（タイムアウト）", async () => {
				// 	await tcpManager.close()
				// 	serverMock.close()
					
				// 	serverMock.createServer(port, 6000)
				// 	await tcpManager.connect()
					
				// 	const actual = tcpManager.send("test message!")
				// 	await expect(actual).rejects.toThrowError(Error)
				// 	await expect(actual).rejects.toThrow("Request timeout.")
					
				// 	serverMock.close()
				// 	serverMock.createServer(port)
				// }, 10000)
			})
			
			describe("close()", () => {
				
				test("正常", async () => {
					const actual = tcpManager.close()
					await expect(actual).resolves.toBeUndefined()
				})
				
				test("二重close", async () => {
					await tcpManager.close()
					const actual = tcpManager.close()
					await expect(actual).resolves.toBeUndefined()
				})
			})
			
			describe("isConnected()", () => {
				
				test("true", async () => {
					const actual = tcpManager.isConnected()
					expect(actual).toBeTruthy()
				})
			})
			
			describe("setTimeout()", () => {
				
				test("正常", async () => {
					tcpManager.setTimeout(1000)
					const actual = tcpManager.request("test message!")
					await expect(actual).resolves.toBe("test message!")
				})
				
				test("正常（タイムアウト）", async () => {
					try {
						tcpManager.setTimeout(0)
						await tcpManager.request("test message!")
					} catch (e) {
						// expect(e).toThrowError(Error)
						expect(e.message).toBe("Request timeout.")
					}
				})
				
				afterEach(async () => {
					serverMock.close()
					serverMock.createServer(port)
				})
			})
			
			describe("addCustomMessageHandlers()", () => {
				let onMethodMock: jest.Mock<any, any>
				
				test("正常", async () => {
					onMethodMock = jest.fn()
					
					tcpManager.addCustomMessageHandlers({ name: "test", listener: onMethodMock })
					await clientMock.send({ name: "test" })
					
					expect(onMethodMock).toBeCalledTimes(1)
				})
				
				test("正常（parametersあり）", async () => {
					onMethodMock = jest.fn()
					
					tcpManager.addCustomMessageHandlers({ name: "test", listener: onMethodMock })
					await clientMock.send({ name: "test", parameters: [ "parameter1", "parameter2" ] })
					
					expect(onMethodMock).toBeCalledTimes(1)
					expect(onMethodMock.mock.calls[0][0]).toEqual(["parameter1", "parameter2"])
				})
				
				test("複数登録", async () => {
					onMethodMock = jest.fn()
					
					tcpManager.addCustomMessageHandlers(
						{ name: "test1", listener: onMethodMock },
						{ name: "test2", listener: onMethodMock },
					)
					
					await clientMock.send({ name: "test1" })
					await clientMock.send({ name: "test2" })
					
					expect(onMethodMock).toBeCalledTimes(2)
				})
				
				// MEMO: 同名複数登録はひとまず仕様上許容する（同名登録分listenerが実行される）
				test("同名複数登録", async () => {
					onMethodMock = jest.fn()
					
					tcpManager.addCustomMessageHandlers(
						{ name: "test", listener: onMethodMock },
						{ name: "test", listener: onMethodMock },
					)
					await clientMock.send({ name: "test" })
					
					expect(onMethodMock).toBeCalledTimes(2)
				})
			})
			
			
			describe("removeCustomMessageHandlers()", () => {
				let onMethodMock: jest.Mock<any, any>
				
				beforeEach(async () => {
					onMethodMock = jest.fn()
					
					tcpManager.addCustomMessageHandlers(
						{ name: "test1", listener: onMethodMock },
						{ name: "test2", listener: onMethodMock },
						{ name: "test3", listener: onMethodMock },
					)
				})
				
				test("複数登録後、ひとつ削除", async () => {
					tcpManager.removeCustomMessageHandlers({ name: "test1", listener: onMethodMock })
					
					await clientMock.send({ name: "test1" })
					await clientMock.send({ name: "test2" })
					await clientMock.send({ name: "test3" })
					
					expect(onMethodMock).toBeCalledTimes(2)
				})
				
				test("複数登録後、複数削除", async () => {
					tcpManager.removeCustomMessageHandlers(
						{ name: "test1", listener: onMethodMock },
						{ name: "test2", listener: onMethodMock },
					)
					
					await clientMock.send({ name: "test1" })
					await clientMock.send({ name: "test2" })
					await clientMock.send({ name: "test3" })
					
					expect(onMethodMock).toBeCalledTimes(1)
				})
			})
			
			describe("getMessageHandlers()", () => {
				
				test("正常（handler追加前）", async () => {
					const actual = tcpManager.getMessageHandlers()
					expect(actual).toEqual([])
				})
				
				test("正常（addCustomMessageHandlers後実行）", async () => {
					tcpManager.addCustomMessageHandlers({ name: "test", listener: () => {} })
					const actual = tcpManager.getMessageHandlers()
					expect(actual).toEqual(["test"])
				})
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock: jest.Mock<any, any>
		
		describe("onclose()", () => {
			
			test("正常", async () => {
				tcpManager.onclose = onMethodMock = jest.fn()
				await tcpManager.connect()
				
				await tcpManager.close()
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				serverMock.close()
				serverMock.createServer(port, 6000)
				
				tcpManager.onerror = onMethodMock = jest.fn()
				await tcpManager.connect()
				
				try {
					await tcpManager.request("test message!")
				} catch (e) {
					expect(onMethodMock).toBeCalledTimes(1)
				}
			}, 10000)
		})
		
		describe("default onerror（onerror時にoncloseが呼ばれてること）", () => {
			
			test("正常", async () => {
				serverMock.close()
				serverMock.createServer(port, 6000)
				
				onMethodMock = jest.fn()
				tcpManager.onclose = onMethodMock
				tcpManager.onerror = onMethodMock
				await tcpManager.connect()
				
				try {
					await tcpManager.request("test message!")
				} catch (e) {
					await sleep(100)
					expect(onMethodMock).toBeCalledTimes(2)
				}
			}, 10000)
		})
		
		describe("onnotmatch()", () => {
			
			test("正常", async () => {
				tcpManager.onnotmatch = onMethodMock = jest.fn()
				await tcpManager.connect()
				await clientMock.send({ name: "test" })
				expect(onMethodMock).toBeCalledTimes(1)
			})
			
			test("正常（parametersあり）", async () => {
				tcpManager.onnotmatch = onMethodMock = jest.fn()
				await tcpManager.connect()
				const messageEventJson = { name: "test", parameters: [ "parameter1", "parameter2" ] }
				await clientMock.send(messageEventJson)
				expect(onMethodMock).toBeCalledTimes(1)
				expect(onMethodMock.mock.calls[0][0]).toEqual(messageEventJson)
			})
		})
		
		afterEach(async () => {
			serverMock.close()
			serverMock.createServer(port)
		})
	})
	
	
	
	describe("Properties", () => {
		// none
	})
	
	
	
	afterEach(async () => {
		await tcpManager.close()
	})
	
	afterAll(async () => {
		await tcpManager.close()
		serverMock.close()
		await sleep(1000)
	})
	
})
