import { TransportCreator } from "../../../../src/devices/base/transports/TransportCreator"
import { TcpTransport } from "../../../../src/devices/base/transports/tcp/TcpTransport"
import { env, getPort } from "../../../env"
import { log, sleep, getDateStr, generateRandomColorcode, generateRandomColorcodeClosure } from "../../../../src/utils"

// describe("TransportCreator", () => {
describe.skip("TransportCreator", () => {
	
	const _env = env.devices.base.transports.TransportCreator
	const address = env.common.address
	let port
	let serverPort
	
	
	
	beforeAll(async () => {
		port = await getPort()
		serverPort = await getPort()
	})
	
	
	
	describe("Methods", () => {
		
		// TODO: Protocol分岐テストあとで実装
		
		describe("create", () => {
			
			test("正常", async () => {
				const actual = TransportCreator.create({ address, port })
				expect(actual).toBeInstanceOf(TcpTransport)
			})
			
			test("正常（全引数指定）", async () => {
				const actual = TransportCreator.create({ address, port, serverPort })
				expect(actual).toBeInstanceOf(TcpTransport)
			})
		})
	})
})

