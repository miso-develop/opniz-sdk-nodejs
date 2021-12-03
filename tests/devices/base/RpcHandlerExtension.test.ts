import { RpcHandlerExtension, RpcHandler, RpcRequest } from "../../../src/devices/base/RpcHandlerExtension"
import { env, getPort } from "../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

// describe("RpcHandlerExtension", () => {
describe.skip("RpcHandlerExtension", () => {
	
	let rpcHandlerExtension: RpcHandlerExtension
	
	const _env = env.devices.base.RpcHandlerExtension
	const testHandler1: RpcHandler = env.common.testHandler1
	const testHandler2: RpcHandler = env.common.testHandler2
	const testRpcRequest1: RpcRequest = env.common.testRpcRequest1
	const testRpcRequest2: RpcRequest = env.common.testRpcRequest2
	
	
	
	beforeAll(async () => {})
	
	beforeEach(async () => {
		rpcHandlerExtension = new RpcHandlerExtension()
	})
	
	
	
	describe("Methods", () => {
		
		describe("add", () => {
			
			test("正常（引数ひとつ）", async () => {
				const actual = rpcHandlerExtension.add(testHandler1)
				expect(actual).toBeUndefined()
				expect(rpcHandlerExtension.handlers[testHandler1.method]).toEqual(testHandler1)
			})
			
			test("正常（引数複数）", async () => {
				const actual = rpcHandlerExtension.add(testHandler1, testHandler2)
				expect(actual).toBeUndefined()
				expect(rpcHandlerExtension.handlers[testHandler1.method]).toEqual(testHandler1)
				expect(rpcHandlerExtension.handlers[testHandler2.method]).toEqual(testHandler2)
			})
			
			test("異常（同名ハンドラ登録）", async () => {
				rpcHandlerExtension.add(testHandler1)
				
				const actual = () => rpcHandlerExtension.add(testHandler1)
				expect(actual).toThrowError(Error)
				expect(actual).toThrow(`A handler with the same name has already been registered: ${testHandler1.method}`)
			})
			
			test("異常（複数引数で同名ハンドラ登録）", async () => {
				const actual = () => rpcHandlerExtension.add(testHandler1, testHandler1)
				expect(actual).toThrowError(Error)
				expect(actual).toThrow(`A handler with the same name has already been registered: ${testHandler1.method}`)
			})
		})
		
		describe("remove", () => {
			
			beforeEach(async () => {
				rpcHandlerExtension.add(testHandler1, testHandler2)
			})
			
			test("正常（引数ひとつ）", async () => {
				const actual = rpcHandlerExtension.remove(testHandler1)
				expect(actual).toBeUndefined()
				expect(rpcHandlerExtension.handlers[testHandler2.method]).toEqual(testHandler2)
			})
			
			test("正常（引数複数）", async () => {
				const actual = rpcHandlerExtension.remove(testHandler1, testHandler2)
				expect(actual).toBeUndefined()
				expect(rpcHandlerExtension.handlers).toEqual({})
			})
			
			test("正常（存在しないハンドラを引数に指定）", async () => {
				rpcHandlerExtension.remove(testHandler2)
				
				const actual = rpcHandlerExtension.remove(testHandler2)
				expect(actual).toBeUndefined()
				expect(rpcHandlerExtension.handlers[testHandler1.method]).toEqual(testHandler1)
			})
			
			test("正常（存在しないハンドラを複数引数に指定）", async () => {
				rpcHandlerExtension.remove(testHandler1, testHandler2)
				
				const actual = rpcHandlerExtension.remove(testHandler1, testHandler2)
				expect(actual).toBeUndefined()
				expect(rpcHandlerExtension.handlers).toEqual({})
			})
		})
		
		describe("exists", () => {
			
			beforeEach(async () => {
				rpcHandlerExtension.add(testHandler1)
			})
			
			test("正常（引数にRpcHandlerを指定、ハンドラが存在するとき）", async () => {
				const actual = rpcHandlerExtension.exists(testHandler1)
				expect(actual).toBeTruthy()
			})
			
			test("正常（引数にRpcHandlerを指定、ハンドラが存在しないとき）", async () => {
				const actual = rpcHandlerExtension.exists(testHandler2)
				expect(actual).toBeFalsy()
			})
			
			test("正常（引数にRpcを指定、ハンドラが存在するとき）", async () => {
				const actual = rpcHandlerExtension.exists(testRpcRequest1)
				expect(actual).toBeTruthy()
			})
			
			test("正常（引数にRpcを指定、ハンドラが存在しないとき）", async () => {
				const actual = rpcHandlerExtension.exists(testRpcRequest2)
				expect(actual).toBeFalsy()
			})
		})
		
		describe("run", () => {
			
			beforeEach(async () => {
				rpcHandlerExtension.add(testHandler1)
			})
			
			test("正常（登録済みハンドラ）", async () => {
				const actual = rpcHandlerExtension.run(testRpcRequest1)
				await expect(actual).resolves.toBe("testMethod1 response")
			})
			
			test("正常（notmatch）", async () => {
				const actual = rpcHandlerExtension.run(testRpcRequest2)
				await expect(actual).resolves.toBe("notmatch")
			})
		})
		
		describe("print", () => {
			
			beforeEach(async () => {
				rpcHandlerExtension.add(testHandler1)
			})
			
			test("正常", async () => {
				const actual = rpcHandlerExtension.print()
				expect(actual).toEqual([testHandler1.method])
			})
			
			test("正常（複数登録）", async () => {
				rpcHandlerExtension.add(testHandler2)
				
				const actual = rpcHandlerExtension.print()
				expect(actual).toEqual([testHandler1.method, testHandler2.method])
			})
			
			test("正常（ハンドラ登録なし）", async () => {
				rpcHandlerExtension.remove(testHandler1)
				
				const actual = rpcHandlerExtension.print()
				expect(actual).toEqual([])
			})
		})
	})
	
	
	
	afterEach(async () => {})
	afterAll(async () => {})
})
