import { BaseRpcHandler, RpcHandler, RpcRequest } from "../../../src/devices/base/BaseRpcHandler"
import { env, getPort } from "../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../src/utils"

describe("BaseRpcHandler", () => {
	
	let baseRpcHandler: BaseRpcHandler
	
	const _env = env.devices.base.BaseRpcHandler
	const testHandler1: RpcHandler = env.common.testHandler1
	const testHandler2: RpcHandler = env.common.testHandler2
	const testRpcRequest1: RpcRequest = env.common.testRpcRequest1
	const testRpcRequest2: RpcRequest = env.common.testRpcRequest2
	
	
	beforeAll(async () => {})
	
	beforeEach(async () => {
		baseRpcHandler = new BaseRpcHandler()
	})
	
	
	
	describe("onMethods", () => {
		
		let onMethodMock: jest.Mock<any, any>
		
		describe("onrpc", () => {
			
			test("正常", async () => {
				baseRpcHandler.onrpcRequest = onMethodMock = jest.fn()
				
				baseRpcHandler.emit("rpcRequest", [testRpcRequest1])
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
		describe("onnotmatch", () => {
			
			test("正常", async () => {
				baseRpcHandler.onnotmatch = onMethodMock = jest.fn()
				
				baseRpcHandler.emit("notmatch", testRpcRequest1)
				expect(onMethodMock).toBeCalledTimes(1)
			})
		})
	})
	
	
	
	afterEach(async () => {})
	afterAll(async () => {})
})
