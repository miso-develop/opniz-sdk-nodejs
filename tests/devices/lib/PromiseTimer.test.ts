import { PromiseTimer, TimeoutError } from "../../../src/devices/lib/PromiseTimer"

import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

describe("PromiseTimer", () => {
// describe.skip("PromiseTimer", () => {
	
	const timeoutMessage = "timeout."
	
	const testErrorMessage = "Test error."
	const TestError = new Error(testErrorMessage)
	
	const rejectErrorMessage = "Promise reject."
	const RejectError = new Error(rejectErrorMessage)
	
	let promiseTimer: PromiseTimer
	
	beforeAll(() => {
		promiseTimer = new PromiseTimer()
	})
	
	
	
	describe("Methods", () => {
		
		describe("timer()", () => {
			
			describe("オプションなし", () => {
				
				test("タイムアウトせず正常", async () => {
					const actual = promiseTimer.timer(
						new Promise(async (res, rej) => {
							res(true)
						})
					)
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("タイムアウトせず異常", async () => {
					const actual = promiseTimer.timer(
						new Promise(async (res, rej) => {
							rej(RejectError)
						})
					)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow(rejectErrorMessage)
				})
				
				test("タイムアウト", async () => {
					const actual = promiseTimer.timer(
						new Promise(async (res, rej) => {
							await sleep(6000)
							res(true)
						})
					)
					await expect(actual).rejects.toThrowError(TimeoutError)
					await expect(actual).rejects.toThrow(timeoutMessage)
				}, 10000)
			})
			
			describe("オプションあり", () => {
				
				test("タイムアウトせず正常", async () => {
					const actual = promiseTimer.timer(
						new Promise(async (res, rej) => {
							res(true)
						}),
						{ error: TestError, timeout: 1000 }
					)
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("タイムアウトせず異常", async () => {
					const actual = promiseTimer.timer(
						new Promise(async (res, rej) => {
							rej(RejectError)
						}),
						{ error: TestError, timeout: 1000 }
					)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow(rejectErrorMessage)
				})
				
				test("タイムアウト", async () => {
					const actual = promiseTimer.timer(
						new Promise(async (res, rej) => {
							await sleep(2000)
							res(true)
						}),
						{ error: TestError, timeout: 1000 }
					)
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow(testErrorMessage)
				})
			})
		})
		
		describe("timers()", () => {
			
			describe("オプションなし", () => {
				
				test("タイムアウトせず正常", async () => {
					const actual = promiseTimer.timers([
						new Promise(async (res, rej) => {
							await sleep(500)
							res(1)
						}),
						new Promise(async (res, rej) => {
							res(2)
						}),
					])
					await expect(actual).resolves.toEqual(2)
				})
				
				test("タイムアウトせず異常", async () => {
					const actual = promiseTimer.timers([
						new Promise(async (res, rej) => {
							await sleep(500)
							res(1)
						}),
						new Promise(async (res, rej) => {
							rej(RejectError)
						}),
					])
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow(rejectErrorMessage)
				})
				
				test("タイムアウト", async () => {
					const actual = promiseTimer.timers([
						new Promise(async (res, rej) => {
							await sleep(6000)
							res(true)
						}),
						new Promise(async (res, rej) => {
							await sleep(7000)
							rej(RejectError)
						}),
					])
					await expect(actual).rejects.toThrowError(TimeoutError)
					await expect(actual).rejects.toThrow(timeoutMessage)
				}, 10000)
			})
			
			describe("オプションあり", () => {
				
				test("タイムアウトせず正常", async () => {
					const actual = promiseTimer.timers([
						new Promise(async (res, rej) => {
							await sleep(500)
							res(1)
						}),
						new Promise(async (res, rej) => {
							res(2)
						}),
					], { error: TestError, timeout: 1000 })
					await expect(actual).resolves.toBeTruthy()
				})
				
				test("タイムアウトせず異常", async () => {
					const actual = promiseTimer.timers([
						new Promise(async (res, rej) => {
							await sleep(500)
							res(1)
						}),
						new Promise(async (res, rej) => {
							rej(RejectError)
						}),
					], { error: TestError, timeout: 1000 })
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow(rejectErrorMessage)
				})
				
				test("タイムアウト", async () => {
					const actual = promiseTimer.timers([
						new Promise(async (res, rej) => {
							await sleep(2000)
							res(true)
						}),
						new Promise(async (res, rej) => {
							await sleep(3000)
							rej(RejectError)
						}),
					], { error: TestError, timeout: 1000 })
					await expect(actual).rejects.toThrowError(Error)
					await expect(actual).rejects.toThrow(testErrorMessage)
				})
			})
			
		})
		
	})
	
	
	
	describe("Properties", () => {
		
		describe("timeout", () => {
			
			beforeEach(() => {
				promiseTimer.timeout = 1000
			})
			
			test("timeout更新後、正常", async () => {
				const actual = promiseTimer.timer(
					new Promise(async (res, rej) => {
						res(true)
					})
				)
				await expect(actual).resolves.toBeTruthy()
			})
			
			test("timeout更新後、タイムアウト", async () => {
				const actual = promiseTimer.timer(
					new Promise(async (res, rej) => {
						await sleep(2000)
						res(true)
					})
				)
				await expect(actual).rejects.toThrowError(TimeoutError)
				await expect(actual).rejects.toThrow(timeoutMessage)
			})
			
			test("timeout更新後、正常（引数あり）", async () => {
				const actual = promiseTimer.timer(
					new Promise(async (res, rej) => {
						await sleep(2000)
						res(true)
					}),
					{ error: TestError, timeout: 3000 }
				)
				await expect(actual).resolves.toBeTruthy()
			})
			
			test("timeout更新後、タイムアウト（引数あり）", async () => {
				const actual = promiseTimer.timer(
					new Promise(async (res, rej) => {
						await sleep(4000)
						res(true)
					}),
					{ error: TestError, timeout: 3000 }
				)
				await expect(actual).rejects.toThrowError(Error)
				await expect(actual).rejects.toThrow(testErrorMessage)
			})
		})
	})
	
})
