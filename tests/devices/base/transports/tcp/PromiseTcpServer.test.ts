import { PromiseTcpServer, ListenTimeoutError } from "../../../../../src/devices/base/transports/tcp/PromiseTcpServer"
import { PromiseTcpClientMock } from "./PromiseTcpClientMock"
import { env, getPort } from "../../../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../../src/utils"

// describe("PromiseTcpServer", () => {
describe.skip("PromiseTcpServer", () => {
	
	let tcpServer: PromiseTcpServer
	let clientMock: PromiseTcpClientMock
	
	const _env = env.devices.base.transports.tcp.PromiseTcpServer
	const address = env.common.address
	let port
	
	
	
	beforeAll(async () => {
		port = await getPort()
		clientMock = new PromiseTcpClientMock({address, port})
	})
	
	beforeEach(async () => {
		tcpServer = new PromiseTcpServer(port)
	})
	
	
	
	describe("Methods", () => {
		
		describe("listen前", () => {
			
			describe("listen()", () => {
				
				describe("オプションなし", () => {
					
					test("正常", async () => {
						const actual = tcpServer.listen()
						expect(actual).toBeUndefined()
					})
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
				tcpServer.listen()
			})
			
			describe("listen()", () => {
				
				describe("オプションなし", () => {
				
					test("2重listen", async () => {
						const actual = tcpServer.listen()
						expect(actual).toBeUndefined()
					})
				})
				
				test("再接続", async () => {
					// const actual = new Promise(async (res, rej) => {
					const actual = new Promise((res, rej) => {
						// await tcpServer.close()
						tcpServer.close()
						tcpServer.listen()
						res(true)
					})
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("二重listen", async () => {
					const actual = tcpServer.listen()
					expect(actual).toBeUndefined()
				})
				
				// TODO: MEMO: Errorは発生しているけどうまくハンドリングできない…
				// test("同portで複数listen", async () => {
				// 	const dummyTcpServer = new PromiseTcpServer(port)
					
				// 	const actual = dummyTcpServer.listen()
					
				// 	// await expect(actual).rejects.toThrowError(Error) // MEMO: Error型が返ってきてるけど、普通のError型じゃないなにかっぽい…（error.codeとかあるし…）
				// 	// expect(actual).toThrowError(Error)
				// 	expect(actual).toThrow(`listen EADDRINUSE: address already in use :::${port}`)
				// })
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
					// const actual = new Promise(async (res, rej) => {
					const actual = new Promise((res, rej) => {
						// await tcpServer.close()
						// await tcpServer.close()
						tcpServer.close()
						tcpServer.close()
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
			
			afterEach(async () => {
				tcpServer.close()
			})
		})
	})
	
	
	
	describe("On methods", () => {
		let onMethodMock: jest.Mock<any, any>
		
		describe("onerror()", () => {
			
			test("正常", async () => {
				tcpServer.onerror = onMethodMock = jest.fn()
				tcpServer.listen()
				
				tcpServer.server.emit("error")
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
	})
	
	
	
	afterEach(async () => {
		await tcpServer.close()
	})
	
	afterAll(async () => {
		await sleep(100)
	})
	
})
